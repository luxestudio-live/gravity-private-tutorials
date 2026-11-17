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
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

