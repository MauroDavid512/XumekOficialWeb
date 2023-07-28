const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const article = require('./article')
const category = require('./category')
const user = require('./user')
const comment = require('./comment')
const home = require('./home')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/article', article )
router.use('/category', category)
router.use('/user', user)
router.use('/comment', comment)
router.use('/home', home)





module.exports = router;
