import axios from "axios";
import React from "react";
import './Cards.css'
import { useLocation, Link } from "react-router-dom";
import queryString from "query-string";


function Cards() {


    const [articles, setArticles] = React.useState([])

    const type = queryString.parse(useLocation().search).type || ''

    const nameSpanish = (str) => {
        switch (str) {
            case 'new':
                return 'Novedades'
            case 'casesAndAliances':
                return 'Casos y Alianzas'
            case 'observatory':
                return 'Observatorio'
            case 'inform':
                return 'Informes Anuales'
            default:
                return ""
        }
    }


    React.useEffect(() => {
        const fetchData = async () => {
            let allArticles = await axios.get(`/article?type=${type}`)
            console.log(allArticles.data)
            setArticles([...allArticles.data.reverse()])
        }
        console.log(type)
        if (type) fetchData();
    }, [])

    return (
        <div className="principalContainer">
            {articles.length !== 0 ?
                <div>
                    <div className="principalTitle">{nameSpanish(type)}</div>
                    <Link to={`/article/${articles[0].id}`}>
                        <div className="principalArticleContainer">
                            <img className="principalCoverphoto" src={articles[0].coverImage} alt="" />
                            <div>
                                <div className="principalArticleTitle">{articles[0].title}</div>
                                <div className="principalArticleSubhead">{articles[0].subhead}</div>
                            </div>
                        </div>
                    </Link>
                    <div className="articlesContainer">
                        {articles.map(e => {
                            return (
                                <Link to={`/article/${e.id}`}>
                                    <div className="listContainer">

                                        <img className="listImg" src={e.coverImage} alt="" />
                                        <div className="listText">
                                            <div className="listTitle">{e.title}</div>
                                            <div className="listSubhead">{e.subhead}</div>
                                        </div>

                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
                : false}
        </div>
    );
}

export default Cards;