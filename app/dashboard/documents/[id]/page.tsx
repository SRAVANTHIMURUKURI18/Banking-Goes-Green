"use client"

import Link from "next/link"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAuth, type Document } from "@/lib/auth"

export default function DocumentDetailPage() {
  const router = useRouter()
  const params = useParams()
  const documentId = params.id as string

  const { user, documents, updateDocumentStatus, deleteDocument } = useAuth()
  const document = documents.find((doc) => doc.id === documentId)

  const [feedback, setFeedback] = useState(document?.feedback || "")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isCustomer = user?.role === "customer"
  const isEmployee = user?.role === "employee"

  if (!document) {
    router.push("/dashboard/documents")
    return null
  }

  // For customers, only allow viewing their own documents
  if (isCustomer && document.customerId !== user?.id) {
    router.push("/dashboard/documents")
    return null
  }

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

  const handleUpdateStatus = async (status: Document["status"]) => {
    setIsSubmitting(true)

    try {
      updateDocumentStatus(documentId, status, feedback)
      router.push("/dashboard/documents")
    } catch (err) {
      console.error("Error updating document status:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this document? This action cannot be undone.")) {
      deleteDocument(documentId)
      router.push("/dashboard/documents")
    }
  }

  return (
    <div className="container max-w-4xl px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => router.push("/dashboard/documents")} className="mb-4">
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
            className="mr-2 h-4 w-4"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Documents
        </Button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{document.title}</h1>
            <p className="text-muted-foreground">Uploaded on {new Date(document.uploadDate).toLocaleDateString()}</p>
          </div>
          <div className="mt-4 sm:mt-0">{getStatusBadge(document.status)}</div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Document Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-md border">
                <img
                  src={document.fileUrl || "/placeholder.svg"}
                  alt={document.title}
                  className="w-full object-cover"
                />
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="font-medium">Description</h3>
                  <p className="text-sm text-muted-foreground mt-1">{document.description}</p>
                </div>

                {document.feedback && (
                  <div>
                    <h3 className="font-medium">Feedback</h3>
                    <p className="text-sm text-muted-foreground mt-1">{document.feedback}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Document Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Status</span>
                <span className="text-sm capitalize">{document.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">File Type</span>
                <span className="text-sm uppercase">{document.fileType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Upload Date</span>
                <span className="text-sm">{new Date(document.uploadDate).toLocaleDateString()}</span>
              </div>

              {document.reviewDate && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Review Date</span>
                  <span className="text-sm">{new Date(document.reviewDate).toLocaleDateString()}</span>
                </div>
              )}

              <Separator />

              {isEmployee && document.status === "pending" && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Feedback (Optional)</h3>
                    <Textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Add your feedback or notes here"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleUpdateStatus("reviewing")}
                      disabled={isSubmitting}
                    >
                      Mark as Reviewing
                    </Button>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => handleUpdateStatus("approved")}
                      disabled={isSubmitting}
                    >
                      Approve Document
                    </Button>
                    <Button
                      className="w-full bg-red-600 hover:bg-red-700"
                      onClick={() => handleUpdateStatus("rejected")}
                      disabled={isSubmitting}
                    >
                      Reject Document
                    </Button>
                  </div>
                </div>
              )}

              {isEmployee && document.status === "reviewing" && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Feedback (Optional)</h3>
                    <Textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Add your feedback or notes here"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => handleUpdateStatus("approved")}
                      disabled={isSubmitting}
                    >
                      Approve Document
                    </Button>
                    <Button
                      className="w-full bg-red-600 hover:bg-red-700"
                      onClick={() => handleUpdateStatus("rejected")}
                      disabled={isSubmitting}
                    >
                      Reject Document
                    </Button>
                  </div>
                </div>
              )}

              {isCustomer && document.status === "rejected" && (
                <div className="space-y-2">
                  <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                    <Link href="/dashboard/upload">Upload New Version</Link>
                  </Button>
                </div>
              )}

              {(isEmployee || (isCustomer && document.customerId === user?.id)) && (
                <Button variant="destructive" className="w-full mt-4" onClick={handleDelete}>
                  Delete Document
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
