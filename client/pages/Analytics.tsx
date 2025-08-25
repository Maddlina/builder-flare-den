import { useState, useEffect } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { expenseStore } from '@/lib/expense-store';
import { ExpenseAnalytics } from '@shared/types';
import { 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  BarChart3, 
  Calendar,
  DollarSign,
  Target,
  Zap,
  Clock,
  ArrowUp,
  ArrowDown,
  Sparkles
} from 'lucide-react';

export default function Analytics() {
  const [analytics, setAnalytics] = useState<ExpenseAnalytics>({
    totalIncome: 0,
    totalExpenses: 0,
    netBalance: 0,
    topCategories: [],
    monthlyTrend: [],
    averageDaily: 0,
    savingsRate: 0,
  });
  const [timeRange, setTimeRange] = useState('month');

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = () => {
    const analyticsData = expenseStore.getAnalytics(timeRange as 'week' | 'month' | 'year');
    setAnalytics(analyticsData);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const insights = [
    {
      title: 'Spending Efficiency',
      value: analytics.savingsRate > 0 ? 'Excellent' : 'Needs Improvement',
      description: `You're ${analytics.savingsRate > 0 ? 'saving' : 'overspending by'} ${Math.abs(analytics.savingsRate).toFixed(1)}%`,
      icon: analytics.savingsRate > 0 ? TrendingUp : TrendingDown,
      color: analytics.savingsRate > 0 ? 'text-green-600' : 'text-red-600',
      bgColor: analytics.savingsRate > 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20',
    },
    {
      title: 'Top Spending Day',
      value: 'Thursday',
      description: 'Your highest spending day of the week',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Budget Status',
      value: '3 of 5 on track',
      description: '2 budgets need attention this month',
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
    {
      title: 'Transaction Frequency',
      value: 'Daily',
      description: 'You typically spend 2.3 times per day',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
  ];

  const quickStats = [
    {
      title: 'Total Income',
      value: formatCurrency(analytics.totalIncome),
      change: '+12.5%',
      trend: 'up' as const,
      icon: ArrowUp,
      color: 'text-green-600',
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(analytics.totalExpenses),
      change: '-5.2%',
      trend: 'down' as const,
      icon: ArrowDown,
      color: 'text-green-600',
    },
    {
      title: 'Net Balance',
      value: formatCurrency(analytics.netBalance),
      change: analytics.netBalance >= 0 ? '+18.7%' : '-8.3%',
      trend: analytics.netBalance >= 0 ? 'up' as const : 'down' as const,
      icon: analytics.netBalance >= 0 ? ArrowUp : ArrowDown,
      color: analytics.netBalance >= 0 ? 'text-green-600' : 'text-red-600',
    },
    {
      title: 'Daily Average',
      value: formatCurrency(analytics.averageDaily),
      change: '+3.1%',
      trend: 'up' as const,
      icon: ArrowUp,
      color: 'text-blue-600',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-slide-up">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                Advanced Analytics
              </h1>
              <p className="text-muted-foreground mt-1">
                Deep insights into your financial patterns and trends
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Last 7 days</SelectItem>
                  <SelectItem value="month">Last 30 days</SelectItem>
                  <SelectItem value="year">Last 12 months</SelectItem>
                </SelectContent>
              </Select>
              
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                <Sparkles className="h-4 w-4 mr-2" />
                AI Insights
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {quickStats.map((stat, index) => (
              <Card key={stat.title} className="glass-card border-0 shadow-premium hover:scale-105 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      stat.trend === 'up' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'
                    }`}>
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${stat.color} ${
                          stat.trend === 'up' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'
                        }`}
                      >
                        {stat.change}
                      </Badge>
                      <span className="text-xs text-muted-foreground">vs last period</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Analytics Tabs */}
          <Tabs defaultValue="overview" className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-4 bg-muted/50 backdrop-blur-sm">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="trends" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Trends
              </TabsTrigger>
              <TabsTrigger value="categories" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Categories
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                AI Insights
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Spending Breakdown */}
                <Card className="glass-card border-0 shadow-premium">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5" />
                      Spending Breakdown
                    </CardTitle>
                    <CardDescription>Your expenses by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analytics.topCategories.slice(0, 5).map((category, index) => (
                        <div key={category.category.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: category.category.color }}
                            />
                            <span className="font-medium">{category.category.icon} {category.category.name}</span>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{formatCurrency(category.amount)}</p>
                            <p className="text-xs text-muted-foreground">{category.percentage.toFixed(1)}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Monthly Comparison */}
                <Card className="glass-card border-0 shadow-premium">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Monthly Comparison
                    </CardTitle>
                    <CardDescription>Income vs Expenses over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Mock chart data - in real app, use recharts */}
                      <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl flex items-center justify-center">
                        <div className="text-center">
                          <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Interactive charts coming soon</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6 mt-6">
              <Card className="glass-card border-0 shadow-premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Spending Trends
                  </CardTitle>
                  <CardDescription>Analyze your spending patterns over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Advanced Trend Analysis</h3>
                      <p className="text-sm text-muted-foreground max-w-md">
                        Interactive trend charts with predictive analytics and spending forecasts are coming soon.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categories" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {analytics.topCategories.map((category, index) => (
                  <Card key={category.category.id} className="glass-card border-0 shadow-premium hover:scale-105 transition-all duration-300">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg"
                          style={{ backgroundColor: category.category.color }}
                        >
                          {category.category.icon}
                        </div>
                        {category.category.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold">{formatCurrency(category.amount)}</span>
                          <Badge variant="secondary">{category.percentage.toFixed(1)}% of total</Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Monthly Progress</span>
                            <span>{Math.min(100, (category.percentage * 4)).toFixed(0)}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="h-2 rounded-full transition-all duration-500"
                              style={{ 
                                width: `${Math.min(100, category.percentage * 4)}%`,
                                backgroundColor: category.category.color 
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {insights.map((insight, index) => (
                  <Card key={insight.title} className="glass-card border-0 shadow-premium hover:scale-105 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${insight.bgColor}`}>
                          <insight.icon className={`h-6 w-6 ${insight.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{insight.title}</h3>
                          <p className="text-xl font-bold mb-2">{insight.value}</p>
                          <p className="text-sm text-muted-foreground">{insight.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
