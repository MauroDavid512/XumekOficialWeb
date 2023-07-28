const axios = require('axios')
const { Home } = require('../db.js')

const createHome = async(data) => {
    try{
        const { articles, donative } = data
        const newHome = await Home.create({
            articles,
            donative
        })
        return newHome
    }catch(error){
        console.log("Error en createHome "+error.message)
    }
}

const getHome = async() => {
    try{
        const home = await Home.findAll({
            where: { id: 1 }
        })
        return home[0]
    }catch(error){
        console.log("Error en getHome "+error.message)
    }
}

const updateHome = async(data) => {
    try{
        const home = await getHome()
        await home.update({
            ...home,
            ...data,
        })
    }catch(error){
        console.log("Error en updateHome "+error.message)
    }
}



const deleteHome = async() => {
    try{
        Home.destroy()
    }catch(error){
        console.log("Error en deleteHome "+error.message)
    }
}


module.exports = {
    createHome,
    getHome,
    updateHome,
    deleteHome
}

