import React from "react";
import NoteCard from "./NoteCard"
import "./NoteCards.css"
import { Link } from "react-router-dom";


function NoteCards(props) {

    const nameSpanish = (str) => {
        switch (str){
            case 'new':
                return 'Novedades'
            case 'cases':
                return 'Casos'
            case 'aliances':
                return 'Alianzas'
            case 'observatory':
                return 'Observatorio'
            case 'inform':
                return 'Informes Anuales'
            default:
                return ""
        }
    }

    return (
        <div id={props.type}>
            <div className="subtitle">
                {nameSpanish(props.type) }
            </div>
            <br />
            <div className="cardsContainer">
                {props.article.map(e => <NoteCard id={e.id} title={e.title} coverImage={e.coverImage} subhead={e.subhead} />)}
                {props.article.length > 2 || window.innerWidth < 1000? <Link to={`/articles?type=${props.type}`}><button title="Ver más" className="seeMore"><div className="ellipsis"><div className="point1"></div><div className="point2"></div><div className="point3"></div></div></button></Link> : false}
                
            </div>
            
        </div>
    );
}

export default NoteCards;