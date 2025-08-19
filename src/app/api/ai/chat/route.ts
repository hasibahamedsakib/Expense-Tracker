import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Expense from '@/models/Expense';
import { generateChatResponse } from '@/lib/openai';
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
    
    const body = await request.json();
    const { message, context = [] } = body;
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get recent expenses for context
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const recentExpenses = await Expense.find({
      userId: user.userId,
      date: { $gte: thirtyDaysAgo }
    }).lean().limit(20);

    // Calculate basic stats for context
    const totalSpent = recentExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const categoryTotals = recentExpenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    const contextData = {
      recentExpenses,
      totalSpent,
      categoryTotals,
      timeframe: '30 days'
    };

    try {
      const response = await Promise.race([
        generateChatResponse(message, contextData, context),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Chat timeout')), 8000) // 8 second timeout
        )
      ]);
      
      return NextResponse.json({ message: response });
    } catch (aiError) {
      console.warn('AI chat failed, providing fallback:', aiError);
      
      // Provide contextual fallback responses
      const lowerMessage = message.toLowerCase();
      let fallbackResponse = "I'm having trouble connecting to my AI brain right now, but I can share some quick insights!";
      
      if (lowerMessage.includes('spending') || lowerMessage.includes('expense')) {
        fallbackResponse = `Based on your recent data, you've spent $${totalSpent.toFixed(2)} in the last 30 days. Your top category is ${Object.keys(categoryTotals).sort((a, b) => categoryTotals[b] - categoryTotals[a])[0] || 'unknown'}.`;
      } else if (lowerMessage.includes('budget') || lowerMessage.includes('save')) {
        fallbackResponse = "A good rule of thumb is the 50/30/20 budget: 50% for needs, 30% for wants, and 20% for savings. Track your expenses to see how you're doing!";
      } else if (lowerMessage.includes('category') || lowerMessage.includes('categories')) {
        const topCategories = Object.entries(categoryTotals)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 3)
          .map(([cat, amt]) => `${cat}: $${amt.toFixed(2)}`)
          .join(', ');
        fallbackResponse = `Your top spending categories are: ${topCategories || 'No data available'}`;
      }
      
      return NextResponse.json({ message: fallbackResponse });
    }
  } catch (error) {
    console.error('Error in AI chat:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
