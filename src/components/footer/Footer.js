import React from "react";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import Logo from "../logo/Logo";

import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Join the newletter to receive our best deals
        </p>
        <p className="footer-subscription-text">
          You can unsubscribe at any time.
        </p>
        <div className="input-areas">
          <form>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="footer-input"
            />
            <Button buttonStyle="btn--outline">Subscribe</Button>
          </form>
        </div>
      </section>
      <div className="footer-links">
        <div className="footer-links-wrapper">
          <div className="footer-links-items">
            <h2>About Us</h2>
            <Link to="/sign-up">How it works</Link>
            <Link to="/">Testimonials</Link>
            <Link to="/">Careers</Link>
            <Link to="/">Investors</Link>
            <Link to="/">Terms of Service</Link>
          </div>
          <div className="footer-links-items">
            <h2>Contact Us</h2>
            <Link to="/">Contact</Link>
            <Link to="/">Support</Link>
            <Link to="/">Destinations</Link>
            <Link to="/">Sponsorships</Link>
          </div>
        </div>
        <div className="footer-links-wrapper">
          <div className="footer-links-items">
            <h2>Videos</h2>
            <Link to="/">Submit Video</Link>
            <Link to="/">Ambassadors</Link>
            <Link to="/">Agency</Link>
            <Link to="/">Influencer</Link>
          </div>
          <div className="footer-links-items">
            <h2>Social Media</h2>
            <Link to="/">Instagram</Link>
            <Link to="/">Facebook</Link>
            <Link to="/">Youtube</Link>
            <Link to="/">Twitter</Link>
          </div>
        </div>
      </div>
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to="/" className="social-logo">
              <Logo logoStyle="logo__img__small" />
            </Link>
          </div>
          <small className="website-rights">Piece of Eigth ® 2021</small>
          <div className="social-icons">
            <Link
              to="/"
              target="_blank"
              className="social-icon-link facebook"
              aria-label="Facebook"
            >
              <i className="ri-facebook-box-line" />
            </Link>
            <Link
              to="/"
              target="_blank"
              className="social-icon-link instagram"
              aria-label="Instagram"
            >
              <i className="ri-instagram-line" />
            </Link>
            <Link
              to="/"
              target="_blank"
              className="social-icon-link twitter"
              aria-label="Twitter"
            >
              <i className="ri-twitter-line" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
