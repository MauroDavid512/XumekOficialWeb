import {
    DARK_MODE,
    LOGIN,
    LOGOUT,
    GET_USERS,
    USER_INFO,
    GET_USER_DETAIL,
    LOGIN_USER
} from '../actions'


const initialState = {
    darkMode: false,
    loggedIn: false,
    user: {
        name: '',
        email: '',
        admin: false,
        position: '',
        img: ''
    },
    users: [],
    articles: [],
    userDetail: {}
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case DARK_MODE:
            return {
                ...state,
                darkMode: state.darkMode ? false : true
            }
        case LOGIN_USER:
            return {
                ...state,
                loggedIn: true,
                user: {
                    ...state.user,
                    ...action.payload
                }

            }
        case USER_INFO:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                },
            }
        case GET_USER_DETAIL:
            return {
                ...state,
                userDetail: {
                    ...action.payload
                },
            }
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case LOGOUT:
            return {
                ...state,
                user: {
                    name: '',
                    email: '',
                    admin: false,
                    position: '',
                    img: ''
                },
                loggedIn: false
            }

        default: return state
    }
}

export default rootReducer