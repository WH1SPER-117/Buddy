import React from "react";
import BG from "../../Assets/BG.png";
import Logo from "../../Assets/buddy-removebg-preview.png";

export default function BuddyHeader() {
  return (
    <header className="w-full">

      <div
        className="relative overflow-hidden rounded-b-3xl shadow-md"
        style={{
          backgroundImage: `url('${BG}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        {/* Version badge - top right */}
        <div className="absolute top-4 right-6 z-10">
          <div className="px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md 
          text-xs font-medium text-slate-700 shadow">
            v1.0
          </div>
        </div>

        {/* Transparent overlay */}
        <div className="backdrop-blur-sm bg-white/20">
          <div className="max-w-6xl mx-auto px-6 py-10 md:py-14">

            <div className="relative flex items-center justify-center">

              {/* LOGO LEFT — no background box */}
              <img
                src={Logo}
                alt="Buddy logo"
                className="absolute left-0 w-16 h-16 md:w-20 md:h-20 object-contain"
              />

              {/* Centered Title */}
              <div className="text-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight 
                bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-cyan-500 to-teal-400">
                  buddy
                </h1>

              </div>

            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
