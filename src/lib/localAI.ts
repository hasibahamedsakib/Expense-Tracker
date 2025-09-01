// Advanced Local AI Financial Assistant
// Provides intelligent responses without requiring any external API credits

interface FinancialContext {
  totalSpent: number;
  dailyAverage: number;
  topCategories: Array<{ category: string; amount: number }>;
  recentExpenses: Array<{ amount: number; category: string; date: string }>;
  monthlyTrend: "increasing" | "decreasing" | "stable";
}

interface AIResponse {
  message: string;
  confidence: number;
  suggestions?: string[];
  followUp?: string;
}

export class LocalFinancialAI {
  private knowledgeBase = {
    budgetingStrategies: [
      "50/30/20 rule: 50% needs, 30% wants, 20% savings",
      "Zero-based budgeting: Every dollar has a purpose",
      "Envelope method: Allocate specific amounts for categories",
      "Pay yourself first: Save before spending",
      "Automate savings: Set up automatic transfers",
    ],

    savingTips: [
      "Track every expense for increased awareness",
      "Use the 24-hour rule for non-essential purchases",
      "Cook at home more often to reduce food costs",
      "Review subscriptions monthly and cancel unused ones",
      "Set specific savings goals with deadlines",
    ],

    spendingInsights: {
      "Food & Dining": {
        tips: [
          "Try meal planning",
          "Cook in batches",
          "Use grocery lists",
          "Compare prices",
        ],
        benchmarks: { low: 250, medium: 400, high: 600 },
      },
      Transportation: {
        tips: [
          "Use public transport",
          "Carpool when possible",
          "Combine errands",
          "Walk/bike short distances",
        ],
        benchmarks: { low: 200, medium: 350, high: 500 },
      },
      Shopping: {
        tips: [
          "Make shopping lists",
          "Compare prices online",
          "Use cashback apps",
          "Avoid impulse buying",
        ],
        benchmarks: { low: 150, medium: 300, high: 500 },
      },
      Entertainment: {
        tips: [
          "Look for free events",
          "Use streaming instead of theaters",
          "Happy hour specials",
          "Group discounts",
        ],
        benchmarks: { low: 100, medium: 200, high: 350 },
      },
    },
  };

  generateResponse(message: string, context: FinancialContext): AIResponse {
    const lowerMessage = message.toLowerCase();

    // Advanced pattern matching with contextual responses
    if (this.isGreeting(lowerMessage)) {
      return this.generateGreeting(context);
    }

    if (this.isSpendingQuery(lowerMessage)) {
      return this.generateSpendingAnalysis(context);
    }

    if (this.isBudgetQuery(lowerMessage)) {
      return this.generateBudgetAdvice(context);
    }

    if (this.isSavingQuery(lowerMessage)) {
      return this.generateSavingAdvice(context);
    }

    if (this.isCategoryQuery(lowerMessage)) {
      return this.generateCategoryAnalysis(context);
    }

    if (this.isPredictionQuery(lowerMessage)) {
      return this.generatePrediction(context);
    }

    if (this.isComparisonQuery(lowerMessage)) {
      return this.generateComparison(context);
    }

    // Advanced fallback with context awareness
    return this.generateContextualFallback(message, context);
  }

  private isGreeting(message: string): boolean {
    return /^(hi|hello|hey|good|morning|afternoon|evening|sup|yo)/.test(
      message
    );
  }

  private isSpendingQuery(message: string): boolean {
    return (
      message.includes("spend") ||
      message.includes("expense") ||
      message.includes("cost") ||
      message.includes("money")
    );
  }

  private isBudgetQuery(message: string): boolean {
    return (
      message.includes("budget") ||
      message.includes("plan") ||
      message.includes("allocate")
    );
  }

  private isSavingQuery(message: string): boolean {
    return (
      message.includes("save") ||
      message.includes("saving") ||
      message.includes("cut") ||
      message.includes("reduce")
    );
  }

  private isCategoryQuery(message: string): boolean {
    return (
      message.includes("category") ||
      message.includes("categories") ||
      message.includes("breakdown")
    );
  }

  private isPredictionQuery(message: string): boolean {
    return (
      message.includes("predict") ||
      message.includes("forecast") ||
      message.includes("next") ||
      message.includes("future")
    );
  }

  private isComparisonQuery(message: string): boolean {
    return (
      message.includes("compare") ||
      message.includes("vs") ||
      message.includes("versus") ||
      message.includes("average")
    );
  }

  private generateGreeting(context: FinancialContext): AIResponse {
    const topCat = context.topCategories[0];
    const greetings = [
      `👋 Hello! I'm your personal financial AI. You've spent  <span className="font-bold text-2xl mr-0.5">৳</span>  ${context.totalSpent.toFixed(
        2
      )} recently, averaging  <span className="font-bold text-2xl mr-0.5">৳</span>  ${context.dailyAverage.toFixed(
        2
      )}/day. Ready to optimize your finances?`,
      `Hi there! 🌟 I see your biggest expense category is ${
        topCat?.category
      } at  <span className="font-bold text-2xl mr-0.5">৳</span>  ${topCat?.amount.toFixed(
        2
      )}. Let's make your money work smarter!`,
      `Hey! 💰 Your financial snapshot shows  <span className="font-bold text-2xl mr-0.5">৳</span>  ${context.totalSpent.toFixed(
        2
      )} in recent spending. I'm here to help you make every taka count!`,
    ];

    return {
      message: greetings[Math.floor(Math.random() * greetings.length)],
      confidence: 0.95,
      followUp: "Ask me about budgeting, saving tips, or spending analysis!",
    };
  }

  private generateSpendingAnalysis(context: FinancialContext): AIResponse {
    const { totalSpent, dailyAverage, topCategories } = context;
    const topCat = topCategories[0];
    const trend = this.analyzeTrend(context);

    const analyses = [
      `📊 Your spending breakdown:  <span className="font-bold text-2xl mr-0.5">৳</span>  ${totalSpent.toFixed(
        2
      )} total,  <span className="font-bold text-2xl mr-0.5">৳</span>  ${dailyAverage.toFixed(
        2
      )}/day average. ${
        topCat?.category
      } leads at  <span className="font-bold text-2xl mr-0.5">৳</span>  ${topCat?.amount.toFixed(
        2
      )} (${((topCat?.amount / totalSpent) * 100).toFixed(
        1
      )}% of total). ${trend}`,
      `💸 Financial analysis: You're spending  <span className="font-bold text-2xl mr-0.5">৳</span>  ${dailyAverage.toFixed(
        2
      )} daily on average. ${
        topCat?.category
      } dominates your budget at  <span className="font-bold text-2xl mr-0.5">৳</span>  ${topCat?.amount.toFixed(
        2
      )}. ${this.getBenchmarkComparison(topCat?.category, topCat?.amount)}`,
      `📈 Money flow report:  <span className="font-bold text-2xl mr-0.5">৳</span>  ${totalSpent.toFixed(
        2
      )} outflow, distributed across ${topCategories.length} categories. ${
        topCat?.category
      } takes ${((topCat?.amount / totalSpent) * 100).toFixed(
        1
      )}% of your budget. ${trend}`,
    ];

    return {
      message: analyses[Math.floor(Math.random() * analyses.length)],
      confidence: 0.9,
      suggestions: this.getSpendingSuggestions(topCat?.category),
      followUp: "Want specific tips for your top spending category?",
    };
  }

  private generateBudgetAdvice(context: FinancialContext): AIResponse {
    const { totalSpent } = context;
    const strategy =
      this.knowledgeBase.budgetingStrategies[
        Math.floor(
          Math.random() * this.knowledgeBase.budgetingStrategies.length
        )
      ];

    const advice = [
      `💡 Budget strategy: ${strategy}. With your  <span className="font-bold text-2xl mr-0.5">৳</span>  ${totalSpent.toFixed(
        2
      )} monthly spending, aim for:  <span className="font-bold text-2xl mr-0.5">৳</span>  ${(
        totalSpent * 0.5
      ).toFixed(
        2
      )} needs,  <span className="font-bold text-2xl mr-0.5">৳</span>  ${(
        totalSpent * 0.3
      ).toFixed(
        2
      )} wants,  <span className="font-bold text-2xl mr-0.5">৳</span>  ${(
        totalSpent * 0.2
      ).toFixed(2)} savings.`,
      `🎯 Smart budgeting: ${strategy}. Your current  <span className="font-bold text-2xl mr-0.5">৳</span>  ${totalSpent.toFixed(
        2
      )} spending suggests a weekly budget of  <span className="font-bold text-2xl mr-0.5">৳</span>  ${(
        totalSpent / 4.3
      ).toFixed(2)} works well.`,
      `📋 Budget recommendation: ${strategy}. Consider tracking weekly: you're at  <span className="font-bold text-2xl mr-0.5">৳</span>  ${(
        totalSpent / 4.3
      ).toFixed(2)}/week currently.`,
    ];

    return {
      message: advice[Math.floor(Math.random() * advice.length)],
      confidence: 0.85,
      suggestions: [
        "Set up automatic savings",
        "Use budgeting apps",
        "Review monthly",
        "Track daily expenses",
      ],
      followUp: "Need help setting up specific budget categories?",
    };
  }

  private generateSavingAdvice(context: FinancialContext): AIResponse {
    const { totalSpent, topCategories } = context;
    const topCat = topCategories[0];
    const savingTip =
      this.knowledgeBase.savingTips[
        Math.floor(Math.random() * this.knowledgeBase.savingTips.length)
      ];

    const potentialSavings = topCat
      ? (topCat.amount * 0.15).toFixed(2)
      : (totalSpent * 0.1).toFixed(2);

    const advice = [
      `💰 Saving opportunity: ${savingTip}. Focus on ${topCat?.category} - a 15% reduction saves  <span className="font-bold text-2xl mr-0.5">৳</span>  ${potentialSavings}/month!`,
      `🌟 Smart saving: ${savingTip}. Your ${topCat?.category} spending has the most potential - try cutting 10-20% there.`,
      `⚡ Quick win: ${savingTip}. Target your biggest category (${topCat?.category}) for maximum impact - even  <span className="font-bold text-2xl mr-0.5">৳</span>  ${potentialSavings}/month adds up!`,
    ];

    return {
      message: advice[Math.floor(Math.random() * advice.length)],
      confidence: 0.88,
      suggestions: this.getSavingSuggestions(topCat?.category),
      followUp: "Want specific strategies for your biggest expense category?",
    };
  }

  private generateCategoryAnalysis(context: FinancialContext): AIResponse {
    const { topCategories, totalSpent } = context;
    const breakdown = topCategories
      .slice(0, 3)
      .map(
        (cat) =>
          `${
            cat.category
          }:  <span className="font-bold text-2xl mr-0.5">৳</span>  ${cat.amount.toFixed(
            2
          )} (${((cat.amount / totalSpent) * 100).toFixed(1)}%)`
      )
      .join(", ");

    return {
      message: `📈 Category breakdown: ${breakdown}. ${this.getCategoryInsight(
        topCategories[0]
      )}`,
      confidence: 0.92,
      suggestions: this.getCategoryOptimizationTips(topCategories[0]?.category),
      followUp: "Which category would you like to optimize first?",
    };
  }

  private generatePrediction(context: FinancialContext): AIResponse {
    const { totalSpent, monthlyTrend } = context;
    const trendMultiplier =
      monthlyTrend === "increasing"
        ? 1.1
        : monthlyTrend === "decreasing"
        ? 0.9
        : 1.0;
    const predicted = (totalSpent * trendMultiplier).toFixed(2);

    return {
      message: `🔮 Prediction: Based on your ${monthlyTrend} spending trend, next month you'll likely spend around  <span className="font-bold text-2xl mr-0.5">৳</span>  ${predicted}. Your current pattern suggests ${this.getTrendAdvice(
        monthlyTrend
      )}.`,
      confidence: 0.75,
      suggestions: [
        "Monitor weekly totals",
        "Set spending alerts",
        "Plan for variations",
      ],
      followUp: "Want tips to influence this prediction positively?",
    };
  }

  private generateComparison(context: FinancialContext): AIResponse {
    const { dailyAverage, topCategories } = context;
    const topCat = topCategories[0];
    const benchmark = this.getBenchmark(topCat?.category, topCat?.amount);

    return {
      message: `📊 Comparison: Your  <span className="font-bold text-2xl mr-0.5">৳</span>  ${dailyAverage.toFixed(
        2
      )}/day spending is ${benchmark}. ${
        topCat?.category
      } at  <span className="font-bold text-2xl mr-0.5">৳</span>  ${topCat?.amount.toFixed(
        2
      )} is ${this.getBenchmarkStatus(
        topCat?.category,
        topCat?.amount
      )} compared to typical ranges.`,
      confidence: 0.8,
      followUp: "Want specific recommendations based on these comparisons?",
    };
  }

  private generateContextualFallback(
    message: string,
    context: FinancialContext
  ): AIResponse {
    const insights = [
      `🤔 I understand you're asking about finances. With your  <span className="font-bold text-2xl mr-0.5">৳</span>  ${context.totalSpent.toFixed(
        2
      )} spending pattern, I can help with budgeting, saving strategies, or category optimization.`,
      `💭 Interesting question! Your ${
        context.topCategories[0]?.category
      } spending ( <span className="font-bold text-2xl mr-0.5">৳</span>  ${context.topCategories[0]?.amount.toFixed(
        2
      )}) stands out. Want to explore that or ask about something else?`,
      `✨ Good point! Your  <span className="font-bold text-2xl mr-0.5">৳</span>  ${context.dailyAverage.toFixed(
        2
      )}/day average suggests room for optimization. What aspect interests you most?`,
    ];

    return {
      message: insights[Math.floor(Math.random() * insights.length)],
      confidence: 0.7,
      suggestions: [
        "Ask about budgeting",
        "Explore saving tips",
        "Analyze categories",
        "Get predictions",
      ],
      followUp: "I'm here to help with any financial questions!",
    };
  }

  // Helper methods
  private analyzeTrend(context: FinancialContext): string {
    switch (context.monthlyTrend) {
      case "increasing":
        return "📈 Spending is trending upward - consider setting limits.";
      case "decreasing":
        return "📉 Great job reducing expenses - keep it up!";
      default:
        return "📊 Spending is stable - good consistency.";
    }
  }

  private getBenchmarkComparison(category: string, amount: number): string {
    const benchmarks =
      this.knowledgeBase.spendingInsights[
        category as keyof typeof this.knowledgeBase.spendingInsights
      ]?.benchmarks;
    if (!benchmarks) return "This category varies widely by lifestyle.";

    if (amount <= benchmarks.low)
      return "You're doing great - below average spending!";
    if (amount <= benchmarks.medium)
      return "You're in the typical range for this category.";
    return "This is above average - consider optimizing here.";
  }

  private getBenchmark(category: string, amount: number): string {
    const benchmarks =
      this.knowledgeBase.spendingInsights[
        category as keyof typeof this.knowledgeBase.spendingInsights
      ]?.benchmarks;
    if (!benchmarks) return "within normal ranges";

    if (amount <= benchmarks.low) return "below average (great job!)";
    if (amount <= benchmarks.medium) return "typical for most people";
    return "above average (room for optimization)";
  }

  private getBenchmarkStatus(category: string, amount: number): string {
    const benchmarks =
      this.knowledgeBase.spendingInsights[
        category as keyof typeof this.knowledgeBase.spendingInsights
      ]?.benchmarks;
    if (!benchmarks) return "in normal range";

    if (amount <= benchmarks.low) return "excellently managed";
    if (amount <= benchmarks.medium) return "reasonably controlled";
    return "higher than typical";
  }

  private getSpendingSuggestions(category: string): string[] {
    return (
      this.knowledgeBase.spendingInsights[
        category as keyof typeof this.knowledgeBase.spendingInsights
      ]?.tips || [
        "Track expenses",
        "Set limits",
        "Compare alternatives",
        "Review regularly",
      ]
    );
  }

  private getSavingSuggestions(category: string): string[] {
    const base = this.getSpendingSuggestions(category);
    return [
      ...base,
      "Try 10% reduction",
      "Use cashback apps",
      "Compare prices",
    ];
  }

  private getCategoryOptimizationTips(category: string): string[] {
    const tips = this.getSpendingSuggestions(category);
    return [
      ...tips,
      "Set category budgets",
      "Track weekly",
      "Find alternatives",
    ];
  }

  private getCategoryInsight(topCat: {
    category: string;
    amount: number;
  }): string {
    const insights = {
      "Food & Dining": `Food spending suggests you value convenience or dining experiences.`,
      Transportation: `Transport costs indicate mobility priorities - consider alternatives.`,
      Shopping: `Shopping patterns show lifestyle preferences - review necessity vs wants.`,
      Entertainment: `Entertainment spending reflects work-life balance priorities.`,
    };

    return (
      insights[topCat.category as keyof typeof insights] ||
      "This category reflects your lifestyle priorities."
    );
  }

  private getTrendAdvice(trend: string): string {
    switch (trend) {
      case "increasing":
        return "consider setting weekly spending limits to manage growth";
      case "decreasing":
        return "you're successfully reducing expenses - maintain this momentum";
      default:
        return "consistency is good - now focus on optimization";
    }
  }
}

export const localAI = new LocalFinancialAI();
