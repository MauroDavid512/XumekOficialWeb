import React from "react";
import './Home.css'
import initImage from "../imgs/initImage.png"
import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

function Home() {

  const [initArticles, setInitArticles] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        let homeData = await axios.get('/home');
        let articlePromises = homeData.data.articles.map(articleId =>
          axios.get(`/article/${articleId}`)
        );
        let aux = await Promise.all(articlePromises);
        let aux2 = aux.map(response => response.data[0]);
        setInitArticles([...aux2])
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    }
    fetchData();
  }, []);


  return (
    <div className="principalContainer">
      <img src={initImage} alt="" />
      {initArticles.length > 0 ?
        <div>
          <Link to={`/article/${initArticles[0]?.id}`}>
            <div title={initArticles[0]?.title} className="firstArticle">
            <img className="firstImg" src={initArticles[0]?.coverImage} alt="" />
            <div>
              <div className="firstTitle">{initArticles[0]?.title}</div>
              <div className="firstSubhead">{initArticles[0]?.subhead}</div>
              </div>
            </div>
          </Link>
          <div className="container2-3">
            <Link to={`/article/${initArticles[1]?.id}`}>
              <div title={initArticles[1]?.title} className="secondArticle">
                <div className="secondTitle">{initArticles[1]?.title.length > 50 ? `${initArticles[1]?.title.slice(0, 45)}...` : initArticles[1]?.title}</div>
                <img className="secondImg" src={initArticles[1]?.coverImage} alt="" />
                <div className="secondSubhead">{initArticles[1]?.subhead}</div>
              </div>
            </Link>
            <Link to={`/article/${initArticles[2]?.id}`}>
              <div title={initArticles[2]?.title} className="thirdArticle">
                <div className="thirdTitle">{initArticles[2]?.title.length > 50 ? `${initArticles[2]?.title.slice(0, 45)}...` : initArticles[2]?.title}</div>

                <img className="thirdImg" src={initArticles[2]?.coverImage} alt="" />
                <div className="thirdSubhead">{initArticles[2]?.subhead}</div>
              </div>
            </Link>
          </div>


          <div className="container4-6">
            <Link to={`/article/${initArticles[3]?.id}`}>
              <div title={initArticles[3]?.title} className="fourthArticle">
                <div className="fourthTitle">{initArticles[3]?.title.length > 50 ? `${initArticles[3]?.title.slice(0, 45)}...` : initArticles[3]?.title}</div>
                <img className="fourthImg" src={initArticles[3]?.coverImage} alt="" />
                <div className="fourthSubhead">{initArticles[3]?.subhead}</div>
              </div>
            </Link>
            <Link to={`/article/${initArticles[4]?.id}`}>
              <div title={initArticles[4]?.title} className="fifthArticle">
                <div className="fifthTitle">{initArticles[4]?.title.length > 50 ? `${initArticles[4]?.title.slice(0, 45)}...` : initArticles[4]?.title}</div>

                <img className="fifthImg" src={initArticles[4]?.coverImage} alt="" />
                <div className="fifthSubhead">{initArticles[4]?.subhead}</div>
              </div>
            </Link>
            <Link to={`/article/${initArticles[5]?.id}`}>
              <div title={initArticles[5]?.title} className="sixthArticle">
                <div className="sixthTitle">{initArticles[5]?.title.length > 50 ? `${initArticles[5]?.title.slice(0, 45)}...` : initArticles[5]?.title}</div>

                <img className="sixthImg" src={initArticles[5]?.coverImage} alt="" />
                <div className="sixthSubhead">{initArticles[5]?.subhead}</div>
              </div>
            </Link>
          </div>
        </div>
        : false
      }



    </div>
  );
}

export default Home;