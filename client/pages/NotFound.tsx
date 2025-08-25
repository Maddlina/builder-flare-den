import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { 
  Home, 
  Search, 
  ArrowLeft, 
  Sparkles,
  Compass,
  MapPin
} from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-red-900 dark:to-orange-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-2xl mx-auto text-center relative z-10">
        <Card className="glass-card border-0 shadow-premium animate-scale-in">
          <CardContent className="p-12">
            {/* Logo */}
            <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Compass className="h-10 w-10 text-white" />
            </div>

            {/* 404 Animation */}
            <div className="relative mb-8">
              <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent animate-pulse">
                404
              </h1>
              <div className="absolute top-4 right-4 animate-bounce">
                <MapPin className="h-8 w-8 text-red-500" />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Oops! Page not found
              </h2>
              <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                The page you're looking for seems to have wandered off. 
                Don't worry, even the best expense trackers sometimes lose track of things!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold px-8 py-3 text-lg hover:scale-105 transition-all duration-300"
              >
                <Link to="/dashboard">
                  <Home className="h-5 w-5 mr-2" />
                  Go to Dashboard
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline"
                className="border-border/50 hover:bg-muted/50 px-8 py-3 text-lg hover:scale-105 transition-all duration-300"
              >
                <Link to="/login">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Login
                </Link>
              </Button>
            </div>

            {/* Additional Help */}
            <div className="mt-8 p-4 bg-muted/30 rounded-xl">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Looking for something specific?</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Try navigating using the menu or go back to the dashboard to access all features.
              </p>
            </div>

            {/* Brand Footer */}
            <div className="mt-8 pt-6 border-t border-border/30">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">ExpenseTracker Pro</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
