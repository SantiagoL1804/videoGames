import {
  GET_VIDEOGAMES,
  GET_VIDEOGAME_DETAIL,
  POST_VIDEOGAME,
  CLEAN_VIDEOGAME_DETAIL,
  GET_GENRES,
  SORT_VIDEOGAMES,
  GET_PLATFORMS,
  FILTER_BY_GENRE,
  FILTER_BY_API_OR_CREATED,
  GET_VIDEOGAMES_BY_NAME,
  SORT_VIDEOGAMES_RATING,
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
      console.log(state.genres);
      return { ...state, genres: action.payload };
    case GET_VIDEOGAMES_BY_NAME:
      return {
        ...state,
        videogames: action.payload,
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

    case SORT_VIDEOGAMES:
      const sortedGames =
        action.payload === "asc"
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
      const orderedGamesbyRating = state.videogames.sort(function (a, b) {
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

    case FILTER_BY_GENRE:
      const allVideogames = state.allVideogames;
      const filteredVideogames =
        action.payload === "All"
          ? allVideogames
          : allVideogames.filter((g) => g.genres.includes(action.payload));
      return {
        ...state,
        videogames: filteredVideogames,
      };

    // case FILTER_BY_GENRE:
    //   const allVideogames = state.allVideogames;

    //   return {
    //     ...state,
    //     videogames:
    //       action.payload === "All"
    //         ? allVideogames
    //         : state.videogames.filter((g) => g.genres.includes(action.payload)),
    //   };

    case FILTER_BY_API_OR_CREATED:
      const createdOrApi =
        action.payload === "All"
          ? state.allVideogames
          : action.payload === "created"
          ? state.allVideogames.filter((g) => g.created)
          : state.allVideogames.filter((g) => !g.created);
      return {
        ...state,
        videogames: createdOrApi,
      };

    // case FILTER_BY_API_OR_CREATED:
    //   const allVideogames2 = state.allVideogames;

    //   return {
    //     ...state,
    //     videogames:
    //       action.payload === "All"
    //         ? allVideogames2
    //         : action.payload === "created"
    //         ? state.videogames.filter((g) => g.created)
    //         : state.videogames.filter((g) => !g.created),
    //   };

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
