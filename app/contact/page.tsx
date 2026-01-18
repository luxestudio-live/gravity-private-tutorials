"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Youtube, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: [
      "Shop no 1, Bus Stop, Tembipada Road",
      "near Shiv Darshan Path, Bhandup West",
      "Mumbai, Maharashtra 400078",
    ],
    color: "from-primary to-accent",
  },
  {
    icon: Phone,
    title: "Call / WhatsApp",
    details: ["+91 99673 97919", "+91 99673 97919 (WhatsApp)", "Mon-Sat: 9 AM - 6 PM"],
    color: "from-accent to-secondary",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@decentacademy.com", "admissions@decentacademy.com", "support@decentacademy.com"],
    color: "from-secondary to-primary",
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: ["Monday - Saturday", "9:00 AM - 6:00 PM", "Sunday: Closed"],
    color: "from-primary to-accent",
  },
]

const socialMedia = [
  { icon: Facebook, label: "Facebook", href: "#", color: "hover:bg-blue-500" },
  { icon: Instagram, label: "Instagram", href: "#", color: "hover:bg-pink-500" },
  { icon: Youtube, label: "YouTube", href: "#", color: "hover:bg-red-500" },
  { icon: MessageSquare, label: "WhatsApp", href: "#", color: "hover:bg-green-500" },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted:", formData)
    // Handle form submission
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <main className="min-h-screen">


            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="group relative bg-card rounded-2xl border border-border/50 hover:border-primary/50 p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 text-center"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
                />
                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                  >
                    <info.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                    {info.title}
                  </h3>
                  <div className="space-y-2">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-sm text-muted-foreground leading-relaxed">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Contact Section */}
          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Contact Form */}
            <div className="group relative bg-card rounded-3xl border border-border/50 hover:border-primary/50 p-8 lg:p-12 transition-all duration-500 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl" />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-6 group-hover:text-primary transition-colors duration-300">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="border-2 focus:border-primary transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="border-2 focus:border-primary transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number *
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                      className="border-2 focus:border-primary transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="course" className="block text-sm font-medium mb-2">
                      Course Interested In *
                    </label>
                    <Select
                      value={formData.course}
                      onValueChange={(value) => setFormData({ ...formData, course: value })}
                    >
                      <SelectTrigger className="border-2 focus:border-primary transition-colors duration-300">
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5-10-marathi">5th to 10th - Marathi Medium</SelectItem>
                        <SelectItem value="5-10-english">5th to 10th - Semi English Medium</SelectItem>
                        <SelectItem value="11-12-science-pcm">11th-12th Science PCM (JEE/CET)</SelectItem>
                        <SelectItem value="11-12-science-pcb">11th-12th Science PCB (NEET/CET)</SelectItem>
                        <SelectItem value="11-12-commerce">11th-12th Commerce</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your requirements..."
                      rows={4}
                      className="border-2 focus:border-primary transition-colors duration-300 resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full group/btn relative overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Send Message
                      <Send className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                    </span>
                    <span className="absolute inset-0 bg-accent scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left" />
                  </Button>
                </form>
              </div>
            </div>

            {/* Map & Social */}
            <div className="space-y-8">
              {/* Map */}
              <div className="group relative bg-card rounded-3xl border border-border/50 hover:border-primary/50 overflow-hidden transition-all duration-500 hover:shadow-2xl h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.5477987655386!2d72.92992907512826!3d19.149988982071764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b8e9e8e9e8e9%3A0x1234567890abcdef!2sBhandup%20West%2C%20Mumbai%2C%20Maharashtra%20400078!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Social Media */}
              <div className="group relative bg-card rounded-3xl border border-border/50 hover:border-primary/50 p-8 transition-all duration-500 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-secondary/5 rounded-3xl" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6 group-hover:text-primary transition-colors duration-300">
                    Connect With Us
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Follow us on social media for updates, success stories, and educational content
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {socialMedia.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        className={`group/social flex items-center justify-center gap-3 p-4 bg-muted rounded-xl hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg ${social.color}`}
                      >
                        <social.icon className="w-5 h-5" />
                        <span className="font-medium">{social.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="group relative bg-gradient-to-br from-primary via-accent to-secondary rounded-3xl p-8 text-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
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
                  <h3 className="text-2xl font-bold mb-4">Need Immediate Assistance?</h3>
                  <p className="text-white/90 mb-6 leading-relaxed">
                    Call us directly or visit our campus for a personal consultation
                  </p>
                  <div className="flex flex-col gap-3">
                    <Button size="lg" className="bg-white text-primary hover:bg-white/90 w-full group/btn" asChild>
                      <a href="tel:+919967397919">
                        <Phone className="w-5 h-5 mr-2 group-hover/btn:rotate-12 transition-transform duration-300" />
                        Call Now
                      </a>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white/10 w-full bg-transparent"
                      asChild
                    >
                      <a href="https://wa.me/919967397919" target="_blank" rel="noopener noreferrer">
                        <MessageSquare className="w-5 h-5 mr-2" />
                        WhatsApp Us
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Frequently Asked
              <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                q: "What are the admission requirements?",
                a: "Students need to provide previous year mark sheets and appear for a basic assessment test.",
              },
              {
                q: "What is the batch size?",
                a: "We maintain small batch sizes of 20-35 students for personalized attention.",
              },
              {
                q: "Do you provide study material?",
                a: "Yes, comprehensive study material, practice sheets, and test papers are provided.",
              },
              {
                q: "Are there scholarship options?",
                a: "Merit-based scholarships are available for top performers in entrance tests.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="group bg-card rounded-2xl border border-border/50 hover:border-primary/50 p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
              >
                <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {faq.q}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
