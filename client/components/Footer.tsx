import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Instagram, 
  Heart, 
  Star, 
  Zap, 
  Shield, 
  Download,
  Copy,
  ExternalLink
} from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [copiedWallet, setCopiedWallet] = useState<string | null>(null);

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
      icon: 'T',
      color: 'text-red-500'
    }
  ];

  const copyToClipboard = async (address: string, type: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedWallet(type);
      setTimeout(() => setCopiedWallet(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">ExpenseTracker Pro</h3>
                  <p className="text-blue-100 text-sm">Ultimate Financial Freedom</p>
                </div>
              </div>
              <p className="text-blue-100 mb-4">
                The most powerful expense management platform ever created. 
                100% free, no subscriptions, no limits. Built with love for everyone.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-500/20 text-green-100 border-green-400/50">
                  <Star className="h-3 w-3 mr-1" />
                  100% Free
                </Badge>
                <Badge className="bg-purple-500/20 text-purple-100 border-purple-400/50">
                  <Shield className="h-3 w-3 mr-1" />
                  Privacy First
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-100 border-blue-400/50">
                  <Download className="h-3 w-3 mr-1" />
                  Export Data
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Instagram className="h-5 w-5 text-pink-500" />
                Get in Touch
              </h3>
              <p className="text-gray-600 mb-4">
                Have questions or suggestions? Connect with the creator!
              </p>
              <Button 
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                onClick={() => window.open('https://www.instagram.com/call.me.__.amine?igsh=MWt1bGtvd2tqOGxuNA==', '_blank')}
              >
                <Instagram className="h-4 w-4 mr-2" />
                Follow @call.me.__.amine
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Questions • Feedback • Collaboration
              </p>
            </CardContent>
          </Card>

          {/* Crypto Donations */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Support Development
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Love this free app? Support future development with crypto donations:
              </p>
              <div className="space-y-3">
                {wallets.map((wallet) => (
                  <div key={wallet.type} className="group">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-medium ${wallet.color} flex items-center gap-1`}>
                        <span className="text-lg">{wallet.icon}</span>
                        {wallet.type}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(wallet.address, wallet.type)}
                        className="h-6 px-2 text-xs"
                      >
                        {copiedWallet === wallet.type ? (
                          <span className="text-green-600">Copied!</span>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="bg-gray-100 rounded p-2 font-mono text-xs text-gray-600 break-all">
                      {wallet.address}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-600 font-medium">
                Made with <Heart className="inline h-4 w-4 text-red-500 mx-1" /> for the community
              </p>
              <p className="text-sm text-gray-500">
                © 2024 ExpenseTracker Pro • Open Source • MIT License
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-green-600 border-green-200">
                <Zap className="h-3 w-3 mr-1" />
                Always Free
              </Badge>
              <Badge variant="outline" className="text-blue-600 border-blue-200">
                <Shield className="h-3 w-3 mr-1" />
                Privacy Protected
              </Badge>
              <Badge variant="outline" className="text-purple-600 border-purple-200">
                <Star className="h-3 w-3 mr-1" />
                No Ads
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
