const { Router } = require('express')
const { Comment } = require('../db')
const { getcomments, createcomment, updatecomment, deletecomment} = require('./utilscomments')
const router = Router();


router.get('/', async (req, res) => {
    try {
        const {id, type, category, user} = req.query
        let info = await getcomments(id, type, category, user)
        res.status(200).json(info)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})


router.post('/create', async (req, res) => {
    try {
        const data = req.body
        createcomment(data)
        res.status(200).json(`Comentario ${data.title} creado exitosamente`)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        deletecomment(id)
        res.status(200).json("Comentario eliminado")
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await getcomments(parseInt(id))
        const data = req.body;
        console.log("data en ruta ---> "+data)
        await updatecomment(parseInt(id), data)
        const commentUpdated = await getcomments(id)
        if (comment == commentUpdated) {
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
        let info = await getcomments(id)
        res.status(200).json(info)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})



module.exports = router