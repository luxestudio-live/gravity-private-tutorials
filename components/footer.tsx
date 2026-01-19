import Link from "next/decent-academy-v1/link"
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

const footerLinks = {
  quickLinks: [
    { name: "About Us", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Faculty", href: "/faculty" },
    { name: "Results", href: "/results" },
  ],
  programs: [
    { name: "5th to 10th", href: "/courses#5-10" },
    { name: "11th-12th Science", href: "/courses#science" },
    { name: "11th-12th Commerce", href: "/courses#commerce" },
    { name: "CET & JEE", href: "/courses#competitive" },
  ],
  resources: [
    { name: "Gallery", href: "/gallery" },
    { name: "Activities", href: "/activities" },
    { name: "Contact", href: "/contact" },
    { name: "Admissions", href: "/contact#admissions" },
  ],
}

export function Footer() {
  return (
    <footer className="relative text-background overflow-hidden">
      {/decent-academy-v1/* Dark Gradient Background */decent-academy-v1/}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground/decent-academy-v1/95 via-foreground to-primary/decent-academy-v1/30" /decent-academy-v1/>
      
      {/decent-academy-v1/* Glassmorphism Overlay */decent-academy-v1/}
      <div className="absolute inset-0 bg-gradient-to-br from-black/decent-academy-v1/40 via-black/decent-academy-v1/30 to-transparent backdrop-blur-sm" /decent-academy-v1/>
      
      {/decent-academy-v1/* Large Logo Watermark */decent-academy-v1/}
      <div className="absolute inset-0 flex items-center justify-center py-8 opacity-8">
        <img 
          src="/DecentLogo.png" 
          alt="" 
          className="w-[500px] md:w-[700px] h-auto object-contain max-h-[90%]"
        /decent-academy-v1/>
      </decent-academy-v1/div>
      
      {/decent-academy-v1/* Dynamic Gradient Overlay */decent-academy-v1/}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-gradient-radial from-primary/decent-academy-v1/40 via-secondary/decent-academy-v1/30 to-transparent blur-3xl animate-float" /decent-academy-v1/>
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] md:w-[550px] md:h-[550px] bg-gradient-radial from-accent/decent-academy-v1/40 via-primary/decent-academy-v1/25 to-transparent blur-3xl animate-float" style={{ animationDelay: "3s" }} /decent-academy-v1/>
        <div className="absolute top-1/decent-academy-v1/3 left-1/decent-academy-v1/2 -translate-x-1/decent-academy-v1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-radial from-secondary/decent-academy-v1/30 to-transparent blur-3xl animate-float" style={{ animationDelay: "1.5s" }} /decent-academy-v1/>
      </decent-academy-v1/div>
      
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/decent-academy-v1/* Brand */decent-academy-v1/}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold mb-4">
              <span className="text-secondary">
                DECENT
              </decent-academy-v1/span>
              <span className="text-accent ml-2">ACADEMY</decent-academy-v1/span>
            </decent-academy-v1/h3>
            <p className="text-background/decent-academy-v1/80 leading-relaxed mb-6 max-w-md">
              Empowering students to achieve academic excellence through innovative teaching methods and personalized
              attention.
            </decent-academy-v1/p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "https:/decent-academy-v1/www.instagram.com/decent-academy-v1/decent_academy78?igsh=emp6Y2lsb2pxOHp6" },
                { icon: Youtube, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-background/decent-academy-v1/10 backdrop-blur-sm border border-accent/decent-academy-v1/30 hover:bg-accent hover:border-accent hover:text-foreground rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                >
                  <social.icon className="w-5 h-5" /decent-academy-v1/>
                </decent-academy-v1/a>
              ))}
            </decent-academy-v1/div>
          </decent-academy-v1/div>

          {/decent-academy-v1/* Quick Links */decent-academy-v1/}
          <div>
            <h4 className="font-bold text-lg mb-4 text-accent">Quick Links</decent-academy-v1/h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-background/decent-academy-v1/80 hover:text-accent transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </decent-academy-v1/Link>
                </decent-academy-v1/li>
              ))}
            </decent-academy-v1/ul>
          </decent-academy-v1/div>

          {/decent-academy-v1/* Programs */decent-academy-v1/}
          <div>
            <h4 className="font-bold text-lg mb-4 text-accent">Programs</decent-academy-v1/h4>
            <ul className="space-y-3">
              {footerLinks.programs.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-background/decent-academy-v1/80 hover:text-accent transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </decent-academy-v1/Link>
                </decent-academy-v1/li>
              ))}
            </decent-academy-v1/ul>
          </decent-academy-v1/div>

          {/decent-academy-v1/* Resources */decent-academy-v1/}
          <div>
            <h4 className="font-bold text-lg mb-4 text-accent">Resources</decent-academy-v1/h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-background/decent-academy-v1/80 hover:text-accent transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </decent-academy-v1/Link>
                </decent-academy-v1/li>
              ))}
            </decent-academy-v1/ul>
          </decent-academy-v1/div>
        </decent-academy-v1/div>

        {/decent-academy-v1/* Contact Info */decent-academy-v1/}
        <div className="border-t border-background/decent-academy-v1/20 pt-8 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" /decent-academy-v1/>
              <div>
                <div className="font-medium mb-1">Visit Us</decent-academy-v1/div>
                <div className="text-background/decent-academy-v1/80 text-sm leading-relaxed">
                  Shop No 1, Ground Floor, Sai Smruti Building, Near Nath Pai School, Nardas Nagar, T. P. Road, Bhandup West, Mumbai - 400078
                </decent-academy-v1/div>
              </decent-academy-v1/div>
            </decent-academy-v1/div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-accent mt-1 flex-shrink-0" /decent-academy-v1/>
              <div>
                <div className="font-medium mb-1">Call Us</decent-academy-v1/div>
                <div className="text-background/decent-academy-v1/80 text-sm">+91 99673 97919</decent-academy-v1/div>
              </decent-academy-v1/div>
            </decent-academy-v1/div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-accent mt-1 flex-shrink-0" /decent-academy-v1/>
              <div>
                <div className="font-medium mb-1">Email Us</decent-academy-v1/div>
                <div className="text-background/decent-academy-v1/80 text-sm">info@decentacademy.com</decent-academy-v1/div>
              </decent-academy-v1/div>
            </decent-academy-v1/div>
          </decent-academy-v1/div>
        </decent-academy-v1/div>

        {/decent-academy-v1/* Bottom */decent-academy-v1/}
        <div className="border-t border-background/decent-academy-v1/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/decent-academy-v1/70 text-sm text-center md:text-left">
            © 2025 Decent Academy. All rights reserved.
          </decent-academy-v1/p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-background/decent-academy-v1/80 hover:text-accent transition-colors duration-300">
              Privacy Policy
            </decent-academy-v1/Link>
            <Link href="#" className="text-background/decent-academy-v1/80 hover:text-accent transition-colors duration-300">
              Terms of Service
            </decent-academy-v1/Link>
          </decent-academy-v1/div>
        </decent-academy-v1/div>
      </decent-academy-v1/div>
    </decent-academy-v1/footer>
  )
}
