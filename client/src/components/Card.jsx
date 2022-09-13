import React from "react";
import "../estilos/card.css"

export default function Card({img,name,continents}) {
    return (
        <div className="cardFlex">
         
         <div className="img-container">
         <img src={img} alt="img not found" />
         </div>
             <div className="card-content">
                 <div className="card-tittle">
                    <h3>{name}</h3>
                 </div>

                    <h4>{continents}</h4>
              
             </div>  
        </div>

    );
}
