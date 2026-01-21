import { Award, BookOpen, Users, TrendingUp } from "lucide-react"

const stats = [
  {
    icon: Award,
    title: "Top Rankers",
    description: "Produced 100+ top rankers in CET & JEE",
    color: "from-primary to-accent",
  },
  {
    icon: BookOpen,
    title: "Comprehensive Curriculum",
    description: "Expertly designed courses for all boards",
    color: "from-accent to-secondary",
  },
  {
    icon: Users,
    title: "Expert Faculty",
    description: "30+ experienced and dedicated teachers",
    color: "from-secondary to-primary",
  },
  {
    icon: TrendingUp,
    title: "Proven Results",
    description: "100% students achieve their target scores",
    color: "from-primary to-accent",
  },
]

export function StatsSection() {
  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Why Students Choose
            <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Decent Academy
            </span>
          </h2>
          <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
            Our commitment to excellence and proven track record make us the preferred choice for thousands of students
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative p-8 bg-card rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Background on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
              />

              <div className="relative z-10">
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                >
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {stat.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
