import React from "react";
import Logo from "../md/mauroico.png";
import maurodavid from "../md/maurodavid.png"
import "./StylesMD.css"



function Sell() {

    const [bool, setBool] = React.useState(false)

    const handleBool = (bool) => {
        setBool(bool)
        console.log(bool)
    }

    return (
        <div >

            <div className="sell" onClick={e => handleBool(true)}>
                <img className="imgSell" src={Logo} alt="" />
            </div>

            {
                bool ?
                    <div className="backgroundFoforo">
                        <div className="containerFoforo">
                            <div>
                                Sitio realizado por
                            </div>
                            <img className="maurodavid" src={maurodavid} alt="" />
                            <div>
                                <button className="btnffr" onClick={e => handleBool(false)}>Cerrar</button>
                                <a href="https://maurodaviddev.vercel.app/" target="_blank"><button onClick={e => handleBool(false)} className="btnffr">Ir al Sitio</button></a>
                            </div>
                        </div>
                    </div>
                    : false}
        </div>
    );
}

export default Sell;