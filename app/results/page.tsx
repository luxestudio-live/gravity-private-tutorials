"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Trophy, Medal, Sparkles } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"

type TopperSection = "STAR_ACHIEVERS" | "CBSE_10TH" | "ICSE_10TH" | "HSC_12TH"

type Topper = {
  id: string
  category: TopperSection
  board?: string
  position?: number
  name: string
  score: string
  rank?: string
  school?: string
  college?: string
  standard?: string
  image?: string
}

const normalizeTopperSection = (category?: string, board?: string): TopperSection | null => {
  if (category === "STAR_ACHIEVERS" || category === "Featured") return "STAR_ACHIEVERS"
  if (category === "CBSE_10TH" || category === "CBSE-10th" || (category === "10th" && board === "CBSE")) return "CBSE_10TH"
  if (category === "ICSE_10TH" || category === "ICSE-10th" || (category === "10th" && board === "ICSE")) return "ICSE_10TH"
  if (category === "HSC_12TH" || category === "HSC-12th" || (category === "12th" && board === "HSC")) return "HSC_12TH"
  return null
}

export default function ResultsPage() {
  const [featured, setFeatured] = useState<Topper[]>([])
  const [cbse10th, setCbse10th] = useState<Topper[]>([])
  const [icse10th, setIcse10th] = useState<Topper[]>([])
  const [hsc12th, setHsc12th] = useState<Topper[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true)
        const snap = await getDocs(collection(db, "toppers"))
        const list = snap.docs
          .map((d) => ({ id: d.id, ...(d.data() as Omit<Topper, "id">) }))
          .map((item) => ({
            ...item,
            category: normalizeTopperSection(item.category, item.board),
          }))
          .filter((item): item is Topper => Boolean(item.category))

        const sortByPosition = (items: Topper[]) => items.sort((a, b) => (a.position ?? 999) - (b.position ?? 999))

        setFeatured(sortByPosition(list.filter((t) => t.category === "STAR_ACHIEVERS")).slice(0, 10))
        setCbse10th(sortByPosition(list.filter((t) => t.category === "CBSE_10TH")).slice(0, 10))
        setIcse10th(sortByPosition(list.filter((t) => t.category === "ICSE_10TH")).slice(0, 10))
        setHsc12th(sortByPosition(list.filter((t) => t.category === "HSC_12TH")).slice(0, 10))
      } catch (error) {
        console.error("Error fetching toppers:", error)
        setFeatured([])
        setCbse10th([])
        setIcse10th([])
        setHsc12th([])
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [])

  return (
    <main className="min-h-screen">
      <Navbar />

      {loading && (
        <div className="container mx-auto px-4 lg:px-8 py-10 text-center text-muted-foreground">
          Loading results...
        </div>
      )}

      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(var(--primary-rgb),0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(var(--accent-rgb),0.1),transparent_50%)]" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-sm rounded-full text-primary text-sm font-semibold border border-primary/20 shadow-lg">
              <Sparkles className="w-5 h-5 text-secondary" />
              <span>Celebrating Excellence Since 2019</span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Outstanding
              </span>
              <span className="block mt-4 text-foreground">Results</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Celebrating success stories that inspire excellence
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold mb-6">
              <Trophy className="w-4 h-4" />
              <span>National & State Ranks</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Star Achievers
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">Excellence in NEET, JEE & CET</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {featured.map((topper, index) => (
              <div key={topper.id} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />

                <div className="relative h-full bg-card rounded-3xl border-2 border-border hover:border-primary/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  <div className="h-2 bg-gradient-to-r from-primary via-secondary to-accent" />

                  {topper.image && (
                    <div className="relative w-full h-40 md:h-48 overflow-hidden bg-muted">
                      <img
                        src={topper.image}
                        alt={topper.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card/80" />
                    </div>
                  )}

                  <div className={topper.image ? "p-6 pt-4" : "p-8"}>
                    <div className="flex items-center justify-between mb-4 md:mb-6">
                      <div className="px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl text-primary text-xs font-bold uppercase tracking-wider">
                        Star
                      </div>
                      <div className="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center text-white font-bold text-sm md:text-lg shadow-lg">
                        {index + 1}
                      </div>
                    </div>

                    <div className="mb-4 md:mb-6 text-center">
                      <div className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent mb-1 md:mb-2">
                        {topper.score}
                      </div>
                      {topper.rank && <div className="text-xs md:text-sm font-semibold text-secondary">{topper.rank}</div>}
                    </div>

                    <h4 className="text-lg md:text-2xl font-bold mb-1 md:mb-2 text-center group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {topper.name}
                    </h4>

                    <p className="text-center text-muted-foreground font-medium mb-3 md:mb-4 text-sm md:text-base line-clamp-2">
                      {topper.standard || topper.college || topper.school || ""}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold mb-6">
              <Medal className="w-4 h-4" />
              <span>CBSE Board</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                CBSE 10th Toppers
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">Excellence in CBSE Board Examinations</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {cbse10th.map((topper, index) => (
              <div
                key={topper.id}
                className="group relative bg-gradient-to-br from-card to-card/50 rounded-2xl border border-border hover:border-primary/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

                <div className="relative w-full h-32 bg-muted overflow-hidden">
                  {topper.image ? (
                    <img
                      src={topper.image}
                      alt={topper.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                      <div className="text-3xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                        #{index + 1}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/60" />
                </div>

                <div className="p-5">
                  <div className="text-center mb-3">
                    <div className="text-3xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-1">
                      {topper.score}
                    </div>
                    {topper.rank && <div className="text-xs text-muted-foreground font-medium">{topper.rank}</div>}
                  </div>

                  <h4 className="text-base font-bold mb-1 text-center group-hover:text-primary transition-colors line-clamp-2">
                    {topper.name}
                  </h4>

                  {topper.school && <p className="text-center text-muted-foreground text-xs line-clamp-2">{topper.school}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-semibold mb-6">
              <Medal className="w-4 h-4" />
              <span>ICSE Board</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                ICSE 10th Toppers
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">Excellence in ICSE Board Examinations</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {icse10th.map((topper, index) => (
              <div
                key={topper.id}
                className="group relative bg-gradient-to-br from-card to-card/50 rounded-2xl border border-border hover:border-secondary/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-accent to-secondary" />

                <div className="relative w-full h-32 bg-muted overflow-hidden">
                  {topper.image ? (
                    <img
                      src={topper.image}
                      alt={topper.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-secondary/30 to-accent/30 flex items-center justify-center">
                      <div className="text-3xl font-bold bg-gradient-to-br from-secondary to-accent bg-clip-text text-transparent">
                        #{index + 1}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/60" />
                </div>

                <div className="p-5">
                  <div className="text-center mb-3">
                    <div className="text-3xl font-bold bg-gradient-to-br from-secondary to-accent bg-clip-text text-transparent mb-1">
                      {topper.score}
                    </div>
                    {topper.rank && <div className="text-xs text-muted-foreground font-medium">{topper.rank}</div>}
                  </div>

                  <h4 className="text-base font-bold mb-1 text-center group-hover:text-secondary transition-colors line-clamp-2">
                    {topper.name}
                  </h4>

                  {topper.school && <p className="text-center text-muted-foreground text-xs line-clamp-2">{topper.school}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              <span>HSC Board</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                HSC 12th Toppers
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">Excellence in HSC Science Stream</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {hsc12th.map((topper, index) => (
              <div
                key={topper.id}
                className="group relative bg-gradient-to-br from-card to-card/50 rounded-2xl border border-border hover:border-accent/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-secondary to-accent" />

                <div className="relative w-full h-32 bg-muted overflow-hidden">
                  {topper.image ? (
                    <img
                      src={topper.image}
                      alt={topper.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-accent/30 to-secondary/30 flex items-center justify-center">
                      <div className="text-3xl font-bold bg-gradient-to-br from-accent to-secondary bg-clip-text text-transparent">
                        #{index + 1}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/60" />
                </div>

                <div className="p-5">
                  <div className="text-center mb-3">
                    <div className="text-3xl font-bold bg-gradient-to-br from-accent to-secondary bg-clip-text text-transparent mb-1">
                      {topper.score}
                    </div>
                    {topper.rank && <div className="text-xs text-muted-foreground font-medium">{topper.rank}</div>}
                  </div>

                  <h4 className="text-base font-bold mb-1 text-center group-hover:text-accent transition-colors line-clamp-2">
                    {topper.name}
                  </h4>

                  {topper.school && <p className="text-center text-muted-foreground text-xs line-clamp-2">{topper.school}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
