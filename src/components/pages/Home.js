import React from "react";
import "../../App.css";
import HeroSection from "../HeroSection";

export default function Home(props) {
  const { TopCards } = props;
  return (
    <>
      <HeroSection />
      <TopCards />
    </>
  );
}
