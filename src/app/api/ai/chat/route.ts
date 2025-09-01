import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Expense from "@/models/Expense";
import { localAI } from "@/lib/localAI";
import { getAuthUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    // Get user from authentication token
    const user = getAuthUser(request);
    if (!user) {
      console.log("AI Chat: No user authentication");
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { message } = body;

    console.log("AI Chat request:", {
      userId: user.userId,
      message: message.substring(0, 50) + "...",
    });

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Get recent expenses for context
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const recentExpenses = await Expense.find({
      userId: user.userId,
      date: { $gte: thirtyDaysAgo },
    })
      .lean()
      .limit(20);

    // Calculate basic stats for context
    const totalSpent = recentExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    const categoryTotals = recentExpenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    // Use Local AI (no API costs, always available)
    try {
      console.log("Using Local AI for chat response...");

      // Prepare context for local AI
      const topCategoriesArray = Object.entries(categoryTotals)
        .sort(([, a], [, b]) => (b as number) - (a as number))
        .slice(0, 5)
        .map(([category, amount]) => ({ category, amount: amount as number }));

      const financialContext = {
        totalSpent,
        dailyAverage: totalSpent / 30,
        topCategories: topCategoriesArray,
        recentExpenses: recentExpenses.map((exp) => ({
          amount: exp.amount,
          category: exp.category,
          date: exp.date.toISOString(),
        })),
        monthlyTrend: "stable" as const,
      };

      const aiResponse = localAI.generateResponse(message, financialContext);
      console.log(
        "Local AI response generated with confidence:",
        aiResponse.confidence
      );

      return NextResponse.json({
        message: aiResponse.message,
        suggestions: aiResponse.suggestions,
        followUp: aiResponse.followUp,
        confidence: aiResponse.confidence,
        source: "local_ai",
      });
    } catch (localAIError) {
      console.error("Local AI failed, using enhanced fallback:", localAIError);

      // Enhanced smart fallback responses
      const lowerMessage = message.toLowerCase();
      const avgDaily = (totalSpent / 30).toFixed(2);
      const topCat = Object.keys(categoryTotals).sort(
        (a, b) => categoryTotals[b] - categoryTotals[a]
      )[0];
      const topCatAmount = categoryTotals[topCat]?.toFixed(2) || "0";

      let smartResponse =
        "I'm your financial assistant! Let me help you with your money questions. 💰";

      // Greeting responses
      if (
        lowerMessage.match(/^(hi|hello|hey|sup|good|morning|afternoon|evening)/)
      ) {
        const greetings = [
          `👋 Hi there! I'm your AI financial advisor. You've spent  <span className="font-bold text-2xl mr-0.5">৳</span>  ${totalSpent.toFixed(
            2
          )} in the last 30 days. What would you like to know?`,
          `Hello! 🌟 I'm here to help with your finances. Your top spending category is ${
            topCat || "unknown"
          } ( <span className="font-bold text-2xl mr-0.5">৳</span>  ${topCatAmount}). What's on your mind?`,
          `Hey! 💫 Ready to dive into your finances? You're averaging  <span className="font-bold text-2xl mr-0.5">৳</span>  ${avgDaily}/day in spending. How can I help?`,
        ];
        smartResponse = greetings[Math.floor(Math.random() * greetings.length)];
      }
      // Spending analysis
      else if (
        lowerMessage.includes("spending") ||
        lowerMessage.includes("expense") ||
        lowerMessage.includes("spent") ||
        lowerMessage.includes("money")
      ) {
        const spendingInsights = [
          `📊 Your spending snapshot:  <span className="font-bold text-2xl mr-0.5">৳</span>  ${totalSpent.toFixed(
            2
          )} total (last 30 days), averaging  <span className="font-bold text-2xl mr-0.5">৳</span>  ${avgDaily}/day. ${topCat} is your biggest category at  <span className="font-bold text-2xl mr-0.5">৳</span>  ${topCatAmount}.`,
          `💸 You've spent  <span className="font-bold text-2xl mr-0.5">৳</span>  ${totalSpent.toFixed(
            2
          )} recently. That's about  <span className="font-bold text-2xl mr-0.5">৳</span>  ${avgDaily} per day. Your main expense? ${topCat} at  <span className="font-bold text-2xl mr-0.5">৳</span>  ${topCatAmount}. Not bad!`,
          `📈 Here's the breakdown:  <span className="font-bold text-2xl mr-0.5">৳</span>  ${totalSpent.toFixed(
            2
          )} total spending,  <span className="font-bold text-2xl mr-0.5">৳</span>  ${avgDaily}/day average. ${topCat} leads at  <span className="font-bold text-2xl mr-0.5">৳</span>  ${topCatAmount}. Want to optimize any category?`,
        ];
        smartResponse =
          spendingInsights[Math.floor(Math.random() * spendingInsights.length)];
      }
      // Budget and savings advice
      else if (
        lowerMessage.includes("budget") ||
        lowerMessage.includes("save") ||
        lowerMessage.includes("saving")
      ) {
        const budgetTips = [
          `💡 Budget tip: Try the 50/30/20 rule with your  <span className="font-bold text-2xl mr-0.5">৳</span>  ${totalSpent.toFixed(
            2
          )} monthly spending. Aim to save  <span className="font-bold text-2xl mr-0.5">৳</span>  ${(
            totalSpent * 0.2
          ).toFixed(2)} per month!`,
          `🎯 Smart saving: With  <span className="font-bold text-2xl mr-0.5">৳</span>  ${avgDaily}/day spending, try setting a daily limit of  <span className="font-bold text-2xl mr-0.5">৳</span>  ${(
            parseFloat(avgDaily) * 0.9
          ).toFixed(2)} to save 10% automatically!`,
          `💰 Budget strategy: Your current  <span className="font-bold text-2xl mr-0.5">৳</span>  ${totalSpent.toFixed(
            2
          )}/month could include  <span className="font-bold text-2xl mr-0.5">৳</span>  ${(
            totalSpent * 0.2
          ).toFixed(2)} for savings. Start small, think big!`,
        ];
        smartResponse =
          budgetTips[Math.floor(Math.random() * budgetTips.length)];
      }
      // Fallback with personality
      else {
        const fallbacks = [
          `🤔 Interesting! Based on your  <span className="font-bold text-2xl mr-0.5">৳</span>  ${totalSpent.toFixed(
            2
          )} spending pattern, I can help with budgets, category analysis, or saving tips. What's your main concern?`,
          `💭 I see you're thinking about finances! Your ${topCat} spending ( <span className="font-bold text-2xl mr-0.5">৳</span>  ${topCatAmount}) caught my eye. Want to explore that or something else?`,
          `✨ Good question! With your  <span className="font-bold text-2xl mr-0.5">৳</span>  ${avgDaily}/day spending average, there's always room to optimize. What aspect of your finances interests you most?`,
        ];
        smartResponse = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      }

      return NextResponse.json({
        message: smartResponse,
        source: "fallback",
      });
    }
  } catch (error) {
    console.error("Error in AI chat:", error);
    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}
