import axios from "axios";
import React from "react";
import { Link, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import "../../AdminPanel.css";
import UserEditor from "./UserEditor";
import queryString from "query-string"
import * as actions from "../../../redux/actions"

function Users() {
    const location = useLocation()

    const id = queryString.parse(location.search).id
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()

    const [input, setInputU] = React.useState(false)

    const handleInput = (bool) => {
        setInputU(bool)
        dispatch(actions.get_users())
    }



    return (
        <div className="adminSource">
            {
                input ?
                    <div>
                        
                        <UserEditor id={id} setInputU={setInputU}/>
                    </div>
                    : false
            }
            <div className="adminTitle">
                Usuarios
            </div>
            <div>
                <div className="titleList">
                    <div className="userName">Nombre</div>
                    <div className="userEmail">e-mail</div>
                    <div className="userAdmin">Admin</div>
                    <div className="userPosition">Puesto</div>
                </div>
                {users.length != 0 ? users.map(e => {
                    return (
                        <Link to={`?id=${e.id}`}>
                            <div onClick={e => handleInput("userE")} className="usersList">
                                <img className="imgList" src={e.img} alt="" />
                                <div className="userName">{e.name} {e.lastName}</div>
                                <div className="userEmail">{e.email}</div>
                                <div className="userAdmin">{e.admin ? "Si" : "No"}</div>
                                <div className="userPosition">{e.position}</div>
                            </div>
                        </Link>
                    )
                }) : false}
            </div>
        </div>
    );
}

export default Users;