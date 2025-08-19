'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, DollarSign, TrendingUp, Calendar, PieChart } from 'lucide-react';
import ExpenseForm from '@/components/expense/ExpenseForm';
import ExpenseList from '@/components/expense/ExpenseList';
import ExpenseChart from '@/components/charts/ExpenseChart';
import AIInsightsCard from '@/components/dashboard/AIInsightsCard';
import AIChat from '@/components/ai/AIChat';
import AuthForm from '@/components/auth/AuthForm';
import DashboardHeader from '@/components/auth/DashboardHeader';
import { useAuth } from '@/contexts/AuthContext';
import { Expense, ExpenseStats, AIInsight } from '@/types';

function DashboardContent() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [stats, setStats] = useState<ExpenseStats | null>(null);
  const [insights, setInsights] = useState<AIInsight | null>(null);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAIInsights = useCallback(async () => {
    if (!user) return;

    try {
      const response = await fetch('/api/ai/insights', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setInsights(data);
      } else {
        console.warn('Failed to fetch AI insights');
      }
    } catch (error) {
      console.error('Error fetching AI insights:', error);
    }
  }, [user]);

  const fetchDashboardData = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch expenses
      const expensesResponse = await fetch('/api/expenses', {
        credentials: 'include',
      });
      
      if (expensesResponse.ok) {
        const expensesData = await expensesResponse.json();
        setExpenses(expensesData);
      }

      // Fetch analytics
      const analyticsResponse = await fetch('/api/analytics?period=month', {
        credentials: 'include',
      });
      
      if (analyticsResponse.ok) {
        const analyticsData = await analyticsResponse.json();
        setStats(analyticsData);
      }

      // Fetch AI insights
      await fetchAIInsights();
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [user, fetchAIInsights]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user, fetchDashboardData]);

  const handleExpenseAdded = (newExpense: Expense) => {
    setExpenses((prev: Expense[]) => [newExpense, ...prev]);
    setShowExpenseForm(false);
    // Refresh analytics after adding expense
    fetchDashboardData();
  };

  const handleSeedData = async () => {
    try {
      const response = await fetch('/api/expenses/seed', {
        method: 'POST',
        credentials: 'include',
      });
      
      if (response.ok) {
        const result = await response.json();
        alert(`Successfully created ${result.expenses?.length || 10} sample expenses!`);
        // Refresh dashboard data
        fetchDashboardData();
      } else {
        const error = await response.json();
        alert(`Failed to seed data: ${error.error}`);
      }
    } catch (error) {
      console.error('Error seeding data:', error);
      alert('Failed to seed data. Please try again.');
    }
  };

  const handleExpenseUpdated = (updatedExpense: Expense) => {
    setExpenses((prev: Expense[]) =>
      prev.map((expense) =>
        expense._id === updatedExpense._id ? updatedExpense : expense
      )
    );
    // Refresh analytics after updating expense
    fetchDashboardData();
  };

  const handleExpenseDeleted = (deletedExpenseId: string) => {
    setExpenses((prev: Expense[]) =>
      prev.filter((expense) => expense._id !== deletedExpenseId)
    );
    // Refresh analytics after deleting expense
    fetchDashboardData();
  };

  if (loading && !expenses.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your financial dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchDashboardData}>Retry</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <DashboardHeader />
      
      <div className="max-w-7xl mx-auto p-6 pt-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
              Financial Dashboard
            </h1>
            <p className="text-gray-600">
              AI-powered financial insights for smarter spending
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button
              onClick={() => setShowExpenseForm(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Expense
            </Button>
            <Button
              onClick={fetchDashboardData}
              variant="outline"
              className="flex items-center gap-2"
            >
              Refresh Data
            </Button>
            <Button
              onClick={handleSeedData}
              variant="secondary"
              className="flex items-center gap-2"
            >
              Seed Data
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Expenses
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${stats?.totalSpent?.toFixed(2) || '0.00'}
              </div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Transactions
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {expenses.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Total transactions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Top Category
              </CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.topCategories?.[0]?.category || 'None'}
              </div>
              <p className="text-xs text-muted-foreground">
                ${stats?.topCategories?.[0]?.amount?.toFixed(2) || '0.00'} spent
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Daily Average
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${stats?.dailyAverage?.toFixed(2) || '0.00'}
              </div>
              <p className="text-xs text-muted-foreground">
                Per day this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Expenses and Charts */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="expenses" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="expenses">Recent Expenses</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="expenses" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>
                      Your latest financial activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {expenses.length > 0 ? (
                      <ExpenseList
                        expenses={expenses}
                        onExpenseUpdated={handleExpenseUpdated}
                        onExpenseDeleted={handleExpenseDeleted}
                      />
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <PieChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium mb-2">
                          No expenses yet. Add your first expense to see insights!
                        </p>
                        <Button
                          onClick={() => setShowExpenseForm(true)}
                          variant="outline"
                          className="mt-2"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Your First Expense
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Spending Analytics</CardTitle>
                    <CardDescription>
                      Visualize your spending patterns
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {expenses.length > 0 && stats ? (
                      <div className="space-y-6">
                        <ExpenseChart 
                          categoryBreakdown={stats.categoryBreakdown || []}
                          topCategories={stats.topCategories || []}
                        />
                        
                        {/* Category Breakdown */}
                        <div>
                          <h4 className="text-sm font-medium mb-3">Category Breakdown</h4>
                          <div className="space-y-2">
                            {stats.topCategories?.slice(0, 5).map((category, index) => (
                              <div key={category.category} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div 
                                    className="w-3 h-3 rounded-full"
                                    style={{ 
                                      backgroundColor: `hsl(${index * 60}, 70%, 50%)` 
                                    }}
                                  />
                                  <span className="text-sm text-gray-600">
                                    {category.category}
                                  </span>
                                </div>
                                <span className="text-sm font-medium">
                                  ${category.amount.toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium mb-2">
                          Analytics will appear once you start adding expenses
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - AI Insights and Chat */}
          <div className="space-y-6">
            {insights && <AIInsightsCard insight={insights} />}
            <AIChat />
          </div>
        </div>

        {/* Expense Form Modal */}
        {showExpenseForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <ExpenseForm
                onExpenseAdded={handleExpenseAdded}
                onClose={() => setShowExpenseForm(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              AI Expense Tracker
            </h1>
            <p className="text-gray-600">
              Track your expenses with AI-powered insights
            </p>
          </div>
          <AuthForm onLogin={() => {}} />
        </div>
      </div>
    );
  }

  return <DashboardContent />;
}
