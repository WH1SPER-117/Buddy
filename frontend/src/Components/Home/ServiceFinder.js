"use client"

import { useState } from "react"
import { Search, X, MapPin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ServiceFinder() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")

  const services = [
    "Plumbing",
    "Cleaning",
    "Electrical",
    "Painting",
    "Gardening",
    "Carpentry",
    "Appliance Repair",
    "Roofing",
  ]

  const filteredServices = services.filter((service) => service.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <button
          className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-medium to-teal shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white"
          onClick={() => setIsOpen(true)}
        >
          <Search className="h-6 w-6" />
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6 shadow-2xl bg-white rounded-lg">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-blue-dark">Find a Service</h3>
                  <button
                    className="rounded-full hover:bg-blue-lighter/50 p-2 text-blue-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-medium" />
                    <input
                      type="text"
                      placeholder="What service do you need?"
                      className="w-full pl-10 pr-4 py-2 border border-blue-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-medium" />
                    <input
                      type="text"
                      placeholder="Your location"
                      className="w-full pl-10 pr-4 py-2 border border-blue-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>

                  {searchQuery && (
                    <div className="mt-4 max-h-60 overflow-y-auto">
                      <h4 className="text-sm text-blue-medium mb-2">Services</h4>
                      <div className="space-y-2">
                        {filteredServices.length > 0 ? (
                          filteredServices.map((service, index) => (
                            <motion.div
                              key={service}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="p-3 rounded-md hover:bg-blue-lighter/30 cursor-pointer transition-colors duration-200 flex items-center justify-between"
                              onClick={() => {
                                setSearchQuery(service)
                                // In a real app, this would navigate to the service page
                              }}
                            >
                              <span className="text-blue-dark">{service}</span>
                              <span className="text-xs text-blue-medium">View →</span>
                            </motion.div>
                          ))
                        ) : (
                          <p className="text-sm text-blue-medium py-2">No services found</p>
                        )}
                      </div>
                    </div>
                  )}

                  <button
                    className="w-full bg-gradient-to-r from-blue-medium to-teal text-white hover:from-blue-dark hover:to-blue-medium transition-all duration-300 mt-2 py-2 rounded-md"
                    disabled={!searchQuery || !location}
                  >
                    Find Providers
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

