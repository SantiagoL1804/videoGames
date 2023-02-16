const { Router } = require("express");
const { Genre } = require("../db");
require("dotenv").config();
const router = Router();
const axios = require("axios");
const { route } = require("./videogames");
const APIKEY = process.env.YOUR_API_KEY;

router.get("/", async (req, res) => {
  //Me traigo los generos de la api
  try {
    let apiResponse = await axios.get(
      `https://api.rawg.io/api/genres?key=${APIKEY}`,
      { headers: { "Accept-Encoding": "null" } }
    );
    //Los mapeo para extraer de cada uno de los juegos, el nombre
    let apiGenres = apiResponse.data.results?.map((genre) => genre.name);
    // console.log(apiGenres);

    //Para cada genero traido , se va a buscar en la base de datos, y si no existe se va a crear en la misma
    apiGenres?.forEach((genre) => {
      Genre.findOrCreate({ where: { name: genre } });
    });
    let allGenres = await Genre.findAll();
    res.json(allGenres);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
