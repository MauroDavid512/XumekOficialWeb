import React from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";
import HomeSelector from "./HomeSelector";
import { RiEditFill, RiCloseCircleFill, RiHomeLine } from "react-icons/ri";

function Articles() {

    const location = useLocation()

    const id = queryString.parse(location.search).id

    const [articles, setArticles] = React.useState([])

    const [input, setInput] = React.useState(false)

    const [artTitle, setArtTitle] = React.useState("")

    const [openHome, setOpenhome] = React.useState(false)

    const nameSpanish = (str) => {
        switch (str) {
            case 'new':
                return 'Novedades'
            case 'cases':
                return 'Casos'
            case 'aliances':
                return 'Alianzas'
            case 'observatory':
                return 'Observatorio'
            case 'inform':
                return 'Informes Anuales'
            default:
                return ""
        }
    }

    const handleInput = (bool, title) => {
        setInput(bool)
        setArtTitle(title)
    }

    React.useEffect(() => {
        const fetchData = async () => {
            let aux = await axios.get('/article')
            setArticles([...aux.data.reverse()])
        }
        fetchData()
    }, [input])

    const handleEliminate = async () => {
        await axios.delete(`/article/delete/${id}`)
        console.log(id)
        setInput(false)
        alert('Articulo eliminado con éxito')
    }

    const handleOpenhome = (bool) => {
        setOpenhome(bool)
        console.log(openHome)
    }

    return (
        <div className="adminSource">
            {
                input ?
                    <div className="backgroundEditor">
                        <div className="eliminateAsk">
                            ¿Estas segurx que deseas eliminar este articulo?<br />
                            {artTitle}
                            <br />
                            <div className="eliminateBtnContainer">
                                <button className="eliminateBtn confirmEliminate" onClick={handleEliminate}>Eliminar</button>
                                <button className="eliminateBtn cancelEliminate" onClick={e => handleInput(false)}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                    : false
            }
            {
                openHome ?
                    <HomeSelector handleOpenhome={handleOpenhome} id={id}/>
                    : false
            }
            <div className="adminTitle">
                Articulos
            </div>
            <div>
                <div className="titleList">
                    <div className="articleTitle">Titulo</div>
                    <div className="articleType">Tipo</div>
                    <div className="articleAutor">Autor</div>
                    <div className="articleDate">Fecha</div>
                </div>
                {articles.length != 0 ? articles.map(e => {
                    return (
                        <Link to={`?id=${e.id}`}>
                            <div className="usersList">
                                <img className="imgList" src={e.coverImage} alt="" />
                                <div title={e.title} className="articleTitle">{`${e.title.slice(0, 40)}${e.title.length > 50 ? "..." : ""}`}</div>
                                <div className="articleType">{nameSpanish(e.type)}</div>
                                <div className="articleAutor">{e.Users[0]?.name}</div>
                                <div className="articleDate">{e.updatedAt.slice(0, 10)}</div>
                                <div className="articleEdit"> <div title="Editar artículo"><Link to={`/editor?id=${e.id}`}> <div className="editArticleIcon"><RiEditFill /></div></Link></div> <div className="eliminateArticleIcon" onClick={ev => handleInput(true, e.title)} title="Eliminar artículo"><RiCloseCircleFill /></div><div className="editHomeArticle" title="Mostrar en Inicio" onClick={e => handleOpenhome(true)}><RiHomeLine /></div></div>
                            </div>
                        </Link>
                    )
                }) : false}
            </div>
        </div>
    );
}

export default Articles;