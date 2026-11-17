import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Outstanding Results & Toppers | NEET, JEE, CET, ICSE & CBSE",
  description:
    "Celebrating topper achievements in Entrance Exams (NEET, JEE, CET), ICSE Class 10th, and CBSE Class 10th at Gravity Private Tutorials in Kandivali (E) & Santacruz (W), Mumbai.",
  alternates: {
    canonical: "/results",
  },
  openGraph: {
    title: "Outstanding Results & Toppers | Gravity Private Tutorials",
    description:
      "Celebrating topper achievements in Entrance Exams (NEET, JEE, CET), ICSE Class 10th, and CBSE Class 10th at Gravity Private Tutorials.",
    url: "https://www.gravityprivatetutorials.com/results",
    siteName: "Gravity Private Tutorials",
    images: ["/gravity-logo.png"],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Outstanding Results & Toppers | Gravity Private Tutorials",
    description:
      "Discover the stellar academic results and entrance exam toppers from Gravity Private Tutorials, Mumbai.",
    images: ["/gravity-logo.png"],
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.gravityprivatetutorials.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Results",
      item: "https://www.gravityprivatetutorials.com/results",
    },
  ],
}

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  )
}

