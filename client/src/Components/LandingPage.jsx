import React from "react";
import { NavLink } from "react-router-dom";
import "./LandingPage.css";
import landingVideo from "../images/landingVideo.mp4";
import startLanding from "../images/startLanding.png";

export default function LandingPage() {
  return (
    <div className="hero">
      <div className="content">
        <NavLink style={{ textDecoration: "none" }} to="/home">
          <img src={startLanding} alt="Start Landing" />
        </NavLink>
      </div>
      <video autoPlay loop muted playsInline className="backVideo">
        <source src={landingVideo} type="video/mp4" />
      </video>
    </div>
  );
}
