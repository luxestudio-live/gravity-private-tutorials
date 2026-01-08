import Link from "next/link"
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
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold mb-4">
              <span className="text-primary">
                Decent
              </span>
              <span className="text-primary ml-2">Academy</span>
            </h3>
            <p className="text-background/70 leading-relaxed mb-6 max-w-md">
              Empowering students to achieve academic excellence through innovative teaching methods and personalized
              attention.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Youtube, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-background/10 hover:bg-secondary rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-secondary transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-bold text-lg mb-4">Programs</h4>
            <ul className="space-y-3">
              {footerLinks.programs.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-secondary transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-secondary transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-background/20 pt-8 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
              <div>
                <div className="font-medium mb-1">Visit Us</div>
                <div className="text-background/70 text-sm leading-relaxed">
                  Shop no 1, Bus Stop, Tembipada Road, near Shiv Darshan Path, Bhandup West, Mumbai, Maharashtra 400078
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
              <div>
                <div className="font-medium mb-1">Call Us</div>
                <div className="text-background/70 text-sm">+91 99673 97919</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
              <div>
                <div className="font-medium mb-1">Email Us</div>
                <div className="text-background/70 text-sm">info@decentacademy.com</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/70 text-sm text-center md:text-left">
            © 2025 Decent Academy. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-background/70 hover:text-secondary transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="#" className="text-background/70 hover:text-secondary transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
