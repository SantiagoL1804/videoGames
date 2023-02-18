import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getVideogameDetail, cleanDetail } from "../actions";
import "./Detail.css";
import waiting from "../images/sonica-waiting.gif";

export default function Detail(props) {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.videogameDetail);

  useEffect(() => {
    dispatch(getVideogameDetail(props.match.params.id));

    return function () {
      dispatch(cleanDetail());
    };
  }, []);
  return (
    <div className="detailContainer">
      <h1 className="detailMainTitle">Detalles del juego</h1>
      {detail.name ? (
        <div className="detail rgb">
          <h2 className="detailTitle">{detail.name}</h2>
          <img
            className="detailImage"
            src={detail.image}
            alt="Imagen de juego detalle"
          />
          <div className="detailItemsContainer">
            <div className="detailList">
              <h4 className="detailLabel">Géneros: </h4>
              <ul className="detailUl">
                {detail.genres?.map((g, index, array) =>
                  index + 1 !== array.length ? (
                    <li className="detailLi">{g},</li>
                  ) : (
                    <li className="detailLi">{g}.</li>
                  )
                )}
              </ul>
            </div>
            <div className="detailSection">
              <h4 className="detailLabel">Rating: </h4>
              <p className="detailContent">{detail.rating} /5</p>
            </div>
            <div className="detailSection">
              <h4 className="detailLabel">Fecha de lanzamiento: </h4>
              <p className="detailContent">{detail.released}</p>
            </div>
            <div className="detailList">
              <h4 className="detailLabel">Plataformas: </h4>
              <ul className="detailUl">
                {detail.platforms?.map((p, index, array) =>
                  index + 1 !== array.length ? (
                    <li className="detailLi">{p},</li>
                  ) : (
                    <li className="detailLi">{p}.</li>
                  )
                )}
              </ul>
            </div>
          </div>
          <div className="descriptionContainer">
            <p className="detailContent">
              {detail.description
                ?.replace(/<br\s*\/?>/g, "")
                .replace(/<\/?p>/gi, "")
                .replace(/&#39;/g, "´")}
            </p>
          </div>
        </div>
      ) : (
        <div>
          <img className="doctorSearching" src={waiting} alt=""></img>
        </div>
      )}
      <div className="backButtonContainerDetail">
        <NavLink style={{ textDecoration: "none" }} to="/home">
          <h4 className="backButtonDetail">Volver</h4>
        </NavLink>
      </div>
    </div>
  );
}
