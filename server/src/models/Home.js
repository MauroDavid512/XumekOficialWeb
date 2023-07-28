const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('home', {
        articles: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        donative:{
            type: DataTypes.ARRAY(DataTypes.JSON),
            allowNull: true
        }
    })
}; 