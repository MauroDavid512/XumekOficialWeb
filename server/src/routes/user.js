const { Router } = require('express')
const { Users } = require('../db')
const { getUsers, createOrLoginUser, updateUser, deleteUser } = require('./utilsUsers')
const router = Router();


router.get('/', async (req, res) => {
    try {
        let info = await getUsers()
        res.status(200).json(info)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

router.post('/login', async (req, res) => {
    try {
        const data = req.body
        console.log(data)
        await createOrLoginUser(data)
        res.status(200).json(`Usuario ${data.name} creado exitosamente`)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        deleteUser(id)
        res.status(200).json("Usuario eliminado")
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUsers(id)
        const data = req.body;
        console.log("data en ruta ---> "+data)
        await updateUser(id, data)
        const userUpdated = await getUsers(id)
        if (user == userUpdated) {
            throw new Error('No se realizaron cambios en el usuario')
        }
        res.status(200).json("Cambios realizados")
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        let info = await getUsers(id)
        res.status(200).json(info)


    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})



module.exports = router