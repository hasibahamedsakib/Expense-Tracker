import OpenAI from 'openai';
import { Expense, ExpenseCategory, AIInsight } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ExpenseAnalysisData {
  expenses: Expense[];
  categoryTotals: { [key in ExpenseCategory]?: number };
  totalSpent: number;
  averageDaily: number;
  topCategories: { category: ExpenseCategory; amount: number }[];
}

export async function generateInsight(
  userId: string,
  analysisData: ExpenseAnalysisData
): Promise<Omit<AIInsight, '_id'>> {
  try {
    const { categoryTotals, totalSpent, averageDaily, topCategories } = analysisData;
    
    const prompt = `
    Analyze the following expense data and provide a helpful financial insight:

    Total Spent: $${totalSpent.toFixed(2)}
    Average Daily Spending: $${averageDaily.toFixed(2)}
    
    Category Breakdown:
    ${Object.entries(categoryTotals)
      .map(([category, amount]) => `${category}: $${amount?.toFixed(2) || '0.00'}`)
      .join('\n')}
    
    Top Spending Categories:
    ${topCategories.map(cat => `${cat.category}: $${cat.amount.toFixed(2)}`).join('\n')}

    Please provide:
    1. A brief analysis of spending patterns
    2. One specific actionable tip to reduce expenses
    3. Identify if there are any concerning spending habits
    
    Keep the response concise (max 150 words) and practical.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful personal finance advisor. Provide practical, actionable advice based on spending data. Be encouraging but honest about spending habits."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const message = completion.choices[0]?.message?.content || "Unable to generate insight at this time.";
    
    // Determine the main category of concern
    const topCategory = topCategories[0]?.category || 'Other';
    
    // Determine insight type based on spending patterns
    let insightType: 'tip' | 'warning' | 'recommendation' = 'tip';
    if (totalSpent > averageDaily * 40) { // Spending significantly above average
      insightType = 'warning';
    } else if (topCategories.length > 0 && topCategories[0].amount > totalSpent * 0.4) {
      insightType = 'recommendation';
    }

    return {
      userId,
      message,
      category: topCategory,
      recommendedBlogs: [], // Will be populated by blog recommendation function
      generatedAt: new Date(),
      type: insightType
    };
  } catch (error) {
    console.error('Error generating AI insight:', error);
    return {
      userId,
      message: "I notice you've been tracking your expenses regularly. Keep it up! Consider reviewing your largest expense categories for potential savings.",
      category: 'Other' as ExpenseCategory,
      recommendedBlogs: [],
      generatedAt: new Date(),
      type: 'tip'
    };
  }
}

export async function generateBudgetRecommendation(
  category: ExpenseCategory,
  currentSpending: number,
  historicalAverage: number
): Promise<string> {
  try {
    const prompt = `
    Based on spending data for ${category}:
    - Current month spending: $${currentSpending.toFixed(2)}
    - Historical average: $${historicalAverage.toFixed(2)}
    
    Suggest a reasonable monthly budget for this category. Consider:
    1. The spending trend
    2. Whether current spending is reasonable
    3. Room for optimization
    
    Provide a brief explanation (max 100 words) and a specific budget amount.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a financial advisor providing budget recommendations. Be realistic and practical."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 150,
      temperature: 0.5,
    });

    return completion.choices[0]?.message?.content || 
           `Based on your spending pattern, I'd recommend budgeting $${Math.ceil(historicalAverage * 1.1)} for ${category}.`;
  } catch (error) {
    console.error('Error generating budget recommendation:', error);
    return `Consider setting a budget of $${Math.ceil(historicalAverage * 1.1)} for ${category} based on your historical spending.`;
  }
}

interface ChatContextData {
  totalSpent: number;
  categoryTotals: Record<string, number>;
  timeframe: string;
}

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function generateChatResponse(
  userMessage: string,
  contextData: ChatContextData,
  conversationHistory: ConversationMessage[] = []
): Promise<string> {
  if (!openai) {
    throw new Error('OpenAI client not initialized');
  }

  try {
    const { totalSpent, categoryTotals, timeframe } = contextData;
    
    // Build context about user's spending
    const spendingContext = `User's spending context:
- Total spent in last ${timeframe}: $${totalSpent.toFixed(2)}
- Top categories: ${Object.entries(categoryTotals)
  .sort(([,a], [,b]) => (b as number) - (a as number))
  .slice(0, 3)
  .map(([cat, amt]) => `${cat}: $${(amt as number).toFixed(2)}`)
  .join(', ')}
- Average daily spending: $${(totalSpent / 30).toFixed(2)}`;

    const messages = [
      {
        role: "system",
        content: `You are a helpful AI financial assistant. Provide practical, personalized advice based on the user's spending data. Keep responses concise (under 100 words) and actionable. Be encouraging and supportive.

${spendingContext}`
      }
    ];

    // Add conversation history
    conversationHistory.slice(-4).forEach(msg => {
      messages.push({
        role: msg.role,
        content: msg.content
      });
    });

    // Add current user message
    messages.push({
      role: "user",
      content: userMessage
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      max_tokens: 150,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || 
           "I'm here to help with your financial questions! Try asking about your spending patterns or budgeting tips.";
  } catch (error) {
    console.error('Error generating chat response:', error);
    throw error;
  }
}
