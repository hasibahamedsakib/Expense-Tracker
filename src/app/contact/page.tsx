import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  ArrowRight,
  Clock,
  Users,
  HeadphonesIcon,
} from "lucide-react";
import SEOComponent from "@/components/seo/SEOComponent";

export const metadata: Metadata = {
  title: "Contact Us - AI Expense Tracker Bangladesh | Get Support & Help",
  description:
    "Contact AI Expense Tracker Bangladesh for support, feedback, or inquiries. We are here to help you with your financial tracking needs. 24/7 customer support available.",
  keywords: [
    "contact expense tracker bangladesh",
    "customer support bangladesh",
    "expense tracker help",
    "financial app support bangladesh",
    "taka tracker contact",
    "ai expense tracker customer service",
  ],
  openGraph: {
    title: "Contact Us - AI Expense Tracker Bangladesh | Get Support & Help",
    description:
      "Contact AI Expense Tracker Bangladesh for support, feedback, or inquiries. We are here to help you with your financial tracking needs.",
    url: "https://costing-tracker-cxoiu1yv6-sakibs-project.vercel.app/contact",
  },
};

const contactInfo = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help via email within 24 hours",
    contact: "support@expensetracker.bd",
    action: "mailto:support@expensetracker.bd",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Call us for immediate assistance",
    contact: "+880 1700-000000",
    action: "tel:+8801700000000",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our support team",
    contact: "Available 24/7",
    action: "#",
  },
  {
    icon: MapPin,
    title: "Office Location",
    description: "Visit our headquarters",
    contact: "Dhaka, Bangladesh",
    action: "#",
  },
];

const supportHours = [
  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
  { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
  { day: "Sunday", hours: "Emergency Support Only" },
];

const faqs = [
  {
    question: "How do I reset my password?",
    answer:
      'You can reset your password by clicking the "Forgot Password" link on the login page and following the instructions sent to your email.',
  },
  {
    question: "Is my financial data secure?",
    answer:
      "Yes, we use bank-grade 256-bit encryption to protect your data. Your information is never shared with third parties.",
  },
  {
    question: "Can I export my expense data?",
    answer:
      "Yes, you can export your expense data in CSV or PDF format from the dashboard analytics section.",
  },
  {
    question: "How does the AI generate insights?",
    answer:
      "Our AI analyzes your spending patterns, compares them with similar user profiles, and provides personalized recommendations based on your financial goals.",
  },
];

export default function ContactPage() {
  const breadcrumbs = [
    {
      name: "Home",
      url: "https://costing-tracker-cxoiu1yv6-sakibs-project.vercel.app",
    },
    {
      name: "Contact Us",
      url: "https://costing-tracker-cxoiu1yv6-sakibs-project.vercel.app/contact",
    },
  ];

  return (
    <>
      <SEOComponent
        title="Contact Us - AI Expense Tracker Bangladesh | Get Support & Help"
        description="Contact AI Expense Tracker Bangladesh for support, feedback, or inquiries. We are here to help you with your financial tracking needs."
        breadcrumbs={breadcrumbs}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Expense Tracker BD
            </Link>
            <div className="flex gap-4">
              <Link href="/features">
                <Button variant="ghost">Features</Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost">About</Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Back to App</Button>
              </Link>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Get in
            <span className="text-blue-600"> Touch</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            We are here to help you make the most of your expense tracking
            experience. Reach out to us for support, feedback, or any questions
            you might have.
          </p>
        </section>

        {/* Contact Methods */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            How Can We Help You?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <info.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                  <CardDescription>{info.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <a
                    href={info.action}
                    className="text-blue-600 font-semibold hover:text-blue-700"
                  >
                    {info.contact}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium mb-2"
                      >
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium mb-2"
                      >
                        Last Name
                      </label>
                      <Input id="lastName" placeholder="Enter your last name" />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2"
                    >
                      Subject
                    </label>
                    <Input id="subject" placeholder="What is this regarding?" />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      rows={6}
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  <Button
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Send Message <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>

              {/* Support Info */}
              <div>
                <h3 className="text-2xl font-bold mb-6">Support Hours</h3>
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <Clock className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="font-semibold">Business Hours</span>
                    </div>
                    <div className="space-y-2">
                      {supportHours.map((schedule, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-gray-600">{schedule.day}</span>
                          <span className="font-medium">{schedule.hours}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <h3 className="text-2xl font-bold mb-6">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold">10,000+</div>
                      <div className="text-sm text-gray-600">Happy Users</div>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <HeadphonesIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold">24/7</div>
                      <div className="text-sm text-gray-600">Support</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {faq.answer}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Tracking?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of Bangladeshis who are already managing their
            finances smarter with our AI-powered platform.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Expense Tracker BD</h3>
                <p className="text-gray-400">
                  Bangladesh smartest AI-powered expense tracking platform.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/features" className="hover:text-white">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:text-white">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:text-white">
                      AI Insights
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/about" className="hover:text-white">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-white">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="hover:text-white">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:text-white">
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a
                      href="mailto:support@expensetracker.bd"
                      className="hover:text-white"
                    >
                      Email Support
                    </a>
                  </li>
                  <li>
                    <a href="tel:+8801700000000" className="hover:text-white">
                      Phone Support
                    </a>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-white">
                      Contact Form
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>
                &copy; 2025 Expense Tracker Bangladesh. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
