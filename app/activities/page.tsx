import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PartyPopper, BookOpen, Trophy, Music, Users, FlaskConical, Palette, Mic } from "lucide-react"
import { withBasePath } from "@/lib/utils"

const CONTENT_PLACEHOLDER = withBasePath("/placeholder.svg?height=400&width=600")

const activities = [
  {
    icon: FlaskConical,
    title: "Science Exhibitions",
    description: "Annual science fair showcasing innovative student projects and experiments",
    image: "/activity-science-fair.jpg",
    color: "from-primary to-accent",
    highlights: ["Student Projects", "Live Demonstrations", "Innovation Awards"],
  },
  {
    icon: Music,
    title: "Cultural Programs",
    description: "Celebrating diverse traditions through dance, music, and theatrical performances",
    image: "/activity-cultural.jpg",
    color: "from-accent to-secondary",
    highlights: ["Annual Day", "Traditional Festivals", "Talent Shows"],
  },
  {
    icon: Trophy,
    title: "Sports Events",
    description: "Inter-batch competitions promoting fitness, teamwork, and sportsmanship",
    image: "/activity-sports.jpg",
    color: "from-secondary to-primary",
    highlights: ["Sports Day", "Cricket Tournament", "Athletics Meet"],
  },
  {
    icon: BookOpen,
    title: "Academic Competitions",
    description: "Olympiads, quiz contests, and debates fostering intellectual growth",
    image: "/activity-quiz.jpg",
    color: "from-primary to-accent",
    highlights: ["Math Olympiad", "Science Quiz", "Debate Competition"],
  },
  {
    icon: Palette,
    title: "Art & Craft Workshops",
    description: "Creative sessions exploring various art forms and artistic expression",
    image: "/activity-art.jpg",
    color: "from-accent to-secondary",
    highlights: ["Painting Workshops", "Craft Exhibitions", "Creative Arts Day"],
  },
  {
    icon: Mic,
    title: "Public Speaking",
    description: "Building confidence through elocution, presentations, and debate sessions",
    image: "/activity-speaking.jpg",
    color: "from-secondary to-primary",
    highlights: ["Elocution Contest", "Group Discussions", "Leadership Training"],
  },
  {
    icon: Users,
    title: "Community Service",
    description: "Social outreach programs teaching students the value of giving back",
    image: "/activity-community.jpg",
    color: "from-primary to-accent",
    highlights: ["Tree Plantation", "Charity Drives", "Educational Camps"],
  },
  {
    icon: PartyPopper,
    title: "Celebration Events",
    description: "Marking special occasions and achievements with memorable celebrations",
    image: "/activity-celebration.jpg",
    color: "from-accent to-secondary",
    highlights: ["Republic Day", "Independence Day", "Graduation Ceremony"],
  },
]

const upcomingEvents = [
  {
    date: "15 Feb",
    title: "Annual Science Exhibition",
    description: "Students present their innovative science projects",
    time: "10:00 AM - 4:00 PM",
  },
  {
    date: "28 Feb",
    title: "Inter-Batch Sports Competition",
    description: "Cricket and athletics events for all age groups",
    time: "9:00 AM - 5:00 PM",
  },
  {
    date: "10 Mar",
    title: "Cultural Fest 2025",
    description: "Showcase of traditional and contemporary performances",
    time: "5:00 PM - 8:00 PM",
  },
  {
    date: "25 Mar",
    title: "Math Olympiad Finals",
    description: "State-level mathematics competition",
    time: "11:00 AM - 2:00 PM",
  },
]

export default function ActivitiesPage() {
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
              <PartyPopper className="w-4 h-4" />
              <span>Beyond Academics</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-tight">
              Student
              <span className="block mt-2 text-primary">Activities & Events</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Holistic development through diverse co-curricular programs
            </p>
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Our
              <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Activity Programs
              </span>
            </h2>
            <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
              Enriching experiences that complement academic learning
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="group relative bg-card rounded-3xl border border-border/50 hover:border-primary/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-muted">
                  <img
                    src={CONTENT_PLACEHOLDER}
                    alt={activity.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

                  {/* Icon Badge */}
                  <div
                    className={`absolute top-4 left-4 w-16 h-16 bg-gradient-to-br ${activity.color} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}
                  >
                    <activity.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="p-8 -mt-8 relative z-10">
                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {activity.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{activity.description}</p>

                  {/* Highlights */}
                  <div className="space-y-2">
                    {activity.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-sm text-foreground/80">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Upcoming
              <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Events Calendar
              </span>
            </h2>
            <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
              Mark your calendars for these exciting events
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="group bg-card rounded-2xl border border-border/50 hover:border-primary/50 p-6 transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
              >
                {/* Date Badge */}
                <div className="inline-flex flex-col items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-xs font-medium">{event.date.split(" ")[1]}</div>
                  <div className="text-xl font-bold">{event.date.split(" ")[0]}</div>
                </div>

                {/* Event Details */}
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                  {event.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{event.description}</p>
                <div className="text-xs text-primary font-medium">{event.time}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary via-accent to-secondary rounded-3xl p-12 lg:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: "40px 40px",
                }}
              />
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">Why Activities Matter</h2>
              <p className="text-xl mb-8 text-white/90 text-pretty leading-relaxed max-w-2xl mx-auto">
                Co-curricular activities develop essential life skills including leadership, teamwork, creativity, and
                confidence - preparing students for success beyond academics
              </p>
              <div className="grid sm:grid-cols-3 gap-8 mt-12">
                {[
                  { number: "50+", label: "Annual Events" },
                  { number: "100%", label: "Participation" },
                  { number: "25+", label: "Activity Types" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-5xl font-bold mb-2">{stat.number}</div>
                    <div className="text-white/80 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
