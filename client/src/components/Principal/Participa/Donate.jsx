import React from "react";
import axios from "axios"
import "./Donate.css"
import { useSelector } from "react-redux"
import donate1 from "../../../imgs/500xmes.png"
import donate2 from "../../../imgs/1500xmes.png"
import donate3 from "../../../imgs/2000xmes.png"

function Donate() {

    let { position } = useSelector(state => state.user)

    const [donativeInfo, setDonativeInfo] = React.useState([
        {
            img: "",
            link: ""
        },
        {
            img: "",
            link: ""
        },
        {
            img: "",
            link: ""
        }
    ])

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                let aux = await axios.get('/home')
                let donativeData = aux.data.donative
                setDonativeInfo([...donativeData])
            } catch (error) {
                console.log("Error en fetchData de Donate" + error.message)
            }
        }
        fetchData()

        console.log("useEffect ---> " + JSON.stringify(donativeInfo))
    }, [])



    // Funciones de edición de donativos

    const [edit, setEdit] = React.useState({
        openEdit: false,
        card: 0
    })

    const [input, setInput] = React.useState({
        img: "",
        link: ""
    })

    const [image, setImage] = React.useState("")

    const [inputMessage, setInputMessage] = React.useState("Ningún archivo seleccionado")

    const [loading, setLoading] = React.useState(1)

    const handleEdit = (bool, number) => {
        setEdit({
            ...edit,
            openEdit: bool,
            card: number
        })
        setInput({
            img: "",
            link: ""
        })
        setInputMessage("Ningún archivo seleccionado")
    }

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
                    setInput({ ...input, img: file.secure_url })
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

    const handleChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            link: e.target.value
        })
    }

    const handleUpdate = async () => {
        try {
            // Realiza una copia profunda del array donativeInfo
            let donatives = [...donativeInfo];

            // Crear un objeto con las propiedades img y link de input
            let aux = {
                img: input.img,
                link: input.link
            };

            // Modifica el objeto en la posición edit.card del array donatives
            donatives[edit.card] = aux;

            console.log("edit.number ---> " + edit.card);
            console.log("donatives ---> " + JSON.stringify(donatives));
            console.log("aux ---> " + JSON.stringify(aux));
            console.log("input ---> " + JSON.stringify(input))

            // Realiza la petición de actualización a la base de datos usando axios
            await axios.put('/home/update', { donative: donatives });

            // Actualiza el estado donativeInfo con el nuevo valor
            setDonativeInfo(donatives);
            setEdit(false)
            setInput({
                img: "",
                link: ""
            })
            setInputMessage("Ningún archivo seleccionado")
        } catch (error) {
            console.log("Error al actualizar", error.message);
        }
    };


    const [errors, setErrors] = React.useState({})

    const [videoMeasure, setVideoMeasure] = React.useState({
        height: window.innerWidth < 580 ? window.innerWidth * (9 / 16) : "315",
        width: window.innerWidth < 580 ? "100%" : "560"
    })

    // Función para actualizar el estado videoMeasure cuando cambie el ancho de la pantalla
    const handleResize = () => {
        setVideoMeasure({
            height: window.innerWidth < 580 ? window.innerWidth * (9 / 16) : "315",
            width: window.innerWidth < 580 ? "100%" : "560"
        });
    };

    // Efecto para añadir y remover el evento de redimensionamiento al montar y desmontar el componente
    React.useEffect(() => {
        // Agregar el evento de redimensionamiento al montar el componente
        window.addEventListener("resize", handleResize);

        // Remover el evento de redimensionamiento al desmontar el componente para evitar pérdidas de memoria
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    //width="560" height="315"

    return (
        <div id="donate" className="donate">

            <div className="principalTitle">¿Querés ser parte? <br /> ¡CONVERTITE EN DONANTE!</div>
            <div className="donativeCardContainer">
                <div className="donativeCard">
                    <a target="_blank" href={donativeInfo[0]?.link}><img className="donativeImg" src={donativeInfo[0]?.img} alt="" /></a>
                    {position == "Administrador" ? <button className="editDonateButton" onClick={e => handleEdit(true, 0)}>Editar</button> : false }
                </div>

                <div className="donativeCard">
                    <a target="_blank" href={donativeInfo[1]?.link}><img className="donativeImg" src={donativeInfo[1]?.img} alt="" /></a>
                    {position == "Administrador" ? <button className="editDonateButton" onClick={e => handleEdit(true, 1)}>Editar</button> : false }
                </div>
                <div className="donativeCard">
                    <a target="_blank" href={donativeInfo[2]?.link}><img className="donativeImg" src={donativeInfo[2]?.img} alt="" /></a>
                    {position == "Administrador" ? <button className="editDonateButton" onClick={e => handleEdit(true, 2)}>Editar</button> : false }
                    
                </div>
            </div>
            {edit.openEdit ?
                <div>
                    <div className="subtitle">
                        Editar botón de donativos número {edit.card + 1}
                    </div>
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
                            <img class="imgPortada" src={input.img} alt="" />
                            <br />
                        </div>
                    ) : (
                        false
                    )}
                    <br />
                    {errors.img ? errors.img : false}
                    <div>Link de Mercado Pago</div>

                    <input type="text" value={input.link} onChange={e => handleChange(e)} />

                    <div>
                        <button onClick={handleUpdate}>Aplicar cambios</button>
                        <button onClick={e => handleEdit(false)}>Cancelar</button>
                    </div>

                </div>
                : false}
            <br />
            <div className="donateTitle">15 años luchando por la protección de los derechos humanos</div>
            <div className="textDonate">
                Desde 2007 nos dedicamos a transformar la realidad. Somos un equipo interdisciplinario de profesionales y estudiantes que trabajamos en conjunto por una sociedad más justa.
                <br />
                ¡Conocé más!
            </div>
            <br />
            <iframe width={videoMeasure.width} height={videoMeasure.height} src="https://www.youtube.com/embed/7PvUjAL9F7g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
    );
}

export default Donate;