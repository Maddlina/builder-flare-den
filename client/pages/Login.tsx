import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useAuth, DEMO_CREDENTIALS } from '@/lib/auth-context';
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
  Copy
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showDonation, setShowDonation] = useState(false);
  const [copiedWallet, setCopiedWallet] = useState<string | null>(null);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const success = await login(email, password);
    if (success) {
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in to Smart Budget.",
      });
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  const fillDemoCredentials = () => {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
  };

  const wallets = [
    {
      type: 'Bitcoin',
      address: 'bc1qhswl5eru88wzd5jg5wxz0x46cvcmskluyt8mrz',
      icon: '₿',
      color: 'text-orange-500'
    },
    {
      type: 'Ethereum',
      address: '0x1f6b683a7A767Fff7e704D1dc398100783d67319',
      icon: 'Ξ',
      color: 'text-blue-500'
    },
    {
      type: 'TRON',
      address: 'TXooztaEmCaRccyTbTVspymAgGVxX2fe9P',
      icon: '🔴',
      color: 'text-red-500'
    }
  ];

  const copyToClipboard = async (address: string, type: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedWallet(type);
      toast({
        title: "Address Copied!",
        description: `${type} wallet address copied to clipboard`,
      });
      setTimeout(() => setCopiedWallet(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
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
                <p className="text-sm text-muted-foreground">Intelligent Financial Control</p>
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Smart
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Budgeting</span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              The most intelligent budget management platform. Track every penny,
              set smart budgets, and achieve your financial goals with AI-powered insights.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: TrendingUp, title: 'Smart Analytics', desc: 'AI-powered insights' },
              { icon: Shield, title: '100% Secure', desc: 'Bank-level encryption' },
              { icon: Zap, title: 'Real-time Sync', desc: 'Instant updates' },
              { icon: Users, title: '50K+ Users', desc: 'Trusted worldwide' },
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
                <div key={i} className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-background"></div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Loved by 50,000+ users worldwide</p>
            </div>
          </div>

          {/* PROMINENT SUPPORT US SECTION */}
          <div className="space-y-4">
            {/* Big Support Us Banner */}
            <div className="relative p-6 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 rounded-2xl shadow-2xl border-4 border-white/20 animate-pulse-slow">
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
              <div className="relative text-center space-y-4">
                <div className="flex justify-center items-center gap-4">
                  <Heart className="h-12 w-12 text-white fill-white animate-bounce" />
                  <div className="text-white">
                    <h2 className="text-3xl font-black tracking-tight">SUPPORT US</h2>
                    <p className="text-lg font-bold opacity-90">Keep Smart Budget FREE Forever!</p>
                  </div>
                  <Heart className="h-12 w-12 text-white fill-white animate-bounce" style={{ animationDelay: '0.5s' }} />
                </div>
                <Button
                  onClick={() => setShowDonation(!showDonation)}
                  className="w-full h-14 text-xl font-bold bg-white text-red-600 hover:bg-red-50 hover:text-red-700 hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <Heart className="h-6 w-6 mr-3 fill-red-600" />
                  {showDonation ? 'Hide Donation Wallets' : 'Show Crypto Wallets'}
                  <ArrowRight className={`h-6 w-6 ml-3 transition-transform ${showDonation ? 'rotate-90' : ''}`} />
                </Button>
              </div>
            </div>

            {showDonation && (
              <div className="space-y-4 animate-slide-down">
                <div className="p-6 glass-card bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/30 dark:via-emerald-900/30 dark:to-teal-900/30 border-2 border-green-300 dark:border-green-700 shadow-xl">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
                      🚀 CRYPTO DONATION WALLETS
                    </h3>
                    <p className="text-lg text-green-700 dark:text-green-300 font-semibold">
                      Your donations keep Smart Budget 100% FREE for everyone worldwide!
                    </p>
                  </div>

                  <div className="space-y-4">
                    {wallets.map((wallet) => (
                      <div key={wallet.type} className="group bg-white dark:bg-gray-800 rounded-xl p-5 border-2 border-gray-200 dark:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102">
                        <div className="flex items-center justify-between mb-3">
                          <span className={`font-bold ${wallet.color} flex items-center gap-3 text-lg`}>
                            <span className="text-2xl">{wallet.icon}</span>
                            <span className="text-xl">{wallet.type} Wallet</span>
                          </span>
                          <Button
                            size="lg"
                            onClick={() => copyToClipboard(wallet.address, wallet.type)}
                            className={`h-12 px-6 text-base font-bold transition-all duration-300 hover:scale-105 ${
                              copiedWallet === wallet.type
                                ? 'bg-green-500 hover:bg-green-600 text-white'
                                : 'bg-blue-500 hover:bg-blue-600 text-white'
                            }`}
                          >
                            {copiedWallet === wallet.type ? (
                              <>
                                <span className="text-lg">✓</span>
                                <span className="ml-2">COPIED!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-5 w-5 mr-2" />
                                COPY ADDRESS
                              </>
                            )}
                          </Button>
                        </div>
                        <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 font-mono text-sm text-green-400 break-all border-2 border-gray-400 dark:border-gray-500 shadow-inner">
                          {wallet.address}
                        </div>
                        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3 font-medium">
                          Send {wallet.type} to this address to support development
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="p-4 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-xl border-2 border-yellow-300 dark:border-yellow-700">
                      <p className="text-center text-lg font-bold text-yellow-800 dark:text-yellow-200">
                        💖 THANK YOU for keeping Smart Budget open source and FREE!
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl border-2 border-blue-300 dark:border-blue-700">
                      <p className="text-center text-base font-semibold text-blue-800 dark:text-blue-200">
                        🔓 Our Promise: No subscriptions • No premium tiers • No hidden costs • EVER!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
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
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
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
                  <strong>Email:</strong> {DEMO_CREDENTIALS.email}<br />
                  <strong>Password:</strong> {DEMO_CREDENTIALS.password}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
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
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
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
                  Don't have an account?{' '}
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
