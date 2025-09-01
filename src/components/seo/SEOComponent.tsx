import Script from "next/script";

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  articleData?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  organizationData?: boolean;
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
}

export default function SEOComponent({
  title,
  description,
  ogImage = "/og-image.svg",
  articleData,
  organizationData = true,
  breadcrumbs,
}: SEOProps) {
  const baseUrl = "https://costing-tracker-cxoiu1yv6-sakibs-project.vercel.app";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AI Expense Tracker Bangladesh",
    url: baseUrl,
    logo: `${baseUrl}/icon.svg`,
    description: "Bangladesh's leading AI-powered expense tracking platform",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+880-1700-000000",
      contactType: "customer service",
      availableLanguage: ["English", "Bengali"],
    },
    sameAs: [
      "https://facebook.com/expensetracker.bd",
      "https://twitter.com/expensetracker_bd",
      "https://linkedin.com/company/expense-tracker-bangladesh",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "BD",
      addressLocality: "Dhaka",
    },
  };

  const breadcrumbSchema = breadcrumbs
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((breadcrumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: breadcrumb.name,
          item: breadcrumb.url,
        })),
      }
    : null;

  const articleSchema = articleData
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description: description,
        image: `${baseUrl}${ogImage}`,
        datePublished: articleData.publishedTime,
        dateModified: articleData.modifiedTime || articleData.publishedTime,
        author: {
          "@type": "Person",
          name: articleData.author || "Expense Tracker Team",
        },
        publisher: {
          "@type": "Organization",
          name: "AI Expense Tracker Bangladesh",
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/icon.svg`,
          },
        },
        articleSection: articleData.section,
        keywords: articleData.tags?.join(", "),
      }
    : null;

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AI Expense Tracker Bangladesh",
    url: baseUrl,
    description: "Bangladesh's smartest AI-powered expense tracker in Taka (৳)",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BDT",
    },
    featureList: [
      "AI-powered expense tracking",
      "Bangladeshi Taka (৳) support",
      "Smart financial insights",
      "Budget management",
      "Spending analytics",
      "Real-time notifications",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "1247",
    },
  };

  return (
    <>
      {/* Organization Schema */}
      {organizationData && (
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      )}

      {/* Breadcrumb Schema */}
      {breadcrumbSchema && (
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      )}

      {/* Article Schema */}
      {articleSchema && (
        <Script
          id="article-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema),
          }}
        />
      )}

      {/* WebApplication Schema */}
      <Script
        id="webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webAppSchema),
        }}
      />

      {/* FAQ Schema for common questions */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is this expense tracker free to use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, our AI-powered expense tracker is completely free to use with all features included.",
                },
              },
              {
                "@type": "Question",
                name: "Does it support Bangladeshi Taka (৳)?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, our expense tracker is specifically designed for Bangladesh with full Taka (৳) currency support.",
                },
              },
              {
                "@type": "Question",
                name: "How does AI help with expense tracking?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Our AI analyzes your spending patterns, provides personalized insights, suggests budget optimizations, and offers smart financial advice based on your expenses.",
                },
              },
              {
                "@type": "Question",
                name: "Is my financial data secure?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we use enterprise-grade encryption and security measures to protect your financial data. Your information is never shared with third parties.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
