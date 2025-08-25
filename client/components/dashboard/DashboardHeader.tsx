import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PiggyBank,
  Plus,
  Download,
  Calendar
} from "lucide-react";
import { ExpenseAnalytics } from "@shared/types";

interface DashboardHeaderProps {
  analytics: ExpenseAnalytics;
  onAddExpense: () => void;
  onExport: () => void;
}

export function DashboardHeader({ analytics, onAddExpense, onExport }: DashboardHeaderProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const isPositiveBalance = analytics.netBalance >= 0;

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-2xl p-8 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome to ExpenseTracker Pro
              </h1>
              <p className="text-blue-100 text-lg">
                The most powerful free expense management platform
              </p>
              <Badge className="mt-3 bg-green-500/20 text-green-100 border-green-400/50">
                100% Free • No Subscriptions • Open Source
              </Badge>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={onAddExpense}
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
              >
                <Plus className="mr-2 h-5 w-5" />
                Add Expense
              </Button>
              <Button 
                onClick={onExport}
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Download className="mr-2 h-5 w-5" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Income</p>
                <p className="text-2xl font-bold text-green-700">
                  {formatCurrency(analytics.totalIncome)}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">Income</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-rose-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-red-700">
                  {formatCurrency(analytics.totalExpenses)}
                </p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-red-600 font-medium">Expenses</span>
            </div>
          </CardContent>
        </Card>

        <Card className={`border-0 shadow-lg bg-gradient-to-br ${
          isPositiveBalance 
            ? 'from-blue-50 to-indigo-50' 
            : 'from-orange-50 to-amber-50'
        }`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Balance</p>
                <p className={`text-2xl font-bold ${
                  isPositiveBalance ? 'text-blue-700' : 'text-orange-700'
                }`}>
                  {formatCurrency(analytics.netBalance)}
                </p>
              </div>
              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                isPositiveBalance ? 'bg-blue-100' : 'bg-orange-100'
              }`}>
                <DollarSign className={`h-6 w-6 ${
                  isPositiveBalance ? 'text-blue-600' : 'text-orange-600'
                }`} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              {isPositiveBalance ? (
                <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-orange-500 mr-1" />
              )}
              <span className={`font-medium ${
                isPositiveBalance ? 'text-blue-600' : 'text-orange-600'
              }`}>
                {isPositiveBalance ? 'Surplus' : 'Deficit'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-violet-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Savings Rate</p>
                <p className="text-2xl font-bold text-purple-700">
                  {analytics.savingsRate.toFixed(1)}%
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <PiggyBank className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <PiggyBank className="h-4 w-4 text-purple-500 mr-1" />
              <span className="text-purple-600 font-medium">Savings</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
