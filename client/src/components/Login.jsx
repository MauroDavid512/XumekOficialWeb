import React from "react";
import "./Login.css";
import { useSelector, useDispatch } from "react-redux"
import { gapi } from "gapi-script";
import * as actions from "../redux/actions"
import GoogleLogin from "react-google-login";

function Login() {

    const clientID = process.env.REACT_APP_IDCLIENT
    console.log(process.env.REACT_APP_IDCLIENT)
    const dispatch = useDispatch()
    const { loggedIn, user } = useSelector(state => state)

    const checkSignedInStatus = () => {
        const auth2 = gapi.auth2.getAuthInstance();
        const isSignedIn = auth2.isSignedIn.get();

        if (isSignedIn) {
                dispatch(actions.logIn(true))
            console.log(loggedIn)
        } else {
            dispatch(actions.logIn(false))
            console.log(loggedIn)
        }
    };

    const handleLogout = () => {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
            console.log("Sesión cerrada exitosamente.");
            // Realiza cualquier otra acción necesaria después de cerrar sesión
        });
        dispatch(actions.logIn(false))
        dispatch(actions.logOut())
    };

    React.useEffect(() => {
        const start = () => {
          gapi.load('auth2', () => {
            gapi.auth2.init({
              client_id: clientID,
            }).then(() => {
              checkSignedInStatus();
            });
          });
        };
      
        gapi.load('client:auth2', start);
      }, []);
      

    const onSuccess = async (response) => {
        let info = response.profileObj
        console.log(info)
        dispatch(actions.login_user({
            name: info.givenName,
            lastName: info.familyName,
            img: info.imageUrl,
            email: info.email,
            id: info.googleId,

        }))
        dispatch(actions.user_info(info.googleId))
        dispatch(actions.logIn(true))
        console.log(response)
    }

    const onFailure = () => {
        console.log("No se pudo")
    }

    return (
        <div>
            {!loggedIn ? <GoogleLogin
                clientId={clientID}
                render={renderProps => (
                    <button className="logIn" onClick={renderProps.onClick} disabled={renderProps.disabled}>Ingresar</button>
                )}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_policy"}
            /> : <button className="logIn" onClick={handleLogout}>Salir</button>}
        </div>
    );
}

export default Login;