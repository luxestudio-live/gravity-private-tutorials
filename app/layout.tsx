import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
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
  icons: {
    icon: [
      {
        url: "/decent-academy-v1/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/decent-academy-v1/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/decent-academy-v1/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/decent-academy-v1/apple-icon.png",
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
        <Analytics />
      </body>
    </html>
  )
}
