import { NextRequest, NextResponse } from "next/server";

// Free alternative AI response system
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, contextData } = body;

    // Advanced pattern-based AI responses that feel like real AI
    const responses = generateAdvancedResponse(message, contextData);

    return NextResponse.json({
      message: responses.response,
      confidence: responses.confidence,
      source: "enhanced_ai",
    });
  } catch (error) {
    console.error("Enhanced chat error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}

interface ContextData {
  totalSpent: number;
  dailyAverage: number;
  topCategory: string;
  topCategoryAmount: number;
}

function generateAdvancedResponse(message: string, contextData: ContextData) {
  const lowerMessage = message.toLowerCase();

  // Advanced AI-like response patterns
  const patterns = [
    {
      keywords: ["predict", "future", "next month", "forecast"],
      responses: [
        `Based on your spending patterns, I predict you'll likely spend around ৳${(
          contextData?.totalSpent * 1.05
        ).toFixed(2)} next month if trends continue. Your ${
          contextData?.topCategory
        } spending might increase by 5-10%.`,
        `Looking at your data trends, next month you might see spending around ৳${(
          contextData?.totalSpent * 0.95
        ).toFixed(
          2
        )} if you maintain current habits. Consider setting alerts for your top categories.`,
      ],
      confidence: 0.85,
    },
    {
      keywords: ["comparison", "compare", "vs", "versus", "against"],
      responses: [
        `Compared to typical spending patterns, your ৳${contextData?.dailyAverage}/day is quite reasonable. Most people in similar situations spend 10-20% more in ${contextData?.topCategory}.`,
        `Your spending profile shows you're more conscious than average. The typical person spends ৳${(
          (contextData?.dailyAverage || 0) * 1.3
        ).toFixed(2)}/day in your category mix.`,
      ],
      confidence: 0.75,
    },
    {
      keywords: ["optimize", "improve", "better", "reduce"],
      responses: [
        `To optimize your finances, I'd focus on your ${
          contextData?.topCategory
        } spending first. A 15% reduction there could save you ৳${(
          contextData?.topCategoryAmount * 0.15
        ).toFixed(2)}/month without major lifestyle changes.`,
        `Smart optimization strategy: Your ${
          contextData?.topCategory
        } has the most potential. Try the 'conscious spending' approach - question each purchase over ৳${(
          (contextData?.dailyAverage || 0) * 2
        ).toFixed(0)} in this category.`,
      ],
      confidence: 0.9,
    },
  ];

  // Find matching pattern
  for (const pattern of patterns) {
    if (pattern.keywords.some((keyword) => lowerMessage.includes(keyword))) {
      const response =
        pattern.responses[Math.floor(Math.random() * pattern.responses.length)];
      return { response, confidence: pattern.confidence };
    }
  }

  // Fallback advanced responses
  const advancedFallbacks = [
    `Analyzing your financial behavior, I notice interesting patterns in your ${
      contextData?.topCategory
    } spending. This suggests you value ${getValueInsight(
      contextData?.topCategory
    )}. Would you like strategies to align this better with your goals?`,
    `Your spending signature shows a ${getSpendingPersonality(
      contextData
    )} pattern. This typically indicates ${getPersonalityInsight(
      contextData
    )}. Shall we explore optimizations?`,
    `From a behavioral economics perspective, your ৳${
      contextData?.dailyAverage
    }/day average suggests ${getBehavioralInsight(
      contextData
    )}. I can help you leverage this for better outcomes.`,
  ];

  return {
    response:
      advancedFallbacks[Math.floor(Math.random() * advancedFallbacks.length)],
    confidence: 0.7,
  };
}

function getValueInsight(category: string) {
  const insights = {
    "Food & Dining": "experiences and social connections",
    Transportation: "mobility and independence",
    Shopping: "comfort and self-expression",
    Entertainment: "leisure and personal enjoyment",
    Healthcare: "wellness and self-care",
  };
  return insights[category as keyof typeof insights] || "practical needs";
}

function getSpendingPersonality(contextData: ContextData) {
  const ratio =
    (contextData?.topCategoryAmount || 0) / (contextData?.totalSpent || 1);
  if (ratio > 0.4) return "focused spender";
  if (ratio > 0.25) return "balanced allocator";
  return "diversified spender";
}

function getBehavioralInsight(contextData: ContextData) {
  const daily = contextData?.dailyAverage || 0;
  if (daily > 50)
    return "you prefer quality over quantity and value convenience";
  if (daily > 25)
    return "you balance cost-consciousness with lifestyle preferences";
  return "you prioritize financial security and mindful spending";
}

function getPersonalityInsight(contextData: ContextData) {
  const daily = contextData?.dailyAverage || 0;
  if (daily > 50) return "you tend to prioritize convenience and time-saving";
  if (daily > 25) return "you seek a balance between comfort and economy";
  return "you're naturally cautious with financial decisions";
}
