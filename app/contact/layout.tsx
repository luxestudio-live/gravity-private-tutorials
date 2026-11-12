import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us & Admissions",
  description:
    "Connect with Gravity Private Tutorials. Located at Shop No. 56, Centrium Mall, Kandivali (E), Mumbai. Call or WhatsApp +91 93218 61630 for admissions.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us & Admissions | Gravity Private Tutorials",
    description:
      "Visit us at Centrium Mall, Kandivali (E), Mumbai or reach our team via phone or WhatsApp at +91 93218 61630.",
    url: "https://www.gravityprivatetutorials.com/contact",
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
