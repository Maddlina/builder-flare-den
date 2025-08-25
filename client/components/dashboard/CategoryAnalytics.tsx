import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PieChart, TrendingUp, AlertTriangle } from "lucide-react";
import { ExpenseAnalytics } from "@shared/types";

interface CategoryAnalyticsProps {
  analytics: ExpenseAnalytics;
}

export function CategoryAnalytics({ analytics }: CategoryAnalyticsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const maxAmount = Math.max(...analytics.topCategories.map(c => c.amount));

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <PieChart className="h-5 w-5" />
          Spending by Category
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {analytics.topCategories.length === 0 ? (
          <div className="text-center py-8">
            <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No spending data</h3>
            <p className="text-gray-500">Start adding expenses to see your spending breakdown</p>
          </div>
        ) : (
          <>
            {/* Overview Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-600 mb-1">Daily Average</p>
                <p className="text-xl font-bold text-blue-700">
                  {formatCurrency(analytics.averageDaily)}
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-600 mb-1">Top Category</p>
                <p className="text-xl font-bold text-purple-700">
                  {analytics.topCategories[0]?.category.icon} {analytics.topCategories[0]?.category.name}
                </p>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Top Spending Categories
              </h4>
              
              {analytics.topCategories.map((category, index) => {
                const progressValue = (category.amount / maxAmount) * 100;
                const hasHighSpending = category.percentage > 25;
                
                return (
                  <div key={category.category.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{category.category.icon}</span>
                          <span className="font-medium text-gray-900">
                            {category.category.name}
                          </span>
                        </div>
                        
                        {hasHighSpending && (
                          <Badge variant="destructive" className="text-xs">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            High Spending
                          </Badge>
                        )}
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {formatCurrency(category.amount)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {category.percentage.toFixed(1)}% of total
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <Progress 
                        value={progressValue} 
                        className="h-2"
                        style={{
                          '--progress-background': category.category.color,
                        } as React.CSSProperties}
                      />
                      
                      {category.category.budget && category.category.budget > 0 && (
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Budget: {formatCurrency(category.category.budget)}</span>
                          <span className={
                            category.amount > category.category.budget 
                              ? 'text-red-600 font-medium' 
                              : 'text-green-600'
                          }>
                            {category.amount > category.category.budget ? 'Over' : 'Under'} by{' '}
                            {formatCurrency(Math.abs(category.amount - category.category.budget))}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Insights */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
              <h5 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Quick Insights
              </h5>
              <ul className="space-y-1 text-sm text-amber-700">
                {analytics.savingsRate > 20 && (
                  <li>🎉 Great job! You're saving over 20% of your income</li>
                )}
                {analytics.savingsRate < 0 && (
                  <li>⚠️ You're spending more than you earn this period</li>
                )}
                {analytics.topCategories[0]?.percentage > 30 && (
                  <li>📊 Consider reducing spending in {analytics.topCategories[0].category.name}</li>
                )}
                {analytics.topCategories.length < 3 && (
                  <li>💡 Track more categories to get better insights</li>
                )}
                <li>📈 Track daily to improve your financial habits</li>
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
