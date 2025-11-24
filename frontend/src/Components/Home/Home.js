//import React from 'react'




// function home() {
//   return (
//     <div>
        
//         <h1>Home Page</h1>
//     </div>
//   )
// }

// export default home

"use client"

import { useEffect, useRef, useState } from "react"
import {
  ArrowRight,
  CheckCircle,
  Search,
  Star,
  Users,
  Calendar,
  Clock,
  DollarSign,
  Zap,
  Shield,
  Award,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ServiceFinder from "./ServiceFinder"
import PricingCalculator from "./PricingCalculator"

export default function Home() {
  const [visibleSections, setVisibleSections] = useState({
    hero: false,
    services: false,
    howItWorks: false,
    ratings: false,
    stats: false,
    pricing: false,
    faq: false,
  })

  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const sectionRefs = {
    hero: useRef(null),
    services: useRef(null),
    howItWorks: useRef(null),
    ratings: useRef(null),
    stats: useRef(null),
    pricing: useRef(null),
    faq: useRef(null),
  }

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const observers = Object.entries(sectionRefs).map(([key, ref]) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [key]: true }))
          }
        })
      }, observerOptions)

      if (ref.current) {
        observer.observe(ref.current)
      }

      return { key, observer }
    })

    // Set hero to visible immediately for better UX
    setVisibleSections((prev) => ({ ...prev, hero: true }))

    // Auto-rotate testimonials
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 6)
    }, 5000)

    // Track mouse position for parallax effects
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      observers.forEach(({ key, observer }) => {
        if (sectionRefs[key].current) {
          observer.unobserve(sectionRefs[key].current)
        }
      })
      clearInterval(testimonialInterval)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Parallax effect calculation
  const calculateParallax = (strength = 0.05) => {
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const deltaX = (mousePosition.x - centerX) * strength
    const deltaY = (mousePosition.y - centerY) * strength
    return { x: deltaX, y: deltaY }
  }

  const services = [
    {
      title: "Plumbing",
      icon: "🔧",
      description: "Expert plumbing services for all your needs",
      features: ["Leak Repairs", "Pipe Installation", "Drain Cleaning"],
      color: "from-blue-medium to-blue-light",
    },
    {
      title: "Cleaning",
      icon: "🧹",
      description: "Professional cleaning services for your home",
      features: ["Deep Cleaning", "Regular Maintenance", "Move-in/out"],
      color: "from-teal to-teal-light",
    },
    {
      title: "Electrical",
      icon: "⚡",
      description: "Reliable electrical services by certified professionals",
      features: ["Wiring", "Lighting Installation", "Safety Inspections"],
      color: "from-blue-dark to-blue-medium",
    },
    {
      title: "Painting",
      icon: "🎨",
      description: "Transform your space with our painting services",
      features: ["Interior", "Exterior", "Decorative Finishes"],
      color: "from-blue-light to-teal-light",
    },
    {
      title: "Gardening",
      icon: "🌱",
      description: "Keep your garden looking beautiful all year round",
      features: ["Landscaping", "Maintenance", "Design"],
      color: "from-teal to-blue-lighter",
    },
    {
      title: "Carpentry",
      icon: "🪚",
      description: "Custom carpentry solutions for your home",
      features: ["Custom Furniture", "Repairs", "Installations"],
      color: "from-blue-dark to-teal",
    },
  ]

  const testimonials = [
    {
      name: "John Smith",
      service: "Plumbing",
      rating: 5,
      review: "Excellent service! The plumber was professional and fixed my issue quickly.",
      image: "./src/Assets/Isira.jpg",
    },
    {
      name: "Sarah Johnson",
      service: "Cleaning",
      rating: 4,
      review: "Very thorough cleaning service. My house looks spotless now.",
      image: "./src/Assets/Isira.jpg",
    },
    {
      name: "Michael Brown",
      service: "Electrical",
      rating: 5,
      review: "The electrician was knowledgeable and fixed all the issues in my home.",
      image: "../../Assets/isira.jpg",
    },
    {
      name: "Emily Davis",
      service: "Painting",
      rating: 4,
      review: "Great painting job! The team was professional and cleaned up after themselves.",
      image: "/placeholder.jpg",
    },
    {
      name: "David Wilson",
      service: "Gardening",
      rating: 5,
      review: "My garden has never looked better. Highly recommend their gardening services!",
      image: "/placeholder.jpg",
    },
    {
      name: "Lisa Martinez",
      service: "Carpentry",
      rating: 5,
      review: "Amazing craftsmanship! The carpenter built exactly what I wanted.",
      image: "/placeholder.jpg",
    },
  ]

  const stats = [
    { value: "10K+", label: "Happy Customers", icon: <Users className="h-6 w-6" /> },
    { value: "5K+", label: "Service Providers", icon: <Award className="h-6 w-6" /> },
    { value: "25K+", label: "Completed Jobs", icon: <CheckCircle className="h-6 w-6" /> },
    { value: "4.8", label: "Average Rating", icon: <Star className="h-6 w-6" /> },
  ]

  const faqs = [
    {
      question: "How do I book a service?",
      answer:
        "Booking a service is easy! Simply browse our available services, select the one you need, choose a date and time that works for you, and complete the booking process. You'll receive a confirmation email with all the details.",
    },
    {
      question: "Are your service providers vetted?",
      answer:
        "Yes, all our service providers undergo a thorough vetting process. We verify their credentials, experience, and conduct background checks to ensure they meet our high standards of professionalism and expertise.",
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer:
        "Your satisfaction is our priority. If you're not completely satisfied with the service provided, please contact our customer support team within 48 hours, and we'll work to resolve the issue promptly.",
    },
    {
      question: "Can I reschedule or cancel my booking?",
      answer:
        "Yes, you can reschedule or cancel your booking through your account dashboard. Please note that cancellations made less than 24 hours before the scheduled service may incur a cancellation fee.",
    },
    {
      question: "Do you offer any guarantees?",
      answer:
        "We stand behind the quality of our services. All services come with a satisfaction guarantee, and many of our providers offer additional service-specific guarantees.",
    },
  ]

  return (
    <main className="flex-1 overflow-hidden">
      {/* Floating Service Finder */}
      <ServiceFinder />

      {/* Hero Section */}
      <section
        ref={sectionRefs.hero}
        className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-blue-lighter via-teal-light to-blue-lighter overflow-hidden relative"
      >
        {/* Animated particles background */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white opacity-30"
              style={{
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}
          <motion.div
            className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-teal opacity-20"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute top-40 -right-20 w-60 h-60 rounded-full bg-blue-light opacity-20"
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
          />
          <motion.div
            className="absolute bottom-20 left-1/3 w-20 h-20 rounded-full bg-blue-medium opacity-10"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
          />
        </div>

        <div className="container px-4 md:px-6 relative">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] relative">
            <motion.div
              className="flex flex-col justify-center space-y-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: visibleSections.hero ? 1 : 0,
                y: visibleSections.hero ? 0 : 50,
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{
                transform: visibleSections.hero
                  ? `translate(${calculateParallax(0.02).x}px, ${calculateParallax(0.02).y}px)`
                  : "none",
              }}
            >
              <div className="space-y-2">
                <motion.h1
                  className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-blue-dark"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="block"
                  >
                    Quality home services,
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="block text-teal"
                  >
                    just a click away
                  </motion.span>
                </motion.h1>
                <motion.p
                  className="max-w-[600px] text-blue-dark md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  Connect with trusted professionals for all your home service needs. From plumbing to cleaning, we've
                  got you covered.
                </motion.p>
              </div>
              <motion.div
                className="flex flex-col gap-2 min-[400px]:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button className="px-6 py-3 gap-1 bg-blue-medium hover:bg-blue-dark text-white transition-all duration-300 hover:translate-x-1 group relative overflow-hidden rounded-md flex items-center">
                    <span className="relative z-10">Get a Job Done</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-blue-dark to-blue-medium"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button className="px-6 py-3 border border-blue-medium text-blue-medium hover:bg-blue-lighter hover:text-blue-dark transition-all duration-300 rounded-md">
                    Find Customers
                  </button>
                </motion.div>
              </motion.div>

              {/* Animated features list */}
              <motion.div
                className="mt-8 grid grid-cols-2 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                {[
                  { icon: <Clock className="h-4 w-4" />, text: "Book in 60 seconds" },
                  { icon: <Shield className="h-4 w-4" />, text: "Verified professionals" },
                  { icon: <Zap className="h-4 w-4" />, text: "Fast response time" },
                  { icon: <DollarSign className="h-4 w-4" />, text: "Transparent pricing" },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 text-sm text-blue-dark"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 1.1 + index * 0.1 }}
                  >
                    <div className="flex-shrink-0 rounded-full bg-teal-light p-1 text-blue-medium">{feature.icon}</div>
                    <span>{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: visibleSections.hero ? 1 : 0,
                scale: visibleSections.hero ? 1 : 0.8,
              }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              style={{
                transform: visibleSections.hero
                  ? `translate(${calculateParallax(-0.02).x}px, ${calculateParallax(-0.02).y}px)`
                  : "none",
              }}
            >
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-blue-medium to-teal rounded-2xl blur-xl opacity-20"
                animate={{
                  opacity: [0.2, 0.3, 0.2],
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              />

              <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="/placeholder.jpg"
                  alt="Hero Image"
                  className="mx-auto aspect-video object-cover sm:w-full lg:order-last"
                />

                {/* Animated overlay elements */}
                <motion.div
                  className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg flex items-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.3 }}
                >
                  <div className="rounded-full bg-teal p-2">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-medium">Next Available</p>
                    <p className="text-sm font-medium text-blue-dark">Today, 2:00 PM</p>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                >
                  <div className="flex items-center gap-1">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-teal text-teal" />
                      ))}
                  </div>
                  <p className="text-xs text-blue-medium mt-1">500+ 5-star reviews</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={sectionRefs.stats}
        className="w-full py-12 bg-gradient-to-r from-blue-dark to-blue-medium text-white"
      >
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: visibleSections.stats ? 1 : 0,
                  y: visibleSections.stats ? 0 : 20,
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  className="rounded-full bg-white/10 p-3 mb-3"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                >
                  {stat.icon}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-blue-lighter">{stat.label}</div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Catalog Section */}
      <section id="services" ref={sectionRefs.services} className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div
            className={`flex flex-col items-center justify-center space-y-4 text-center transition-all duration-700 ${
              visibleSections.services ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="space-y-2">
              <div className="inline-block rounded-full bg-blue-lighter px-3 py-1 text-sm font-medium text-blue-dark mb-2">
                Professional Services
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-blue-dark">Our Services</h2>
              <p className="max-w-[900px] text-blue-medium md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Browse through our wide range of professional home services
              </p>
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="h-full"
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: visibleSections.services ? 1 : 0,
                  y: visibleSections.services ? 0 : 30,
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="h-full transition-all duration-300 hover:shadow-xl bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden group">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>
                  <div className="p-6 flex flex-col items-center text-center space-y-4 h-full">
                    <motion.div
                      className="text-4xl mb-2 transform transition-transform duration-300 hover:scale-110"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                    >
                      {service.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold text-blue-dark">{service.title}</h3>
                    <p className="text-sm text-blue-medium">{service.description}</p>

                    <div className="mt-auto pt-4 w-full">
                      <div className="border-t border-blue-lighter pt-4 mb-4">
                        <ul className="text-sm text-left space-y-2">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-teal flex-shrink-0" />
                              <span className="text-blue-medium">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button className="w-full py-2 text-sm text-teal hover:text-blue-dark hover:bg-teal-light transition-all duration-300 group-hover:bg-teal-light rounded-md flex items-center justify-center">
                        Learn More
                        <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        ref={sectionRefs.howItWorks}
        className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-lighter to-teal-light relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
          <motion.div
            className="absolute -right-20 top-1/4 w-40 h-40 rounded-full border-4 border-blue-medium/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.div
            className="absolute -left-10 bottom-1/4 w-20 h-20 rounded-full border-4 border-teal/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>

        <div className="container px-4 md:px-6 relative">
          <div
            className={`flex flex-col items-center justify-center space-y-4 text-center transition-all duration-700 ${
              visibleSections.howItWorks ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="space-y-2">
              <div className="inline-block rounded-full bg-teal-light px-3 py-1 text-sm font-medium text-blue-dark mb-2">
                Simple Process
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-blue-dark">How It Works</h2>
              <p className="max-w-[900px] text-blue-medium md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get your home services done in three simple steps
              </p>
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3 relative">
            {/* Connecting line between steps */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-blue-lighter hidden md:block"></div>

            {[
              {
                title: "Browse Services",
                icon: <Search className="h-10 w-10 text-white" />,
                description: "Explore our wide range of professional home services",
              },
              {
                title: "Book a Job",
                icon: <CheckCircle className="h-10 w-10 text-white" />,
                description: "Select a service and book an appointment with a professional",
              },
              {
                title: "Rate Your Service",
                icon: <Star className="h-10 w-10 text-white" />,
                description: "Share your experience and help others find great service",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center space-y-4 relative z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: visibleSections.howItWorks ? 1 : 0,
                  y: visibleSections.howItWorks ? 0 : 30,
                }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <motion.div
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-medium to-teal shadow-lg group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-blue-medium opacity-0 group-hover:opacity-20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  {step.icon}
                </motion.div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-blue-dark">
                    Step {index + 1}: {step.title}
                  </h3>
                  <p className="text-blue-medium">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Calculator Section */}
      <section id="pricing" ref={sectionRefs.pricing} className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div
            className={`flex flex-col items-center justify-center space-y-4 text-center transition-all duration-700 ${
              visibleSections.pricing ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="space-y-2">
              <div className="inline-block rounded-full bg-blue-lighter px-3 py-1 text-sm font-medium text-blue-dark mb-2">
                Transparent Pricing
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-blue-dark">
                Calculate Your Service Cost
              </h2>
              <p className="max-w-[900px] text-blue-medium md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get an instant estimate for your home service needs
              </p>
            </div>
          </div>

          <motion.div
            className="mx-auto max-w-3xl mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: visibleSections.pricing ? 1 : 0,
              y: visibleSections.pricing ? 0 : 30,
            }}
            transition={{ duration: 0.5 }}
          >
            <PricingCalculator />
          </motion.div>
        </div>
      </section>

      {/* Testimonial Carousel Section */}
      <section
        id="ratings"
        ref={sectionRefs.ratings}
        className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-dark to-blue-medium text-white"
      >
        <div className="container px-4 md:px-6">
          <div
            className={`flex flex-col items-center justify-center space-y-4 text-center transition-all duration-700 ${
              visibleSections.ratings ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="space-y-2">
              <div className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white mb-2">
                Testimonials
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-white">
                What Our Customers Say
              </h2>
              <p className="max-w-[900px] text-blue-lighter md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Real experiences from satisfied customers
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-4xl mt-12 relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-dark to-blue-medium opacity-50 blur-3xl -z-10"
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [0.9, 1.1, 0.9],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            />

            <div className="relative h-80 overflow-hidden rounded-xl">
              <AnimatePresence mode="wait">
                {testimonials.map(
                  (testimonial, index) =>
                    activeTestimonial === index && (
                      <motion.div
                        key={index}
                        className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-white/10 backdrop-blur-sm rounded-xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="mb-6">
                          <div className="flex justify-center mb-4">
                            {Array(testimonial.rating)
                              .fill(0)
                              .map((_, i) => (
                                <Star key={i} className="h-6 w-6 fill-teal text-teal" />
                              ))}
                            {Array(5 - testimonial.rating)
                              .fill(0)
                              .map((_, i) => (
                                <Star key={i} className="h-6 w-6 text-blue-lighter" />
                              ))}
                          </div>
                          <p className="text-xl italic text-white mb-6">"{testimonial.review}"</p>
                          <div className="flex items-center justify-center gap-3">
                            <div className="rounded-full overflow-hidden border-2 border-teal w-12 h-12">
                              <img
                                src={testimonial.image || "/placeholder.svg"}
                                alt={testimonial.name}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div className="text-left">
                              <p className="font-medium text-white">{testimonial.name}</p>
                              <p className="text-sm text-blue-lighter">{testimonial.service} Service</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ),
                )}
              </AnimatePresence>
            </div>

            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeTestimonial === index ? "bg-teal scale-125" : "bg-blue-lighter/50"
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" ref={sectionRefs.faq} className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div
            className={`flex flex-col items-center justify-center space-y-4 text-center transition-all duration-700 ${
              visibleSections.faq ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="space-y-2">
              <div className="inline-block rounded-full bg-blue-lighter px-3 py-1 text-sm font-medium text-blue-dark mb-2">
                FAQ
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-blue-dark">
                Frequently Asked Questions
              </h2>
              <p className="max-w-[900px] text-blue-medium md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Find answers to common questions about our services
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-3xl mt-12 space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="border border-blue-lighter rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: visibleSections.faq ? 1 : 0,
                  y: visibleSections.faq ? 0 : 20,
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-blue-lighter/30 transition-colors duration-300"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span className="font-medium text-blue-dark">{faq.question}</span>
                  <motion.div animate={{ rotate: expandedFaq === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ArrowRight className="h-5 w-5 text-blue-medium transform rotate-90" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 border-t border-blue-lighter text-blue-medium">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-r from-teal to-blue-medium text-white">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="max-w-md">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to transform your home?</h2>
              <p className="text-blue-lighter">Book your first service today and experience the difference.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button className="px-6 py-3 bg-white text-blue-dark hover:bg-blue-lighter transition-all duration-300 rounded-md">
                  Book a Service
                </button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button className="px-6 py-3 border border-white text-white hover:bg-white/10 transition-all duration-300 rounded-md">
                  Learn More
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

