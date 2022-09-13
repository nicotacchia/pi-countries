import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries , filterCountriesByContinents, filterPopulation, byActivity, getActivity } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import "../estilos/nav.css"
import "../estilos/card.css"
import "../estilos/home.css"
import "../estilos/filtros.css"



export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const activity = useSelector(state => state.activity)
 
  //console.log(allCountries);
  const [orden, setOrden] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPage, setCountriesPage] = useState(10);
  const indexOfLastCountry = currentPage * countriesPage; //10
  const indexFirstCountry = indexOfLastCountry - countriesPage; // 10 - 10 = 0
  const currentCountries = allCountries.slice(
    indexFirstCountry, // 0
    indexOfLastCountry // 10 
  );
  


//Funcion para establecer el paginado 
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);

  };

//Hooks para actualizar el comp, trayendo las funct que traen paises y act.
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivity());
  }, [dispatch]);

//funciones de handles. Aplicada para los filtros y para refrescar la pagina trayendo todos los paises de nuevo
  function handleClick(e) {
    e.preventDefault(e);
    dispatch(getCountries());
  }

  function handleByContinents(e){
    dispatch(filterCountriesByContinents(e.target.value))
 }

 function handleSort(e){
    e.preventDefault(e);
    dispatch(filterPopulation(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
 }

 function handleActivity(e) {
  e.preventDefault();
  dispatch(byActivity(e.target.value))
  setOrden(e.target.value)
}

  return (
    <>
      

       <header className="header">
        <h1 className="titulo">Paises</h1>
         <div className="logo">
            <img src="https://us.123rf.com/450wm/yupiramos/yupiramos1802/yupiramos180224323/96074528-globo-mundo-mundo-tierra-planeta-icono-vector-ilustraci%C3%B3n.jpg?ver=6" alt="img not found "
            onClick={(e) => {
              handleClick(e);
              }}/>
              </div>
              
                <div >
               <Link className="link" to="/country">Crear Pais</Link>
                </div>
                <div>
                <SearchBar manejador={setCurrentPage}/>
                </div>
                
        </header>
        <br />
        <br />
        <br />

<div className="conteinerFilters">
        
       
       <div>
    
        <select onChange={e => handleSort(e)}>
          <option value="Max">Max Poblacion</option>
          <option value="Min">Min Poblacion</option>
        </select>
        </div>
        
        <div>
        <select onChange={e => handleByContinents(e)}>
          <option value="All">Todos</option>
          <option value="Africa">Africa</option>
          <option value="Antarctica" key="Antarctica">
            Antartida
          </option>
          <option value="Asia" key="Asia">
            Asia
          </option>
          <option value="Europe" key="Europe">
            Europa
          </option>
          <option value="North America" key="NorthAmerica">
            Norte America
          </option>
          <option value="Oceania" key="Oceania">
            Oceania
          </option>
          <option value="South America" key="SouthAmerica">
            America del Sur
          </option>
        </select>
        </div>
            {  <div>
                <select onChange={handleActivity}>
                <option value="All">Actividades</option>
                {activity.map(e => (
                            <option value={e} key={e}>{e}</option>
                        ))}
       
                </select>
              </div>}
</div> 
        <Paginado
          countriesPage={countriesPage}
          allCountries={allCountries.length}
          paginado={paginado}
        />
       <div className="cardContainer">
        {currentCountries?.map((e) => {
          return (
            <div key={e.id}>
             <Link to ={`/countries/${e.id}`}>
             
              <Card
                img={e.imgflag}
                name={e.name}
                continents={e.continents}
                id={e.id}
              />
              
              </Link>
              </div>
           
          );
        })} 
        </div>
      </>
    
    
  );
}
