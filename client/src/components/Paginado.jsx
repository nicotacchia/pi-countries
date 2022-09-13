import React from "react";
import "../estilos/paginado.css"

function Paginado ({countriesPage, allCountries, paginado}){
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allCountries/countriesPage); i++){
        pageNumbers.push(i)
    }

    return(
        <nav className="paginado">
            <ul>
            { pageNumbers && 
            pageNumbers.map(number => (
                
                <a onClick={() => paginado(number)}>|{number}|</a>
              
            ))}
            </ul>
        </nav>
    )
}


export default Paginado