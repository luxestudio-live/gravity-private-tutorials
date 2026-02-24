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
    featuredToppers: [
      { name: "Hrithik Pandey", standard: "NEET-2023", score: "681/720", rank: "AIR - 1499", category: "Medical", subjects: ["Medical Entrance"], image: "https://placehold.co/200x200/4F46E5/FFFFFF/png?text=HP" },
      { name: "Ritesh Vishwakarma", standard: "NEET-2022", score: "645/720", rank: "AIR - 5333", category: "Medical", subjects: ["Grant Medical College - Sir J.J. Hospital Mumbai"] },
      { name: "Rudra Vengurlekar", standard: "JEE-ADV 2021", score: "98.33%", rank: "AIR - 8025", category: "Engineering", subjects: ["ITI GANDHINAGAR CHEMICAL ENGG."], image: "https://placehold.co/200x200/7C3AED/FFFFFF/png?text=RV" },
      { name: "Riddhi Bhor", standard: "MHT-CET 2023", score: "99.46%", rank: "VIT Pune-Chem Eng", category: "Engineering", subjects: ["Vishwakarma Institute of Technology"] },
      { name: "Priya Sharma", standard: "NEET-2023", score: "640/720", rank: "AIR - 6200", category: "Medical", subjects: ["MBBS Admission"], image: "https://placehold.co/200x200/EC4899/FFFFFF/png?text=PS" },
      { name: "Aditya Kulkarni", standard: "JEE-MAIN 2023", score: "98.8%", rank: "AIR - 9500", category: "Engineering", subjects: ["Computer Engineering"] },
      { name: "Sneha Deshmukh", standard: "NEET-2022", score: "635/720", rank: "AIR - 7100", category: "Medical", subjects: ["BDS Admission"], image: "https://placehold.co/200x200/10B981/FFFFFF/png?text=SD" },
      { name: "Rohan Patil", standard: "MHT-CET 2023", score: "99.2%", rank: "State Rank - 450", category: "Engineering", subjects: ["Mechanical Engineering"] },
      { name: "Ananya Joshi", standard: "NEET-2023", score: "630/720", rank: "AIR - 8500", category: "Medical", subjects: ["MBBS Admission"], image: "https://placehold.co/200x200/F59E0B/FFFFFF/png?text=AJ" },
      { name: "Karan Mehta", standard: "JEE-ADV 2022", score: "97.5%", rank: "AIR - 12000", category: "Engineering", subjects: ["IIT Admission"] },
    ],
    cbse10thToppers: [
      { name: "Sanskruti Malhotra", score: "96.20%", rank: "1st", school: "PBAG School", image: "https://placehold.co/150x150/4F46E5/FFFFFF/png?text=SM" },
      { name: "Vaibhavi Kulkarni", score: "95.00%", rank: "2nd", school: "Adarsh Vidyalaya" },
      { name: "Vedant Gupta", score: "94.50%", rank: "3rd", school: "PBAG School", image: "https://placehold.co/150x150/7C3AED/FFFFFF/png?text=VG" },
      { name: "Kunal Reddy", score: "93.50%", rank: "4th", school: "Adarsh Vidyalaya" },
      { name: "Aaiya Desai", score: "93.00%", rank: "5th", school: "PBAG School", image: "https://placehold.co/150x150/EC4899/FFFFFF/png?text=AD" },
      { name: "Aayesha Patel", score: "92.20%", rank: "6th", school: "PBAG School" },
      { name: "Rehan Shaikh", score: "92.00%", rank: "7th", school: "HK Veevan School", image: "https://placehold.co/150x150/10B981/FFFFFF/png?text=RS" },
      { name: "Samarth Pandey", score: "91.50%", rank: "8th", school: "HK Veevan School" },
      { name: "Rohana Rajput", score: "91.60%", rank: "9th", school: "PBAG School", image: "https://placehold.co/150x150/F59E0B/FFFFFF/png?text=RR" },
      { name: "Tanvi Rathore", score: "91.00%", rank: "10th", school: "Oxford School" },
    ],
    icse10thToppers: [
      { name: "Aarchi Singh", score: "95.00%", rank: "1st", school: "St. Mary's School", image: "https://placehold.co/150x150/4F46E5/FFFFFF/png?text=AS" },
      { name: "Yashshree Sharma", score: "94.00%", rank: "2nd", school: "Ryan International" },
      { name: "Sai Menon", score: "93.50%", rank: "3rd", school: "Cathedral School", image: "https://placehold.co/150x150/7C3AED/FFFFFF/png?text=SM" },
      { name: "Siddhi Mehta", score: "92.80%", rank: "4th", school: "St. Xavier's School" },
      { name: "Varad Deshpande", score: "92.00%", rank: "5th", school: "Campion School", image: "https://placehold.co/150x150/EC4899/FFFFFF/png?text=VD" },
      { name: "Priya Kapoor", score: "91.50%", rank: "6th", school: "Bombay Scottish" },
      { name: "Arjun Thakur", score: "91.00%", rank: "7th", school: "JB Petit School", image: "https://placehold.co/150x150/10B981/FFFFFF/png?text=AT" },
      { name: "Neha Pillai", score: "90.50%", rank: "8th", school: "Cathedral School" },
      { name: "Rohan Malhotra", score: "90.20%", rank: "9th", school: "St. Mary's School", image: "https://placehold.co/150x150/F59E0B/FFFFFF/png?text=RM" },
      { name: "Sneha Desai", score: "90.00%", rank: "10th", school: "Ryan International" },
    ],
    hsc12thToppers: [
      { name: "Mahesh Kumar", score: "94.67%", rank: "1st", school: "Ratna Junior College", image: "https://placehold.co/150x150/4F46E5/FFFFFF/png?text=MK" },
      { name: "Aishwarya Kulkarni", score: "94.67%", rank: "2nd", school: "Mithibai College" },
      { name: "Sanjay Upadhyay", score: "92.83%", rank: "3rd", school: "Mahila Samiti College", image: "https://placehold.co/150x150/7C3AED/FFFFFF/png?text=SU" },
      { name: "Piyush Mishra", score: "91.50%", rank: "4th", school: "Royal College" },
      { name: "Meghana Patil", score: "91.17%", rank: "5th", school: "SKN College", image: "https://placehold.co/150x150/EC4899/FFFFFF/png?text=MP" },
      { name: "Rahul Singh", score: "90.83%", rank: "6th", school: "Jai Hind College" },
      { name: "Priyanka Deshpande", score: "90.50%", rank: "7th", school: "HR College", image: "https://placehold.co/150x150/10B981/FFFFFF/png?text=PD" },
      { name: "Amit Kumar", score: "90.17%", rank: "8th", school: "Ramnarain Ruia College" },
      { name: "Divya Menon", score: "90.00%", rank: "9th", school: "KC College", image: "https://placehold.co/150x150/F59E0B/FFFFFF/png?text=DM" },
      { name: "Vikram Pandey", score: "89.83%", rank: "10th", school: "Wilson College" },
    ],
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
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-background via-primary/5 to-secondary/5">
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
              <span className="block mt-4 text-foreground">Results</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Celebrating success stories that inspire excellence
            </p>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
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

      <Footer />
    </main>
  )
}
