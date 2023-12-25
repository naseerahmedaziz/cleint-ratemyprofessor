import React from "react";
import img1 from "./Assets/bck1.png";
import img2 from "./Assets/bck2.png";
import img3 from "./Assets/bck3.png";
import img4 from "./Assets/bck4.png";
import img5 from "./Assets/bck5.png";

const BackDrop = () => {
    return (
        <div className="background">
            <img src={img1} width={150} className="img1" alt="img1" />
            <img src={img2} width={150} className="img2" alt="img2" />
            <img src={img3} width={150} className="img3" alt="img3" />
            <img src={img4} width={150} className="img4" alt="img4" />
            <img src={img5} width={200} className="img5" alt="img5" />
        </div>
    );
};

export default BackDrop;