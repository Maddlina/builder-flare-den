import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useAuth, DEMO_CREDENTIALS } from "@/lib/auth-context";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Sparkles,
  TrendingUp,
  Shield,
  Zap,
  ArrowRight,
  Star,
  Users,
  Heart,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const success = await login(email, password);
    if (success) {
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in to Smart Budget.",
      });
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  const fillDemoCredentials = () => {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Hero Content */}
        <div className="hidden lg:block space-y-8 animate-fade-in">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Smart Budget
                </h1>
                <p className="text-sm text-muted-foreground">
                  Intelligent Financial Control
                </p>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Smart
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Budgeting
              </span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              The most intelligent budget management platform. Track every
              penny, set smart budgets, and achieve your financial goals with
              AI-powered insights.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: TrendingUp,
                title: "Smart Analytics",
                desc: "AI-powered insights",
              },
              {
                icon: Shield,
                title: "100% Secure",
                desc: "Bank-level encryption",
              },
              { icon: Zap, title: "Real-time Sync", desc: "Instant updates" },
              { icon: Users, title: "50K+ Users", desc: "Trusted worldwide" },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="glass-card p-4 group hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <feature.icon className="h-8 w-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-sm">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-4 p-4 glass-card">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-background"
                ></div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-3 w-3 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Loved by 50,000+ users worldwide
              </p>
            </div>
          </div>

          {/* Support Us Link */}
          <Link
            to="/support"
            className="flex items-center gap-4 p-4 glass-card cursor-pointer group hover:scale-105 transition-all duration-300 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200 dark:border-red-800"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Heart className="h-6 w-6 text-red-500 group-hover:scale-110 transition-transform fill-red-500 animate-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
              </div>
              <div>
                <h3 className="font-semibold text-red-700 dark:text-red-300">
                  💰 Support Smart Budget
                </h3>
                <p className="text-xs text-red-600 dark:text-red-400">
                  Help keep us 100% free & open source!
                </p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-red-500 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto animate-scale-in">
          <Card className="glass-card border-0 shadow-premium">
            <CardHeader className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <CardDescription className="text-base">
                Sign in to access your financial dashboard
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Demo Credentials Banner */}
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                  >
                    Demo Account
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={fillDemoCredentials}
                    className="h-6 text-xs hover:bg-green-100 dark:hover:bg-green-800"
                  >
                    Auto-fill
                  </Button>
                </div>
                <p className="text-xs text-green-700 dark:text-green-300">
                  <strong>Email:</strong> {DEMO_CREDENTIALS.email}
                  <br />
                  <strong>Password:</strong> {DEMO_CREDENTIALS.password}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="pl-10 h-12 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary transition-all duration-300"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 h-12 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary transition-all duration-300"
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive" className="animate-slide-up">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Signing in...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Sign In
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </form>

              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-primary hover:text-primary-dark font-semibold transition-colors hover:underline"
                  >
                    Sign up for free
                  </Link>
                </p>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Shield className="h-3 w-3" />
                  Secured with bank-level encryption
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
