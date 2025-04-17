import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Features() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-teal-700">Secure Document Upload</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Upload your documents securely with end-to-end encryption. We support all common file formats including PDF,
            JPEG, PNG, and more.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-teal-700">Real-time Status Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Track the status of your documents in real-time. Get notified when your documents are viewed, approved, or
            require additional information.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-teal-700">Efficient Review Process</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Bank employees can efficiently review, approve, or request changes to submitted documents through an
            intuitive interface.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-teal-700">Document Organization</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            All your documents are organized by category and status, making it easy to find what you need when you need
            it.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-teal-700">Automated Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Receive automated notifications via email or SMS when there are updates to your document status or when
            action is required.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-teal-700">Secure Communication</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Communicate directly with bank representatives through our secure messaging system regarding your documents.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
