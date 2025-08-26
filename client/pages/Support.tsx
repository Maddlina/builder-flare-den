import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Copy,
  Star,
  Shield,
  Zap,
  Users,
  Github,
  Coffee,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/Footer";

export default function Support() {
  const [copiedWallet, setCopiedWallet] = useState<string | null>(null);

  const wallets = [
    {
      type: "Bitcoin",
      address: "bc1qhswl5eru88wzd5jg5wxz0x46cvcmskluyt8mrz",
      icon: "₿",
      color: "text-orange-500",
      bgColor: "from-orange-500 to-yellow-500",
    },
    {
      type: "Ethereum",
      address: "0x1f6b683a7A767Fff7e704D1dc398100783d67319",
      icon: "Ξ",
      color: "text-blue-500",
      bgColor: "from-blue-500 to-indigo-500",
    },
    {
      type: "TRON",
      address: "TXooztaEmCaRccyTbTVspymAgGVxX2fe9P",
      icon: "🔴",
      color: "text-red-500",
      bgColor: "from-red-500 to-pink-500",
    },
  ];

  const copyToClipboard = async (address: string, type: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedWallet(type);
      toast({
        title: "Address Copied! 🎉",
        description: `${type} wallet address copied to clipboard`,
      });
      setTimeout(() => setCopiedWallet(null), 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
      toast({
        title: "Copy Failed",
        description: "Please copy the address manually",
        variant: "destructive",
      });
    }
  };

  const stats = [
    {
      icon: Users,
      label: "Active Users",
      value: "50,000+",
      color: "text-blue-500",
    },
    {
      icon: Star,
      label: "GitHub Stars",
      value: "2,500+",
      color: "text-yellow-500",
    },
    {
      icon: Coffee,
      label: "Lines of Code",
      value: "25,000+",
      color: "text-purple-500",
    },
    { icon: Heart, label: "Contributors", value: "50+", color: "text-red-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Navigation */}
      <Navigation />

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

      <div className="relative z-10 pt-20 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="flex justify-center items-center gap-4 mb-8">
              <Heart className="h-16 w-16 text-red-500 fill-red-500 animate-bounce" />
              <div>
                <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                  SUPPORT US
                </h1>
                <p className="text-2xl md:text-3xl font-bold text-muted-foreground mt-2">
                  Keep Smart Budget Free Forever!
                </p>
              </div>
              <Heart
                className="h-16 w-16 text-red-500 fill-red-500 animate-bounce"
                style={{ animationDelay: "0.5s" }}
              />
            </div>

            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Smart Budget is 100% open source and completely free. Your
              donations help us maintain the servers, add new features, and keep
              this powerful financial tool accessible to everyone worldwide.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card
                key={stat.label}
                className="glass-card border-0 shadow-premium text-center group hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <stat.icon
                    className={`h-8 w-8 ${stat.color} mx-auto mb-3 group-hover:scale-110 transition-transform`}
                  />
                  <h3 className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Why Support Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <Card className="glass-card border-0 shadow-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Shield className="h-8 w-8 text-green-500" />
                  Why Your Support Matters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Server Costs</h4>
                    <p className="text-sm text-muted-foreground">
                      Keep our servers running 24/7 for global access
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">New Features</h4>
                    <p className="text-sm text-muted-foreground">
                      Fund development of exciting new capabilities
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Community Growth</h4>
                    <p className="text-sm text-muted-foreground">
                      Support marketing to help more people discover Smart
                      Budget
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Github className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Open Source Promise</h4>
                    <p className="text-sm text-muted-foreground">
                      Guarantee Smart Budget stays free and open forever
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0 shadow-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Sparkles className="h-8 w-8 text-yellow-500" />
                  Our Promise to You
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">
                    ✅ Always Free
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    No subscriptions, no premium tiers, no hidden costs - ever!
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">
                    🔓 Open Source
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Full transparency - inspect our code on GitHub
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                  <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-2">
                    🌍 Global Access
                  </h4>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    Available worldwide to anyone who needs it
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                  <h4 className="font-bold text-orange-800 dark:text-orange-200 mb-2">
                    🔒 Privacy First
                  </h4>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    Your data stays yours - no tracking, no selling
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Crypto Donation Section */}
          <Card className="glass-card border-0 shadow-premium mb-16">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                💰 Crypto Donation Wallets
              </CardTitle>
              <p className="text-lg text-muted-foreground">
                Support Smart Budget with cryptocurrency donations. Every
                contribution helps keep us free and open source!
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {wallets.map((wallet, index) => (
                <div
                  key={wallet.type}
                  className="group p-6 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-102"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${wallet.bgColor} rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg`}
                      >
                        {wallet.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">
                          {wallet.type}
                        </h3>
                        <p className="text-muted-foreground">Crypto Wallet</p>
                      </div>
                    </div>
                    <Button
                      size="lg"
                      onClick={() =>
                        copyToClipboard(wallet.address, wallet.type)
                      }
                      className={`h-14 px-8 text-lg font-bold transition-all duration-300 hover:scale-105 ${
                        copiedWallet === wallet.type
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : `bg-gradient-to-r ${wallet.bgColor} hover:opacity-90 text-white`
                      }`}
                    >
                      {copiedWallet === wallet.type ? (
                        <>
                          <span className="text-xl mr-2">✓</span>
                          COPIED!
                        </>
                      ) : (
                        <>
                          <Copy className="h-5 w-5 mr-2" />
                          COPY ADDRESS
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="bg-gray-900 dark:bg-gray-950 rounded-xl p-4 font-mono text-sm text-green-400 break-all border-2 border-gray-400 dark:border-gray-500 shadow-inner">
                    {wallet.address}
                  </div>

                  <p className="text-center text-sm text-muted-foreground mt-3 font-medium">
                    Send {wallet.type} to this address to support Smart Budget
                    development
                  </p>
                </div>
              ))}

              {/* Thank You Message */}
              <div className="mt-8 p-6 bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 dark:from-yellow-900/30 dark:via-orange-900/30 dark:to-red-900/30 rounded-2xl border-2 border-yellow-300 dark:border-yellow-700 text-center">
                <Heart className="h-12 w-12 text-red-500 fill-red-500 mx-auto mb-4 animate-pulse" />
                <h3 className="text-2xl font-bold text-yellow-800 dark:text-yellow-200 mb-2">
                  Thank You for Your Support! 🙏
                </h3>
                <p className="text-lg text-yellow-700 dark:text-yellow-300">
                  Every donation, no matter the size, helps keep Smart Budget
                  free and accessible to everyone worldwide. You're making a
                  real difference in the open source community!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Alternative Support Methods */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="glass-card border-0 shadow-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Github className="h-6 w-6 text-gray-500" />
                  Other Ways to Help
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-yellow-500 mt-1" />
                  <div>
                    <h4 className="font-semibold">Star on GitHub</h4>
                    <p className="text-sm text-muted-foreground">
                      Give us a star to help others discover Smart Budget
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-semibold">Spread the Word</h4>
                    <p className="text-sm text-muted-foreground">
                      Tell friends and family about Smart Budget
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Coffee className="h-5 w-5 text-orange-500 mt-1" />
                  <div>
                    <h4 className="font-semibold">Contribute Code</h4>
                    <p className="text-sm text-muted-foreground">
                      Help us build new features and fix bugs
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0 shadow-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Heart className="h-6 w-6 text-red-500" />
                  Join Our Community
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                  onClick={() =>
                    window.open(
                      "https://www.instagram.com/call.me.__.amine?igsh=MWt1bGtvd2tqOGxuNA==",
                      "_blank",
                    )
                  }
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Follow on Instagram
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                  onClick={() =>
                    window.open(
                      "https://github.com/BuilderIO/fusion-starter",
                      "_blank",
                    )
                  }
                >
                  <Github className="h-4 w-4 mr-2" />
                  View on GitHub
                </Button>
                <div className="text-center space-y-2">
                  <Badge
                    variant="outline"
                    className="text-green-600 border-green-200"
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    Always Free
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-blue-600 border-blue-200 ml-2"
                  >
                    <Shield className="h-3 w-3 mr-1" />
                    Open Source
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
