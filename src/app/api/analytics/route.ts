import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Expense from "@/models/Expense";
import { ExpenseStats, ExpenseCategory } from "@/types";
import { getAuthUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Get user from authentication token
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "month"; // day, week, month, year

    const now = new Date();
    let startDate: Date;

    switch (period) {
      case "day":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case "week":
        const dayOfWeek = now.getDay();
        startDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - dayOfWeek
        );
        break;
      case "year":
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default: // month
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    // Aggregate expenses for the period
    const expenses = await Expense.find({
      userId: user.userId,
      date: { $gte: startDate, $lte: now },
    }).lean();

    // Calculate total spent
    const totalSpent = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    // Calculate category breakdown
    const categoryTotals = expenses.reduce((acc, expense) => {
      const category = expense.category as ExpenseCategory;
      acc[category] = (acc[category] || 0) + expense.amount;
      return acc;
    }, {} as Record<ExpenseCategory, number>);

    const categoryBreakdown = Object.entries(categoryTotals).map(
      ([category, amount]) => ({
        category: category as ExpenseCategory,
        amount,
        percentage: totalSpent > 0 ? (amount / totalSpent) * 100 : 0,
      })
    );

    // Calculate averages
    const days = Math.max(
      1,
      Math.ceil((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    );
    const dailyAverage = totalSpent / days;
    const weeklyAverage = dailyAverage * 7;

    // Get top categories
    const topCategories = categoryBreakdown
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5)
      .map(({ category, amount }) => ({ category, amount }));

    // Monthly total (for current month)
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthExpenses = await Expense.find({
      userId: user.userId,
      date: { $gte: monthStart, $lte: now },
    }).lean();
    const monthlyTotal = monthExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    const stats: ExpenseStats = {
      totalSpent,
      categoryBreakdown,
      dailyAverage,
      weeklyAverage,
      monthlyTotal,
      topCategories,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error generating analytics:", error);
    return NextResponse.json(
      { error: "Failed to generate analytics" },
      { status: 500 }
    );
  }
}
