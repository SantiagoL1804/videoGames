import {
  GET_VIDEOGAMES,
  GET_VIDEOGAME_DETAIL,
  POST_VIDEOGAME,
  CLEAN_VIDEOGAME_DETAIL,
  GET_GENRES,
  GET_VIDEOGAMES_BY_NAME,
  GET_PLATFORMS,
  FILTER_BY,
  SORT_VIDEOGAMES_RATING,
  SORT_VIDEOGAMES_ALPHA,
  DELETE_VIDEOGAME,
  CLEAN,
} from "../actions";

const initialState = {
  videogames: [],
  allVideogames: [],
  genres: [],
  videogameDetail: {},
  platforms: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };
    case GET_VIDEOGAME_DETAIL:
      return { ...state, videogameDetail: action.payload };
    case CLEAN_VIDEOGAME_DETAIL:
      return { ...state, videogameDetail: {} };
    case GET_GENRES:
      console.log(action.payload);
      return { ...state, genres: action.payload };
    case GET_VIDEOGAMES_BY_NAME:
      return {
        ...state,
        videogames: action.payload.length > 0 ? action.payload : [null],
      };
    case GET_PLATFORMS:
      return { ...state, platforms: action.payload };
    case POST_VIDEOGAME:
      return { ...state };

    case DELETE_VIDEOGAME:
      return {
        ...state,
        videogames: [action.payload, ...state.videogames],
      };

    case SORT_VIDEOGAMES_ALPHA:
      const sortedGames =
        action.payload === "none"
          ? state.videogames
          : action.payload === "asc"
          ? state.videogames.sort((a, b) => {
              let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase();

              if (fa < fb) {
                return -1;
              }
              if (fa > fb) {
                return 1;
              }
              return 0;
            })
          : state.videogames.sort((a, b) => {
              let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase();

              if (fa > fb) {
                return -1;
              }
              if (fa < fb) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: sortedGames,
      };
    case SORT_VIDEOGAMES_RATING:
      const orderedGamesbyRating =
        action.payload === "none"
          ? state.videogames
          : state.videogames.sort(function (a, b) {
              if (action.payload === "asc") {
                if (a.rating < b.rating) {
                  return -1;
                } else if (a.rating > b.rating) {
                  return 1;
                } else {
                  return 0;
                }
              } else if (action.payload === "desc") {
                if (a.rating > b.rating) {
                  return -1;
                } else if (a.rating < b.rating) {
                  return 1;
                } else {
                  return 0;
                }
              }
              return "Ordered";
            });
      return {
        ...state,
        videogames: orderedGamesbyRating,
      };

    case FILTER_BY:
      const allVideogames = [...state.allVideogames];
      const filtered =
        action.payload.origin === "none" && action.payload.genres === "none"
          ? allVideogames
          : action.payload.genres !== "none" && action.payload.origin === "none"
          ? allVideogames.filter((g) =>
              g.genres.includes(action.payload.genres)
            )
          : action.payload.genres === "none" && action.payload.origin !== "none"
          ? allVideogames.filter((g) =>
              action.payload.origin === "created"
                ? g.created
                : action.payload.origin === "api"
                ? !g.created
                : null
            )
          : allVideogames
              .filter((g) => g.genres.includes(action.payload.genres))
              .filter((g) =>
                action.payload.origin === "created"
                  ? g.created
                  : action.payload.origin === "api"
                  ? !g.created
                  : null
              );

      return {
        ...state,
        videogames: filtered.length > 0 ? filtered : [null],
      };

    case CLEAN:
      return {
        ...state,
        videogames: state.allVideogames,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
