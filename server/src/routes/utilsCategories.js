const axios = require('axios')
const { User, Article, Category } = require('../db.js')

// Create Category

const getCategories = async(id) => {
    try{
        if(id){
           const category = await Category.findAll({
            where: {id: id}
           })
           if(category.lenght != 0){
            return category[0]
           }else{
            throw new Error("No existe el usuario")
           }
        }else{
            const categories = await Category.findAll()
            return categories
        }
    }catch(error){
        console.log("Error in getCategories "+error.message)
    }
}

const createCategory = async(data) => {
    try{
        const { name } = data
        const allCategories = await getCategories()
        console.log(allCategories)
        const validation = allCategories.find(e => e.name == name) ? true : false
        if(validation){
            throw new Error("Ya existe una nota con este nombre")
        }else{
            const newCategory = Category.create({
                name
            })
            return newCategory
        }
    }catch(error){
        console.log("Error in createCategory "+error.message)
    }
}

const deleteCategory = async (id) => {
    try{
        let category = await Category.destroy({
            where: {id:id}
        })
    }catch(error){
        console.log(`Error al eliminar el usuario ${error.message}`)
    }
}





module.exports = {
    getCategories,
    createCategory,
    deleteCategory
}