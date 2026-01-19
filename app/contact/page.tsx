"use client"

import { useState } from "react"
import { Navbar } from "@/decent-academy-v1/components/decent-academy-v1/navbar"
import { Footer } from "@/decent-academy-v1/components/decent-academy-v1/footer"
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Youtube, MessageSquare } from "lucide-react"
import { Button } from "@/decent-academy-v1/components/decent-academy-v1/ui/decent-academy-v1/button"
import { Input } from "@/decent-academy-v1/components/decent-academy-v1/ui/decent-academy-v1/input"
import { Textarea } from "@/decent-academy-v1/components/decent-academy-v1/ui/decent-academy-v1/textarea"

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: [
      "Shop No 1, Ground Floor, Sai Smruti Building",
      "Near Nath Pai School, Nardas Nagar, T. P. Road",
      "Bhandup West, Mumbai - 400078",
    ],
    color: "from-primary to-accent",
  },
  {
    icon: Phone,
    title: "Call /decent-academy-v1/ WhatsApp",
    details: ["+91 99673 97919", "+91 99673 97919 (WhatsApp)", "Mon-Sun: 9 AM - 9 PM"],
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
    details: ["Mon - Sat:", "7 AM - 11 AM", "2 PM - 9:30 PM", "Sunday: 9 AM - 9 PM"],
    color: "from-primary to-accent",
  },
]

const socialMedia = [
  { icon: Facebook, label: "Facebook", href: "#", color: "hover:bg-blue-500" },
  { icon: Instagram, label: "Instagram", href: "https:/decent-academy-v1/www.instagram.com/decent-academy-v1/decent_academy78?igsh=emp6Y2lsb2pxOHp6", color: "hover:bg-pink-500" },
  { icon: Youtube, label: "YouTube", href: "#", color: "hover:bg-red-500" },
  { icon: MessageSquare, label: "WhatsApp", href: "https:/decent-academy-v1/wa.me/decent-academy-v1/919967397919", color: "hover:bg-green-500" },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /decent-academy-v1/^[^\s@]+@[^\s@]+\.[^\s@]+$/decent-academy-v1/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string) => {
    const phoneRegex = /decent-academy-v1/^[6-9]\d{9}$/decent-academy-v1/
    return phoneRegex.test(phone.replace(/decent-academy-v1/\s+/decent-academy-v1/g, ''))
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({ ...prev, [name]: value }))
    
    /decent-academy-v1/ Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev: any) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    
    /decent-academy-v1/ Validate fields
    const newErrors = {
      name: "",
      email: "",
      phone: "",
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (formData.email.trim() && !validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number"
    }

    /decent-academy-v1/ Check if there are any errors
    if (newErrors.name || newErrors.email || newErrors.phone) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      /decent-academy-v1/ Submit to Formspree
      const response = await fetch("https:/decent-academy-v1/formspree.io/decent-academy-v1/f/decent-academy-v1/xlggbbbk", {
        method: "POST",
        headers: {
          "Content-Type": "application/decent-academy-v1/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitSuccess(true)
        
        /decent-academy-v1/ Reset form after 2 seconds
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          })
          setSubmitSuccess(false)
        }, 2000)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen">
      <Navbar /decent-academy-v1/>
      {/decent-academy-v1/* Hero Section */decent-academy-v1/}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary/decent-academy-v1/20 rounded-full blur-3xl animate-float" /decent-academy-v1/>
          <div
            className="absolute bottom-20 right-10 w-80 h-80 bg-accent/decent-academy-v1/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          /decent-academy-v1/>
        </decent-academy-v1/div>
        <div className="container mx-auto px-4 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/decent-academy-v1/10 rounded-full text-primary text-sm font-medium border border-primary/decent-academy-v1/20">
              <MessageSquare className="w-4 h-4" /decent-academy-v1/>
              <span>We're Here to Help</decent-academy-v1/span>
            </decent-academy-v1/div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-tight">
              Get in
              <span className="block mt-2 text-primary">Touch With Us</decent-academy-v1/span>
            </decent-academy-v1/h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </decent-academy-v1/p>
          </decent-academy-v1/div>
        </decent-academy-v1/div>
      </decent-academy-v1/section>
      {/decent-academy-v1/* Contact Info Cards */decent-academy-v1/}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="group relative bg-card rounded-2xl border border-border/decent-academy-v1/50 hover:border-primary/decent-academy-v1/50 p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 text-center"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
                /decent-academy-v1/>
                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                  >
                    <info.icon className="w-8 h-8 text-white" /decent-academy-v1/>
                  </decent-academy-v1/div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                    {info.title}
                  </decent-academy-v1/h3>
                  <div className="space-y-2">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-sm text-muted-foreground leading-relaxed">
                        {detail}
                      </decent-academy-v1/p>
                    ))}
                  </decent-academy-v1/div>
                </decent-academy-v1/div>
              </decent-academy-v1/div>
            ))}
          </decent-academy-v1/div>
          {/decent-academy-v1/* Main Contact Section */decent-academy-v1/}
          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/decent-academy-v1/* Contact Form */decent-academy-v1/}
            <div className="group relative bg-card rounded-3xl border border-border/decent-academy-v1/50 hover:border-primary/decent-academy-v1/50 p-8 lg:p-12 transition-all duration-500 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/decent-academy-v1/5 to-accent/decent-academy-v1/5 rounded-3xl" /decent-academy-v1/>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-6 group-hover:text-primary transition-colors duration-300">
                  Send Us a Message
                </decent-academy-v1/h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name *
                    </decent-academy-v1/label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className={`border-2 transition-colors duration-300 ${errors.name ? 'border-red-500 focus:border-red-500' : 'focus:border-primary'}`}
                    /decent-academy-v1/>
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</decent-academy-v1/p>
                    )}
                  </decent-academy-v1/div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address (Optional)
                    </decent-academy-v1/label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={`border-2 transition-colors duration-300 ${errors.email ? 'border-red-500 focus:border-red-500' : 'focus:border-primary'}`}
                    /decent-academy-v1/>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</decent-academy-v1/p>
                    )}
                  </decent-academy-v1/div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number *
                    </decent-academy-v1/label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="98765 43210"
                      className={`border-2 transition-colors duration-300 ${errors.phone ? 'border-red-500 focus:border-red-500' : 'focus:border-primary'}`}
                    /decent-academy-v1/>
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</decent-academy-v1/p>
                    )}
                  </decent-academy-v1/div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </decent-academy-v1/label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your requirements..."
                      rows={5}
                      className="border-2 focus:border-primary transition-colors duration-300 resize-none"
                    /decent-academy-v1/>
                  </decent-academy-v1/div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting || submitSuccess}
                    className="w-full group/decent-academy-v1/btn relative overflow-hidden disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http:/decent-academy-v1/www.w3.org/decent-academy-v1/2000/decent-academy-v1/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></decent-academy-v1/circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></decent-academy-v1/path>
                        </decent-academy-v1/svg>
                        Sending...
                      </decent-academy-v1/span>
                    ) : submitSuccess ? (
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /decent-academy-v1/>
                        </decent-academy-v1/svg>
                        Sent Successfully!
                      </decent-academy-v1/span>
                    ) : (
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Send Message
                        <Send className="w-5 h-5 group-hover/decent-academy-v1/btn:translate-x-1 group-hover/decent-academy-v1/btn:-translate-y-1 transition-transform duration-300" /decent-academy-v1/>
                      </decent-academy-v1/span>
                    )}
                    <span className="absolute inset-0 bg-accent scale-x-0 group-hover/decent-academy-v1/btn:scale-x-100 transition-transform duration-300 origin-left" /decent-academy-v1/>
                  </decent-academy-v1/Button>

                  {submitSuccess && (
                    <div className="text-center">
                      <p className="text-green-600 font-medium animate-pulse">
                        ✓ Your message has been sent successfully!
                      </decent-academy-v1/p>
                    </decent-academy-v1/div>
                  )}
                </decent-academy-v1/form>
              </decent-academy-v1/div>
            </decent-academy-v1/div>

            {/decent-academy-v1/* Map & Social */decent-academy-v1/}
            <div className="space-y-8">
              {/decent-academy-v1/* Map */decent-academy-v1/}
              <div className="group relative bg-card rounded-3xl border border-border/decent-academy-v1/50 hover:border-primary/decent-academy-v1/50 overflow-hidden transition-all duration-500 hover:shadow-2xl h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.3968574835597!2d72.9373964!3d19.124098999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c7ddb6c9c1b7%3A0x9d9c9c9c9c9c9c9c!2sShop%20No%201%2C%20Ground%20Floor%2C%20Sai%20Smruti%20Building%2C%20Near%20Nath%20Pai%20School%2C%20Nardas%20Nagar%2C%20T.%20P.%20Road%2C%20Bhandup%20West%2C%20Mumbai%2C%20Maharashtra%20400078!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale group-hover:grayscale-0 transition-all duration-500"
                /decent-academy-v1/>
                <a 
                  href="https://share.google/cQLKov5ZlCt0PEJ32"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg z-10"
                >
                  Get Directions
                </a>
              </decent-academy-v1/div>

              {/decent-academy-v1/* Social Media */decent-academy-v1/}
              <div className="group relative bg-card rounded-3xl border border-border/decent-academy-v1/50 hover:border-primary/decent-academy-v1/50 p-8 transition-all duration-500 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/decent-academy-v1/5 to-secondary/decent-academy-v1/5 rounded-3xl" /decent-academy-v1/>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6 group-hover:text-primary transition-colors duration-300">
                    Connect With Us
                  </decent-academy-v1/h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Follow us on social media for updates, success stories, and educational content
                  </decent-academy-v1/p>
                  <div className="grid grid-cols-2 gap-4">
                    {socialMedia.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        className={`group/decent-academy-v1/social flex items-center justify-center gap-3 p-4 bg-muted rounded-xl hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg ${social.color}`}
                      >
                        <social.icon className="w-5 h-5" /decent-academy-v1/>
                        <span className="font-medium">{social.label}</decent-academy-v1/span>
                      </decent-academy-v1/a>
                    ))}
                  </decent-academy-v1/div>
                </decent-academy-v1/div>
              </decent-academy-v1/div>

              {/decent-academy-v1/* Quick Contact */decent-academy-v1/}
              <div className="group relative bg-gradient-to-br from-primary via-accent to-secondary rounded-3xl p-8 text-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                      backgroundSize: "40px 40px",
                    }}
                  /decent-academy-v1/>
                </decent-academy-v1/div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">Need Immediate Assistance?</decent-academy-v1/h3>
                  <p className="text-white/decent-academy-v1/90 mb-6 leading-relaxed">
                    Call us directly or visit our campus for a personal consultation
                  </decent-academy-v1/p>
                  <div className="flex flex-col gap-3">
                    <Button size="lg" className="bg-white text-primary hover:bg-white/decent-academy-v1/90 w-full group/decent-academy-v1/btn" asChild>
                      <a href="tel:+919967397919">
                        <Phone className="w-5 h-5 mr-2 group-hover/decent-academy-v1/btn:rotate-12 transition-transform duration-300" /decent-academy-v1/>
                        Call Now
                      </decent-academy-v1/a>
                    </decent-academy-v1/Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white/decent-academy-v1/10 w-full bg-transparent"
                      asChild
                    >
                      <a href="https:/decent-academy-v1/wa.me/decent-academy-v1/919967397919" target="_blank" rel="noopener noreferrer">
                        <MessageSquare className="w-5 h-5 mr-2" /decent-academy-v1/>
                        WhatsApp Us
                      </decent-academy-v1/a>
                    </decent-academy-v1/Button>
                  </decent-academy-v1/div>
                </decent-academy-v1/div>
              </decent-academy-v1/div>
            </decent-academy-v1/div>
          </decent-academy-v1/div>
        </decent-academy-v1/div>
      </decent-academy-v1/section>

      {/decent-academy-v1/* FAQ Section */decent-academy-v1/}
      <section className="py-20 lg:py-32 bg-muted/decent-academy-v1/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Frequently Asked
              <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Questions
              </decent-academy-v1/span>
            </decent-academy-v1/h2>
          </decent-academy-v1/div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                q: "What are the admission requirements?",
                a: "Students need to provide previous year mark sheets and appear for a basic assessment test.",
              },
              {
                q: "What is the batch size?",
                a: "We maintain small batch sizes of 35-40 students for personalized attention.",
              },
              {
                q: "Do you provide study material?",
                a: "Yes, comprehensive study material, practice sheets, and test papers are provided.",
              },
              {
                q: "Are there scholarship options?",
                a: "Top 3 rankers from any school get 30% discount on any courses.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="group bg-card rounded-2xl border border-border/decent-academy-v1/50 hover:border-primary/decent-academy-v1/50 p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
              >
                <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {faq.q}
                </decent-academy-v1/h3>
                <p className="text-muted-foreground leading-relaxed">{faq.a}</decent-academy-v1/p>
              </decent-academy-v1/div>
            ))}
          </decent-academy-v1/div>
        </decent-academy-v1/div>
      </decent-academy-v1/section>

      <Footer /decent-academy-v1/>
    </decent-academy-v1/main>
  )
}
