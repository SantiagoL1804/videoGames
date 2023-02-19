import axios from "axios";
// const endPoint = process.env.REACT_APP_API || "http://localhost:3001";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const POST_VIDEOGAME = "POST_VIDEOGAME";
export const DELETE_VIDEOGAME = "DELETE_VIDEOGAME";
export const CLEAN_VIDEOGAME_DETAIL = "CLEAN_VIDEOGAME_DETAIL";
export const GET_VIDEOGAMES_BY_NAME = "GET_VIDEOGAMES_BY_NAME";
export const SORT_VIDEOGAMES_ALPHA = "SORT_VIDEOGAMES_ALPHA";
export const SORT_VIDEOGAMES_RATING = "SORT_VIDEOGAMES_RATING";
export const FILTER_BY = "FILTER_BY";
export const CLEAN = "CLEAN";

//--ACCIONES GET--

export const getVideogames = () => {
  return async function (dispatch) {
    let response = await axios.get(`/videogames`);
    //con el dispatch toy retornando la data q me traigo con el axios
    return dispatch({ type: GET_VIDEOGAMES, payload: response.data });
  };
};

export const getVideogameDetail = (id) => {
  return async function (dispatch) {
    let response = await axios.get(`/videogame/${id}`);

    return dispatch({ type: GET_VIDEOGAME_DETAIL, payload: response.data });
  };
};

export const getVideogameByName = (name) => {
  return async function (dispatch) {
    try {
      let response = await axios.get(`/videogames?name=${name}`);
      return dispatch({ type: GET_VIDEOGAMES_BY_NAME, payload: response.data });
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const getGenres = () => {
  return async function (dispatch) {
    let data = await axios.get(`/genres`);

    return dispatch({ type: GET_GENRES, payload: data.data });
  };
};

export const getPlatforms = () => {
  return async function (dispatch) {
    let data = await axios.get(`/platforms`);

    return dispatch({ type: GET_PLATFORMS, payload: data.data });
  };
};

//--ACCIONES POST--

export const postVideogame = (game) => {
  return async function () {
    try {
      let postedGame = await axios.post(`/videogames`, game);

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

export const filterBy = (genres, origin) => {
  return { type: FILTER_BY, payload: { genres, origin } };
};

export const sortVideogamesAlpha = (payload) => {
  return { type: SORT_VIDEOGAMES_ALPHA, payload };
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
