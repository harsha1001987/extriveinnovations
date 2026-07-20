"use client";

import Navbar from "./Navbar";
import OverheadTicker from "./OverheadTicker";
import Hero from "./Hero";
import ProblemSection from "./ProblemSection";
import AboutSection from "./AboutSection";
import ManipurPilotSection from "./ManipurPilotSection";
import ProductsSection from "./ProductsSection";
import TractionSection from "./TractionSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

export default function Landing() {
  return (
    <>
      <Navbar />
      <OverheadTicker />
      <Hero />
      <ProblemSection />
      <AboutSection />
      <ManipurPilotSection />
      <ProductsSection />
      <TractionSection />
      <ContactSection />
      <Footer />
    </>
  );
}
