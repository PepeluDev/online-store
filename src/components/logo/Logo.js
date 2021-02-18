import React from "react";
import "./Logo.css";

const STYLES = ["logo__img__small", "logo__img__medium", "logo__img__big"];

function Logo({ logoStyle }) {
  const checkLogoStyle = STYLES.includes(logoStyle) ? logoStyle : STYLES[0];
  return (
    <>
      <img
        src="images/logos/po8op0.PNG"
        alt="logo"
        className={`logo__img ${checkLogoStyle}`}
      />
    </>
  );
}

export default Logo;
