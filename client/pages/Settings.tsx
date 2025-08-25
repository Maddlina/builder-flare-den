import { useState } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from '@/lib/theme-provider';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  DollarSign,
  Download,
  Upload,
  Trash2,
  Camera,
  Save,
  AlertTriangle,
  CheckCircle2,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export default function Settings() {
  const { user, updateProfile, updatePreferences, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [preferences, setPreferences] = useState({
    theme: theme as 'light' | 'dark' | 'system',
    currency: user?.preferences.currency || 'USD',
    language: user?.preferences.language || 'en',
    notifications: {
      email: user?.preferences.notifications.email ?? true,
      push: user?.preferences.notifications.push ?? true,
      budgetAlerts: user?.preferences.notifications.budgetAlerts ?? true,
      weeklyReports: user?.preferences.notifications.weeklyReports ?? true,
    },
  });

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
      await updateProfile(profileData);
      toast({
        title: "Success!",
        description: "Profile updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleUpdatePreferences = async () => {
    setIsLoading(true);
    try {
      // Update theme
      setTheme(preferences.theme as any);
      
      // Update other preferences
      await updatePreferences({
        currency: preferences.currency,
        language: preferences.language,
        notifications: preferences.notifications,
      });
      
      toast({
        title: "Success!",
        description: "Preferences updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update preferences. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleChangePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      toast({
        title: "Error",
        description: "Please fill in all password fields.",
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate password change
    setTimeout(() => {
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setIsLoading(false);
      toast({
        title: "Success!",
        description: "Password changed successfully.",
      });
    }, 1000);
  };

  const handleExportData = () => {
    const exportData = {
      profile: user,
      preferences: preferences,
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expensetracker-profile-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete!",
      description: "Your profile data has been downloaded.",
    });
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      logout();
      toast({
        title: "Account Deleted",
        description: "Your account has been deleted successfully.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="animate-slide-up">
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <SettingsIcon className="h-6 w-6 text-white" />
              </div>
              Settings
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your account, preferences, and app settings
            </p>
          </div>

          {/* Settings Tabs */}
          <Tabs defaultValue="profile" className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <TabsList className="grid w-full grid-cols-5 bg-muted/50 backdrop-blur-sm">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Preferences
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="data" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Data
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6 mt-6">
              <Card className="glass-card border-0 shadow-premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>
                    Update your personal information and profile picture
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center gap-6">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={user?.avatar} alt={user?.firstName} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-2xl font-bold">
                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Button variant="outline" className="flex items-center gap-2">
                        <Camera className="h-4 w-4" />
                        Change Picture
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        JPG, GIF or PNG. 1MB max.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Personal Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                        placeholder="Enter your first name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      onClick={handleUpdateProfile}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-6 mt-6">
              <Card className="glass-card border-0 shadow-premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    App Preferences
                  </CardTitle>
                  <CardDescription>
                    Customize your app experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-base font-medium">Theme</Label>
                        <p className="text-sm text-muted-foreground">
                          Choose your preferred color theme
                        </p>
                      </div>
                      <Select
                        value={preferences.theme}
                        onValueChange={(value: 'light' | 'dark' | 'system') => setPreferences(prev => ({ ...prev, theme: value }))}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-base font-medium flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          Currency
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Default currency for transactions
                        </p>
                      </div>
                      <Select 
                        value={preferences.currency} 
                        onValueChange={(value) => setPreferences(prev => ({ ...prev, currency: value }))}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">🇺🇸 USD</SelectItem>
                          <SelectItem value="EUR">🇪🇺 EUR</SelectItem>
                          <SelectItem value="GBP">🇬🇧 GBP</SelectItem>
                          <SelectItem value="JPY">🇯🇵 JPY</SelectItem>
                          <SelectItem value="CAD">🇨🇦 CAD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-base font-medium flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Language
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Choose your preferred language
                        </p>
                      </div>
                      <Select 
                        value={preferences.language} 
                        onValueChange={(value) => setPreferences(prev => ({ ...prev, language: value }))}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                          <SelectItem value="it">Italiano</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      onClick={handleUpdatePreferences}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Preferences
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6 mt-6">
              <Card className="glass-card border-0 shadow-premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Settings
                  </CardTitle>
                  <CardDescription>
                    Choose what notifications you want to receive
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-base font-medium flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        checked={preferences.notifications.email}
                        onCheckedChange={(checked) => 
                          setPreferences(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, email: checked }
                          }))
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-base font-medium flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          Push Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receive push notifications on your device
                        </p>
                      </div>
                      <Switch
                        checked={preferences.notifications.push}
                        onCheckedChange={(checked) => 
                          setPreferences(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, push: checked }
                          }))
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-base font-medium flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          Budget Alerts
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when you approach budget limits
                        </p>
                      </div>
                      <Switch
                        checked={preferences.notifications.budgetAlerts}
                        onCheckedChange={(checked) => 
                          setPreferences(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, budgetAlerts: checked }
                          }))
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-base font-medium flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          Weekly Reports
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receive weekly spending summaries
                        </p>
                      </div>
                      <Switch
                        checked={preferences.notifications.weeklyReports}
                        onCheckedChange={(checked) => 
                          setPreferences(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, weeklyReports: checked }
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      onClick={handleUpdatePreferences}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Settings
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6 mt-6">
              <Card className="glass-card border-0 shadow-premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your account security and password
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      Your account is secured with industry-standard encryption. 
                      We recommend using a strong, unique password.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Change Password</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showCurrentPassword ? 'text' : 'password'}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          placeholder="Enter your current password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? 'text' : 'password'}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          placeholder="Enter your new password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        placeholder="Confirm your new password"
                      />
                    </div>

                    <Button 
                      onClick={handleChangePassword}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                          Changing...
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4 mr-2" />
                          Change Password
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Data Tab */}
            <TabsContent value="data" className="space-y-6 mt-6">
              <Card className="glass-card border-0 shadow-premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Data Management
                  </CardTitle>
                  <CardDescription>
                    Export your data or delete your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="space-y-1">
                        <Label className="text-base font-medium flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Export Your Data
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Download all your profile and preference data
                        </p>
                      </div>
                      <Button 
                        onClick={handleExportData}
                        variant="outline"
                        className="bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/40 dark:hover:bg-blue-900/60"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-red-600">Danger Zone</h3>
                      
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          Deleting your account is permanent and cannot be undone. 
                          All your data will be permanently removed.
                        </AlertDescription>
                      </Alert>

                      <Button 
                        onClick={handleDeleteAccount}
                        variant="destructive"
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
