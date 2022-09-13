import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../actions";
import "../estilos/SearchBar.css"

export default function SearchBar({manejador}) {
    const dispatch = useDispatch();
    const [name, setName] = useState("");


    //funcion para registrar cada cambio que hay en el input mediante el set name y el value del evento que lo disparo, que seria el e.target
function handleCountryChange(e){
    e.preventDefault()
    setName(e.target.value)
    console.log(name)
}

//funcion para el boton de enviar, dispacht con la funcion 
//que traia por nombre y le pasamos el nombre que se registro en el input
//luego volvemos a setear el estado, a un string vacio.
function handleSubmit(e){
    e.preventDefault()
    dispatch(getCountriesByName(name))
    setName("")
    manejador(1)
}

    return (
        <div>
            <input className="input" value = {name} type= "text" placeholder="Pais..." onChange={(e)  => handleCountryChange(e)}/>
        
            <button className="btn" type= "submit" onClick={(e)=> handleSubmit(e)}>Buscar</button>
          
        </div>
    )
}