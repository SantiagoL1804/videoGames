import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getVideogameByName } from "../actions";
import "./Searchbar.css";

export default function Searchbar({ videogames }) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setName("");
  // }, [videogames]);

  const searchHandler = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getVideogameByName(name));
  };
  return (
    <div className="searchContainer">
      <input
        className="searchInput"
        value={name}
        placeholder="Nombre del juego..."
        onChange={(e) => searchHandler(e)}
        type="text"
      />
      <button
        className="searchButton"
        type="submit"
        onClick={(e) => submitHandler(e)}
      >
        Buscar
      </button>
    </div>
  );
}
