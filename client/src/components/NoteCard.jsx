import React from "react";
import "./NoteCard.css";
import { Link } from "react-router-dom";


function NoteCard(props) {


    return (
        <Link to={`/article/${props.id}`}>
        <div title={props.title}  className="cardContainer">
            <img className="cardImage" src={props.coverImage} alt="" />
            <div className="cardTextContainer">
            <div className="cardTitle">{props.title}</div>
            <div className="cardSubhead">{props.subhead}</div>
            </div>
        </div>
        </Link>
    );
}

export default NoteCard;