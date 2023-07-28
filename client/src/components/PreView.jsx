import React, { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import "./PreView.css"
import queryString from "query-string";

function PreView(props) {
  const { article, setPreView } = props;

  const location = useLocation()
  const id = queryString.parse(location.search).id
  const navigate = useNavigate();

  const { quill, quillRef } = useQuill({
    readOnly: true,
    modules: {
      toolbar: false,
    },
  });

  useEffect(() => {
    const fetching = () => {
      quill.setContents(JSON.parse(article.content))
    }
    if (quill) {
      fetching()
    }
  }, [article.content, quill]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(id) {
        await axios.put(`/article/update/${id}`, article)
        alert("Articulo actualizado")
      } else {
        await axios.post('/article/create', article);
        alert("Articulo publicado")
      }
      navigate('/') //redirect to home page after creating new note
    } catch (error) {
      console.log("Error en Submit --> " + error);
    }
  };

  return (
    <div>
      <div className="marginBottom">
        <div className="principalTitle">{article.title}</div>
        <img className="coverImage" src={article.coverImage} alt="" />
        <div className="subhead">
          {article.subhead}
        </div>
        <div>
          <article ref={quillRef} style={{ border: 'none', color: "black", fontSize: "120%" }}></article>
        </div>
      </div>
      <div className="previewBtn">
        <div className="goEditor" onClick={() => setPreView(false)}>
          Seguir editando
        </div>
        <div className="create" onClick={handleSubmit}>
          {id ? "Actualizar nota" : "Publicar nota"}
        </div>
      </div>
    </div>
  );
}

export default PreView;