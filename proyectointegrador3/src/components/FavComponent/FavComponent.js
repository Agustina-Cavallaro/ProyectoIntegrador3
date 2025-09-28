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
componentDidMount(){
    //leo desde local lo q hay 
    let movies = localStorage.getItem("peliculasFavoritas");
    let series = localStorage.getItem("seriesFavoritas");

    this.setState({
      //si habia alfo en el local lo parse y sino lo dejo como lsia
      peliculasFavoritas: movies ? JSON.parse(movies) : [],
      seriesFavoritas: series ? JSON.parse(series) : []
    });
}

  cargarFavoritos  ()  { ////si se agrego a algo lo buca en el local
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
        {this.state.peliculasFavoritas.length === 0 ? ( //si la lista esta vacia muestra el mesanje 
          <p>No tenes películas favoritas.</p>
        ) : (
          //sino mapea single card
          <div className="favoritos-grid">
            {/* mapea cada peli guardada en favs  y por cada una devuelve un scm */}
            {this.state.peliculasFavoritas.map((movie) => ( //map recibe como parámetro una función que transforma cada película del array en un scm
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
