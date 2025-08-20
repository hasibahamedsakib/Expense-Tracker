import dbConnect from "@/lib/mongodb";
import Expense from "@/models/Expense";

const sampleExpenses = [
  {
    userId: "demo-user-123",
    amount: 25.5,
    category: "Food & Dining",
    note: "Lunch at cafe",
    date: new Date(),
  },
  {
    userId: "demo-user-123",
    amount: 12.0,
    category: "Transportation",
    note: "Bus fare",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
  },
  {
    userId: "demo-user-123",
    amount: 75.0,
    category: "Shopping",
    note: "Grocery shopping",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    userId: "demo-user-123",
    amount: 150.0,
    category: "Bills & Utilities",
    note: "Electricity bill",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
];

export async function seedData() {
  try {
    await dbConnect();

    // Clear existing demo data
    await Expense.deleteMany({ userId: "demo-user-123" });

    // Insert sample expenses
    await Expense.insertMany(sampleExpenses);

    console.log("Sample data seeded successfully!");
    return { success: true };
  } catch (error) {
    console.error("Error seeding data:", error);
    return { success: false, error };
  }
}
