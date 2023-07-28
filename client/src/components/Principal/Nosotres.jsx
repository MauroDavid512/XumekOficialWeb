import React from "react";
import About from "./Nosotres/About"
import Team from "./Nosotres/Team"
import Areas from "./Nosotres/Areas"


function Nosotres() {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="principalContainer">
            <div className="principalTitle">
                NOSOTRES
            </div>
            <About />
            <Team />
            <Areas />
        </div>
    );
}

export default Nosotres;