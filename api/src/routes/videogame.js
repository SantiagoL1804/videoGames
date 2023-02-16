const { Router } = require("express");
const { Videogame, Genre } = require("../db");
require("dotenv").config();
const router = Router();
const axios = require("axios");
const APIKEY = process.env.YOUR_API_KEY;

router.get("/:idVideogame", async (req, res) => {
  const { idVideogame } = req.params;
  //console.log(idVideogame)
  //verifico si es un juego creado y me trae el detalle de la BASE DE DATOS
  if (idVideogame.includes("-")) {
    let videogameDb = await Videogame.findOne({
      where: {
        id: idVideogame,
      },
      include: Genre,
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    //Parseo el objeto
    videogameDb = JSON.stringify(videogameDb);
    videogameDb = JSON.parse(videogameDb);

    //dejo un array con los nombres de genero solamente
    videogameDb.genres = videogameDb.genres?.map((g) => g.name);
    res.json(videogameDb);
  } else {
    //AHORA COMO NO ESTABA EN BASE DE DATOS BUSCO EN API
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${idVideogame}?key=${APIKEY}`,
        { headers: { "Accept-Encoding": "null" } }
      );
      let {
        id,
        name,
        background_image: image,
        genres,
        description,
        released,
        rating,
        platforms,
      } = response.data;
      //console.log(response.data)
      genres = genres?.map((g) => g.name); // ACA MODIFICO EL ARRAY ENORME DE GENEROS SIMPLIFICANDOLO A UNO QUE SOLO TRAE LOS NOMBRES
      platforms = platforms?.map((p) => p.platform.name); // LO MISMO DE ARRIBA PERO CON PLATAFORMAS

      //CONVIERTO TODO A JSON CON SOLAMENTE LOS CAMPOS QUE ME PIDIERON Y LO RETORNO
      return res.json({
        id,
        name,
        image,
        genres,
        description,
        released,
        rating,
        platforms,
      });
    } catch (err) {
      return console.log(err);
    }
  }
});

module.exports = router;
