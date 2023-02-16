import React from "react";
import "./Card.css";
import { NavLink } from "react-router-dom";

export default function Card({
  name,
  image,
  genres,
  key,
  id,
  created,
  deleteHandler,
}) {
  return (
    <div className="card" key={key}>
      <div className="button-container">
        {created ? (
          <button value={id} onClick={(e) => deleteHandler(e)}>
            X
          </button>
        ) : undefined}
        <img className="cardImage" src={image} alt="Imagen juego" />
      </div>
      <div className="contentBox">
        <div className="cardHeader">
          <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
            <path />
          </svg>

          <div>
            <h2 className="card__title">{name}</h2>
          </div>
        </div>
        <div className="genresBox">
          {genres.length ? <h3 className="genreTitle">Géneros</h3> : <br></br>}
          <ul className="genresList">
            {genres?.map((genre) => (
              <li className="genreList">{genre}</li>
            ))}
          </ul>
        </div>
        <div className="detailCard">
          <NavLink
            className="navLinkCard"
            style={{ textDecoration: "none" }}
            to={`/gameDetail/${id}`}
          >
            <button className="cardDetails">Detalles</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
