import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function CustomerSupport() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-teal-800">Frequently Asked Questions</h3>
          <p className="text-gray-600 mt-2">Find answers to common questions about our platform.</p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What file formats are supported for document uploads?</AccordionTrigger>
            <AccordionContent>
              Our platform supports a wide range of file formats including PDF, JPEG, PNG, TIFF, DOC, DOCX, XLS, XLSX,
              and more. The maximum file size is 25MB per document.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How long does the document review process take?</AccordionTrigger>
            <AccordionContent>
              The review process typically takes 1-3 business days, depending on the document type and current volume.
              You'll receive notifications at each stage of the process.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is my data secure on this platform?</AccordionTrigger>
            <AccordionContent>
              Yes, we use bank-level security measures including end-to-end encryption, secure authentication, and
              regular security audits to ensure your data remains protected.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>What should I do if my document is rejected?</AccordionTrigger>
            <AccordionContent>
              If your document is rejected, you'll receive a notification with the reason. You can then make the
              necessary corrections and resubmit the document through your dashboard.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>How do I update my personal information?</AccordionTrigger>
            <AccordionContent>
              You can update your personal information by navigating to the Profile section in your dashboard. Some
              changes may require verification before they take effect.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-teal-800">Contact Support</CardTitle>
            <CardDescription>
              Need help? Send us a message and we'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" placeholder="Your email address" />
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input id="subject" placeholder="How can we help you?" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea id="message" placeholder="Please describe your issue in detail" rows={4} />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-teal-600 hover:bg-teal-700">Send Message</Button>
          </CardFooter>
        </Card>
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3">
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
              className="h-5 w-5 text-teal-600"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="text-gray-600">+1 (800) 123-4567</span>
          </div>
          <div className="flex items-center gap-3">
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
              className="h-5 w-5 text-teal-600"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span className="text-gray-600">support@securedoc.com</span>
          </div>
          <div className="flex items-center gap-3">
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
              className="h-5 w-5 text-teal-600"
            >
              <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8  11.8z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-gray-600">123 Banking Street, Financial District, NY 10001</span>
          </div>
        </div>
      </div>
    </div>
  )
}
