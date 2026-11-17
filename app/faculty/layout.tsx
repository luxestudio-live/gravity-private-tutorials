import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Expert Faculty & Mentors | Gravity Private Tutorials",
  description:
    "Meet the experienced faculty and expert educators at Gravity Private Tutorials, dedicated to mentoring students in ICSE, CBSE, Science, JEE, NEET, and MHT-CET.",
  alternates: {
    canonical: "/faculty",
  },
  openGraph: {
    title: "Expert Faculty & Mentors | Gravity Private Tutorials",
    description:
      "Meet the experienced faculty and expert educators at Gravity Private Tutorials dedicated to student success and academic excellence.",
    url: "https://www.gravityprivatetutorials.com/faculty",
    siteName: "Gravity Private Tutorials",
    images: ["/gravity-logo.png"],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert Faculty & Mentors | Gravity Private Tutorials",
    description:
      "Meet the experienced faculty at Gravity Private Tutorials in Kandivali & Santacruz, Mumbai.",
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
      name: "Faculty",
      item: "https://www.gravityprivatetutorials.com/faculty",
    },
  ],
}

export default function FacultyLayout({ children }: { children: React.ReactNode }) {
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

