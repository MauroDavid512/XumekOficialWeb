import React from "react";
import "./AdminPanel.css"
import Users from "./Principal/Administracion/Users";
import Articles from "./Principal/Administracion/Articles";
import * as actions from "../redux/actions"
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"


function AdminPanel() {

    let { t } = useParams();
    const dispatch = useDispatch()

    const { user } = useSelector(state => state)

    const handleGetUsers = () => {
        dispatch(actions.get_users())
    }

    return (
        <div className="principalContainer">
            {user.admin && user.position === "Administrador" ? 
            <div>
            <div className="principalTitle">
                ADMINISTRACIÓN
            </div>
            <div>Deste este panel podrás administrar usuarios (Dar o quitar permisos, eliminar o banear un usuario, nombrar administradores, cambiar su puesto) y notas (Eliminar o editar)</div>
            <div className="btnCont">
                <Link to="/admin/users"><div onClick={handleGetUsers} className="btn">Usuarios</div></Link>
                <Link to="/admin/articles"><div className="btn">Notas</div></Link>
            </div>
            {t == "users" ? <Users /> : false}
            {t == "articles" ? <Articles /> : false}
            </div>
             : <div className="principalTitle">No tiene los permisos para utilizar esta sección</div> }
        </div>

    );
}

export default AdminPanel;