import React from "react";
import { Link } from "react-router-dom";
import "../estilos/Landing.css";

export default function LandingPage() {
  return (
    <div className="inicio">
     
      <img
        src="https://acegif.com/wp-content/gifs/globe-38.gif"
        alt="img not found"
        className="img"
      />
      <div className="contenido">
        <h1>Bienvenidos a mi Proyecto Individual</h1>

        <Link to="/home">
          <button>Ingresar</button>
        </Link>
      </div>
    </div>
  );
}
