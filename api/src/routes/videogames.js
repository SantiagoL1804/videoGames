const { Router } = require("express");
require("dotenv").config();
const { Videogame, Genre } = require("../db");
const router = Router();
const axios = require("axios");
const APIKEY = process.env.YOUR_API_KEY;

//Creo una funcion que trae todos los juegos de la base de datos, incluyendole los generos relacionados
const getDbData = async () => {
  try {
    const videogamesDb = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
        through: { attributes: [] },
      },
      attributes: ["id", "name", "image", "created", "rating"],
    });
    const vgGenres = videogamesDb?.map((game) => {
      return {
        id: game.id,
        name: game.name,
        rating: game.rating,
        description: game.description,
        image: game.image,
        platforms: game.platforms,
        released: game.released,
        created: game.created,
        genres: game.genres?.map((genre) => genre.name),
      };
    });
    return vgGenres;
  } catch (error) {
    res.status(404).send(error.message);
  }
};

//Creo una funcion que trae los primeros 100 juegos de la api
// const getApiData = async () => {
//   try {
//     let apiResponse = await axios.get(
//       `https://api.rawg.io/api/games?key=${APIKEY}`,
//       { headers: { "Accept-Encoding": "null" } }
//     );

//     let apiDataLimited = []; //Array vacia donde voy agregando juegos de cada paginado de la api hasta llegar a 100

//     while (apiDataLimited.length <= 100) {
//       let apiVidgames = apiResponse.data.results?.map((game) => {
//         return {
//           id: game.id,
//           name: game.name,
//           rating: game.rating,
//           image: game.background_image,
//           genres: game.genres?.map((genre) => genre.name),
//         };
//       });
//       // console.log(apiVidgames);
//       apiDataLimited = [...apiDataLimited, ...apiVidgames]; //Voy agregando los juegos que voy encontrando a la array con los que ya encontre
//       apiResponse = await axios.get(apiResponse.data.next, {
//         headers: { "Accept-Encoding": "null" },
//       });
//     }
//     return apiDataLimited;
//   } catch (error) {
//     console.log(error);
//   }
// };

const getAllVideogames = async () => {
  //Guardo los juegos que me retornan las funciones
  let dbData = await getDbData();
  // let apiData = await getApiData();

  // let allData = dbData.concat(apiData).slice(0, 100);

  //Corto los juegos en 100 luego de juntar los de la base de datos con la api, ya que si creo un juego, se excederia de 100 juegos
  // let allData = [...dbData, ...apiData].slice(0, 100);
  let allData = [...dbData].slice(0, 100);
  return allData;
};

router.get("/", async (req, res) => {
  //Paso nombre por query para filtrar los juegos que incluyan dicho nombre en su name
  const { name } = req.query;
  const allData = await getAllVideogames();
  if (name) {
    //Si hay nombre pasado por query
    try {
      //Se filtra y se compara los nombres en minuscula para que se pueda buscar juegos sin restricciones
      let videogameName = allData.filter((game) =>
        game.name.toLowerCase().includes(name.toLowerCase())
      );
      if (!videogameName.length)
        res.status(404).send("No se encontró ningún videojuego con ese nombre");
      return res.status(200).json(videogameName);
    } catch (error) {
      return res.status(404).send(error.message);
    }
  } else {
    try {
      return res.status(200).json(allData);
    } catch (error) {
      return res.status(404).send(error.message);
    }
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      released,
      rating,
      platforms,
      image,
      created,
      genres,
    } = req.body;

    console.log("generos para juego creado", genres);

    let videogameCreated = await Videogame.create({
      name,
      description,
      released,
      rating,
      platforms,
      image:
        image ||
        "https://assets-prd.ignimgs.com/2021/12/30/36190303-image-7-1640880187142.png",
      created,
    });

    //Debo encontrar en mi modelo de generos, todos los que coincidan con lo que llega por body

    let genresDb = await Genre.findAll({ where: { name: genres } });

    // let genreNames = genresDb?.map((genre) => genre.name);

    await videogameCreated.addGenre(genresDb);
    res.status(200).send("Videojuego creado!");
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.delete("/", async (req, res) => {
  let { id } = req.query;
  try {
    await Videogame.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json("Juego eliminado");
  } catch (error) {
    console.log(error);
    res.status(404).json(error.message);
  }
});

module.exports = router;
