import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postVideogame, getGenres, getPlatforms } from "../actions";
import { NavLink } from "react-router-dom";
import "./PostVideogame.css";
import creed from "../images/creed.jpg";

const PostVideogame = () => {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  let genresNames = genres?.map((g) => g.name);
  let sortGenreNames = genresNames.sort();

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}-${month}-${year}`;
  console.log(currentDate);

  const validate = (input) => {
    let errors = {};
    if (!input.name) {
      errors.name = "Nombre de videojuego requerido";
    }
    const found = videogames.find((g) => g.name === input.name);
    if (found) {
      errors.name = "El nombre de juego ingresado ya existe";
    }
    if (!input.description) {
      errors.description = "Descripción de videojuego requerida";
    }
    if (!input.platforms.length) {
      errors.platforms = "Al menos una plataforma de videojuego requerida";
    }
    if (input.rating && !/^[1-5]$/.test(input.rating)) {
      errors.rating = "El rating debe ser un numero entre 0 y 5";
    }
    if (input.released > currentDate) {
      errors.released = "La fecha no puede ser mayor al dia presente";
    }
    return errors;
  };

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: 0,
    image: "",
    genres: [],
    platforms: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    platforms: "",
    rating: "",
    released: "",
  });

  const changeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput({ ...input, [name]: value });
    setErrors(validate({ ...input, [name]: value }));
  };

  const selectHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    e.preventDefault();
    if (!input[name].includes(value)) {
      setInput({ ...input, [name]: [...input[name], value] });
    }
    console.log(input[name]);
  };

  const deleteFromList = (e) => {
    let value = e.target.value;
    if (input.platforms.indexOf(value) !== -1) {
      setInput({
        ...input,
        platforms: input.platforms.filter((p) => p !== value),
      });
    } else if (input.genres.indexOf(value) !== -1) {
      setInput({
        ...input,
        genres: input.genres.filter((p) => p !== value),
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(postVideogame(input));
    setInput({
      name: "",
      description: "",
      released: "",
      rating: 0,
      image: "",
      genres: [],
      platforms: [],
    });
    alert(`${input.name} fue creado con exito!`);
  };
  console.log(input);

  return (
    <div className="postContainer">
      <div className="formImg">
        <img className="creedImg" src={creed} alt="Assassins Creed" />
        <div className="formContainer">
          <h2>Crea tu videojuego</h2>
          <form
            className="form"
            action=""
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="formSection">
              <label className="formLabel" htmlFor="">
                Nombre*:{" "}
              </label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={changeHandler}
                className={`${errors.name && "danger"} formInput`}
              />
              {errors.name && <p className="danger">{errors.name}</p>}
            </div>

            <div className="formSection">
              <label className="formLabel" htmlFor="">
                Fecha de lanzamiento:{" "}
              </label>
              <input
                type="date"
                name="released"
                value={input.released}
                onChange={changeHandler}
              />
              {errors.released && <p>{errors.released}</p>}
            </div>

            <div className="formSection">
              <label className="formLabel" htmlFor="">
                Rating:{" "}
              </label>
              <input
                type="number"
                name="rating"
                value={input.rating}
                onChange={changeHandler}
                className={errors.rating && "danger"}
              />
              {errors.rating && <p className="danger">{errors.rating}</p>}
            </div>

            <div className="formSection">
              <label className="formLabel" htmlFor="">
                URL de imagen:{" "}
              </label>
              <input
                type="text"
                name="image"
                value={input.image}
                onChange={changeHandler}
              />
            </div>

            <div className="formSection">
              <label className="formLabel" for="platforms">
                Plataformas*:{" "}
              </label>
              <select
                id="platforms"
                name="platforms"
                value={input.platforms}
                onChange={selectHandler}
                className={errors.platforms && "danger"}
              >
                <option>...</option>
                {platforms?.map((p) => {
                  return (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  );
                })}
              </select>
              {errors.platforms && <p className="danger">{errors.platforms}</p>}
            </div>

            <div className="formSection">
              <label className="formLabel" for="genres">
                Géneros:{" "}
              </label>
              <select
                id="genres"
                name="genres"
                value={input.genres}
                onChange={(e) => selectHandler(e)}
              >
                <option>...</option>
                {sortGenreNames?.map((g) => {
                  return (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="formSection">
              <label className="formLabel" htmlFor="">
                Descripción*:{" "}
              </label>
              <textarea
                type="text"
                name="description"
                value={input.description}
                onChange={changeHandler}
                className={errors.description && "danger"}
              />
              {errors.description && (
                <p className="danger">{errors.description}</p>
              )}
            </div>

            <div>
              {input.genres.length > 0 && (
                <p className="chosenLabel">Géneros seleccionados: </p>
              )}
              {input.genres?.map((g) => {
                return (
                  <div className="listChosen">
                    <p className="chosenChild">{g}</p>
                    <button
                      className="chosenDelete"
                      key={g}
                      value={g}
                      onClick={deleteFromList}
                    >
                      X
                    </button>
                  </div>
                );
              })}
            </div>
            <div>
              {input.platforms.length > 0 && (
                <p className="chosenLabel">Plataformas seleccionados:</p>
              )}
              {input.platforms?.map((p) => {
                return (
                  <div className="listChosen">
                    <p className="chosenChild">{p}</p>
                    <button
                      className="chosenDelete"
                      key={p}
                      value={p}
                      onClick={deleteFromList}
                    >
                      X
                    </button>
                  </div>
                );
              })}
            </div>

            <button
              className={`${
                !input.name || !input.description || !input.platforms.length
                  ? "disabledCreate"
                  : "createButton"
              }`}
              type="submit"
              disabled={
                !input.name || !input.description || !input.platforms.length
              }
            >
              Crear
            </button>
          </form>
        </div>
      </div>
      <div className="backButtonContainer">
        <NavLink style={{ textDecoration: "none" }} to="/home">
          <h4 className="backButton">Volver</h4>
        </NavLink>
      </div>
    </div>
  );
};

export default PostVideogame;
