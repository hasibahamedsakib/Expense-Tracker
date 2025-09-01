import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://costing-tracker-cxoiu1yv6-sakibs-project.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "AI Expense Tracker Bangladesh | Smart Financial Management with Taka (৳)",
    template: "%s | AI Expense Tracker Bangladesh",
  },
  description:
    "Bangladesh's smartest AI-powered expense tracker in Taka (৳). Track spending, get AI insights, manage budget, and make smarter financial decisions. Free personal finance app for Bangladeshi users.",
  keywords: [
    "expense tracker bangladesh",
    "taka expense tracker",
    "বাংলাদেশ খরচ ট্র্যাকার",
    "ai financial advisor bangladesh",
    "budget tracker taka",
    "personal finance bangladesh",
    "spending tracker",
    "money management app",
    "financial planning bangladesh",
    "smart budget app",
    "expense management",
    "financial insights ai",
    "bangladeshi currency tracker",
    "digital wallet bangladesh",
    "money saving app",
  ],
  authors: [{ name: "Expense Tracker Team" }],
  creator: "Expense Tracker Bangladesh",
  publisher: "Expense Tracker Bangladesh",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: siteUrl,
    siteName: "AI Expense Tracker Bangladesh",
    title:
      "AI Expense Tracker Bangladesh | Smart Financial Management with Taka (৳)",
    description:
      "Bangladesh's smartest AI-powered expense tracker in Taka (৳). Track spending, get AI insights, manage budget, and make smarter financial decisions.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "AI Expense Tracker Bangladesh - Smart Financial Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "AI Expense Tracker Bangladesh | Smart Financial Management with Taka (৳)",
    description:
      "Bangladesh's smartest AI-powered expense tracker in Taka (৳). Track spending, get AI insights, manage budget, and make smarter financial decisions.",
    images: ["/og-image.svg"],
    creator: "@expensetracker_bd",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="canonical" href="https://costing-tracker-cxoiu1yv6-sakibs-project.vercel.app" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Expense Tracker BD" />
        <meta name="application-name" content="Expense Tracker Bangladesh" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "AI Expense Tracker Bangladesh",
              url: "https://costing-tracker.vercel.app/",
              description:
                "Bangladesh's smartest AI-powered expense tracker in Taka (৳). Track spending, get AI insights, manage budget, and make smarter financial decisions.",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "BDT",
              },
              author: {
                "@type": "Organization",
                name: "Expense Tracker Bangladesh",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                bestRating: "5",
                worstRating: "1",
                ratingCount: "1247",
              },
              featureList: [
                "AI-powered expense tracking",
                "Bangladeshi Taka (৳) support",
                "Smart financial insights",
                "Budget management",
                "Spending analytics",
                "Real-time notifications",
                "Multi-category tracking",
                "Data visualization",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ToastProvider>
          <AuthProvider>{children}</AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
