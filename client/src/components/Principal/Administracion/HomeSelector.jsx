import axios from "axios";
import React, { useEffect } from "react";


function HomeSelector(props) {
    const { handleOpenhome, id } = props

    const [home, setHome] = React.useState({
        original:[],
        new:[]
    })

    useEffect(()=>{
        const getHome = async() => {
            try {
                let aux = await axios.get('/home')
                setHome({
                    ...home,
                    original: [...aux.data.articles]
                })
            }catch(error){
                console.log("Error en getHome de HomeSelector "+error.message)
            }
        }
        getHome();
    }, [])

    const [ value, setValue ] = React.useState(null)

    const handleSelect = (value) => {
        setValue(value)
    }

    const handleHome = async() => {
        let aux = home.original
        aux[value-1] = id
        await axios.put('/home/update', {articles:aux})
        alert("Nota agregada a Inicio con exito")
        handleOpenhome(false)
    }
    return (
        <div className="backgroundEditor">
            <div className="homeAsk">
                <div className="indicationAsk">
                Elije un casillero de Inicio:
                </div>
                <div onClick={e => handleSelect(1)}className={`one ${value == 1?"selectNumber": ""}`}>1</div>
                <div className="two-three">
                    <div onClick={e => handleSelect(2)}className={`two ${value == 2?"selectNumber": ""}`}>2</div>
                    <div onClick={e => handleSelect(3)}className={`three ${value == 3?"selectNumber": ""}`}>3</div>
                </div>
                <div className="four-six">
                    <div onClick={e => handleSelect(4)}className={`four ${value == 4?"selectNumber": ""}`}>4</div>
                    <div onClick={e => handleSelect(5)}className={`five ${value == 5?"selectNumber": ""}`}>5</div>
                    <div onClick={e => handleSelect(6)}className={`six ${value == 6?"selectNumber": ""}`}>6</div>
                </div>

                <div className="homeBtnContainer">
                    <button className="homeBtn cancelHome" onClick={e => handleOpenhome(false)}>Cancelar</button>
                    <button className="homeBtn confirmHome" onClick={e => handleHome()}>Mostrar en inicio</button>
                </div>
            </div>
        </div>

    );
}

export default HomeSelector;