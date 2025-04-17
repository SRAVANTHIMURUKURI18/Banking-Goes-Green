import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LandingHeader } from "@/components/landing-header"
import { LandingFooter } from "@/components/landing-footer"
import { HowToUse } from "@/components/how-to-use"
import { Features } from "@/components/features"
import { CustomerSupport } from "@/components/customer-support"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-teal-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-teal-800">
                  Secure Document Management Platform
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  Streamline your document submission process with our secure, efficient platform designed for both
                  customers and bank employees.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login?type=customer">
                  <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                    Customer Login
                  </Button>
                </Link>
                <Link href="/login?type=employee">
                  <Button size="lg" variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                    Employee Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="features" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="how-to-use">How To Use</TabsTrigger>
                <TabsTrigger value="support">Customer Support</TabsTrigger>
              </TabsList>
              <TabsContent value="features">
                <Features />
              </TabsContent>
              <TabsContent value="how-to-use">
                <HowToUse />
              </TabsContent>
              <TabsContent value="support">
                <CustomerSupport />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle>For Customers</CardTitle>
                  <CardDescription>Easily submit and track your documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Secure document upload</li>
                    <li>Real-time status tracking</li>
                    <li>Notification alerts</li>
                    <li>Document history</li>
                  </ul>
                  <div className="mt-4">
                    <Link href="/register?type=customer">
                      <Button className="w-full bg-teal-600 hover:bg-teal-700">Register as Customer</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>For Bank Employees</CardTitle>
                  <CardDescription>Efficiently manage customer documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Document review dashboard</li>
                    <li>Approval workflow</li>
                    <li>Document organization</li>
                    <li>Customer communication</li>
                  </ul>
                  <div className="mt-4">
                    <Link href="/login?type=employee">
                      <Button className="w-full bg-teal-600 hover:bg-teal-700">Employee Portal</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Security First</CardTitle>
                  <CardDescription>Your data is protected</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>End-to-end encryption</li>
                    <li>Secure authentication</li>
                    <li>Data privacy compliance</li>
                    <li>Regular security audits</li>
                  </ul>
                  <div className="mt-4">
                    <Link href="#security">
                      <Button variant="outline" className="w-full">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  )
}
