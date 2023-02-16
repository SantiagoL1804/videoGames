import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getVideogameDetail, cleanDetail } from "../actions";
import "./Detail.css";
import doctor from "../images/doctor.gif";

export default function Detail(props) {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.videogameDetail);
  console.log(detail);

  useEffect(() => {
    dispatch(getVideogameDetail(props.match.params.id));

    return function () {
      dispatch(cleanDetail());
    };
  }, []);
  return (
    <div className="detailContainer">
      <h1 className="detailMainTitle">Detalles del juego</h1>
      <div className="detail">
        <h2 className="detailTitle">{detail.name}</h2>
        <img
          className="detailImage"
          src={
            detail.name
              ? detail.image
              : "https://media.tenor.com/DKJKUeyytRQAAAAi/wifecheck-doctor.gif"
          }
          alt="Imagen de juego detalle"
        />
        <div className="detailList">
          <h4 className="detailLabel">Géneros: </h4>
          <ul className="detailUl">
            {detail.genres?.map((g) => (
              <li>{g}</li>
            ))}
          </ul>
        </div>
        <div className="detailSection">
          <h4 className="detailLabel">Rating: </h4>
          <p className="detailContent">{detail.rating}</p>
        </div>
        <div className="detailSection">
          <h4 className="detailLabel">Fecha de lanzamiento: </h4>
          <p className="detailContent">{detail.released}</p>
        </div>
        <div className="detailList">
          <h4 className="detailLabel">Plataformas: </h4>
          <ul className="detailUl">
            {detail.platforms?.map((p) => (
              <li>{p}</li>
            ))}
          </ul>
        </div>
        <div className="descriptionContainer">
          <p className="detailContent">{detail.description}</p>
        </div>
      </div>
      <div className="backButtonContainerDetail">
        <NavLink style={{ textDecoration: "none" }} to="/home">
          <h4 className="backButtonDetail">Volver</h4>
        </NavLink>
      </div>
    </div>
  );
}
