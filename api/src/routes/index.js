//const { Router } = require('express');
const router = require("express").Router();
//const axios = require('axios');
const postActivity = require ("../controllers/activity")
const  { getQueryCountries , getIdCountries } = require("../controllers/country")
const {Activity, Country} = require("../db")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


// 

router.get("/countries", getQueryCountries);
router.post("/activities", postActivity);
router.get("/countries/:id" , getIdCountries);



module.exports = router;
