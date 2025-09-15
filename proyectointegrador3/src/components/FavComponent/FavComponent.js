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
    this.cargarFavoritos();
  }

  cargarFavoritos = () => {
    let movies = localStorage.getItem("peliculasFavoritas");
    let series = localStorage.getItem("seriesFavoritas");

    this.setState({
      peliculasFavoritas: movies ? JSON.parse(movies) : [],
      seriesFavoritas: series ? JSON.parse(series) : []
    });
  };

  render() {
    return (
      <section className="favoritos-container">
        <h1>Mis Favoritos</h1>

 
        <h2>Películas</h2>
        {this.state.peliculasFavoritas.length === 0 ? (
          <p>No tenes películas favoritas.</p>
        ) : (
          <div className="favoritos-grid">
            {this.state.peliculasFavoritas.map((movie) => (
              <SingleCardMovie key={movie.id} data={movie} pelicula={true} actualizarLista={this.cargarFavoritos}  />
            ))}
          </div>
        )}

   
        <h2>Series</h2>
        {this.state.seriesFavoritas.length === 0 ? (
          <p>No tenes series favoritas.</p>
        ) : (
          <div className="favoritos-grid">
            {this.state.seriesFavoritas.map((serie) => (
              <SingleCardMovie key={serie.id} data={serie} pelicula={false} actualizarLista={this.cargarFavoritos} />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default FavComponent;
