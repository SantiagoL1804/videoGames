import React from "react";
import { NavLink } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="maincontainer">
      <section id="top">
        <div className="Landing">
          <div className="topspace"></div>
          <div className="TextandButton">
            <div className="firsttext">
              <p className="Maintext">HENRY VIDEOGAMES</p>
            </div>

            <div className="btncointainer">
              <NavLink to="/home">
                <button className="joinbtn">Iniciar</button>
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
