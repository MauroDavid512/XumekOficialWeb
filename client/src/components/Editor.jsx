import React from "react";
import axios from "axios"
import { useQuill } from "react-quilljs"
import 'quill/dist/quill.snow.css'
import toolbar from "../toolbar";
import './Editor.css'
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PreView from "./PreView";
import queryString from "query-string";


function Editor() {

    const mayus = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const location = useLocation()
    const id = queryString.parse(location.search).id
    const { user } = useSelector(state => state)


    // Funciones y constantes del editor

    const { quill, quillRef } = useQuill({
        modules: {
            toolbar: toolbar
        },
    })

    //Funciones y constantes de categoria

    const [categories, setCategories] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('/category');
            setCategories([...response.data])
        }
        window.scrollTo(0, 0);
        fetchData();
    }, [])

    // Funciones y constantes de inputs

    const [input, setInput] = useState({
        title: "",
        img: "",
        categories: [],
        type: "",
        subhead: ""
    })

    const handleInput = (e, type) => {
        if (type) {
            setInput({
                ...input,
                type: type
            })
        } else {
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
        }

    }

    const [article, setArticle] = useState({
        title: "",
        coverImage: "",
        content: "",
        type: "",
        subhead: "",
        categories: [],
        user: ""
    })

    const handleCategorie = (category) => {
        if (!input.categories.includes(category)) {
            setInput({
                ...input,
                categories: [...input.categories, category]
            })
        } else {
            let categoriesFiltered = input.categories.filter(e => e !== category)
            setInput({
                ...input,
                categories: categoriesFiltered
            })
        }
    }


    // Funciones en preView

    const [preView, setPreView] = useState(false)

    const handlePreView = () => {
        setArticle({
            ...article,
            ...input,
            content: JSON.stringify(quill.getContents()),
            user: `${user.id}`
        })
        setPreView(true);
        console.log(article)
    };

    // Funciones de portada ----

    const [image, setImage] = React.useState("")

    const [inputMessage, setInputMessage] = React.useState("Ningún archivo seleccionado")

    const [loading, setLoading] = React.useState(1)

    const handleimg = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        let size = 0;
        if (files) {
            size += files[0].size;
        }

        data.append('file', files[0]);
        data.append('upload_preset', 'LigaImpro');
        setLoading(2);
        try {
            const res = await fetch(
                'https://api.cloudinary.com/v1_1/maurodavid/image/upload',
                {
                    method: 'POST',
                    body: data
                }
            );
            const file = await res.json();
            let array = file.secure_url.split('.');
            let format = array[array.length - 1];

            if (size > 2000000) {
                setErrors({
                    ...errors,
                    img: 'El archivo es demasiado grande'
                });
            } else {
                if (format === 'jpg' || format === 'png') {
                    setErrors({
                        ...errors,
                        img: ""
                    });
                    setImage(file.secure_url);
                    setLoading(0);
                    setInput({ ...input, coverImage: file.secure_url })
                    setInputMessage(files[0].name)
                } else {
                    setErrors({
                        ...errors,
                        img: 'Solo se admiten archivos formato jpeg o png'
                    });
                    setLoading(1);
                }
            }
        } catch (error) {
            setErrors({
                ...errors,
                img: 'Solo se admiten archivos formato jpeg o png'
            }); 
            setLoading(1);
        }
    };

    // Funciones de Edición de notas ya creadas ----

    React.useEffect(() => {
        const fetchData = async () => {
          try {
            if(id){
                const articleInfo = await axios.get(`/article/${id}`);
                setArticle(...articleInfo.data);
                setInput({
                    ...input,
                    title: articleInfo.data[0].title || '',
                    subhead: articleInfo.data[0].subhead || '',
                    type: articleInfo.data[0].type || '',
                    coverImage: articleInfo.data[0].coverImage || '',
                    categories: articleInfo.data[0].categories || []
                })
                setImage(articleInfo.data[0].coverImage)
                setLoading(0)
            }

          } catch (error) {
            console.error("Error fetching article:", error);
          }
        };
        fetchData();
      }, [id]);
      
      React.useEffect(() => {
        const fetching = () => {
          if (id && article.content) {
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
      
      



    // Funciones de errores ----

    const [errors, setErrors] = React.useState({})


    return (
        <div className="principalContainer">
            {user.admin && (user.position === "Escritor"|| user.position === "Administrador") ? <div className={`${preView ? "displayNone" : false}`}>
                <div className="principalTitle">
                    EDITOR
                </div>
                <div>
                    Titulo de la nota:
                    <input className="editorInput" type="text" name="title" value={input.title} onChange={handleInput} />
                </div>
                <div className="superSelectContainer">
                    <div className="selectContainer">
                        <div className="selectTitle">Categoria:</div>
                        <div className="selectOptions">
                            {categories.length !== 0 ? categories.map(e => <div className="categorySelect" onClick={event => handleCategorie(e.id)}><div className={input.categories.includes(e.id) ? "selectCircle" : false}></div>{mayus(e.name)}</div>) : false}
                        </div>
                    </div>
                    <div className="selectContainer">
                        <div className="selectTitle">Tipo de nota:</div>
                        <div className="selectOptions">

                            <div className="typeSelect" onClick={e => handleInput(e, "new")}>
                                <div className={input.type == "new" ? "selectArrow" : false}></div> Novedades
                            </div>
                            <div className="typeSelect" onClick={e => handleInput(e, "observatory")}>
                                <div className={input.type == "observatory" ? "selectArrow" : false}></div> Observatorio
                            </div>
                            <div className="typeSelect" onClick={e => handleInput(e, "inform")}>
                                <div className={input.type == "inform" ? "selectArrow" : false}></div> Informe
                            </div>
                            <div className="typeSelect" onClick={e => handleInput(e, "cases")}>
                                <div title="Casos" className={input.type == "cases" ? "selectArrow" : false}></div> Casos
                            </div>
                            <div className="typeSelect" onClick={e => handleInput(e, "aliances")}>
                                <div title="Alianzas" className={input.type == "aliances" ? "selectArrow" : false}></div> Alianzas
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                {/* IMAGEN DE PORTADA */}
                Portada:

                <input
                    id="inputFile"
                    type="file"
                    name="image"
                    className="inputFile"
                    onChange={(e) => handleimg(e)}
                />
                <label for="inputFile" className="inputImage">
                    <span className="noneFile">{inputMessage}</span>
                    <span className="buttonFile">Buscar archivo</span>
                </label>

                {loading === 2 ? (
                    <div className="ballsContainer">
                        <div class="superballs">
                            <div class="superballs__dot"></div>
                            <div class="superballs__dot"></div>
                        </div>
                    </div>
                ) : (
                    false
                )}
                {loading === 0 ? (
                    <div>
                        <br />
                        <img class="imgPortada" src={image} alt="" />
                        <br />
                    </div>
                ) : (
                    false
                )}
                <br />
                {errors.img ? errors.img : false}
                <div className="textEditors">
                    Bajada:
                    <textarea className="subheadEditor" name="subhead" value={input.subhead} onChange={handleInput} />
                    Contenido:
                    <div className="editor" style={{maxHeight: "600px", overflowY: "auto"}}>
                        <div ref={quillRef}></div>
                    </div>
                </div>
                <br />
                <div className="create" onClick={handlePreView}>Previsualizar</div>

            </div>: 
            <div className="principalTitle">No tiene los permisos para utilizar esta sección</div>}
            
            {preView ?
                <PreView article={article} setPreView={setPreView} />
                : false}
        </div>
    );
}

export default Editor;