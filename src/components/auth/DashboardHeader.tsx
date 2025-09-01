"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

interface DashboardHeaderProps {
  children?: React.ReactNode;
}

export default function DashboardHeader({ children }: DashboardHeaderProps) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="sm:flex justify-between items-center mb-6 p-4 bg-white rounded-lg shadow-sm ">
      <div className="mb-2 sm:mb-0">
        <h1 className="text-2xl font-bold text-gray-900">
          {" "}
          <span className="font-bold text-2xl mr-0.5 mb-2 sm:mb-0">৳</span>{" "}
          Expense Tracker
        </h1>
        <p className="text-gray-600">Welcome back, {user?.name}</p>
      </div>

      <div className="flex items-center gap-4 space-y-2 sm:space-y-0">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User className="h-4 w-4" />
          {user?.email}
        </div>

        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      {children}
    </div>
  );
}
