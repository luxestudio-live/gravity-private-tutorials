"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Trophy, Medal, Star, Award, Sparkles } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { withBasePath } from "@/lib/utils"

const CONTENT_PLACEHOLDER = withBasePath("/placeholder.svg?height=400&width=400")

type Highlight = { label: string; value: string; category: string }
type FeaturedTopper = { name: string; standard: string; score: string; rank: string; category: string; subjects?: string[]; image?: string }
type BoardTopper = { name: string; score: string; percentage?: string; rank?: string; school?: string; image?: string }
type ResultStatistics = {
  ["10th"]?: { total: number; above90?: number; above85?: number; above80?: number; above75?: number; passRate: number }
  ["12th"]?: { total: number; above90?: number; above85?: number; above80?: number; above75?: number; passRate: number }
}
type ResultsContent = {
  highlights?: Highlight[]
  featuredToppers?: FeaturedTopper[]
  cbse10thToppers?: BoardTopper[]
  icse10thToppers?: BoardTopper[]
  hsc12thToppers?: BoardTopper[]
  statistics?: ResultStatistics
}

type Topper = {
  id: string
  academicYear: string
  category: string
  board?: string
  name: string
  score: string
  percentage?: string
  rank?: string
  standard?: string
  school?: string
  college?: string
  image?: string
}

// Fallback data to use if Firestore is empty
const fallbackResultsByYear: Record<string, ResultsContent> = {
  "2024-2025": {
    highlights: [
      { label: "CBSE 10th Toppers", value: "10", category: "CBSE Board" },
      { label: "ICSE 10th Toppers", value: "10", category: "ICSE Board" },
      { label: "HSC 12th Toppers", value: "10", category: "HSC Board" },
      { label: "Success Rate", value: "100%", category: "Pass Percentage" },
    ],
    featuredToppers: [
      { name: "Hrithik Pandey", standard: "NEET-2023", score: "681/720", rank: "AIR - 1499", category: "Medical", subjects: ["Medical Entrance"] },
      { name: "Ritesh Vishwakarma", standard: "NEET-2022", score: "645/720", rank: "AIR - 5333", category: "Medical", subjects: ["Grant Medical College - Sir J.J. Hospital Mumbai"] },
      { name: "Rudra Vengurlekar", standard: "JEE-ADV 2021", score: "98.33%", rank: "AIR - 8025", category: "Engineering", subjects: ["ITI GANDHINAGAR CHEMICAL ENGG."] },
      { name: "Riddhi Bhor", standard: "MHT-CET 2023", score: "99.46%", rank: "VIT Pune-Chem Eng", category: "Engineering", subjects: ["Vishwakarma Institute of Technology"] },
    ],
    cbse10thToppers: [
      { name: "Sanskruti M.", score: "96.20%", rank: "1st", school: "PBAG School" },
      { name: "Vaibhavi K.", score: "95.00%", rank: "1st", school: "Adarsh Vidyalaya" },
      { name: "Vedant G.", score: "94.50%", rank: "3rd", school: "PBAG School" },
      { name: "Kunal R.", score: "93.50%", rank: "2nd", school: "Adarsh Vidyalaya" },
      { name: "Aaiya D.", score: "93.00%", school: "PBAG School" },
      { name: "Aayesha P.", score: "92.20%", school: "PBAG School" },
      { name: "Rehan S.", score: "92.00%", rank: "1st", school: "HK Veevan" },
      { name: "Samarth P.", score: "91.50%", rank: "2nd", school: "HK Veevan" },
      { name: "Rohana R.", score: "91.60%", school: "PBAG School" },
      { name: "Tanvi R.", score: "91.00%", school: "Oxford School" },
    ],
    icse10thToppers: [
      { name: "Aarchi S.", score: "95.00%", school: "St. Mary's School" },
      { name: "Yashshree S.", score: "94.00%", school: "Ryan International" },
      { name: "Sai M.", score: "93.50%", school: "Cathedral School" },
      { name: "Siddhi M.", score: "92.80%", school: "St. Xavier's" },
      { name: "Varad D.", score: "92.00%", school: "Campion School" },
      { name: "Priya K.", score: "91.50%", school: "Bombay Scottish" },
      { name: "Arjun T.", score: "91.00%", school: "JB Petit School" },
      { name: "Neha P.", score: "90.50%", school: "Cathedral School" },
      { name: "Rohan M.", score: "90.20%", school: "St. Mary's School" },
      { name: "Sneha D.", score: "90.00%", school: "Ryan International" },
    ],
    hsc12thToppers: [
      { name: "Mahesh K.", score: "94.67%", school: "Ratna Junior College" },
      { name: "Aishwarya K.", score: "94.67%", school: "Mithibai College" },
      { name: "Sanjay U.", score: "92.83%", school: "Mahila Samiti College" },
      { name: "Piyush M.", score: "91.50%", school: "Royal College" },
      { name: "Meghana P.", score: "91.17%", school: "SKN College" },
      { name: "Rahul S.", score: "90.83%", school: "Jai Hind College" },
      { name: "Priyanka D.", score: "90.50%", school: "HR College" },
      { name: "Amit K.", score: "90.17%", school: "Ramnarain Ruia" },
      { name: "Divya M.", score: "90.00%", school: "KC College" },
      { name: "Vikram P.", score: "89.83%", school: "Wilson College" },
    ],
    statistics: {
      "10th": { total: 102, above90: 16, above85: 35, above80: 51, passRate: 100 },
      "12th": { total: 85, above90: 15, above75: 68, passRate: 98.8 },
    },
  },
}

export default function ResultsPage() {
  const getFallbackForYear = (year: string) => fallbackResultsByYear[year] || null

  const [years, setYears] = useState<string[]>([])
  const [selectedYear, setSelectedYear] = useState<string>("2024-2025")
  const [results, setResults] = useState<ResultsContent | null>(getFallbackForYear("2024-2025"))
  const [featured, setFeatured] = useState<FeaturedTopper[]>(getFallbackForYear("2024-2025")?.featuredToppers || [])
  const [cbse10th, setCbse10th] = useState<BoardTopper[]>(getFallbackForYear("2024-2025")?.cbse10thToppers || [])
  const [icse10th, setIcse10th] = useState<BoardTopper[]>(getFallbackForYear("2024-2025")?.icse10thToppers || [])
  const [hsc12th, setHsc12th] = useState<BoardTopper[]>(getFallbackForYear("2024-2025")?.hsc12thToppers || [])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Firestore fetch: first get available years, then load selected year
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const resultsSnap = await getDocs(collection(db, "resultsPages"))
        const resultsYears = resultsSnap.docs.map((d) => d.id)

        const toppersSnap = await getDocs(collection(db, "toppers"))
        const topperYearsSet = new Set<string>()
        toppersSnap.forEach((d) => {
          const data = d.data()
          if (data.academicYear) topperYearsSet.add(data.academicYear)
        })

        const combined = Array.from(new Set([...resultsYears, ...topperYearsSet, ...Object.keys(fallbackResultsByYear)])).sort().reverse()

        if (combined.length > 0) {
          setYears(combined)
          setSelectedYear(combined[0])
        } else {
          setYears([])
          setSelectedYear("")
          setResults(null)
          setLoading(false)
        }
      } catch (err) {
        console.error("Error fetching years", err)
        setError("Could not load academic years.")
        setYears(Object.keys(fallbackResultsByYear))
        setSelectedYear(Object.keys(fallbackResultsByYear)[0] || "")
        setResults(fallbackResultsByYear[Object.keys(fallbackResultsByYear)[0]] || null)
        setLoading(false)
      }
    }

    fetchYears()
  }, [])

  useEffect(() => {
    const fetchYearData = async () => {
      if (!selectedYear) return
      try {
        setLoading(true)

        // 1) Page-level data (highlights/statistics) from resultsPages
        let yearResults = getFallbackForYear(selectedYear)
        try {
          const docRef = doc(db, "resultsPages", selectedYear)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            yearResults = docSnap.data() as ResultsContent
          }
        } catch (err) {
          console.warn("resultsPages fetch fallback", err)
        }
        setResults(yearResults || null)

        // 2) Toppers by academicYear from toppers collection
        try {
          const q = query(collection(db, "toppers"), where("academicYear", "==", selectedYear))
          const snap = await getDocs(q)
          const list = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Topper, "id">) })) as Topper[]

          if (list.length > 0) {
            setFeatured(list.filter((t) => t.category === "Featured"))
            setCbse10th(list.filter((t) => t.category === "CBSE-10th" || (t.category === "10th" && t.board === "CBSE")).slice(0, 10))
            setIcse10th(list.filter((t) => t.category === "ICSE-10th" || (t.category === "10th" && t.board === "ICSE")).slice(0, 10))
            setHsc12th(list.filter((t) => t.category === "HSC-12th" || (t.category === "12th" && t.board === "HSC")).slice(0, 10))
          } else if (yearResults) {
            // fallback to stored page data if no toppers
            setFeatured(yearResults.featuredToppers || [])
            setCbse10th(yearResults.cbse10thToppers || [])
            setIcse10th(yearResults.icse10thToppers || [])
            setHsc12th(yearResults.hsc12thToppers || [])
          } else {
            setFeatured([])
            setCbse10th([])
            setIcse10th([])
            setHsc12th([])
          }
        } catch (err) {
          console.error("Error fetching toppers", err)
          if (yearResults) {
            setFeatured(yearResults.featuredToppers || [])
            setCbse10th(yearResults.cbse10thToppers || [])
            setIcse10th(yearResults.icse10thToppers || [])
            setHsc12th(yearResults.hsc12thToppers || [])
          }
        }
      } catch (err) {
        console.error("Error fetching results", err)
        setError("Could not load results for this year.")
      } finally {
        setLoading(false)
      }
    }

    fetchYearData()
  }, [selectedYear])

  const highlights = results?.highlights || []
  const statistics = results?.statistics || {}

  return (
    <main className="min-h-screen">
      <Navbar />

      {loading && (
        <div className="container mx-auto px-4 lg:px-8 py-10 text-center text-muted-foreground">
          Loading results...
        </div>
      )}
      {!loading && !results && (
        <div className="container mx-auto px-4 lg:px-8 py-10 text-center text-destructive">
          No results available for {selectedYear}. Please try a different academic year.
        </div>
      )}

      {/* Hero Section with modern gradient */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(var(--primary-rgb),0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(var(--accent-rgb),0.1),transparent_50%)]" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-sm rounded-full text-primary text-sm font-semibold border border-primary/20 shadow-lg">
              <Sparkles className="w-5 h-5 text-secondary" />
              <span>Celebrating Excellence Since 2006</span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Outstanding
              </span>
              <span className="block mt-4 text-foreground">Results {selectedYear}</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Celebrating success stories that inspire excellence
            </p>

            {/* Academic Year Selector */}
            {years.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 pt-6">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                      selectedYear === year
                        ? "bg-primary text-white border-primary"
                        : "bg-card/60 text-foreground border-border hover:border-primary/50"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="group p-6 bg-card/60 backdrop-blur-md rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent mb-2">
                    {highlight.value}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">{highlight.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Achievers - Premium Design */}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {featured.map((topper, index) => (
              <div
                key={index}
                className="group relative"
              >
                {/* Glow effect on hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
                
                <div className="relative h-full bg-card rounded-3xl border-2 border-border hover:border-primary/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  {/* Top gradient bar */}
                  <div className="h-2 bg-gradient-to-r from-primary via-secondary to-accent" />
                  
                  {/* Image Section */}
                  {topper.image && (
                    <div className="relative w-full h-40 md:h-48 overflow-hidden bg-muted">
                      <img 
                        src={CONTENT_PLACEHOLDER}
                        alt={topper.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card/80" />
                    </div>
                  )}
                  
                  <div className={topper.image ? "p-6 pt-4" : "p-8"}>
                    {/* Rank badge */}
                    <div className="flex items-center justify-between mb-4 md:mb-6">
                      <div className="px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl text-primary text-xs font-bold uppercase tracking-wider">
                        {topper.category}
                      </div>
                      <div className="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center text-white font-bold text-sm md:text-lg shadow-lg">
                        {index + 1}
                      </div>
                    </div>

                    {/* Score - Large and prominent */}
                    <div className="mb-4 md:mb-6 text-center">
                      <div className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent mb-1 md:mb-2">
                        {topper.score}
                      </div>
                      <div className="text-xs md:text-sm font-semibold text-secondary">{topper.rank}</div>
                    </div>

                    {/* Name */}
                    <h4 className="text-lg md:text-2xl font-bold mb-1 md:mb-2 text-center group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {topper.name}
                    </h4>
                    
                    {/* Standard */}
                    <p className="text-center text-muted-foreground font-medium mb-3 md:mb-4 text-sm md:text-base">{topper.standard}</p>

                    {/* Details */}
                    {topper.subjects && topper.subjects.length > 0 && (
                      <div className="pt-3 md:pt-4 border-t border-border/50">
                        {topper.subjects.map((subject, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs md:text-sm text-foreground/70">
                            <Award className="w-3 md:w-4 h-3 md:h-4 text-accent flex-shrink-0" />
                            <span className="line-clamp-1">{subject}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CBSE 10th Toppers */}
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
                key={index}
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

      {/* ICSE 10th Toppers */}
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
                key={index}
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

      {/* HSC 12th Toppers */}
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
                key={index}
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

      {/* Statistics Section - Modern Design */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl lg:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Performance Overview
                </span>
              </h2>
              <p className="text-xl text-muted-foreground">Excellence across all standards</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {Object.entries(statistics).map(([standard, stats], index) => (
                <div
                  key={standard}
                  className="group relative bg-card/60 backdrop-blur-sm rounded-3xl border-2 border-border hover:border-primary/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Top accent bar */}
                  <div className="h-2 bg-gradient-to-r from-primary via-secondary to-accent" />
                  
                  <div className="relative z-10 p-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <h3 className="text-3xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {standard === "10th" ? "10th Standard" : "11th & 12th"}
                      </h3>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold">
                        <Trophy className="w-4 h-4" />
                        <span>{stats.total} Students</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-background/50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-accent to-secondary rounded-lg flex items-center justify-center">
                            <Star className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-foreground font-medium">Above 90%</span>
                        </div>
                        <span className="text-3xl font-bold bg-gradient-to-br from-accent to-secondary bg-clip-text text-transparent">
                          {stats.above90}
                        </span>
                      </div>

                      {stats.above85 && (
                        <div className="flex items-center justify-between p-4 bg-background/50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center">
                              <Medal className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-foreground font-medium">Above 85%</span>
                          </div>
                          <span className="text-3xl font-bold bg-gradient-to-br from-secondary to-primary bg-clip-text text-transparent">
                            {stats.above85}
                          </span>
                        </div>
                      )}

                      {stats.above80 && (
                        <div className="flex items-center justify-between p-4 bg-background/50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                              <Award className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-foreground font-medium">Above 80%</span>
                          </div>
                          <span className="text-3xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                            {stats.above80}
                          </span>
                        </div>
                      )}

                      {stats.above75 && (
                        <div className="flex items-center justify-between p-4 bg-background/50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                              <TrendingUp className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-foreground font-medium">Above 75%</span>
                          </div>
                          <span className="text-3xl font-bold bg-gradient-to-br from-secondary to-accent bg-clip-text text-transparent">
                            {stats.above75}
                          </span>
                        </div>
                      )}

                      {/* Pass Rate - Highlighted */}
                      <div className="mt-6 p-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl border-2 border-primary/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                              <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-lg font-bold text-foreground">Pass Rate</span>
                          </div>
                          <span className="text-4xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                            {stats.passRate}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
