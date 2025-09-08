import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";    
// import Formulario from "../Formulario /Formulario";


function Header() {
  return (
    <header className="header">
      <div className="logo">UdeSA Movies</div> 
      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/favoritos">Favoritos</Link></li> 
          <li><Link to="/popularMovies">Peliculas Populares</Link></li>
          <li><Link to="/nowplaying">Peliculas Cartelera</Link></li>
          <li><Link to="/upcoming">Peliculas Próximamente</Link></li>
          <li><Link to="/popularSeries">Series populares</Link></li>
          <li><Link to="/topSeries">Top series</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;