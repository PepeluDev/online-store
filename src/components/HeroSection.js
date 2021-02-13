import React from "react";
import "../App.css";
import Button from "./button/Button";
import "./HeroSection.css";

function HeroSection() {
  return (
    <div
      className="hero-container"
      style={{
        backgroundImage: "url(/images/background/bg1.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      {/*<video src="/videos/video-2.mp4" autoPlay loop muted */}
      <h1>INK AWAITS</h1>
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
