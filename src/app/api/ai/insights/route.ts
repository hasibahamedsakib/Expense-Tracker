import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Expense from '@/models/Expense';
import { generateInsight, ExpenseAnalysisData } from '@/lib/openai';
import { ExpenseCategory, Expense as ExpenseType } from '@/types';
import { getAuthUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    // Get user from authentication token
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    let body;
    try {
      body = await request.json();
    } catch {
      body = {};
    }
    const { period = 'month' } = body;

    const now = new Date();
    let startDate: Date;
    
    switch (period) {
      case 'week':
        const dayOfWeek = now.getDay();
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default: // month
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    // Get expenses for the period
    const expenses = await Expense.find({
      userId: user.userId,
      date: { $gte: startDate, $lte: now }
    }).lean();

    if (expenses.length === 0) {
      return NextResponse.json({
        message: "Start tracking your expenses to get personalized insights!",
        category: 'Other' as ExpenseCategory,
        recommendedBlogs: [],
        generatedAt: new Date(),
        type: 'tip'
      });
    }

    // Calculate analysis data
    const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    const categoryTotals = expenses.reduce((acc, expense) => {
      const category = expense.category as ExpenseCategory;
      acc[category] = (acc[category] || 0) + expense.amount;
      return acc;
    }, {} as Record<ExpenseCategory, number>);

    const days = Math.max(1, Math.ceil((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
    const averageDaily = totalSpent / days;

    const topCategories = Object.entries(categoryTotals)
      .map(([category, amount]) => ({ category: category as ExpenseCategory, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);

    const analysisData: ExpenseAnalysisData = {
      expenses: expenses as unknown as ExpenseType[], // MongoDB lean() returns plain objects
      categoryTotals,
      totalSpent,
      averageDaily,
      topCategories
    };

    // Generate AI insight with timeout and fallback
    try {
      const insight = await Promise.race([
        generateInsight(user.userId, analysisData),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('AI timeout')), 10000) // 10 second timeout
        )
      ]);
      
      return NextResponse.json(insight);
    } catch (aiError) {
      console.warn('AI insight generation failed, providing fallback:', aiError);
      
      // Provide fallback insight based on data analysis
      const fallbackInsight = {
        summary: `You spent $${totalSpent.toFixed(2)} this ${period}, averaging $${averageDaily.toFixed(2)} per day.`,
        advice: topCategories.length > 0 
          ? `Your top spending category is ${topCategories[0].category} ($${topCategories[0].amount.toFixed(2)}). Consider reviewing these expenses for potential savings.`
          : 'Great job tracking your expenses! Keep monitoring your spending to identify patterns.',
        trends: averageDaily > 50 
          ? 'Your daily spending is above average. Consider setting a daily budget to better control expenses.'
          : 'Your spending looks well-controlled. Keep up the good financial habits!'
      };
      
      return NextResponse.json(fallbackInsight);
    }
  } catch (error) {
    console.error('Error generating AI insight:', error);
    return NextResponse.json(
      { error: 'Failed to generate AI insight' },
      { status: 500 }
    );
  }
}
