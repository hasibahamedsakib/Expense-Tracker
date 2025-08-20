import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Expense from "@/models/Expense";
import { getAuthUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
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

    // Clear existing expenses for this user
    await Expense.deleteMany({ userId: user.userId });

    // Sample expenses data
    const sampleExpenses = [
      {
        userId: user.userId,
        amount: 25.5,
        category: "Food & Dining",
        note: "Lunch at cafe",
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      },
      {
        userId: user.userId,
        amount: 8.99,
        category: "Transportation",
        note: "Bus fare",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
      {
        userId: user.userId,
        amount: 67.3,
        category: "Groceries",
        note: "Weekly grocery shopping",
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      },
      {
        userId: user.userId,
        amount: 15.0,
        category: "Entertainment",
        note: "Movie ticket",
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      },
      {
        userId: user.userId,
        amount: 120.0,
        category: "Bills & Utilities",
        note: "Internet bill",
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      },
      {
        userId: user.userId,
        amount: 45.99,
        category: "Shopping",
        note: "New shirt",
        date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
      },
      {
        userId: user.userId,
        amount: 12.75,
        category: "Food & Dining",
        note: "Coffee and pastry",
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      },
      {
        userId: user.userId,
        amount: 35.0,
        category: "Healthcare",
        note: "Pharmacy",
        date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
      },
      {
        userId: user.userId,
        amount: 89.99,
        category: "Shopping",
        note: "Headphones",
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      },
      {
        userId: user.userId,
        amount: 22.5,
        category: "Food & Dining",
        note: "Dinner delivery",
        date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12 days ago
      },
    ];

    // Insert sample expenses
    const createdExpenses = await Expense.insertMany(sampleExpenses);

    return NextResponse.json(
      {
        message: `Successfully created ${createdExpenses.length} sample expenses`,
        expenses: createdExpenses,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error seeding expenses:", error);
    return NextResponse.json(
      { error: "Failed to seed expenses" },
      { status: 500 }
    );
  }
}
