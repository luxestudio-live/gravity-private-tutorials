import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Courses & Academic Programs | ICSE, CBSE, Science, JEE & NEET",
  description:
    "Explore specialized academic coaching for ICSE & CBSE Classes 8th–10th, 11th–12th Science (HSC/CBSE), and competitive entrance exam batches for IIT-JEE, NEET, and MHT-CET at Gravity Private Tutorials.",
  alternates: {
    canonical: "/courses",
  },
  openGraph: {
    title: "Courses & Academic Programs | Gravity Private Tutorials",
    description:
      "Specialized coaching programs for ICSE & CBSE Classes 8th–10th, 11th–12th Science, and competitive entrance batches for IIT JEE, NEET & MHT-CET.",
    url: "https://www.gravityprivatetutorials.com/courses",
    siteName: "Gravity Private Tutorials",
    images: ["/gravity-logo.png"],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Courses & Academic Programs | Gravity Private Tutorials",
    description:
      "Expert coaching for ICSE & CBSE 8th–10th, 11th–12th Science, and IIT JEE, NEET & CET entrance exams in Mumbai.",
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
      name: "Courses",
      item: "https://www.gravityprivatetutorials.com/courses",
    },
  ],
}

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
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

