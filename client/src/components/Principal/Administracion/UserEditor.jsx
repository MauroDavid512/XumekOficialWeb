import React, { useEffect, useState } from "react";
import "./UserEditor.css"
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions";
import axios from "axios";

function UserEditor(props) {
    const dispatch = useDispatch();
    const userDetail = useSelector(state => state.userDetail);
    const [input, setInput] = useState(false);
    const [positionRef, setPositionRef] = useState("")
    const { setInputU } = props

    useEffect(() => {
        dispatch(actions.get_user_detail(props.id))
            .then(() => {
                setInput(userDetail.admin);
                setPositionRef(userDetail.position)
            });
    }, [dispatch, userDetail.admin, userDetail.position]);

    const handleAdminCheck = async () => {
        setInput(!input);
        let changeAdmin = {
            admin: !userDetail.admin
        };
        await axios.put(`/user/update/${props.id}`, changeAdmin);
    };

    const handlePositionSelector = async (position) => {
        setPositionRef(position)
        let changePosition = {
            position: position
        };
        await axios.put(`/user/update/${props.id}`, changePosition)
    }




    return (
        <div className="backgroundEditor">
            <div className="principalContainer userEditor" >
                <button className="closeBtn" onClick={() => setInputU(false)}>X</button>
                <div>
                    <img src={userDetail.img} alt="" />
                </div>
                <div>
                    <div className="personalInfo">
                <div>
                    Nombre: {userDetail.name}
                    <br />
                    Apellido: {userDetail.lastName}
                </div>
                <div>
                    Email:{userDetail.email}
                </div>
                </div>
                <div className="aling">
                    
                    Administrador:
                    
                    <div className="toggle-switch">
                        <input
                            className="toggle-input"
                            checked={input}
                            id="toggle"
                            onChange={handleAdminCheck}
                            type="checkbox"
                        />
                        <label className="toggle-label" htmlFor="toggle"></label>
                    </div>
                </div>
                </div>
                <div>Permisos: <div>
                    <div className="posOptionContainer">
                        <div className="positionOption" onClick={e => handlePositionSelector("Usuario")}>
                            <div className={`positionArrow ${positionRef != "Usuario" ? "none" : ""}`}></div>
                            Usuario
                        </div>
                        <div className="positionOption" onClick={e => handlePositionSelector("Moderador")}>
                            <div className={`positionArrow ${positionRef != "Moderador" ? "none" : ""}`}></div>Moderador
                        </div>
                        <div className="positionOption" onClick={e => handlePositionSelector("Escritor")}>
                            <div className={`positionArrow ${positionRef != "Escritor" ? "none" : ""}`}></div>
                            Escritor
                        </div>
                        <div className="positionOption" onClick={e => handlePositionSelector("Administrador")}>
                            <div className={`positionArrow ${positionRef != "Administrador" ? "none" : ""}`}></div>
                            Administrador
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default UserEditor;
