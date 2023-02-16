const { Videogame, Genre } = require("./src/db.js");
const axios = require("axios");
const APIKEY = process.env.YOUR_API_KEY;
const { v4: uuidv4 } = require("uuid");

const loadAllAssets = async () => {
  try {
    //! Me traigo los generos de la api

    let apiGenreResponse = await axios.get(
      `https://api.rawg.io/api/genres?key=${APIKEY}`,
      { headers: { "Accept-Encoding": "null" } }
    );
    //Los mapeo para extraer de cada uno de los juegos, el nombre
    let apiGenres = apiGenreResponse.data.results?.map((genre) => genre.name);

    //Para cada genero traido , se va a buscar en la base de datos, y si no existe se va a crear en la misma
    apiGenres?.forEach((genre) => {
      Genre.findOrCreate({ where: { name: genre } });
    });

    //! Meto los juegos en la base de datos

    for (let i = 1; i <= 5; i++) {
      let apiResponse = await axios.get(
        `https://api.rawg.io/api/games?key=${APIKEY}&page=${i}`,
        { headers: { "Accept-Encoding": "null" } }
      );
      apiResponse.data.results?.forEach(async (game) => {
        try {
          const genreNames = game.genres?.map((genre) => genre.name);

          let videogameCreated = await Videogame.create({
            id: uuidv4(),
            name: game.name,
            description: "",
            released: game.released,
            rating: parseInt(game.rating),
            platforms: [],
            image:
              game.background_image ||
              "https://assets-prd.ignimgs.com/2021/12/30/36190303-image-7-1640880187142.png",
            created: false,
          });
          let genresDb = await Genre.findAll({ where: { name: genreNames } });

          // // let genreNames = genresDb?.map((genre) => genre.name);

          await videogameCreated.addGenre(genresDb);
        } catch (error) {
          throw new Error(error);
        }
      });
    }

    // await Videogame.bulkCreate(apiDataLimited);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = loadAllAssets;
