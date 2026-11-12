import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter, Bebas_Neue } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { FloatingEnquireButton } from "@/components/floating-enquire-button"
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.gravityprivatetutorials.com"),
  title: {
    default: "Gravity Private Tutorials | Premier Coaching for ICSE, CBSE & Entrance (NEET, JEE, CET)",
    template: "%s | Gravity Private Tutorials",
  },
  description:
    "Gravity Private Tutorials is Mumbai's premier coaching institute in Kandivali (E), offering expert coaching for Classes 8th–10th (ICSE & CBSE), 11th–12th Science, and competitive entrance exams including IIT JEE, NEET, and MHT-CET.",
  keywords: [
    "Gravity Private Tutorials",
    "Gravity Tutorials Kandivali",
    "ICSE 10th Coaching Mumbai",
    "CBSE 10th Coaching Kandivali",
    "IIT JEE Coaching Mumbai",
    "NEET Coaching Mumbai",
    "MHT-CET Classes Kandivali",
    "8th to 10th ICSE Classes",
    "8th to 10th CBSE Classes",
    "11th 12th Science Coaching",
    "Private Tutorials Kandivali East",
    "Centrium Mall Coaching Classes",
    "Best Coaching Institute Mumbai",
  ],
  authors: [{ name: "Gravity Private Tutorials", url: "https://www.gravityprivatetutorials.com" }],
  creator: "Gravity Private Tutorials",
  publisher: "Gravity Private Tutorials",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Gravity Private Tutorials | Premier Coaching for ICSE, CBSE & Entrance Exams",
    description:
      "Premier coaching institute in Kandivali (E), Mumbai for Classes 8th–10th (ICSE & CBSE), 11th–12th Science, and Entrance Exams (IIT JEE, NEET, MHT-CET).",
    url: "https://www.gravityprivatetutorials.com",
    siteName: "Gravity Private Tutorials",
    images: [
      {
        url: "/gravity-logo.png",
        width: 1200,
        height: 630,
        alt: "Gravity Private Tutorials - A Symbol of Knowledge",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gravity Private Tutorials | Premier Coaching for ICSE, CBSE & Entrance Exams",
    description:
      "Premier coaching institute in Kandivali (E), Mumbai for Classes 8th–10th (ICSE & CBSE), 11th–12th Science, and Entrance Exams (IIT JEE, NEET, MHT-CET).",
    images: ["/gravity-logo.png"],
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
  icons: {
    icon: [
      {
        url: "/gravity-logo-normal.png",
        type: "image/png",
      },
    ],
    apple: "/gravity-logo-normal.png",
    shortcut: "/gravity-logo-normal.png",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Gravity Private Tutorials",
  url: "https://www.gravityprivatetutorials.com",
  logo: "https://www.gravityprivatetutorials.com/gravity-logo.png",
  image: "https://www.gravityprivatetutorials.com/gravity-logo.png",
  description:
    "Premier coaching institute in Kandivali (E), Mumbai for Classes 8th–10th (ICSE & CBSE), 11th–12th Science, and Entrance Exams (IIT JEE, NEET, MHT-CET).",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shop No. 56, Centrium Mall",
    addressLocality: "Kandivali (East)",
    addressRegion: "Mumbai, Maharashtra",
    postalCode: "400101",
    addressCountry: "IN",
  },
  telephone: ["+91 93218 61630", "+91 8104010342"],
  email: "info@gravitytutorials.com",
  sameAs: [
    "https://www.facebook.com/gravityprivatetutorials/",
    "https://youtube.com/@gravityprivatetutorials6739",
    "https://wa.me/919321861630",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className={`${playfairDisplay.variable} ${inter.variable} ${bebasNeue.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
          <FloatingEnquireButton />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}
