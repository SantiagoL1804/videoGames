import React from "react";
import { NavLink } from "react-router-dom";
import fotocv from "../images/fotocv.png";
import "./About.css";

export default function About() {
  return (
    <div className="aboutContainer">
      <div className="about rgb">
        <h1 className="aboutMainTitle">Sobre mí</h1>
        <img className="aboutImage" src={fotocv} alt="Imagen Santiago" />
        <div className="descriptionContainer">
          <p className="aboutContent">
            Mi nombre es Santiago Larrique, soy desarrollador Full Stack
            recibido de Henry. Además, estudio en la Universidad Católica del
            Uruguay, en la carrera de Gestión en Dirección de Empresas. Desde
            que soy joven me apasiona el mundo informático, siempre me generó
            mucho interés explorar este mundo y resolver los problemas que se me
            presenten. He adquirido un conocimiento básico del mundo de la
            programación a través de Coderhouse, pero fue luego de finalizar mis
            estudios en Henry que logré potenciar mis capacidades. Cuento con
            proyectos grupales e individuales en los que he trabajado con
            diversos frameworks.
          </p>
        </div>
        <div className="aboutItemsContainer">
          <div className="aboutList">
            <h4 className="aboutLabel">
              Lenguajes y frameworks en el proyecto:{" "}
            </h4>
            <ul className="aboutUl">
              <li className="aboutLi">
                CSS · Sequelize.js · Redux.js · PostgreSQL · Express.js ·
                React.js · Node.js · JavaScript
              </li>
            </ul>
          </div>
          <div className="aboutList">
            <h4 className="aboutLabel">Mis redes: </h4>
            <ul className="aboutUlNetwork">
              <NavLink to="https://www.linkedin.com/in/santiago-larrique/">
                <li className="aboutLiNetwork">
                  https://www.linkedin.com/in/santiago-larrique/
                </li>
              </NavLink>
              <NavLink to="https://github.com/SantiagoL1804">
                <li className="aboutLiNetwork">
                  https://github.com/SantiagoL1804
                </li>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>

      <div className="backButtonContainerAbout">
        <NavLink style={{ textDecoration: "none" }} to="/home">
          <h4 className="backButtonAbout">Volver</h4>
        </NavLink>
      </div>
    </div>
  );
}
