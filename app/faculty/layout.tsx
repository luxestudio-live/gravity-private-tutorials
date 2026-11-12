import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Expert Faculty",
  description:
    "Meet the experienced faculty and expert educators at Gravity Private Tutorials dedicated to student success and academic excellence.",
  alternates: {
    canonical: "/faculty",
  },
  openGraph: {
    title: "Expert Faculty | Gravity Private Tutorials",
    description:
      "Meet the experienced faculty and expert educators at Gravity Private Tutorials dedicated to student success.",
    url: "https://www.gravityprivatetutorials.com/faculty",
  },
}

export default function FacultyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

