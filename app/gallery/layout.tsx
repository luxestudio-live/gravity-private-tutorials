import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gallery & Campus Moments | Gravity Private Tutorials",
  description:
    "Explore campus life, classroom learning, laboratory workshops, felicitation ceremonies, and student celebrations at Gravity Private Tutorials, Mumbai.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Gallery & Campus Moments | Gravity Private Tutorials",
    description:
      "Explore our campus life, classroom learning, workshops, and student celebrations at Gravity Private Tutorials.",
    url: "https://www.gravityprivatetutorials.com/gallery",
    siteName: "Gravity Private Tutorials",
    images: ["/gravity-logo.png"],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery & Campus Moments | Gravity Private Tutorials",
    description:
      "Explore campus moments, classroom learning, and celebrations at Gravity Private Tutorials.",
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
      name: "Gallery",
      item: "https://www.gravityprivatetutorials.com/gallery",
    },
  ],
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
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

