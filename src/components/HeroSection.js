import React from "react";
import "../App.css";
import Button from "./button/Button";
import "./HeroSection.css";
import Logo from "./logo/Logo";

function HeroSection() {
  return (
    <div
      className="hero-container"
      style={{
        backgroundImage: "url(/images/background/bg2.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top 30% center",
      }}
    >
      {/*<video src="/videos/video-2.mp4" autoPlay loop muted */}
      <Logo logoStyle="logo__img__medium" />
      <p>UNDER CONSTRUCTION</p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          CONTACT US
        </Button>
        {/* <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
        >
          WATCH TRAILER
          <i className="ri-play-circle-line" />
        </Button>*/}
      </div>
    </div>
  );
}

export default HeroSection;
