import React from "react";
import './NavBar.css'
import XumecLogo from '../imgs/XumecLogo.png'
import XumekIso from '../imgs/XumekIso.png'
import { RiSearch2Line, RiMenuLine } from "react-icons/ri";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Login from "./Login"
import * as actions from "../redux/actions"
import { useSelector, useDispatch } from "react-redux";
import FBXumec from "../imgs/FBXumec.png"
import InstagramXumec from "../imgs/InstagramXumec.png"
import TwitterXumec from "../imgs/TwitterXumec.png"
import YTXumec from "../imgs/YTXumec.png"
import axios from "axios";


function NavBar() {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const location = useLocation();

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const elementPosition = element.offsetTop - 30;
            window.scrollTo({
                top: elementPosition,
                behavior: "smooth",
            });
        }
    };

    const [input, setInput] = React.useState({
        option1: false,
        option2: false,
        option3: false,
        option4: false,
        option5: false,
        option6: false,
        searchInput: ""
    })

    const handleSearchBar = (e) => {
        setInput({
            ...input,
            searchInput: e.target.value
        })
    }

    const searchResult = () => {
        navigate(`/search_result?str=${input.searchInput}`)
    }

    const handleSubOption = (n, bool) => {
        setInput((prevInput) => {
            const aux = {};
            aux[`option${n}`] = bool;
            return { ...prevInput, ...aux };
        });
    };

    const handleGetUsers = () => {
        dispatch(actions.get_users())
    }

    const { admin, position } = useSelector(state => state.user)

    React.useEffect(() => {
        const hash = location.hash;
        if (hash) {
            const id = hash.slice(1); // Elimina el símbolo '#'
            setTimeout(() => {
                scrollToSection(id);
            }, 200)
        }
    }, [location.hash]);

    // Funcionalidades responsive

    const [hamNav, setHamNav] = React.useState(false)

    React.useEffect(() => {
        setHamNav(window.innerWidth >= 1280)
    },[])


    return (
        <div >
            <div onClick={e => setHamNav(true)} className="hamNav">
                <RiMenuLine />
            </div>
            <div className={hamNav ? "openNav" : "displayNone"}>

                <div className={`subOptionsContainer trabajo ${input.option1 ? "out" : "in"}`} onMouseEnter={e => handleSubOption(1, true)} onMouseLeave={e => handleSubOption(1, false)}>
                    <Link to="/trabajo#new">
                        <div className="subOption">
                            NOVEDADES
                        </div>
                    </Link>
                    <Link to="/trabajo#cases">
                        <div className="subOption">
                            CASOS
                        </div>
                    </Link>
                    <Link to="/trabajo#observatory">
                        <div className="subOption">
                            OBSERVATORIO
                        </div>
                    </Link>
                    <Link to="/trabajo#inform">
                        <div className="subOption">
                            INFORMES ANUALES
                        </div>
                    </Link>
                    <Link to="/trabajo#aliances">
                        <div className="subOption">
                            ALIANZAS
                        </div>
                    </Link>

                </div>
                <div className={`subOptionsContainer participa ${input.option2 ? "out" : "in"}`} onMouseEnter={e => handleSubOption(2, true)} onMouseLeave={e => handleSubOption(2, false)}>
                    <Link to="/participa#donate">
                        <div className="subOption">
                            DONÁ
                        </div>
                    </Link>
                    <Link to="/participa#volunteering">
                        <div className="subOption">
                            PASANTIAS Y VOLUNTARIADOS
                        </div>
                    </Link>
                </div>
                <div className={`subOptionsContainer nosotres ${input.option3 ? "out" : "in"}`} onMouseEnter={e => handleSubOption(3, true)} onMouseLeave={e => handleSubOption(3, false)}>
                    <Link to="/nosotres#about">
                        <div className="subOption">
                            ACERCA DE XUMEK
                        </div>
                    </Link>
                    <Link to="/nosotres#team">
                        <div className="subOption">
                            ESTRUCTURA Y EQUIPO
                        </div>
                    </Link>
                    <Link to="/nosotres#secretary">
                        <div className="subOption">
                            SECRETARÍAS
                        </div>
                    </Link>
                    <Link to="/nosotres#areas">
                        <div className="subOption">
                            ÁREAS
                        </div>
                    </Link>

                </div>
                <div className={`subOptionsContainer adminoptions ${input.option5 ? "out" : "in"}`} onMouseEnter={e => handleSubOption(5, true)} onMouseLeave={e => handleSubOption(5, false)}>
                    <Link to="/admin/users">
                        <div onClick={handleGetUsers} className="subOption">
                            USUARIOS
                        </div>
                    </Link>
                    <Link to="/admin/articles">
                        <div className="subOption">
                            NOTAS
                        </div>
                    </Link>
                </div>
                <div className={hamNav ? "closeNav" : ""} onClick={e => setHamNav(hamNav ? false : true)}></div>
                <div className="nav-bar">

                    <Link to="/" className="displayBlock" title="Ir al inicio">
                        <img className="logo" src={XumecLogo} alt="" />
                        <img className="xumekIsoLogo" src={XumekIso} alt="" />
                    </Link>
                    <div className="searchBar">
                        <input onChange={e => handleSearchBar(e)}
                            className="searchInput" placeholder="Buscar..."
                            type="text"
                            value={input.searchText}
                            onKeyDown={e => {
                                if (e.key === "Enter") {
                                    searchResult();
                                }
                            }}
                        />
                        <button onClick={searchResult} className="searchBtn"><RiSearch2Line /></button>
                    </div>

                    <div className="optionsContainer">
                        <Link to="/trabajo">
                            <div className="navoption" onMouseEnter={e => handleSubOption(1, true)} onMouseLeave={e => handleSubOption(1, false)}>

                                <div className={input.option1 ? "optionSelec" : false}>
                                    NUESTRO TRABAJO
                                </div>

                                <div className={`arrow ${input.option1 ? "lightArrow" : false}`}></div>
                            </div>
                        </Link>
                        <Link to="/participa">
                            <div className="navoption" onMouseEnter={e => handleSubOption(2, true)} onMouseLeave={e => handleSubOption(2, false)}>

                                <div className={input.option2 ? "optionSelec" : false}>
                                    PARTICIPÁ
                                </div>

                                <div className={`arrow ${input.option2 ? "lightArrow" : false}`}></div>
                            </div>
                        </Link>
                        <Link to="/nosotres">
                            <div className="navoption" onMouseEnter={e => handleSubOption(3, true)} onMouseLeave={e => handleSubOption(3, false)}>

                                <div className={input.option3 ? "optionSelec" : false}>
                                    NOSOTRES
                                </div>

                                <div className={`arrow ${input.option3 ? "lightArrow" : false}`}></div>
                            </div>
                        </Link>
                        <div className="adminResponsive">
                            {admin && <div className="separador"></div>}

                            {admin && position === "Administrador" && (
                                <Link to="/admin">
                                    <div className="navoption" onMouseEnter={e => handleSubOption(5, true)} onMouseLeave={e => handleSubOption(5, false)}>
                                        <div className={input.option5 ? "optionSelec" : false}>
                                            ADMINISTRACION
                                        </div>
                                        <div className={`arrow ${input.option5 ? "lightArrow" : false}`}></div>
                                    </div>
                                </Link>
                            )}

                            {admin && (position === "Administrador" || position === "Escritor") && (
                                <Link to="/editor">
                                    <div
                                        className="navoption"
                                        onMouseEnter={e => handleSubOption(6, true)}
                                        onMouseLeave={e => handleSubOption(6, false)}
                                    >
                                        <div className={input.option6 ? "optionSelec" : ""}>EDITOR</div>
                                        <div className={`circle ${input.option6 ? "lightArrow" : ""}`}></div>
                                    </div>
                                </Link>
                            )}

                        </div>

                        <div className="contactContainer">
                            <a target="_blank" href="https://www.facebook.com/xumek"><img className="contact" src={FBXumec} alt="" /></a>
                            <a target="_blank" href="https://www.instagram.com/xumekddhh/"><img className="contact" src={InstagramXumec} alt="" /></a>
                            <a target="_blank" href="https://twitter.com/XUMEKDDHH"><img className="contact" src={TwitterXumec} alt="" /></a>
                            <a target="_blank" href="https://www.youtube.com/@XumekDDHH"><img className="contact" src={YTXumec} alt="" /></a>
                        </div>

                        <Link to="/participa"><div className="donativeBtn">DONÁ</div></Link>

                    </div>
                    <Login />
                </div>
            </div>
        </div>
    );
}

export default NavBar;