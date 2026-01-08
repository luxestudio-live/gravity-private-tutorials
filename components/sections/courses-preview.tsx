import { Button } from "@/components/ui/button"
import { GraduationCap, Calculator, Beaker, ArrowRight } from "lucide-react"
import Link from "next/link"

const courses = [
  {
    icon: GraduationCap,
    title: "5th to 10th Standard",
    medium: "English Medium",
    subjects: ["Mathematics", "Science", "Languages", "Social Studies"],
    color: "from-primary to-accent",
  },
  {
    icon: Beaker,
    title: "11th & 12th Science",
    medium: "JEE, NEET & CET Preparation",
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
    color: "from-accent to-secondary",
  },
  {
    icon: Calculator,
    title: "11th & 12th Commerce",
    medium: "Board & Competitive Exams",
    subjects: ["Accounts", "Economics", "Business Studies", "Maths"],
    color: "from-secondary to-primary",
  },
]

export function CoursesPreview() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Comprehensive
            <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Course Offerings
            </span>
          </h2>
          <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
            Tailored programs designed to bring out the best in every student
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {courses.map((course, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-3xl border border-border/50 hover:border-primary/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              <div className="relative z-10 p-8">
                {/* Icon */}
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${course.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}
                >
                  <course.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                  {course.title}
                </h3>
                <p className="text-muted-foreground mb-6 font-medium">{course.medium}</p>

                {/* Subjects */}
                <div className="space-y-2 mb-6">
                  {course.subjects.map((subject, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-foreground/80">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>{subject}</span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <Button variant="ghost" className="w-full group/btn justify-between hover:bg-primary/10" asChild>
                  <Link href="/courses">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="text-lg px-8 py-6 group" asChild>
            <Link href="/courses">
              <span className="flex items-center gap-2">
                View All Courses
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
