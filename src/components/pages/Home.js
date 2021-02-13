import React from "react";
import "../../App.css";
import Cards from "../cards/Cards";
import Footer from "../footer/Footer";
import HeroSection from "../HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Cards />
      <Footer />
    </>
  );
}
