"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function PricingCalculator() {
  const [service, setService] = useState("cleaning")
  const [size, setSize] = useState("medium")
  const [extras, setExtras] = useState([])

  const services = {
    cleaning: { base: 80, name: "Home Cleaning" },
    plumbing: { base: 120, name: "Plumbing Service" },
    electrical: { base: 150, name: "Electrical Work" },
    painting: { base: 200, name: "Painting Service" },
  }

  const sizes = {
    small: { multiplier: 0.8, name: "Small (< 1000 sq ft)" },
    medium: { multiplier: 1, name: "Medium (1000-2000 sq ft)" },
    large: { multiplier: 1.3, name: "Large (> 2000 sq ft)" },
  }

  const extraOptions = [
    { id: "deep", name: "Deep Clean", price: 50 },
    { id: "windows", name: "Window Cleaning", price: 30 },
    { id: "appliances", name: "Appliance Cleaning", price: 40 },
    { id: "urgent", name: "Urgent Service (24h)", price: 60 },
  ]

  const toggleExtra = (id) => {
    if (extras.includes(id)) {
      setExtras(extras.filter((item) => item !== id))
    } else {
      setExtras([...extras, id])
    }
  }

  const calculatePrice = () => {
    const basePrice = services[service].base * sizes[size].multiplier
    const extrasTotal = extras.reduce((total, id) => {
      const extra = extraOptions.find((option) => option.id === id)
      return total + (extra ? extra.price : 0)
    }, 0)

    return basePrice + extrasTotal
  }

  const totalPrice = calculatePrice()

  return (
    <div className="overflow-hidden shadow-lg border border-gray-200 rounded-lg">
      <div className="bg-gradient-to-r from-blue-medium to-teal p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Service Price Calculator</h3>
        <p className="text-blue-lighter text-sm">Get an instant estimate for your service</p>
      </div>

      <div className="p-6 bg-white">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-blue-dark mb-2">Select Service</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(services).map(([id, { name }]) => (
                <button
                  key={id}
                  type="button"
                  className={`justify-start text-left px-4 py-2 rounded-md ${
                    service === id
                      ? "bg-blue-medium hover:bg-blue-dark text-white"
                      : "border border-blue-lighter text-blue-medium hover:bg-blue-lighter/30 hover:text-blue-dark"
                  }`}
                  onClick={() => setService(id)}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-dark mb-2">Home Size</label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(sizes).map(([id, { name }]) => (
                <button
                  key={id}
                  type="button"
                  className={`justify-start text-left px-4 py-2 rounded-md ${
                    size === id
                      ? "bg-blue-medium hover:bg-blue-dark text-white"
                      : "border border-blue-lighter text-blue-medium hover:bg-blue-lighter/30 hover:text-blue-dark"
                  }`}
                  onClick={() => setSize(id)}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-dark mb-2">Additional Services</label>
            <div className="space-y-2">
              {extraOptions.map((option) => (
                <div
                  key={option.id}
                  className={`flex items-center justify-between p-3 rounded-md border cursor-pointer transition-all duration-300 ${
                    extras.includes(option.id)
                      ? "border-teal bg-teal-light/30"
                      : "border-blue-lighter hover:bg-blue-lighter/20"
                  }`}
                  onClick={() => toggleExtra(option.id)}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                        extras.includes(option.id) ? "bg-teal" : "border border-blue-lighter"
                      }`}
                    >
                      {extras.includes(option.id) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 bg-white rounded-full"
                        />
                      )}
                    </div>
                    <span className="text-blue-dark">{option.name}</span>
                  </div>
                  <span className="text-blue-medium">+${option.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-blue-lighter pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-blue-medium">Base Price:</span>
              <span className="text-blue-dark">${(services[service].base * sizes[size].multiplier).toFixed(2)}</span>
            </div>

            {extras.length > 0 && (
              <div className="space-y-1 mb-2">
                {extras.map((id) => {
                  const extra = extraOptions.find((option) => option.id === id)
                  return (
                    <div key={id} className="flex justify-between items-center text-sm">
                      <span className="text-blue-medium">{extra.name}:</span>
                      <span className="text-blue-dark">+${extra.price.toFixed(2)}</span>
                    </div>
                  )
                })}
              </div>
            )}

            <div className="flex justify-between items-center border-t border-blue-lighter pt-3 mt-3">
              <span className="font-bold text-blue-dark">Total Estimate:</span>
              <motion.span
                key={totalPrice}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-xl font-bold text-blue-medium"
              >
                ${totalPrice.toFixed(2)}
              </motion.span>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-blue-medium to-teal text-white hover:from-blue-dark hover:to-blue-medium transition-all duration-300 py-2 rounded-md">
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}

