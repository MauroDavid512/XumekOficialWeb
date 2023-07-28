const { Router } = require('express')
const { Home } = require('../db')
const { createHome, getHome, updateHome, deleteHome } = require('./utilsHome')
const router = Router();


router.get('/', async (req, res) => {
    try {
        let info = await getHome()
        res.status(200).json(info)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})


router.post('/create', async (req, res) => {
    try {
        const data = req.body
        createHome(data)
        res.status(200).json(`Home creado`)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


router.put('/update', async (req, res) => {
    try {
        const data = req.body;
        await updateHome(data)
        res.status(200).json("Cambios realizados")
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.delete('/delete', async (req, res) => {
    try{
        await deleteHome()
        res.status(200).json("Home eliminada con exito.")
    }catch(error){
        res.status(400).json({ error:error.message})
    }
})


module.exports = router