import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gallery & Campus Moments",
  description:
    "Explore our campus life, classroom learning, workshops, and student celebrations at Gravity Private Tutorials, Kandivali (E), Mumbai.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Gallery & Campus Moments | Gravity Private Tutorials",
    description:
      "Explore our campus life, classroom learning, workshops, and student celebrations at Gravity Private Tutorials.",
    url: "https://www.gravityprivatetutorials.com/gallery",
  },
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

