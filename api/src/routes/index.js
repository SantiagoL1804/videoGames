const { Router } = require("express");
require("dotenv").config();
const APIKEY = process.env.YOUR_API_KEY;
// Importar todos los routers;
const genres = require("./genres");
const videogames = require("./videogames");
const videogame = require("./videogame");
const platforms = require("./platforms");

const router = Router();

// Configurar los routers
router.use("/videogames", videogames);
router.use("/videogame", videogame);
router.use("/genres", genres);
router.use("/platforms", platforms);

module.exports = router;
