const axios = require('axios')
const { Article, Category, User } = require('../db.js')

// Create Article


const getArticles = async (id, type, category, user) => {
    try {
        // if (id) {
        //     const article = await Article.findAll({
        //         where: { id: id },
        //         include: [{
        //             model: User,
        //             attributes: ['id', 'name'],
        //             through: {
        //                 attributes: []
        //             }
        //         }, {
        //             model: Category,
        //             attributes: ['id', 'name'],
        //             through: {
        //                 attributes: []
        //             }
        //         }]
        //     });
        //     if (article.length !== 0) {
        //         return article[0];
        //     } else {
        //         throw new Error("No existe el artículo o ha sido borrado");
        //     }
        // } else if(type){
        // } else {
        //     const articles = await Article.findAll();
        //     return articles;
        // }
        let articles = await Article.findAll({
            include: [{
                            model: User,
                            attributes: ['id', 'name'],
                            through: {
                                attributes: []
                            }
                        }, {
                            model: Category,
                            attributes: ['id', 'name'],
                            through: {
                                attributes: []
                            }
                        }]
        })
        if (id) articles = articles.filter(e => e.id == id)
        if (type) articles = articles.filter(e => e.type == type)
        if (user) articles = articles.filter(e => e.Users[0].id == user)
        if (category) {
            articles = articles.filter(e => e.categories.includes(n => n.name == category)) 
        }
        return articles
    } catch (error) {
        console.log("Error in getArticles: " + error.message);
    }
};



const createArticle = async (data) => {
    try {
        const { title, coverImage, content, user, categories, type, subhead } = data;
        const allArticles = await getArticles();
        console.log(allArticles);
        const validation = allArticles.find(e => e.title === title) ? true : false;
        let Users = await User.findAll({
            where: { id: user },
        });
        let Categories = await Category.findAll({
            where: { id: categories }
        });
        if (validation) {
            throw new Error("Ya existe una nota con este nombre");
        } else {
            const newArticle = await Article.create({
                title,
                coverImage,
                subhead,
                content,
                type
            });
            await newArticle.addUser(Users);
            await newArticle.addCategories(Categories);
            return newArticle;
        }
    } catch (error) {
        console.log("Error in createArticle: " + error.message);
    }
};


const updateArticle = async (id, data) => {
    try {
        const allArticles = await getArticles()
        const Article = allArticles.filter((e) => e.id === id)
        await Article[0].update({
            ...Article,
            ...data
        })
    } catch (error) {
        console.log('Error en funcion updateArticle ' + error.message)
    }
}

const deleteArticle = async (id) => {
    try {
        await Article.destroy({
            where: { id: id }
        })
    } catch (error) {
        console.log(`Error al eliminar el usuario ${error.message}`)
    }
}

//  Funciones de Busqueda ------------

function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length
    if (b.length === 0) return a.length

    const matrix = []


    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i]
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j
    }


    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1]
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // Sustitución
                    matrix[i][j - 1] + 1, // Inserción
                    matrix[i - 1][j] + 1 // Eliminación
                )
            }
        }
    }

    return matrix[b.length][a.length]
}

const search = async (str) => {
    let aux = []
    let allArticles = await getArticles()
    let searchResult = allArticles.filter(e => {
        const distance = levenshteinDistance(e.title, str)
        const includesWord = e.title.toLowerCase().includes(str.toLowerCase())
        return includesWord || distance <= 2
    })
    
    return searchResult
}


module.exports = {
    getArticles,
    createArticle,
    updateArticle,
    deleteArticle,
    search
}