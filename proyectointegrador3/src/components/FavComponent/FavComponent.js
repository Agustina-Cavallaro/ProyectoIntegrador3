import React, { Component } from "react";
import SingleCardMovie from "../../components/SingleCardMovie/SingleCardMovie";



class FavComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculasFavoritas: [],
      seriesFavoritas: []
    };
  }

  componentDidMount() {
    let movies = localStorage.getItem("peliculasFavoritas");
    let series = localStorage.getItem("seriesFavoritas");

    this.setState({
      peliculasFavoritas: movies ? JSON.parse(movies) : [],
      seriesFavoritas: series ? JSON.parse(series) : []
    });
  }

  borrarFavorito = (id, tipo) => {
    const key = tipo === "movie" ? "peliculasFavoritas" : "seriesFavoritas";
    let guardados = localStorage.getItem(key);
    let favoritos = guardados ? JSON.parse(guardados) : [];

    let nuevosFavoritos = [];
    for (let i = 0; i < favoritos.length; i++) {
      if (favoritos[i].id !== id) {
        nuevosFavoritos.push(favoritos[i]);
      }
    }

    localStorage.setItem(key, JSON.stringify(nuevosFavoritos));

    if (tipo === "movie") {
      this.setState({ peliculasFavoritas: nuevosFavoritos });
    } else {
      this.setState({ seriesFavoritas: nuevosFavoritos });
    }
  };

  render() {
    return (
      <React.Fragment>
      
        <section className="favoritos-container">
          <h1>Mis Favoritos</h1>

          <h2>Películas</h2>
          {this.state.peliculasFavoritas.length === 0 ? (
            <p>No tienes películas favoritas.</p>
          ) : (
            <div className="favoritos-grid">
              {this.state.peliculasFavoritas.map((movie) => (
                <div key={movie.id}>
                  <SingleCardMovie data={movie} pelicula={true} />
                  <button
                    onClick={() => this.borrarFavorito(movie.id, "movie")}
                    className="botonesVer"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}

      
          <h2>Series</h2>
          {this.state.seriesFavoritas.length === 0 ? (
            <p>No tienes series favoritas.</p>
          ) : (
            <div className="favoritos-grid">
              {this.state.seriesFavoritas.map((serie) => (
                <div key={serie.id}>
                  <SingleCardMovie data={serie} pelicula={false} />
                  <button
                    onClick={() => this.borrarFavorito(serie.id, "tv")}
                    className="botonesVer"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
    
      </React.Fragment>
    );
  }
}

export default FavComponent;