import axios from "axios";
import React from "react";
import { useSelector } from "react-redux"
import { useParams, Link } from "react-router-dom";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

function ArticleDetail() {

    const { id } = useParams()

    const { quill, quillRef } = useQuill({
        readOnly: true,
        modules: { toolbar: false }
    });

    const { admin, position } = useSelector(state => state.user)

    const [ article, setArticle ] = React.useState({})

    React.useEffect(() => {
        const fetchData = async () => {
          try {
            const articleInfo = await axios.get(`/article/${id}`);
            setArticle(...articleInfo.data);
          } catch (error) {
            console.error("Error fetching article:", error);
          }
        };
        fetchData();
      }, [id]);
      
      React.useEffect(() => {
        const fetching = () => {
          if (article.content) {
            try {
              const parsedContent = JSON.parse(article.content);
              console.log(parsedContent)
              quill.setContents(parsedContent);
            } catch (error) {
              console.error("Error parsing article content:", error);
            }
          }
        };
        if (quill && article.content) {
          fetching();
        }
      }, [article, quill]);

    return (
        <div className="principalContainer">
            {article ? <div>
              {admin && (position === "Escritor" || position === "Administrador") ?
              <Link to={`/editor?id=${id}`} className="goToEditor">
                Abrir en Editor
              </Link>
              : false}
                <div className="principalTitle">{article.title}</div>
                <img className="coverImage" src={article.coverImage} alt="" />
                <div className="subhead">
                    {article.subhead}
                </div>
                <br />
                <div >
                    <article ref={quillRef} style={{ border: 'none', color: "black", fontSize: "120%" }}></article>
                </div>
            </div> : false}
            <div className="bottomSpaceRelative"></div>
        </div>
    );
}

export default ArticleDetail;