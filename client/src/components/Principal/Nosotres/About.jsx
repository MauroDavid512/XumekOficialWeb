import React from "react";
import "./About.css"
import portadaXumec from "../../../imgs/portadaXumec.png"
import Team from "./Team";


function About() {

    return (
        <div id="about">
            <div className="subtitle">¿Que es Xumek?</div>
            <br />
            <img className="portada" src={portadaXumec} alt="" />
            <br />
            <div className="parrafo">
            Somos una organización de la sociedad civil sin fines de lucro integrada por profesionales y estudiantes de diversas disciplinas de las ciencias sociales que de forma independiente de todo poder del Estado, institución partidaria u otra,  trabaja en la difusión, formación, investigación y defensa de los derechos humanos.
            </div>
            <div className="parrafo">
            
            Buscamos promover el respeto y garantía de los derechos humanos a través de la visibilización de graves vulneraciones, la defensa jurídica, la generación y transmisión de información y conocimientos con el objeto último de incidir positivamente en las políticas públicas adoptadas por el Estado.
            </div>
            <div className="parrafo">
            
            Denunciamos y patrocinamos casos donde se han violado los DD.HH. ante la Justicia provincial, Justicia Federal y en el Sistema Interamericano de Derechos Humanos.
            Xumek significa “Sol” en el dialecto Milcayak, perteneciente a la lengua Huarpe, pueblo indígena que habita hoy el norte de la Provincia de Mendoza, Argentina.
            </div>
            <div className="parrafo">
            
            Desde hace 10 años, Xumek elabora anualmente el Informe sobre la situación de Derechos Humanos en Mendoza. El objetivo de esta publicación es poder realizar un análisis científico de las graves violaciones a derechos humanos en la provincia y darles visibilidad, así como generar un acervo documental que permita incidir en las políticas públicas provinciales y nacionales.
            </div>
            <div className="parrafo">
            El Informe se compone de artículos elaborados por las secretarías y áreas de Xumek, aportes de colaboradores y colaboradoras especializados/as en la temática, grupos de investigación de diversas casas de estudios y de otras organizaciones. Algunas de las temáticas que suelen abordarse son: Ambiente; Derechos Humanos de Incidencia Colectiva; Género y diversidad; Niñez y Adolescencia; Lesa Humanidad; Movilidad Humana; Pueblos Indígenas; Salud Mental; Violencia Institucional: violencia policial, situación penitenciaria, seguridad ciudadana; y,  Casos Emblemáticos patrocinados por nuestra asociación.
            </div>

        </div>
    );
}

export default About;