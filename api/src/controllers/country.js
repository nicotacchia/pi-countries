const axios = require("axios");
const { Country, Activity } = require("../db");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

/*  En esta primera funcion, traemos mediante un map toda la info de la api, y luego con un foreach , 
la creamos y pasamos a la base de datos */
const getApiInfoCountry = async (req, res) => {
  const infoDb = await Country.findAll();
  if (!infoDb.length) {
    const apiUrl = await axios.get("https://restcountries.com/v3/all");
    const apiInfo = await apiUrl.data.map((e) => {
      return {
        id: e.cca3,
        name: e.name.common,
        imgflag: e.flags[1],
        continent: e.continents,
        capital: e.capital ? e.capital[0] : "Esta capital no está registrada.",
        subregion: e.subregion
          ? e.subregion
          : "Esta subregión no está registrada.",
        area: e.area,
        population: e.population,
        fifa: e.fifa ? e.fifa : "no existe fifa"
      };
    });
    apiInfo.forEach((e) => {
      Country.findOrCreate({
        where: {
          id: e.id,
          name: e.name,
          imgflag: e.imgflag,
          continents: e.continent,
          capital: e.capital,
          subregion: e.subregion,
          area: e.area,
          population: e.population,
          fifa: e.fifa
        },
      });
    });
    return apiInfo;
  } else {
    return infoDb;
  }
};


//funcion concatenada con traer todos los paises
// y desestructuracion del name para que matchee con el nombre del pais
const getQueryCountries = async (req, res) => {
  const { name } = req.query;
  const countriesTotal = await getApiInfoCountry();
  if (name) {
    let countryName = await countriesTotal.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    countryName.length
      ? res.status(200).send(countryName)
      : res.status(404).send("No existe dicho pais, lo siento");
  } else {
    res.status(200).send(countriesTotal);
  }
};

//funcion para llamar por id y traemos y cargamos dentro del pais las actividades. 
const getIdCountries = async (req, res) => {
  const { id } = req.params;
 
  if (id) {
    let country = await Country.findOne({
      where: { id },
      include: {
        model: Activity,
        attributes: ["name", "difficulty", "duration", "season"],
        through: { attributes: [] },
      }
    });
    if (country) {
      return res.json(country);
    } else {
      return res.status(404).send("el pais no fue encontrado");
    }
  } 
};

module.exports = {
  getQueryCountries,
  getIdCountries,
};
