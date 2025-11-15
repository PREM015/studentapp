import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import {
  User, Bell, Lock, Palette, Shield,
  Mail, Phone, MapPin, Save,
  Smartphone, Monitor, Moon, Sun, Check
} from 'lucide-react';

interface SettingsProps {
  userRole?: 'student' | 'teacher' | 'tpc' | 'club' | 'university';
}

export default function Settings({ userRole = 'student' }: SettingsProps) {
  const [settings, setSettings] = useState({
    // Profile
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@university.edu',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',

    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    assignmentReminders: true,
    gradeAlerts: true,
    attendanceAlerts: true,
    eventReminders: true,

    // Privacy
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    dataSharing: false,

    // Appearance
    theme: 'light',
    language: 'en',
    timezone: 'America/New_York',

    // Security
    twoFactorAuth: false,
    loginAlerts: true,
  });

  const handleSave = () => {
    // Simulate save
    console.log('Settings saved:', settings);
    console.log('User role:', userRole);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-white p-2 rounded-lg border border-gray-200">
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Lock className="w-4 h-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="p-6 border border-gray-200">
              <h3 className="text-lg text-gray-900 mb-6">Profile Information</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input
                      value={settings.firstName}
                      onChange={(e) => setSettings({ ...settings, firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input
                      value={settings.lastName}
                      onChange={(e) => setSettings({ ...settings, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      value={settings.location}
                      onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button onClick={handleSave} className="w-full md:w-auto gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="p-6 border border-gray-200">
              <h3 className="text-lg text-gray-900 mb-6">Notification Preferences</h3>
              <div className="space-y-6">
                {/* Notification Channels */}
                <div className="space-y-4">
                  <h4 className="text-sm text-gray-900">Notification Channels</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="text-sm text-gray-900">Email Notifications</p>
                          <p className="text-xs text-gray-600">Receive updates via email</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked: boolean) =>
                          setSettings({ ...settings, emailNotifications: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="text-sm text-gray-900">Push Notifications</p>
                          <p className="text-xs text-gray-600">Get instant alerts on your device</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked: boolean) => setSettings({ ...settings, pushNotifications: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="text-sm text-gray-900">SMS Notifications</p>
                          <p className="text-xs text-gray-600">Receive important alerts via SMS</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.smsNotifications}
                        onCheckedChange={(checked: boolean) => setSettings({ ...settings, smsNotifications: checked })}
                      />
                    </div>
                  </div>
                </div>

                {/* Notification Types */}
                <div className="space-y-4">
                  <h4 className="text-sm text-gray-900">Notification Types</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Assignment Reminders</Label>
                      <Switch
                        checked={settings.assignmentReminders}
                        onCheckedChange={(checked: boolean) => setSettings({ ...settings, assignmentReminders: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Grade Alerts</Label>
                      <Switch
                        checked={settings.gradeAlerts}
                        onCheckedChange={(checked: boolean) => setSettings({ ...settings, gradeAlerts: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Attendance Alerts</Label>
                      <Switch
                        checked={settings.attendanceAlerts}
                        onCheckedChange={(checked: boolean) => setSettings({ ...settings, attendanceAlerts: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Event Reminders</Label>
                      <Switch
                        checked={settings.eventReminders}
                        onCheckedChange={(checked: boolean) => setSettings({ ...settings, eventReminders: checked })}
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={handleSave} className="w-full md:w-auto gap-2">
                  <Save className="w-4 h-4" />
                  Save Preferences
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <Card className="p-6 border border-gray-200">
              <h3 className="text-lg text-gray-900 mb-6">Privacy Settings</h3>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Profile Visibility</Label>
                    <Select
                      value={settings.profileVisibility}
                      onValueChange={(value: string) => setSettings({ ...settings, profileVisibility: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public - Everyone can see</SelectItem>
                        <SelectItem value="university">University Only</SelectItem>
                        <SelectItem value="private">Private - Only me</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Show Email on Profile</Label>
                    <Switch
                      checked={settings.showEmail}
                      onCheckedChange={(checked: boolean) => setSettings({ ...settings, showEmail: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Show Phone on Profile</Label>
                    <Switch
                      checked={settings.showPhone}
                      onCheckedChange={(checked: boolean) => setSettings({ ...settings, showPhone: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Allow Data Sharing for Analytics</Label>
                    <Switch
                      checked={settings.dataSharing}
                      onCheckedChange={(checked: boolean) => setSettings({ ...settings, dataSharing: checked })}
                    />
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900">
                    Your privacy is important to us. We never share your personal information with third parties without your consent.
                  </p>
                </div>

                <Button onClick={handleSave} className="w-full md:w-auto gap-2">
                  <Save className="w-4 h-4" />
                  Save Settings
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <Card className="p-6 border border-gray-200">
              <h3 className="text-lg text-gray-900 mb-6">Appearance Settings</h3>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => setSettings({ ...settings, theme: 'light' })}
                        className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-colors ${
                          settings.theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Sun className="w-6 h-6 text-gray-700" />
                        <span className="text-sm">Light</span>
                        {settings.theme === 'light' && <Check className="w-4 h-4 text-blue-600" />}
                      </button>
                      <button
                        onClick={() => setSettings({ ...settings, theme: 'dark' })}
                        className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-colors ${
                          settings.theme === 'dark' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Moon className="w-6 h-6 text-gray-700" />
                        <span className="text-sm">Dark</span>
                        {settings.theme === 'dark' && <Check className="w-4 h-4 text-blue-600" />}
                      </button>
                      <button
                        onClick={() => setSettings({ ...settings, theme: 'auto' })}
                        className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-colors ${
                          settings.theme === 'auto' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Monitor className="w-6 h-6 text-gray-700" />
                        <span className="text-sm">Auto</span>
                        {settings.theme === 'auto' && <Check className="w-4 h-4 text-blue-600" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select
                      value={settings.language}
                      onValueChange={(value: string) => setSettings({ ...settings, language: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="zh">中文</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select
                      value={settings.timezone}
                      onValueChange={(value: string) => setSettings({ ...settings, timezone: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="Europe/London">London (GMT)</SelectItem>
                        <SelectItem value="Asia/Kolkata">India (IST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={handleSave} className="w-full md:w-auto gap-2">
                  <Save className="w-4 h-4" />
                  Save Preferences
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="p-6 border border-gray-200">
              <h3 className="text-lg text-gray-900 mb-6">Security Settings</h3>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="text-sm text-gray-900 mb-4">Change Password</h4>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label>Current Password</Label>
                        <Input type="password" placeholder="Enter current password" />
                      </div>
                      <div className="space-y-2">
                        <Label>New Password</Label>
                        <Input type="password" placeholder="Enter new password" />
                      </div>
                      <div className="space-y-2">
                        <Label>Confirm New Password</Label>
                        <Input type="password" placeholder="Confirm new password" />
                      </div>
                      <Button className="w-full md:w-auto">Update Password</Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Two-Factor Authentication</p>
                      <p className="text-xs text-gray-600">Add an extra layer of security</p>
                    </div>
                    <Switch
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked: boolean) => setSettings({ ...settings, twoFactorAuth: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">Login Alerts</p>
                      <p className="text-xs text-gray-600">Get notified of new logins</p>
                    </div>
                    <Switch
                      checked={settings.loginAlerts}
                      onCheckedChange={(checked: boolean) => setSettings({ ...settings, loginAlerts: checked })}
                    />
                  </div>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-900">
                    💡 <strong>Security Tip:</strong> Use a strong, unique password and enable two-factor authentication for maximum security.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}