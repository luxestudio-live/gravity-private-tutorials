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
  title: "Gravity Private Tutorials - Premium Coaching for Excellence",
  description:
    "Leading coaching institute for 5th-10th and 11th-12th students. Expert faculty, proven results, comprehensive courses.",
  generator: "v0.app",
  metadataBase: new URL("https://gravitytutorials.theluxestudio.in"),
  openGraph: {
    title: "Gravity Private Tutorials - Premium Coaching for Excellence",
    description:
      "Leading coaching institute for 5th-10th and 11th-12th students. Expert faculty, proven results, comprehensive courses.",
    url: "https://gravitytutorials.theluxestudio.in/",
    siteName: "Gravity Private Tutorials",
    images: [
      {
        url: "/gravity-logo.png",
        width: 1200,
        height: 630,
        alt: "Gravity Private Tutorials - A Symbol of Knowledge",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gravity Private Tutorials - Premium Coaching for Excellence",
    description:
      "Leading coaching institute for 5th-10th and 11th-12th students. Expert faculty, proven results, comprehensive courses.",
    images: ["/gravity-logo.png"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
