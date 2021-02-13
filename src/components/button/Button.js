import React from "react";
import { Link } from "react-router-dom";

import "./Button.css";

const STYLES = ["btn--primary", "btn--secondary", "btn--outline"];
const SIZES = ["btn--small", "btn--medium", "btn--large"];

export default function button({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
}) {
  // Predefined button styles
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <Link to="/sign-up" className="btn-mobile">
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </Link>
  );
}
