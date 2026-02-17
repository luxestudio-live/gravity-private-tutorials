import { CheckCircle2, Users, Trophy, BookOpen, Target, Heart } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Expert Faculty",
    description: "Learn from experienced educators with proven teaching methodologies",
  },
  {
    icon: Trophy,
    title: "Proven Track Record",
    description: "Consistently producing top rankers and high achievers year after year",
  },
  {
    icon: BookOpen,
    title: "Comprehensive Study Material",
    description: "Well-researched content covering entire syllabus with practice questions",
  },
  {
    icon: Target,
    title: "Focused Approach",
    description: "Targeted preparation strategies for board exams and competitive tests",
  },
  {
    icon: CheckCircle2,
    title: "Regular Assessments",
    description: "Periodic tests and mock exams to track progress and improvement",
  },
  {
    icon: Heart,
    title: "Personal Attention",
    description: "Small batch sizes ensuring individual focus on every student",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
            What Makes Us
            <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Different & Better
            </span>
          </h2>
          <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
            Experience the Gravity Private Tutorials advantage that sets us apart
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 bg-card rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <feature.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 -z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
