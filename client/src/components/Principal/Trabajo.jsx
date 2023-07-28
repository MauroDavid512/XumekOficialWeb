import React from "react";
import Aliances from "./Trabajo/Aliances"
import AnualInfo from "./Trabajo/AnualInfo"
import Observatory from "./Trabajo/Observatory"
import News from "./Trabajo/News";
import NoteCards from "../NoteCards";
import axios from "axios";
function Trabajo() {
    const [articles, setArticles] = React.useState({
        new: [],
        observatory: [],
        inform: [],
        cases: [],
        aliances: []
    })

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                let notes = await axios.get('/article');
                let aux = {
                    new: notes.data.filter(e => e.type === "new"),
                    observatory: notes.data.filter(e => e.type === "observatory"),
                    inform: notes.data.filter(e => e.type === "inform"),
                    cases: notes.data.filter(e => e.type === "cases"),
                    aliances: notes.data.filter(e => e.type === "aliances")
                };
                ["new", "observatory", "inform", "cases", "aliances"].forEach(e => {
                    if (aux[e].length >= 3 && window.innerWidth > 1000) {
                        aux[e] = [aux[e][aux[e].length - 1], aux[e][aux[e].length - 2], aux[e][aux[e].length - 3]];
                    }else if (window.innerWidth < 1000){
                        aux[e] = [aux[e][aux[e].length - 1], aux[e][aux[e].length - 2]]
                    }
                });
                setArticles(prevArticles => ({
                    ...prevArticles,
                    new: aux.new,
                    observatory: aux.observatory,
                    inform: aux.inform,
                    cases: aux.cases,
                    aliances: aux.aliances
                }));
            } catch (error) {
                console.log("Error al obtener artículos", error);
            }
        };
        window.scrollTo(0, 0);
        fetchData();
    }, []);
    return (
        <div className="principalContainer">
            <div className="principalTitle">
                NUESTRO TRABAJO
            </div>
            <div className="noteCardsContainerSuper">
                <NoteCards type="new" article={articles.new} />
                <NoteCards type="cases" article={articles.cases} />
                <NoteCards type="observatory" article={articles.observatory} />
                <NoteCards type="inform" article={articles.inform} />
                <NoteCards type="aliances" article={articles.aliances} />
            </div>
        </div>
    );
}
export default Trabajo;