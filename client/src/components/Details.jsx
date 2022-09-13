import React from "react";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { getCountriesDetails } from "../actions";
import { useEffect } from "react";
import "../estilos/details.css"


export default function Details(){


    const dispatch = useDispatch();
    const info = useSelector((state) => state.details)
    const {id} = useParams()
  

   // console.log("soy id", id)
    useEffect(()=>{
        dispatch(getCountriesDetails(id)) 
    },[dispatch, id])

 console.log("soy info",info)

    return (
        <div>
            <h1>Aprende mas sobre    {info.name}</h1>
        {info.id === id ? 
        <div className="detailglobal">
        <div className="detailFlex">
            <div className="detail-container">
            <img src={info.imgflag} alt="img not found" />
            </div>
            <div className="detail-content">
            <h2>{info.name}</h2>
            <h5>Continente:  {info.continents}</h5>
            <h5>Capital:  {info.capital}</h5>
            <h5>Subregion:  {info.subregion}</h5>
            <h5>Iniciales:  {info.id}</h5>
            <h5>Area:  {info.area} km2</h5>
            <h5>Poblacion:  {info.population}</h5>
         </div> 
         </div>
         <div className="detailFlex">
          {info.activities.length>0 ? info.activities.map((e) =>{
            return(
                <div>
                 <h3>Actividad: {e.name}</h3>
                 <h5>Dificultad: {e.difficulty}</h5>
                 <h5>Duracion en hs: {e.duration}</h5>
                 <h5>Temporada: {e.season}</h5>
                </div>
            )}   
          ) :<div className="no-activity">
             <h3>"No hay actividades relacionadas con este pais"</h3> 
             </div> }
        </div>
        </div>
    : <p>Cargando...</p>}
        <Link to="/home">
        <button>Home</button>
        </Link>
</div>
        )}