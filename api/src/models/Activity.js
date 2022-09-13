const { DataTypes, UUIDV4 } = require ("Sequelize")

module.exports = (sequelize) => {
    // defino el modelo

    sequelize.define('activity', {
        name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      difficulty: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["Principiante", "Aficionado", "Normal", "Profesional", "Experto"],
       },
       duration: {
         type: DataTypes.INTEGER,
         allowNull: false,
       },
       season: {
           type: DataTypes.ENUM,
           allowNull: false,
           values: ["Otoño", "Invierno", "Primavera", "Verano"],
         },
    });
  };   