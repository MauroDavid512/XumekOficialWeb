const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('User', {
        id: {
            type: DataTypes.STRING,
            primaryKey:true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        position: {
            type: DataTypes.STRING,
            defaultValue: "Usuario"
        },
        img:{
            type: DataTypes.STRING,
            allowNull: true
        }
    })
}; 