import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function HowToUse() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-teal-800">For Customers</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">1. Create an Account</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Register for a new account using your email address and create a secure password.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">2. Complete Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Fill in your personal information and verify your identity to activate your account.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">3. Upload Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Select the document type, upload your file, and provide any required additional information.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">4. Track Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Monitor the status of your documents through your dashboard and receive notifications on updates.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">5. Respond to Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                If additional information is requested, you'll be notified to provide the necessary details.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-teal-800">For Bank Employees</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">1. Log In</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Access the employee portal using your bank-provided credentials.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">2. View Document Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                See all pending documents that require review, sorted by priority and submission date.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">3. Review Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Open documents to review their contents and check for completeness and accuracy.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">4. Take Action</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Approve documents, request changes, or reject submissions with detailed feedback.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">5. Communicate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Send messages to customers regarding their documents through the secure messaging system.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
