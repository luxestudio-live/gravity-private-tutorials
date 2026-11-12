import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Courses & Academic Programs",
  description:
    "Specialized coaching programs for ICSE & CBSE Classes 8th–10th, 11th–12th Science, and competitive entrance batches for IIT JEE, NEET & MHT-CET.",
  alternates: {
    canonical: "/courses",
  },
  openGraph: {
    title: "Courses & Academic Programs | Gravity Private Tutorials",
    description:
      "Specialized coaching programs for ICSE & CBSE Classes 8th–10th, 11th–12th Science, and competitive entrance batches for IIT JEE, NEET & MHT-CET.",
    url: "https://www.gravityprivatetutorials.com/courses",
  },
}

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
