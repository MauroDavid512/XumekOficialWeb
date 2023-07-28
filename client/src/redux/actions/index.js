import axios from 'axios'
export const LOGIN = "LOGIN"
export const DARK_MODE = "DARK_MODE"
export const GET_USERS = "GET_USERS"
export const LOGIN_USER = "LOGIN_USER"
export const LOGOUT = "LOGOUT"
export const USER_INFO = "USER_INFO"
export const GET_USER_DETAIL = "GET_USER_DETAIL"


export const login_user = (data) => {
    return async function (dispatch) {
        const info = await axios.post('/user/login', data)
        dispatch({
            type: LOGIN_USER,
            payload: data
        })
    }
}

export const darkMode = () => {
    return function (dispatch) {
        dispatch({ type: DARK_MODE })
    }
}

export const get_users = () => {
    return async function (dispatch) {
        let users = await axios.get('/user')
        const respuesta = users.data
        dispatch({
            type: GET_USERS,
            payload: respuesta
        })
    }
}

//La primer funcion obtiene datos para el usuario online y la segunda para el detalle de otro usuario en base de datos

export const user_info = (id) => {
    return async function (dispatch) {
        let user_data = await axios.get(`/user/${id}`)
        console.log(user_data)
        dispatch({
            type: USER_INFO,
            payload: user_data.data
        })
    }
}

export const get_user_detail = (id) => {
    return async function (dispatch) {
        let user_data = await axios.get(`/user/${id}`)
        console.log(user_data)
        dispatch({
            type: GET_USER_DETAIL,
            payload: user_data.data
        })
    }
}

export const logOut = () => {
    return async function (dispatch) {
        dispatch({ type: LOGOUT })
    }
}

export const logIn = (bool) => {
    return function (dispatch) {
        dispatch({
            type: LOGIN,
            payload: bool
        })
    }
}


