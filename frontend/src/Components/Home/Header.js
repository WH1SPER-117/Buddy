"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import flogo from "../../Assets/F-logo.png";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/home" className="flex items-center gap-2 group">
            <div className="rounded-full bg-blue-50 p-1 transition-all duration-100 group-hover:bg-blue">
              <motion.div
                // animate={{ rotate: [0, 360] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                {/* <CheckCircle className="h-6 w-6 text-white" /> */}
                <img src={flogo} alt="Your Image" className="h-10 w-30" />
              </motion.div>
            </div>
          </Link>
        </motion.div>

        <nav className="hidden md:flex items-center gap-6">
          {[
            "Home",
            "Services",
            "About Us",
            "V-Assist",
            "Contact Us",
            "Terms of Use",
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                to={
                  item === "Home"
                    ? "/home"
                    : `#${item.toLowerCase().replace(/\s+/g, "-")}`
                }
                className={`text-sm font-medium relative overflow-hidden group ${
                  index === 0 ? "text-blue-medium" : "text-blue-dark"
                }`}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to={
                  item === "V-Assist"
                    ? "/chatpage"
                    : `#${item.toLowerCase().replace(/\s+/g, "-")}`
                }
                className={`text-sm font-medium relative overflow-hidden group ${
                  index === 0 ? "text-blue-medium" : "text-blue-dark"
                }`}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal group-hover:w-full transition-all duration-300"></span>
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="relative"
          >
            <button
              className="text-blue-medium hover:text-blue-dark rounded-full p-2 bg-transparent hover:bg-blue-lighter/30 transition-all"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-5 w-5" />
            </button>

            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl p-4 w-72"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-2 border rounded-md p-2 bg-blue-lighter/30">
                    <Search className="h-4 w-4 text-blue-medium" />
                    <input
                      type="text"
                      placeholder="Search for services..."
                      className="bg-transparent border-none outline-none flex-1 text-sm text-blue-dark placeholder:text-blue-medium/70"
                    />
                  </div>
                  <div className="mt-2 text-xs text-blue-medium">
                    Popular: Plumbing, Cleaning, Electrical
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <button className="hidden md:flex px-4 py-2 text-sm border border-blue-medium text-blue-medium hover:bg-blue-lighter hover:text-blue-dark transition-all duration-300 rounded-md">
              Sign In
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="px-4 py-2 text-sm bg-blue-medium hover:bg-blue-dark text-white transition-all duration-300 rounded-md">
              Sign Up
            </button>
          </motion.div>

          <button
            className="md:hidden text-blue-medium hover:text-blue-dark p-2 bg-transparent"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white border-t"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container py-4 flex flex-col gap-4">
              {[
                "Home",
                "Services",
                "About Us",
                "V-Assist",
                "Contact Us",
                "Terms of Use",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    to={
                      item === "Home"
                        ? "/"
                        : `#${item.toLowerCase().replace(/\s+/g, "-")}`
                    }
                    className="text-blue-dark block py-2 hover:text-blue-medium transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                  <Link
                    to={
                      item === "V-Assist"
                        ? "/chatpage"
                        : `#${item.toLowerCase().replace(/\s+/g, "-")}`
                    }
                    className="text-blue-dark block py-2 hover:text-blue-medium transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="flex gap-2 mt-2"
              >
                <button className="flex-1 px-4 py-2 border border-blue-medium text-blue-medium hover:bg-blue-lighter hover:text-blue-dark rounded-md">
                  Sign In
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-medium hover:bg-blue-dark text-white rounded-md">
                  Sign Up
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
