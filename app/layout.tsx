import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { FloatingEnquireButton } from "@/components/floating-enquire-button"
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

export const metadata: Metadata = {
  title: "Decent Academy - Premium Coaching for Excellence",
  description:
    "Leading coaching institute for 5th-10th and 11th-12th students. Expert faculty, proven results, comprehensive courses.",
  generator: "v0.app",
  metadataBase: new URL("https://luxestudio-live.github.io/decent-academy-v1"),
  openGraph: {
    title: "Decent Academy - Premium Coaching for Excellence",
    description:
      "Leading coaching institute for 5th-10th and 11th-12th students. Expert faculty, proven results, comprehensive courses.",
    url: "https://luxestudio-live.github.io/decent-academy-v1",
    siteName: "Decent Academy",
    images: [
      {
        url: "/decent-academy-v1/DecentLogo.png",
        width: 1200,
        height: 630,
        alt: "Decent Academy - A Symbol of Knowledge",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Decent Academy - Premium Coaching for Excellence",
    description:
      "Leading coaching institute for 5th-10th and 11th-12th students. Expert faculty, proven results, comprehensive courses.",
    images: ["/decent-academy-v1/DecentLogo.png"],
  },
  icons: {
    icon: [
      {
        url: "/decent-academy-v1/DecentLogo.svg",
        type: "image/svg+xml",
      },
      {
        url: "/decent-academy-v1/DecentLogo.png",
        type: "image/png",
      },
    ],
    apple: "/decent-academy-v1/DecentLogo.png",
    shortcut: "/decent-academy-v1/DecentLogo.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${playfairDisplay.variable} ${inter.variable} font-sans antialiased`}>
        {children}
        <FloatingEnquireButton />
        <Analytics />
      </body>
    </html>
  )
}
