import React from "react";
import './SearchResult.css'
import axios from 'axios'

import { useLocation, Link } from "react-router-dom";
import queryString from "query-string";


function SearchResult() {

    const location = useLocation()
    const str = queryString.parse(location.search).str

    const [ searchResult, setSearchResult ] = React.useState([])

    React.useEffect(()=> {
        const fetchData = async() => {
            try{
                let aux = await axios.get(`/article/search/${str}`)
                setSearchResult([...aux.data])
                console.log(searchResult)
                console.log(str)
            }catch(error){
                console.log("Error obteniendo resultados de la busqueda", error);
            }
        }
        fetchData()
    },[str])

    return (
        <div className="principalContainer">
            <div className="principalTitle">Resultados de la búsqueda</div>
            {searchResult.length > 0 ?
            <div className="articlesContainer">
                {searchResult?.map(e => {
                    return(<Link title={e.title} className="listContainer" to={`/article/${e.id}`}>
                        <img className="listImg" src={e.coverImage} alt="" />
                        <div className="listText">
                            <div className="listTitle">
                                {e.title}
                            </div>
                            <div className="listSubhead">
                                {e.subhead}
                            </div>
                        </div>
                    </Link>)
                })}
            </div> 
            :
            <div>
                No se encontraron resultados de la busqueda
            </div>  
        }
        </div>
    );
}

export default SearchResult;