export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Expense {
  _id?: string;
  userId: string;
  amount: number;
  category: ExpenseCategory;
  note?: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Blog {
  _id?: string;
  title: string;
  category: ExpenseCategory;
  content: string;
  tags: string[];
  url?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Budget {
  _id?: string;
  userId: string;
  category: ExpenseCategory;
  monthlyLimit: number;
  currentSpent: number;
  month: number;
  year: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AIInsight {
  _id?: string;
  userId: string;
  message: string;
  category: ExpenseCategory;
  recommendedBlogs: string[];
  generatedAt: Date;
  type: "tip" | "warning" | "recommendation";
}

export type ExpenseCategory =
  | "Food & Dining"
  | "Transportation"
  | "Shopping"
  | "Entertainment"
  | "Bills & Utilities"
  | "Healthcare"
  | "Education"
  | "Travel"
  | "Groceries"
  | "Personal Care"
  | "Other";

export interface ExpenseStats {
  totalSpent: number;
  categoryBreakdown: {
    category: ExpenseCategory;
    amount: number;
    percentage: number;
  }[];
  dailyAverage: number;
  weeklyAverage: number;
  monthlyTotal: number;
  topCategories: { category: ExpenseCategory; amount: number }[];
}

export interface DashboardData {
  todayExpenses: Expense[];
  weekExpenses: Expense[];
  monthExpenses: Expense[];
  yearExpenses: Expense[];
  stats: ExpenseStats;
  budgetStatus: Budget[];
  aiInsights: AIInsight[];
}
