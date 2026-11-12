import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Outstanding Results & Toppers",
  description:
    "Celebrating topper achievements in Entrance Exams (NEET, JEE, CET), ICSE Class 10th, and CBSE Class 10th at Gravity Private Tutorials, Kandivali (E), Mumbai.",
  alternates: {
    canonical: "/results",
  },
  openGraph: {
    title: "Outstanding Results & Toppers | Gravity Private Tutorials",
    description:
      "Celebrating topper achievements in Entrance Exams (NEET, JEE, CET), ICSE Class 10th, and CBSE Class 10th at Gravity Private Tutorials.",
    url: "https://www.gravityprivatetutorials.com/results",
  },
}

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
