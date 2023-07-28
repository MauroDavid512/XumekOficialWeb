const { Router } = require('express')
const { getCategories, createCategory, deleteCategory } = require('./utilsCategories')
const router = Router();



router.get('/', async (req, res) => {
    try {
        let info = await getCategories()
        res.status(200).json(info)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})


router.post('/create', async (req, res) => {
    try {
        const data = req.body
        await createCategory(data)
        res.status(200).json(`Categoria ${data.name} creada exitosamente`)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})



router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        deleteCategory(id)
        res.status(200).json("Categoria eliminada")
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        let info = await getCategories(id)
        res.status(200).json(info)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})



module.exports = router