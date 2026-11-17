import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us & Admissions | Kandivali & Santacruz Branches",
  description:
    "Connect with Gravity Private Tutorials. Visit our branches in Kandivali (E) (Centrium Mall) and Santacruz (W) (Near Asha Parekh Hospital), Mumbai. Call or WhatsApp +91 93218 61630 for admissions.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us & Admissions | Gravity Private Tutorials",
    description:
      "Visit our branches at Centrium Mall, Kandivali (E) and Santacruz (W) (Near Asha Parekh Hospital), Mumbai. Call or WhatsApp +91 93218 61630.",
    url: "https://www.gravityprivatetutorials.com/contact",
    siteName: "Gravity Private Tutorials",
    images: ["/gravity-logo.png"],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us & Admissions | Gravity Private Tutorials",
    description:
      "Connect with Gravity Private Tutorials in Kandivali (E) & Santacruz (W), Mumbai. Admissions open for ICSE, CBSE, Science, JEE & NEET.",
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
      name: "Contact",
      item: "https://www.gravityprivatetutorials.com/contact",
    },
  ],
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
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

