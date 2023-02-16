import React from "react";
import "./Home.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  sortVideogames,
  sortVideogamesRating,
  getGenres,
  filterByGenre,
  filterByApiOrCreated,
  deleteVideogame,
} from "../actions";
import Card from "./Card";
import { NavLink } from "react-router-dom";
import Paginado from "./Paginado";
import Searchbar from "./Searchbar";
import doctor from "../images/doctor.gif";
import logo from "../images/logo.png";

export default function Home(props) {
  const [games, setGames] = useState();
  const [order, setOrder] = useState("");
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.genres);

  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);
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

  console.log(currentPage);
  // const videogamesPosted = useSelector((state) => state.videogamesPosted);

  console.log(genres);
  let genresNames = genres?.map((g) => g.name);
  let sortGenreNames = genresNames.sort();

  useEffect(() => {
    setGames(videogames);
    dispatch(getGenres());

    dispatch(getVideogames());
  }, [dispatch]);

  const refreshHandler = (e) => {
    e.preventDefault();
    dispatch(getVideogames());
  };

  const sortHandler = (e) => {
    e.preventDefault();
    dispatch(sortVideogames(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  };

  const sortRatingHandler = (e) => {
    e.preventDefault();
    dispatch(sortVideogamesRating(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  };

  const filterHandlerGenre = (e) => {
    dispatch(filterByGenre(e.target.value));
  };
  const filterCreated = (e) => {
    dispatch(filterByApiOrCreated(e.target.value));
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

            <select onChange={(e) => sortHandler(e)} name="" id="">
              <option selected="true" disabled="disabled">
                Alfabético...
              </option>
              <option value="asc">a - z</option>
              <option value="desc">z - a</option>
            </select>

            <select onChange={(e) => sortRatingHandler(e)} name="" id="">
              <option selected="true" disabled="disabled">
                Rating...
              </option>
              <option value="asc">Menor a mayor</option>
              <option value="desc">Mayor a menor</option>
            </select>
          </div>
          <div className="filtersHome">
            <h3>Filtrar por: </h3>

            <select onChange={(e) => filterHandlerGenre(e)} name="" id="">
              <option selected="true" disabled="disabled">
                Género...
              </option>
              <option value="All">Todos</option>
              {sortGenreNames?.map((g) => {
                return <option value={`${g}`}>{g}</option>;
              })}
            </select>

            <select onChange={(e) => filterCreated(e)} name="" id="">
              <option selected="true" disabled="disabled">
                Origen...
              </option>
              <option value="All">Todos</option>
              <option value="api">Existentes</option>
              <option value="created">Creados</option>
            </select>
          </div>
        </div>
      </div>
      <div className="cardsContainer">
        {typeof currentGames === "object" && currentGames.length ? (
          currentGames?.map((game) => {
            if (typeof game === "string") {
              return undefined;
            } else {
              return (
                <Card
                  name={game.name}
                  image={game.image}
                  genres={game.genres}
                  key={game.id}
                  id={game.id}
                  created={game.created}
                  deleteHandler={deleteHandler}
                />
              );
            }
          })
        ) : typeof currentGames === "string" ? ( // si no hay juegos en el estado global, muestra un mensaje de error
          // <div>

          //   <p>No se encontró ningún juego</p>
          // </div>
          alert("No se encontró ningún juego con ese nombre")
        ) : (
          <div>
            <img className="doctorSearching" src={doctor} alt=""></img>
          </div>
        )}
      </div>

      <Paginado
        videogames={videogames.length}
        gamesPerPage={gamesPerPage}
        paginado={paginado}
        prevNext={prevNext}
        currentPage={currentPage}
      />
    </div>
  );
}
