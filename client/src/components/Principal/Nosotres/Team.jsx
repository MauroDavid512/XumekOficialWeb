import React from "react";
import organigrama from "../../../imgs/organigrama.png"


function Team() {



    return (
        <div id="team">

            <div className="principalTitle">
                Estructura y equipo
            </div>

            <img className="organigrama " src={organigrama} alt="" />
        </div>
    );
}

export default Team;