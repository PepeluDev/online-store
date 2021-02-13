import React from "react";
import "../../App.css";
import { TopCards } from "../cards/Cards";
import HeroSection from "../HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TopCards />
    </>
  );
}
