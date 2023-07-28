const axios = require('axios')
const { Article, Category, User } = require('../db.js')

// Create User


const getUsers = async (id) => {
    try {
        if (id) {
            const user = await User.findAll({
                where: { id: id }
            })
            if (user.lenght != 0) {
                return user[0]
            } else {
                throw new Error("No existe el usuario")
            }
        } else {
            const users = await User.findAll()
            return users
        }
    } catch (error) {
        console.log("Error in getUsers " + error.message)
    }
}

const createOrLoginUser = async (data) => {
    try {
        const {name, email, id, img, lastName } = data
        let users = await getUsers()
        let user = users.filter(e => e.id == id)
        console.log(user)
        if(user.length !== 0){
            return user[0]

        }else{
            const newUser = await User.create({
                name,
                email,
                id,
                img,
                lastName
            })
            return newUser
        }


    } catch (error) {
        console.log("Error in createUser " + error.message)
    }
}

const updateUser = async (id, data) => {
    try {
        const allUsers = await getUsers()
        const user = allUsers.filter((e) => e.id === id)
        await user[0].update({
            ...user,
            ...data
        })
    } catch (error) {
        console.log('Error en funcion updateUser ' + error.message)
    }
}

const deleteUser = async (id) => {
    try {
        let user = await User.destroy({
            where: { id: id }
        })
    } catch (error) {
        console.log(`Error al eliminar el usuario ${error.message}`)
    }
}





module.exports = {
    getUsers,
    createOrLoginUser,
    updateUser,
    deleteUser
}