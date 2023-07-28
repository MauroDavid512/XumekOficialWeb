const { Router } = require('express')
const { Article } = require('../db')
const { getArticles, createArticle, updateArticle, deleteArticle, search} = require('./utilsArticles')
const router = Router();


router.get('/', async (req, res) => {
    try {
        const {id, type, category, user} = req.query
        let info = await getArticles(id, type, category, user)
        res.status(200).json(info)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})


router.post('/create', async (req, res) => {
    try {
        const data = req.body
        createArticle(data)
        res.status(200).json(`Articulo ${data.title} creado exitosamente`)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        deleteArticle(id)
        res.status(200).json("Articulo eliminado")
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const article = await getArticles(parseInt(id))
        const data = req.body;
        console.log("data en ruta ---> "+data)
        await updateArticle(parseInt(id), data)
        const articleUpdated = await getArticles(id)
        if (article == articleUpdated) {
            throw new Error('No se realizaron cambios en el usuario')
        }
        res.status(200).json("Cambios realizados")
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.get('/search/:str', async (req, res) => {
    try{
        const {str} = req.params;
        const info = await search(str);
        res.status(200).json(info)
    }catch(error){
        res.status(400).json({ error: error.message })
    }
})


router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        let info = await getArticles(id)
        res.status(200).json(info)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})



module.exports = router