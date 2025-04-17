"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useAuth, type Document } from "@/lib/auth"

export default function DocumentsPage() {
  const searchParams = useSearchParams()
  const defaultStatus = searchParams.get("status") || "all"

  const [activeTab, setActiveTab] = useState(defaultStatus)
  const { user, documents } = useAuth()

  const isCustomer = user?.role === "customer"

  // Filter documents based on user role and active tab
  const filteredDocuments = documents.filter((doc) => {
    // For customers, only show their documents
    if (isCustomer && doc.customerId !== user?.id) {
      return false
    }

    // Filter by status if not "all"
    if (activeTab !== "all" && doc.status !== activeTab) {
      return false
    }

    return true
  })

  const getStatusBadge = (status: Document["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "reviewing":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Reviewing
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Rejected
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground">
            {isCustomer
              ? "View and manage your submitted documents"
              : "Review and manage customer document submissions"}
          </p>
        </div>

        {isCustomer && (
          <Button asChild className="mt-4 sm:mt-0 bg-teal-600 hover:bg-teal-700">
            <Link href="/dashboard/upload">Upload New Document</Link>
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="reviewing">Reviewing</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          {filteredDocuments.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
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
                  className="h-12 w-12 text-gray-300 mb-4"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <h3 className="text-lg font-medium">No documents found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {isCustomer
                    ? "You haven't uploaded any documents yet"
                    : "There are no documents to review at this time"}
                </p>

                {isCustomer && (
                  <Button asChild className="mt-4 bg-teal-600 hover:bg-teal-700">
                    <Link href="/dashboard/upload">Upload Your First Document</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="overflow-hidden">
                  <div className="aspect-video w-full bg-gray-100">
                    <img
                      src={doc.fileUrl || "/placeholder.svg"}
                      alt={doc.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{doc.title}</CardTitle>
                      {getStatusBadge(doc.status)}
                    </div>
                    <CardDescription className="line-clamp-2">{doc.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center text-sm text-muted-foreground">
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
                        className="mr-1 h-3 w-3"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {new Date(doc.uploadDate).toLocaleDateString()}
                    </div>
                    <div className="mt-4">
                      <Button asChild className="w-full">
                        <Link href={`/dashboard/documents/${doc.id}`}>
                          {isCustomer ? "View Details" : "Review Document"}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
