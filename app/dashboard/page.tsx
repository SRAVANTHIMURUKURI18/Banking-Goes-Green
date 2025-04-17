"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth"

export default function DashboardPage() {
  const { user, documents } = useAuth()

  const pendingDocuments = documents.filter((doc) => doc.status === "pending").length
  const reviewingDocuments = documents.filter((doc) => doc.status === "reviewing").length
  const approvedDocuments = documents.filter((doc) => doc.status === "approved").length
  const rejectedDocuments = documents.filter((doc) => doc.status === "rejected").length

  const isCustomer = user?.role === "customer"

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Welcome, {user?.name}</h1>
        <p className="text-muted-foreground">
          {isCustomer
            ? "Manage your document submissions and track their status"
            : "Review and manage customer document submissions"}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Documents</CardTitle>
            <CardDescription>Awaiting review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingDocuments}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Review</CardTitle>
            <CardDescription>Currently being reviewed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviewingDocuments}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CardDescription>Successfully approved</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedDocuments}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <CardDescription>Requires attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedDocuments}</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {isCustomer ? (
              <>
                <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                  <Link href="/dashboard/upload">Upload New Document</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/dashboard/documents">View My Documents</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                  <Link href="/dashboard/documents?status=pending">Review Pending Documents</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/dashboard/documents">View All Documents</Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents.slice(0, 3).map((doc) => (
                <div key={doc.id} className="flex items-center gap-4">
                  <div className="rounded-full p-2 bg-gray-100">
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
                      className="h-4 w-4 text-teal-600"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{doc.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Status: <span className="capitalize">{doc.status}</span>
                    </p>
                  </div>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/dashboard/documents/${doc.id}`}>View</Link>
                  </Button>
                </div>
              ))}

              {documents.length === 0 && <p className="text-sm text-muted-foreground">No recent activity</p>}

              {documents.length > 0 && (
                <Button asChild variant="link" size="sm" className="mt-2 w-full">
                  <Link href="/dashboard/documents">View all documents</Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
