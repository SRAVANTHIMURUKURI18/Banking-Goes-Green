"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type UserRole = "customer" | "employee"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

export interface Document {
  id: string
  customerId: string
  title: string
  description: string
  fileUrl: string
  fileType: string
  uploadDate: string
  status: "pending" | "reviewing" | "approved" | "rejected"
  feedback?: string
  reviewedBy?: string
  reviewDate?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  documents: Document[]
  login: (email: string, password: string, role: UserRole) => Promise<boolean>
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>
  logout: () => void
  uploadDocument: (document: Omit<Document, "id" | "customerId" | "uploadDate" | "status">) => void
  updateDocumentStatus: (documentId: string, status: Document["status"], feedback?: string) => void
  deleteDocument: (documentId: string) => void
}

// Mock users for demo
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "customer@example.com",
    role: "customer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "employee@example.com",
    role: "employee",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Mock documents for demo
const mockDocuments: Document[] = [
  {
    id: "1",
    customerId: "1",
    title: "Bank Statement",
    description: "Monthly bank statement for April 2023",
    fileUrl: "/placeholder.svg?height=300&width=400",
    fileType: "pdf",
    uploadDate: "2023-05-01T10:30:00Z",
    status: "approved",
    feedback: "All information is correct",
    reviewedBy: "2",
    reviewDate: "2023-05-02T14:20:00Z",
  },
  {
    id: "2",
    customerId: "1",
    title: "Proof of Address",
    description: "Utility bill showing current address",
    fileUrl: "/placeholder.svg?height=300&width=400",
    fileType: "jpg",
    uploadDate: "2023-05-03T09:15:00Z",
    status: "pending",
  },
  {
    id: "3",
    customerId: "1",
    title: "ID Verification",
    description: "Copy of driver's license",
    fileUrl: "/placeholder.svg?height=300&width=400",
    fileType: "png",
    uploadDate: "2023-05-03T09:20:00Z",
    status: "reviewing",
  },
]

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      documents: mockDocuments,

      login: async (email, password, role) => {
        // In a real app, this would be an API call
        const user = mockUsers.find((u) => u.email === email && u.role === role)

        if (user) {
          set({ user, isAuthenticated: true })
          return true
        }
        return false
      },

      register: async (name, email, password, role) => {
        // In a real app, this would be an API call
        const newUser: User = {
          id: `${mockUsers.length + 1}`,
          name,
          email,
          role,
          avatar: "/placeholder.svg?height=40&width=40",
        }

        mockUsers.push(newUser)
        set({ user: newUser, isAuthenticated: true })
        return true
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      uploadDocument: (document) => {
        const { user, documents } = get()
        if (!user) return

        const newDocument: Document = {
          id: `${documents.length + 1}`,
          customerId: user.id,
          uploadDate: new Date().toISOString(),
          status: "pending",
          ...document,
        }

        set({ documents: [...documents, newDocument] })
      },

      updateDocumentStatus: (documentId, status, feedback) => {
        const { user, documents } = get()
        if (!user) return

        const updatedDocuments = documents.map((doc) => {
          if (doc.id === documentId) {
            return {
              ...doc,
              status,
              feedback: feedback || doc.feedback,
              reviewedBy: user.id,
              reviewDate: new Date().toISOString(),
            }
          }
          return doc
        })

        set({ documents: updatedDocuments })
      },

      deleteDocument: (documentId) => {
        const { documents } = get()
        set({ documents: documents.filter((doc) => doc.id !== documentId) })
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)
