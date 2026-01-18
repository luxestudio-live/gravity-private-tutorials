"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Award, BookOpen, GraduationCap, Star, Users } from "lucide-react"

type FacultyCategory = "5-10" | "11-12"

const facultyData = {
  "5-10": [
    {
      name: "Dr. Rajesh Kumar",
      subject: "Mathematics & Science",
      qualification: "Ph.D. in Mathematics, M.Sc.",
      experience: "18 Years",
      specialization: "Vedic Maths, Problem Solving",
      achievements: ["Best Teacher Award 2023", "100+ Students scored 95%+"],
      image: "/decent-academy-v1/male-teacher-math.jpg",
      color: "from-primary to-accent",
    },
    {
      name: "Prof. Priya Deshmukh",
      subject: "Languages & Social Studies",
      qualification: "M.A. English, B.Ed.",
      experience: "15 Years",
      specialization: "Creative Writing, Literature",
      achievements: ["Published Author", "Language Excellence Award"],
      image: "/decent-academy-v1/female-teacher-english.jpg",
      color: "from-accent to-secondary",
    },
    {
      name: "Mr. Santosh Patil",
      subject: "Science (Physics, Chemistry)",
      qualification: "M.Sc. Physics, B.Ed.",
      specialization: "Practical Science, Experiments",
      achievements: ["Science Innovator Award", "STEM Education Expert"],
      image: "/decent-academy-v1/male-teacher-science.jpg",
      color: "from-secondary to-primary",
    },
    {
      name: "Mrs. Anita Joshi",
      subject: "Mathematics",
      qualification: "M.Sc. Mathematics",
      experience: "14 Years",
      specialization: "Algebra, Geometry",
      achievements: ["Mathematics Olympiad Trainer", "Regional Rank Holder Creator"],
      image: "/decent-academy-v1/female-teacher-math.jpg",
      color: "from-primary to-accent",
    },
    {
      name: "Mr. Vikram Sharma",
      subject: "Marathi & Social Studies",
      qualification: "M.A. Marathi, B.Ed.",
      experience: "16 Years",
      specialization: "Maharashtra Board Expert",
      achievements: ["Cultural Heritage Award", "State Board Excellence"],
      image: "/decent-academy-v1/male-teacher-marathi.jpg",
      color: "from-accent to-secondary",
    },
    {
      name: "Dr. Sneha Kulkarni",
      subject: "Science (Biology)",
      qualification: "Ph.D. Biology, M.Sc.",
      experience: "13 Years",
      specialization: "Life Sciences, Botany",
      achievements: ["Research Publications", "Environmental Science Expert"],
      image: "/decent-academy-v1/female-teacher-biology.jpg",
      color: "from-secondary to-primary",
    },
  ],
  "11-12": [
      {
        name: "Virendra Kumar Badgujar",
        subject: "Science Teacher",
        qualification: "M.A. & B.Ed",
        experience: "",
        specialization: "Owner / Partner",
        achievements: [],
        image: "/decent-academy-v1/virendra-badgujar.jpg",
        color: "from-primary to-accent",
      },
    {
      name: "Prof. Kavita Rao",
      subject: "Chemistry (JEE/CET)",
      qualification: "M.Sc. Chemistry, M.Phil.",
      experience: "17 Years",
      specialization: "Organic Chemistry, CET Expert",
      achievements: ["Top CET Ranks Producer", "Chemistry Olympiad Coach"],
      image: "/decent-academy-v1/female-teacher-chemistry.jpg",
      color: "from-accent to-secondary",
    },
    {
      name: "Dr. Suresh Bhosale",
      subject: "Mathematics (JEE/CET)",
      qualification: "Ph.D. Mathematics, IIT-B",
      experience: "22 Years",
      specialization: "Calculus, Coordinate Geometry",
      achievements: ["JEE Mains 100 Percentile Makers", "Author of 5 Books"],
      image: "/decent-academy-v1/male-teacher-advanced-math.jpg",
      color: "from-secondary to-primary",
    },
    {
      name: "Dr. Meera Patel",
      subject: "Biology (NEET/CET)",
      qualification: "Ph.D. Zoology, MBBS",
      experience: "16 Years",
      specialization: "NEET Preparation, Zoology",
      achievements: ["Government Medical Selections", "NEET AIR Under 500"],
      image: "/decent-academy-v1/female-teacher-neet.jpg",
      color: "from-primary to-accent",
    },
    {
      name: "Prof. Ramesh Naik",
      subject: "Accountancy & Economics",
      qualification: "M.Com, CA Inter, M.Phil.",
      experience: "19 Years",
      specialization: "Financial Accounting, Macro Economics",
      achievements: ["CA Foundation Success Rate 92%", "Commerce Board Toppers"],
      image: "/decent-academy-v1/male-teacher-commerce.jpg",
      color: "from-accent to-secondary",
    },
    {
      name: "Mrs. Pooja Desai",
      subject: "Business Studies",
      qualification: "MBA, M.Com",
      experience: "14 Years",
      specialization: "Business Management, Marketing",
      achievements: ["University Rank Holders", "Entrepreneurship Mentor"],
      image: "/decent-academy-v1/female-teacher-business.jpg",
      color: "from-secondary to-primary",
    },
  ],
}

export default function FacultyPage() {
  const [activeCategory, setActiveCategory] = useState<FacultyCategory>("5-10")
  const faculty = facultyData[activeCategory]

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-20 right-10 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium border border-primary/20">
              <Users className="w-4 h-4" />
              <span>50+ Expert Educators</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-tight">
              Meet Our
              <span className="block mt-2 text-primary">Expert Faculty</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Experienced educators dedicated to nurturing excellence and shaping futures

      {/* Faculty Toggle */}
      {/* Removed filter section, all faculty shown below */}

      {/* Faculty Grid */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {faculty.map((member, index) => (
              <div
                key={index}
                className="group relative bg-card rounded-3xl border border-border/50 hover:border-primary/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-muted">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                </div>

                <div className="relative z-10 p-8 -mt-12">
                  {/* Badge */}
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r ${member.color} text-white rounded-lg text-sm font-medium mb-4 shadow-lg`}
                  >
                    <Award className="w-4 h-4" />
                    <span>{member.experience}</span>
                  </div>

                  {/* Name & Subject */}
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-primary font-semibold mb-4">{member.subject}</p>

                  {/* Qualification */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-2">
                      <GraduationCap className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                      <span className="text-sm text-foreground/80">{member.qualification}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Star className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                      <span className="text-sm text-foreground/80">{member.specialization}</span>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="pt-4 border-t border-border/50">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Key Achievements</h4>
                    <div className="space-y-2">
                      {member.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                          <span className="text-sm text-foreground/80">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
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
