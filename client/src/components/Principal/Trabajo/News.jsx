import axios from "axios";
import React from "react";


function News() {

    const [ news, setNews ] = React.useState([])


    React.useEffect(() => {
        const getNews = async() => {
            let allArticles = await axios.get('/article')
            let allNews = allArticles.data.filter(e => e.type == "new")
            setNews([...allNews])
        }
        getNews()
    },[])




    return (
        <div id="news">
            Novedades
            {news?.map(e => <div> {e.title} </div>)}
        </div>
    );
}

export default News;