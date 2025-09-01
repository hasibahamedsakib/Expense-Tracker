"use client";

import { useState } from "react";
import { Expense } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit2, Trash2, Calendar, DollarSign } from "lucide-react";
import { format } from "date-fns";
import ExpenseForm from "./ExpenseForm";

interface ExpenseListProps {
  expenses: Expense[];
  onExpenseUpdated: (expense: Expense) => void;
  onExpenseDeleted: (id: string) => void;
}

export default function ExpenseList({
  expenses,
  onExpenseUpdated,
  onExpenseDeleted,
}: ExpenseListProps) {
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const handleDelete = async (expense: Expense) => {
    if (!expense._id) return;

    try {
      const response = await fetch(`/api/expenses/${expense._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onExpenseDeleted(expense._id);
      } else {
        alert("Failed to delete expense");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      alert("Failed to delete expense");
    }
  };

  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      "Food & Dining": "bg-orange-100 text-orange-800",
      Transportation: "bg-blue-100 text-blue-800",
      Shopping: "bg-purple-100 text-purple-800",
      Entertainment: "bg-pink-100 text-pink-800",
      "Bills & Utilities": "bg-red-100 text-red-800",
      Healthcare: "bg-green-100 text-green-800",
      Education: "bg-indigo-100 text-indigo-800",
      Travel: "bg-teal-100 text-teal-800",
      Groceries: "bg-lime-100 text-lime-800",
      "Personal Care": "bg-cyan-100 text-cyan-800",
      Other: "bg-gray-100 text-gray-800",
    };
    return colors[category] || colors["Other"];
  };

  if (expenses.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Calendar className="mx-auto h-8 w-8 mb-2" />
        <p>No expenses recorded yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {expenses.map((expense) => (
        <div
          key={expense._id}
          className="flex items-center justify-between p-3 border rounded-lg bg-white hover:bg-gray-50 transition-colors"
        >
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-gray-900 flex items-center">
                {/* <DollarSign className="h-4 w-4 mr-1" />$ */}
                <span className="font-bold text-2xl mr-0.5">
                  {" "}
                  <span className="font-bold text-2xl mr-0.5">৳</span>{" "}
                </span>
                {expense.amount.toFixed(2)}
              </span>
              <Badge className={getCategoryColor(expense.category)}>
                {expense.category}
              </Badge>
            </div>

            <div className="text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {format(new Date(expense.date), "MMM dd, yyyy")}
              </div>
              {expense.note && (
                <p className="mt-1 text-xs text-gray-500 truncate">
                  {expense.note}
                </p>
              )}
            </div>
          </div>

          <div className="flex space-x-1 ml-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditingExpense(expense)}
              className="text-blue-600 hover:text-blue-800"
            >
              <Edit2 className="h-3 w-3" />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Expense</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this $
                    {expense.amount.toFixed(2)} expense? This action cannot be
                    undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(expense)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ))}

      {editingExpense && (
        <ExpenseForm
          expense={editingExpense}
          onExpenseAdded={() => {}} // Not used for editing
          onExpenseUpdated={onExpenseUpdated}
          onClose={() => setEditingExpense(null)}
        />
      )}
    </div>
  );
}
