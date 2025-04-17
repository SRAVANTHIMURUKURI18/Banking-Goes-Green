"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/lib/auth"

export default function SettingsPage() {
  const { user } = useAuth()

  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [documentUpdates, setDocumentUpdates] = useState(true)
  const [securityAlerts, setSecurityAlerts] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [theme, setTheme] = useState("system")
  const [isUpdating, setIsUpdating] = useState(false)
  const [message, setMessage] = useState("")

  const handleSaveNotifications = () => {
    setMessage("")
    setIsUpdating(true)

    // Simulate API call
    setTimeout(() => {
      setMessage("Notification preferences updated successfully")
      setIsUpdating(false)
    }, 1000)
  }

  const handleSaveAppearance = () => {
    setMessage("")
    setIsUpdating(true)

    // Simulate API call
    setTimeout(() => {
      setMessage("Appearance settings updated successfully")
      setIsUpdating(false)
    }, 1000)
  }

  return (
    <div className="container max-w-3xl px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      {message && <div className="mb-6 bg-green-50 text-green-700 px-4 py-2 rounded-md">{message}</div>}

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
              </div>
              <Switch id="sms-notifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Notification Types</h3>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="document-updates">Document Updates</Label>
                  <p className="text-sm text-muted-foreground">Notifications about your document status changes</p>
                </div>
                <Switch id="document-updates" checked={documentUpdates} onCheckedChange={setDocumentUpdates} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="security-alerts">Security Alerts</Label>
                  <p className="text-sm text-muted-foreground">Important security notifications about your account</p>
                </div>
                <Switch id="security-alerts" checked={securityAlerts} onCheckedChange={setSecurityAlerts} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-emails">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">Receive updates about new features and promotions</p>
                </div>
                <Switch id="marketing-emails" checked={marketingEmails} onCheckedChange={setMarketingEmails} />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveNotifications} className="bg-teal-600 hover:bg-teal-700" disabled={isUpdating}>
              {isUpdating ? "Saving..." : "Save Notification Settings"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how the application looks</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={theme} onValueChange={setTheme} className="space-y-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light">Light</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark">Dark</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="system" id="system" />
                <Label htmlFor="system">System</Label>
              </div>
            </RadioGroup>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveAppearance} className="bg-teal-600 hover:bg-teal-700" disabled={isUpdating}>
              {isUpdating ? "Saving..." : "Save Appearance Settings"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
