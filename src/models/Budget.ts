import mongoose from "mongoose";
import { Budget } from "@/types";

const BudgetSchema = new mongoose.Schema<Budget>(
  {
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Food & Dining",
        "Transportation",
        "Shopping",
        "Entertainment",
        "Bills & Utilities",
        "Healthcare",
        "Education",
        "Travel",
        "Groceries",
        "Personal Care",
        "Other",
      ],
    },
    monthlyLimit: {
      type: Number,
      required: true,
      min: 0,
    },
    currentSpent: {
      type: Number,
      default: 0,
      min: 0,
    },
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    year: {
      type: Number,
      required: true,
      min: 2020,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for unique budget per user/category/month/year
BudgetSchema.index(
  { userId: 1, category: 1, month: 1, year: 1 },
  { unique: true }
);

export default mongoose.models.Budget ||
  mongoose.model<Budget>("Budget", BudgetSchema);
