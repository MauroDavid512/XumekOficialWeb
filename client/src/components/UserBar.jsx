import React from "react";
import { useSelector } from "react-redux";
import './userBar.css'


function UserBar() {

    const { user } = useSelector(state => state)



    return (
        <div className="userBarContainer">
            <div>Bienvenide {user.name}</div>
            <div className="">
                
                    <img className="userImg" src={user.img} alt="" />
                    <div>
                        <div>Usuario: {user.name} {user.lastName}</div>
                        <div>Tipo de cuenta: {!user.admin ? "Estandar" : "Administrativa"}</div>
                        {user.position !== "user" ? <div>Posición: {user.position} </div> : false}
                    </div>
            </div>
        </div>
    );
}

export default UserBar;