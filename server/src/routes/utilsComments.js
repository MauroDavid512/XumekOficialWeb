const axios = require('axios')
const { Comment, User, Article } = require('../db.js')

// Create comment


const getcomments = async (id, article, user) => {
    try {
        // if (id) {
        //     const comment = await comment.findAll({
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
        //     if (comment.length !== 0) {
        //         return comment[0];
        //     } else {
        //         throw new Error("No existe el artículo o ha sido borrado");
        //     }
        // } else if(type){
        // } else {
        //     const comments = await comment.findAll();
        //     return comments;
        // }
        let comments = await Comment.findAll({
            include: [{
                            model: User,
                            attributes: ['id', 'name', 'img'],
                            through: {
                                attributes: []
                            }
                        }, {
                            model: Article,
                            attributes: ['id', 'title'],
                            through: {
                                attributes: []
                            }
                        }]
        })
        if ( id ) comments = comments.filter(e => e.id == id)
        if ( user ) comments = comments.filter(e => e.Users[0].id == user)
        if ( article ) comments = comments.filter(e => e.article[0].id == article )
        return comments
    } catch (error) {
        console.log("Error in getcomments: " + error.message);
    }
};



const createcomment = async (data) => {
    try {
        const { comment, user, article } = data;
        const allcomments = await getcomments();
        console.log(allcomments);
        const validation = allcomments.find(e => e.title === title) ? true : false;
        let Users = await User.findAll({
            where: { id: user },
        });
        let Article = await Article.findAll({
            where: { id: article }
        });
        if (validation) {
            throw new Error("Ya existe una nota con este nombre");
        } else {
            const newcomment = await Comment.create({
                comment
            });
            await newcomment.addUser(Users);
            await newcomment.addArticle(Article);
            return newcomment;
        }
    } catch (error) {
        console.log("Error in createcomment: " + error.message);
    }
};


const updatecomment = async (id, data) => {
    try {
        const allcomments = await getcomments()
        console.log(allcomments)
        console.log(data)
        const comment = allcomments.filter((e) => e.id === id)
        console.log(comment)
        await comment[0].update({
            ...comment,
            ...data
        })
    } catch (error) {
        console.log('Error en funcion updatecomment ' + error.message)
    }
}

const deletecomment = async (id) => {
    try {
        let comment = await comment.destroy({
            where: { id: id }
        })
    } catch (error) {
        console.log(`Error al eliminar el comentario ${error.message}`)
    }
}


module.exports = {
    getcomments,
    createcomment,
    updatecomment,
    deletecomment
}