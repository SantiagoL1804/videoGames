import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const POST_VIDEOGAME = "POST_VIDEOGAME";
export const DELETE_VIDEOGAME = "DELETE_VIDEOGAME";
export const CLEAN_VIDEOGAME_DETAIL = "CLEAN_VIDEOGAME_DETAIL";
export const GET_VIDEOGAMES_BY_NAME = "GET_VIDEOGAMES_BY_NAME";
export const SORT_VIDEOGAMES = "SORT_VIDEOGAMES";
export const SORT_VIDEOGAMES_RATING = "SORT_VIDEOGAMES_RATING";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_BY_API_OR_CREATED = "FILTER_BY_API_OR_CREATED";
export const CLEAN = "CLEAN";

//--ACCIONES GET--

export const getVideogames = () => {
  return async function (dispatch) {
    let response = await axios.get("http://localhost:3001/videogames");
    //con el dispatch toy retornando la data q me traigo con el axios
    return dispatch({ type: GET_VIDEOGAMES, payload: response.data });
  };
};

export const getVideogameDetail = (id) => {
  return async function (dispatch) {
    let response = await axios.get(`http://localhost:3001/videogame/${id}`);

    return dispatch({ type: GET_VIDEOGAME_DETAIL, payload: response.data });
  };
};

export const getVideogameByName = (name) => {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        `http://localhost:3001/videogames?name=${name}`
      );
      return dispatch({ type: GET_VIDEOGAMES_BY_NAME, payload: response.data });
    } catch (error) {
      console.log(error.response);
      return dispatch({
        type: GET_VIDEOGAMES_BY_NAME,
        payload: error.response.data,
      });
    }
  };
};

export const getGenres = () => {
  return async function (dispatch) {
    let data = await axios.get("http://localhost:3001/genres");

    return dispatch({ type: GET_GENRES, payload: data.data });
  };
};

export const getPlatforms = () => {
  return async function (dispatch) {
    let data = await axios.get("http://localhost:3001/platforms");

    return dispatch({ type: GET_PLATFORMS, payload: data.data });
  };
};

//--ACCIONES POST--

export const postVideogame = (game) => {
  return async function () {
    try {
      let postedGame = await axios.post(
        "http://localhost:3001/videogames",
        game
      );

      return postedGame;
    } catch (error) {
      console.log(error);
    }
  };
};

//--ACCIONES CLEAN O DELETE--

export const cleanDetail = () => {
  return { type: CLEAN_VIDEOGAME_DETAIL };
};

//--ACCIONES FILTER Y SORT--

export const filterByGenre = (payload) => {
  return { type: FILTER_BY_GENRE, payload };
};

export const filterByApiOrCreated = (payload) => {
  return { type: FILTER_BY_API_OR_CREATED, payload };
};

export const sortVideogames = (payload) => {
  return { type: SORT_VIDEOGAMES, payload };
};

export const sortVideogamesRating = (payload) => {
  return { type: SORT_VIDEOGAMES_RATING, payload };
};

//--ACCIONES DELETE Y PUT--

export const deleteVideogame = (id) => {
  return async function (dispatch) {
    try {
      let deletedGame = await axios.delete(
        `http://localhost:3001/videogames?id=${id}`
      );
      console.log(deletedGame);
      return dispatch({
        type: DELETE_VIDEOGAME,
        payload: deletedGame.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const Clean = () => {
  return {
    type: CLEAN,
  };
};
