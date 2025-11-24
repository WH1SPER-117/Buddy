"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { CheckCircle, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  const [hoveredIcon, setHoveredIcon] = useState(null)
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
      // In a real app, this would send the email to a server
    }
  }

  return (
    <footer className="w-full bg-gradient-to-r from-blue-dark to-blue-medium text-white">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="rounded-full bg-white p-1 transition-all duration-300 group-hover:bg-teal-light">
                <CheckCircle className="h-5 w-5 text-blue-medium transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span className="text-xl font-bold text-white group-hover:text-teal-light transition-colors duration-300">
                QuickFixer
              </span>
            </Link>
            <p className="text-blue-lighter">
              Connecting homeowners with trusted service professionals since 2019. Our mission is to make home services
              accessible, reliable, and hassle-free.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Facebook className="h-5 w-5" />, name: "Facebook" },
                { icon: <Twitter className="h-5 w-5" />, name: "Twitter" },
                { icon: <Instagram className="h-5 w-5" />, name: "Instagram" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-blue-lighter hover:text-white transition-colors duration-300 relative"
                  onMouseEnter={() => setHoveredIcon(index)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className={`absolute -inset-2 rounded-full bg-teal/20 transition-all duration-300 ${
                      hoveredIcon === index ? "opacity-100 scale-100" : "opacity-0 scale-50"
                    }`}
                  ></div>
                  {social.icon}
                  <span className="sr-only">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Services", "About Us", "Contact Us", "Terms of Use", "Privacy Policy", "FAQ"].map(
                (item, index) => (
                  <li key={index}>
                    <Link
                      to={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-blue-lighter hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-teal flex-shrink-0 mt-0.5" />
                <span className="text-blue-lighter">No 110A Galle Road, Dehiwala-Mount Lavinia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-teal flex-shrink-0" />
                <span className="text-blue-lighter">+94 766698448</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-teal flex-shrink-0" />
                <span className="text-blue-lighter">QuickFixer@gmail.com</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Newsletter</h3>
            <p className="text-blue-lighter">Subscribe to our newsletter for tips, news, and special offers.</p>
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-teal/20 rounded-lg"
              >
                <p className="text-white text-sm">Thank you for subscribing! You'll receive our updates soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="bg-white/10 border border-white/20 text-white placeholder:text-blue-lighter focus:border-teal rounded-md px-3 py-2 flex-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="bg-teal hover:bg-teal-light text-blue-dark transition-colors duration-300 px-4 py-2 rounded-md"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-blue-lighter">
                  We respect your privacy and will never share your information.
                </p>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-blue-lighter">
            &copy; {new Date().getFullYear()} QuickFixer. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="#" className="text-xs text-blue-lighter hover:text-white transition-colors duration-300">
              Terms of Service
            </Link>
            <Link to="#" className="text-xs text-blue-lighter hover:text-white transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="#" className="text-xs text-blue-lighter hover:text-white transition-colors duration-300">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

