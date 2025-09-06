import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">🎬 UdeSA Movies</div>
      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/favoritos">Favoritos</Link></li>
          <li><Link to="/popular">Ver todas Populares</Link></li>
          <li><Link to="/nowplaying">Ver todas en Cartelera</Link></li>
          <li><Link to="/upcoming">Ver todas Próximamente</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;