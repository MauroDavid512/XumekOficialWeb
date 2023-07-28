import React from "react";
import Donate from "./Participa/Donate"
import Volunteering from "./Participa/Volunteering"


function Participa() {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div  className="principalContainer">
            <div className="principalTitle">
            PARTICIPÁ
            </div>
            <Donate/>
            <Volunteering/>
        </div>
    );
}

export default Participa;