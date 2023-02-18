import React, { useRef } from "react";
import "./Home.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  getGenres,
  sortVideogamesAlpha,
  sortVideogamesRating,
  filterBy,
  deleteVideogame,
} from "../actions";
import Card from "./Card";
import { NavLink } from "react-router-dom";
import Paginado from "./Paginado";
import Searchbar from "./Searchbar";
import waiting from "../images/sonica-waiting.gif";
import isaac from "../images/isaac.gif";
import logo from "../images/logo.png";

export default function Home() {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.genres);
  const [filterPanel, setFilterPanel] = useState({
    genres: "none",
    origin: "none",
    rating: "none",
    alphabetic: "none",
  });
  const initialLoad = useRef(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(12);
  const indexLastGame = currentPage * gamesPerPage;
  const indexFirstGame = indexLastGame - gamesPerPage;
  const currentGames = videogames.slice(indexFirstGame, indexLastGame);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const prevNext = (e) => {
    e.preventDefault();
    if (e.target.name === "prev") {
      setCurrentPage(currentPage - 1);
    }
    if (e.target.name === "next") {
      setCurrentPage(currentPage + 1);
    }
  };

  let genresNames = genres?.map((g) => g.name);
  let sortGenreNames = genresNames.sort();

  useEffect(() => {
    if (initialLoad.current) {
      dispatch(getGenres());

      dispatch(getVideogames());
      initialLoad.current = false;
      return;
    }
    setCurrentPage(1);
    dispatch(filterBy(filterPanel.genres, filterPanel.origin));
    dispatch(sortVideogamesAlpha(filterPanel.alphabetic));
    dispatch(sortVideogamesRating(filterPanel.rating));
    setCurrentPage(1);
  }, [dispatch, filterPanel]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleFiltersChange = (e) => {
    setFilterPanel({ ...filterPanel, [e.target.name]: e.target.value });
    setCurrentPage(1);
  };

  const refreshHandler = (e) => {
    e.preventDefault();
    dispatch(getVideogames());
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    dispatch(deleteVideogame(e.target.value));
    dispatch(getVideogames());
  };

  return (
    <div
      className={currentGames.length ? "homeContainer" : "homeContainerWaiting"}
    >
      <div className="headerHome">
        <img className="titleHome" src={logo} alt="Titulo" />

        <div>
          <NavLink
            className="createHome"
            style={{ textDecoration: "none" }}
            to="/create"
          >
            <button>Crear juego</button>
          </NavLink>
          <NavLink
            className="createHome"
            style={{ textDecoration: "none" }}
            to="/about"
          >
            <button>About</button>
          </NavLink>
        </div>
      </div>

      <div className="buttonsHome">
        <button className="refreshButton" onClick={refreshHandler}>
          Refrescar juegos
        </button>

        <Searchbar videogames={videogames}></Searchbar>

        <div className="sortAndFilters">
          <div className="sortsHome">
            <h3>Ordenar por: </h3>

            <select
              onChange={(e) => handleFiltersChange(e)}
              name="alphabetic"
              id=""
              value={filterPanel.alphabetic}
            >
              <option value="none" defaultValue={true} disabled="disabled">
                Alfabético...
              </option>
              <option value="asc">a - z</option>
              <option value="desc">z - a</option>
            </select>

            <select
              onChange={(e) => handleFiltersChange(e)}
              name="rating"
              id=""
              value={filterPanel.rating}
            >
              <option value="none" defaultValue={true} disabled="disabled">
                Rating...
              </option>
              <option value="asc">Menor a mayor</option>
              <option value="desc">Mayor a menor</option>
            </select>
          </div>
          <div className="filtersHome">
            <h3>Filtrar por: </h3>

            <select
              onChange={(e) => handleFiltersChange(e)}
              name="genres"
              id=""
              value={filterPanel.genres}
            >
              <option value="none" defaultValue={true} disabled="disabled">
                Género...
              </option>
              <option value="none">Todos</option>
              {sortGenreNames?.map((g) => {
                return <option value={`${g}`}>{g}</option>;
              })}
            </select>

            <select
              value={filterPanel.origin}
              onChange={(e) => handleFiltersChange(e)}
              name="origin"
              id=""
            >
              <option value="none" defaultValue={true} disabled="disabled">
                Origen...
              </option>
              <option value="none">Todos</option>
              <option value="api">Existentes</option>
              <option value="created">Creados</option>
            </select>
          </div>
        </div>
      </div>
      <div className="cardsContainer">
        {currentGames.length > 0 && currentGames[0] !== null ? (
          currentGames?.map((game) => {
            // if (typeof game === "string") {
            //   return undefined;
            // } else {
            return (
              <Card
                name={game.name}
                apiId={game.apiId}
                image={game.image}
                genres={game.genres}
                key={game.id}
                id={game.id}
                created={game.created}
                deleteHandler={deleteHandler}
              />
            );
            // }
          })
        ) : currentGames.length > 0 && currentGames[0] === null ? ( // si no hay juegos en el estado global, muestra un mensaje de error
          <div className="notFound">
            <p>No se encontró ningún juego</p>
            <img className="doctorSearching" src={isaac} alt=""></img>
          </div>
        ) : (
          <div>
            <img className="doctorSearching" src={waiting} alt=""></img>
          </div>
        )}
      </div>

      {videogames.length > gamesPerPage ? (
        <Paginado
          videogames={videogames.length}
          gamesPerPage={gamesPerPage}
          paginado={paginado}
          prevNext={prevNext}
          currentPage={currentPage}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}
