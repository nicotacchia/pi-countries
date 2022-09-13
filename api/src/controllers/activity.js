const { Country, Activity } = require("../db");


//funcion de creacion de form, creacion de actividad y relacionarla con el pais elegido.
const postActivity = async (req, res) => {
  try {
    const { name, difficulty, duration, season, countries } = req.body;
    if (name && difficulty && duration && season && countries) {
      const instance = await Activity.create({
        name,
        difficulty,
        duration,
        season,
      });
      const traerpaises = await Country.findAll({
        where: {
          name: countries,
        },
      });
      await instance.addCountry(traerpaises);

      return res.send("Actividad creada con exito");
    } 
  } catch (error) {
      return res
        .status(400)
        .json({ message: "No se ha podido crear la actividad." })
  }
};

//
module.exports = 
  postActivity;
