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
    "Gravity Private Tutorials is Mumbai's premier coaching institute with centers in Kandivali (E) and Santacruz (W), offering expert coaching for Classes 8th–10th (ICSE & CBSE), 11th–12th Science, and competitive entrance exams including IIT JEE, NEET, and MHT-CET.",
  applicationName: "Gravity Private Tutorials",
  category: "education",
  classification: "Coaching Institute, Private Tutorials, Entrance Exam Prep",
  keywords: [
    "Gravity Private Tutorials",
    "Gravity Tutorials Mumbai",
    "Gravity Tutorials Kandivali",
    "Gravity Tutorials Santacruz",
    "Kandivali East Coaching Classes",
    "Santacruz West Coaching Classes",
    "Private Tutorials Kandivali East",
    "Private Tutorials Santacruz West",
    "ICSE 10th Coaching Mumbai",
    "CBSE 10th Coaching Kandivali",
    "ICSE Class 8 9 10 Tuition Mumbai",
    "CBSE Class 8 9 10 Tuition Mumbai",
    "11th 12th Science Coaching Mumbai",
    "HSC Science Coaching Kandivali",
    "IIT JEE Coaching Mumbai",
    "IIT JEE Coaching Kandivali",
    "IIT JEE Coaching Santacruz",
    "NEET Coaching Mumbai",
    "NEET Coaching Kandivali East",
    "NEET Coaching Santacruz West",
    "MHT-CET Classes Kandivali",
    "MHT-CET Coaching Mumbai",
    "Centrium Mall Coaching Classes",
    "Near Asha Parekh Hospital Coaching Classes",
    "Best Coaching Institute Mumbai",
    "Best Tutorials in Mumbai",
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
      "Premier coaching institute with centers in Kandivali (E) and Santacruz (W), Mumbai for Classes 8th–10th (ICSE & CBSE), 11th–12th Science, and Entrance Exams (IIT JEE, NEET, MHT-CET).",
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
      "Premier coaching institute with centers in Kandivali (E) and Santacruz (W), Mumbai for Classes 8th–10th (ICSE & CBSE), 11th–12th Science, and Entrance Exams (IIT JEE, NEET, MHT-CET).",
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
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": "https://www.gravityprivatetutorials.com/#organization",
      name: "Gravity Private Tutorials",
      alternateName: ["Gravity Tutorials", "Gravity Coaching Classes", "Gravity Classes Mumbai"],
      url: "https://www.gravityprivatetutorials.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.gravityprivatetutorials.com/gravity-logo.png",
        width: 1200,
        height: 630,
      },
      image: "https://www.gravityprivatetutorials.com/gravity-logo.png",
      description:
        "Gravity Private Tutorials is Mumbai's premier coaching institute with centers in Kandivali (East) and Santacruz (West), providing expert coaching for Classes 8th–10th (ICSE & CBSE), 11th–12th Science, and competitive entrance examinations including IIT-JEE, NEET, and MHT-CET.",
      telephone: ["+91 93218 61630", "+91 8104010342"],
      email: "info@gravitytutorials.com",
      foundingDate: "2019",
      sameAs: [
        "https://www.facebook.com/gravityprivatetutorials/",
        "https://youtube.com/@gravityprivatetutorials6739",
        "https://wa.me/919321861630",
        "https://play.google.com/store/apps/details?id=com.gravity.gravitydost",
      ],
      areaServed: [
        {
          "@type": "AdministrativeArea",
          name: "Mumbai",
        },
        {
          "@type": "AdministrativeArea",
          name: "Maharashtra",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Academic Coaching Programs",
        itemListElement: [
          {
            "@type": "Course",
            name: "Class 8th to 10th ICSE Coaching",
            description:
              "Comprehensive academic coaching for ICSE Class 8, 9, and 10 students with focused test series and board exam preparation.",
            provider: { "@id": "https://www.gravityprivatetutorials.com/#organization" },
          },
          {
            "@type": "Course",
            name: "Class 8th to 10th CBSE Coaching",
            description:
              "Conceptual coaching aligned with the CBSE curriculum for Mathematics, Science, and Social Sciences.",
            provider: { "@id": "https://www.gravityprivatetutorials.com/#organization" },
          },
          {
            "@type": "Course",
            name: "11th & 12th Science (HSC / Junior College)",
            description:
              "Specialized coaching for Physics, Chemistry, Mathematics, and Biology for Higher Secondary students.",
            provider: { "@id": "https://www.gravityprivatetutorials.com/#organization" },
          },
          {
            "@type": "Course",
            name: "IIT-JEE Main & Advanced Preparation",
            description:
              "Rigorous engineering entrance coaching covering full syllabus, problem solving, past year papers, and national-level mock tests.",
            provider: { "@id": "https://www.gravityprivatetutorials.com/#organization" },
          },
          {
            "@type": "Course",
            name: "NEET (UG) Medical Entrance Coaching",
            description:
              "Focused medical entrance coaching with NCERT mastery, biology deep dives, and speed-accuracy drills.",
            provider: { "@id": "https://www.gravityprivatetutorials.com/#organization" },
          },
          {
            "@type": "Course",
            name: "MHT-CET Coaching",
            description:
              "Targeted preparation for Maharashtra Common Entrance Test for engineering and pharmacy admissions.",
            provider: { "@id": "https://www.gravityprivatetutorials.com/#organization" },
          },
        ],
      },
      department: [
        {
          "@type": ["EducationalOrganization", "LocalBusiness"],
          "@id": "https://www.gravityprivatetutorials.com/#kandivali-branch",
          name: "Gravity Private Tutorials - Kandivali (East) Branch",
          image: "https://www.gravityprivatetutorials.com/gravity-logo.png",
          telephone: "+91 93218 61630",
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Shop No. 56, Centrium Mall, Near Lokhandwala Circle, Lokhandwala Township",
            addressLocality: "Kandivali (East)",
            addressRegion: "Mumbai, Maharashtra",
            postalCode: "400101",
            addressCountry: "IN",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 19.2083,
            longitude: 72.8715,
          },
          hasMap: "https://maps.app.goo.gl/wYookRnnUiAmpg848",
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              opens: "07:00",
              closes: "21:30",
            },
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Sunday"],
              opens: "09:00",
              closes: "21:00",
            },
          ],
        },
        {
          "@type": ["EducationalOrganization", "LocalBusiness"],
          "@id": "https://www.gravityprivatetutorials.com/#santacruz-branch",
          name: "Gravity Private Tutorials - Santacruz (West) Branch",
          image: "https://www.gravityprivatetutorials.com/gravity-logo.png",
          telephone: "+91 93218 61630",
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Ratandeep, Shop No. H/73, Plot No. 33, Well, Near Asha Parekh Hospital, Opposite Kalki Showroom",
            addressLocality: "Santacruz (West)",
            addressRegion: "Mumbai, Maharashtra",
            postalCode: "400054",
            addressCountry: "IN",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 19.0833,
            longitude: 72.8361,
          },
          hasMap: "https://www.google.com/maps/search/?api=1&query=Ratandeep+Near+Asha+Parekh+Hospital+Santacruz+West+Mumbai+400054",
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              opens: "07:00",
              closes: "21:30",
            },
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Sunday"],
              opens: "09:00",
              closes: "21:00",
            },
          ],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.gravityprivatetutorials.com/#website",
      url: "https://www.gravityprivatetutorials.com",
      name: "Gravity Private Tutorials",
      publisher: { "@id": "https://www.gravityprivatetutorials.com/#organization" },
      inLanguage: "en-IN",
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.gravityprivatetutorials.com/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Where are Gravity Private Tutorials branches located in Mumbai?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Gravity Private Tutorials operates two prime centers in Mumbai: 1) Kandivali (East) Branch at Shop No. 56, Centrium Mall, Near Lokhandwala Circle, Mumbai 400101, and 2) Santacruz (West) Branch at Ratandeep, Shop No. H/73, Plot No. 33, Well, Near Asha Parekh Hospital, Opposite Kalki Showroom, Mumbai 400054.",
          },
        },
        {
          "@type": "Question",
          name: "Which courses and entrance exams does Gravity Private Tutorials coach for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We provide expert coaching for Classes 8th, 9th, and 10th (ICSE & CBSE), 11th & 12th Science (HSC/CBSE), and competitive entrance examinations including IIT-JEE (Main & Advanced), NEET Medical UG, and MHT-CET.",
          },
        },
        {
          "@type": "Question",
          name: "How can I contact Gravity Private Tutorials for admissions and fee inquiries?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can call or WhatsApp +91 93218 61630 or +91 8104010342, email info@gravitytutorials.com, or visit our Kandivali (E) or Santacruz (W) centers. Centers are open Monday–Saturday from 7:00 AM to 9:30 PM and Sunday from 9:00 AM to 9:00 PM.",
          },
        },
        {
          "@type": "Question",
          name: "What is the batch size at Gravity Private Tutorials?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We maintain small batch sizes of 35 to 40 students to ensure individual attention, personalized doubt-clearing sessions, and continuous performance tracking.",
          },
        },
        {
          "@type": "Question",
          name: "Are scholarships available for students at Gravity Private Tutorials?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, the top 3 rankers from any school receive a 30% merit scholarship discount on any course.",
          },
        },
      ],
    },
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
