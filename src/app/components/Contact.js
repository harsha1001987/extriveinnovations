"use client";

import { Mail, Phone, MapPin, Linkedin } from "lucide-react";

export default function GetInTouch() {
  return (
    <section
      id="contact"
      className="relative bg-[#030303] text-white py-32 px-6 overflow-hidden flex flex-col items-center"
    >
      {/* Continuous Background Fix: 
        Replaced the broken top/bottom gradients with a single, sweeping radial gradient 
        that covers the entire section smoothly, eliminating the black gap. 
      */}
      <div className="absolute inset-0 pointer-events-none 
        bg-[radial-gradient(ellipse_at_top,rgba(255,120,0,0.12),transparent_75%)]" />
      
      {/* Subtle fade-to-black at the very bottom for a clean footer transition */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 pointer-events-none 
        bg-gradient-to-t from-black to-transparent" />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center">

        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Let’s{" "}
          <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent
            drop-shadow-[0_0_15px_rgba(255,120,0,0.3)]">
            Connect
          </span>
        </h2>

        <p className="text-gray-400 max-w-xl text-lg font-light tracking-wide mb-20">
          Discuss deployment strategy, technical integration, or institutional partnerships.
        </p>

        {/* Contact Items - Switched to a responsive grid for perfect alignment */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          <ContactItem
            icon={<Mail size={24} strokeWidth={1.5} />}
            title="Email"
            value="info@extriveinnovations.com"
            link="mailto:info@extriveinnovations.com"
          />
          
          <ContactItem
            icon={<Phone size={24} strokeWidth={1.5} />}
            title="Phone"
            value="+91 7037 108 656"
            link="tel:+917037108656"
          />
          
          <ContactItem
            icon={<MapPin size={24} strokeWidth={1.5} />}
            title="Location"
            value="Hyderabad, India"
            /* Left link blank so it acts just as a display block */
          />
          
          <ContactItem
            icon={<Linkedin size={24} strokeWidth={1.5} />}
            title="LinkedIn"
            value="Follow our updates"
            link="#" 
          />

        </div>

        {/* Elegant horizontal divider line to separate footer info */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-28 mb-8" />

        {/* Footer Info */}
        <div className="text-gray-500/80 text-sm space-y-3 font-light tracking-wide">
          <p>
            Survey No: 62, 1A, Jeedimetla, Bahadurpally, Hyderabad, Telangana 500043
          </p>
          <p>© {new Date().getFullYear()} Extrive Innovations. All rights reserved.</p>
        </div>

      </div>
    </section>
  );
}

function ContactItem({ icon, title, value, link }) {
  const Content = (
    <div className="group relative flex flex-col items-center text-center cursor-pointer">
      
      {/* Subtle Icon Container with Glassmorphism Hover Effects */}
      <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/[0.05] 
        flex items-center justify-center text-orange-500 
        transition-all duration-500 group-hover:-translate-y-1 
        group-hover:bg-orange-500/10 group-hover:border-orange-500/30 
        group-hover:shadow-[0_0_20px_rgba(255,120,0,0.15)]">
        <div className="transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
      </div>

      <h4 className="mt-6 font-medium text-gray-200 tracking-wide 
        group-hover:text-white transition-colors duration-300">
        {title}
      </h4>

      <p className="mt-2 text-gray-500 text-sm font-light 
        transition-colors duration-300 group-hover:text-orange-400/80">
        {value}
      </p>

    </div>
  );

  // If a link is provided, wrap it in an anchor tag for actual functionality
  if (link) {
    return (
      <a href={link} className="block outline-none">
        {Content}
      </a>
    );
  }

  return <div>{Content}</div>;
}