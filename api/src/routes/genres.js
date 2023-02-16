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
    let allGenres = await Genre.findAll();
    res.json(allGenres);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
