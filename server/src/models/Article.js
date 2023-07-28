const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('article', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subhead: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        coverImage: {
            type:DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING
        }
    })
}; 