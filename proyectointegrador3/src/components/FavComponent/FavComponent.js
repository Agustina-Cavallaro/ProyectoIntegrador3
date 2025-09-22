import React, { Component } from "react";
import SingleCardMovie from "../../components/SingleCardMovie/SingleCardMovie";

class FavComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //empiezo con listas vacias de las dos cosas 
      peliculasFavoritas: [],
      seriesFavoritas: []
    };
  }

  cargarFavoritos  ()  {
    //leo desde local lo q hay 
    let movies = localStorage.getItem("peliculasFavoritas");
    let series = localStorage.getItem("seriesFavoritas");

    this.setState({
      //si habia alfo en el local lo parse y sino lo dejo como lsia
      peliculasFavoritas: movies ? JSON.parse(movies) : [],
      seriesFavoritas: series ? JSON.parse(series) : []
    });
  };

  render() {
    return (
      <section className="favoritos-container">
        <h2 class="categoriaHome">Películas Favoritas</h2>
        {this.state.peliculasFavoritas.length === 0 ? ( //si no hay 
          <p>No tenes películas favoritas.</p>
        ) : (
          <div className="favoritos-grid">
            {this.state.peliculasFavoritas.map((movie) => ( //si hay las recorre con un map y crea un scm    para que si elimina de favs se recargie eso 
              <SingleCardMovie key={movie.id} data={movie} pelicula={true} actualizarLista={()=> this.cargarFavoritos()}  />
            ))}                                                             
          </div>
        )}

   
        <h2 class="categoriaHome">Series Favoritas</h2>
        {this.state.seriesFavoritas.length === 0 ? (
          <p>No tenes series favoritas.</p>
        ) : (
          <div className="favoritos-grid">
            {this.state.seriesFavoritas.map((serie) => (
              <SingleCardMovie key={serie.id} data={serie} pelicula={false} actualizarLista={()=>this.cargarFavoritos()} /> //si se saca actualizo la lista
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default FavComponent;
