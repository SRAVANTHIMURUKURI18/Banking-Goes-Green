"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth, type UserRole } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultTab = (searchParams.get("type") as UserRole) || "customer"

  const [activeTab, setActiveTab] = useState<UserRole>(defaultTab)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { login, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const success = await login(email, password, activeTab)
      if (!success) {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred during login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="flex justify-center items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-teal-600"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <path d="M12 18v-6" />
              <path d="M8 18v-1" />
              <path d="M16 18v-3" />
            </svg>
            <span className="text-2xl font-bold text-teal-800">SecureDoc</span>
          </Link>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link href="/register" className="font-medium text-teal-600 hover:text-teal-500">
              create a new account
            </Link>
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as UserRole)} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="customer">Customer</TabsTrigger>
            <TabsTrigger value="employee">Bank Employee</TabsTrigger>
          </TabsList>

          <TabsContent value="customer">
            <Card>
              <CardHeader>
                <CardTitle>Customer Login</CardTitle>
                <CardDescription>Access your document portal to upload and track your documents</CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  {error && <div className="bg-red-50 text-red-500 px-4 py-2 rounded-md text-sm">{error}</div>}
                  <div className="space-y-2">
                    <Label htmlFor="customer-email">Email</Label>
                    <Input
                      id="customer-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="customer-password">Password</Label>
                      <Link href="/forgot-password" className="text-sm text-teal-600 hover:text-teal-500">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="customer-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={loading}>
                    {loading ? "Signing in..." : "Sign in"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="employee">
            <Card>
              <CardHeader>
                <CardTitle>Employee Login</CardTitle>
                <CardDescription>
                  Access the bank employee portal to review and manage customer documents
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  {error && <div className="bg-red-50 text-red-500 px-4 py-2 rounded-md text-sm">{error}</div>}
                  <div className="space-y-2">
                    <Label htmlFor="employee-email">Work Email</Label>
                    <Input
                      id="employee-email"
                      type="email"
                      placeholder="you@bank.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="employee-password">Password</Label>
                      <Link href="/forgot-password" className="text-sm text-teal-600 hover:text-teal-500">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="employee-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={loading}>
                    {loading ? "Signing in..." : "Sign in"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Demo Accounts:</p>
          <p>Customer: customer@example.com / password</p>
          <p>Employee: employee@example.com / password</p>
        </div>
      </div>
    </div>
  )
}
