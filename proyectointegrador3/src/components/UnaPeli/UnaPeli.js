import React, { Component } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";

class UnaPeli extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null, //guardo los datos de la pe q vienen de la api
      esFavorito: false //para q detecte si esta en fsv ono
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id; //de la url

    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=0e24f8864be45bfee7d05660d5fc8739&language=es-ES`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          data, //toda la indo de la serie 
          esFavorito: this.estaEnFavoritos(data) //t/f si esta en favs o no
        });
      })
      .catch(error => this.setState({ error }));
  }

  estaEnFavoritos  (data)  { //se dija si ya esta la peli en favs
    const key = "peliculasFavoritas";
    const guardados = localStorage.getItem(key); //traogo lo q hay guardado
    if (!guardados) return false; // si no haynada

    const favoritos = JSON.parse(guardados);
    const encontrados = favoritos.filter(fav => fav.id === data.id); //busco si ya esta
    return encontrados.length > 0; //si coincide el id, ya esta en favs
  }

  manejarFavorito  ()  { //agrega o saca de favs
    const key = "peliculasFavoritas";
    const guardados = localStorage.getItem(key);
    const favoritos = guardados ? JSON.parse(guardados) : []; //si no hay nada hacee el array vacio

    const nuevosFavoritos = favoritos.filter(fav => fav.id !== this.state.data.id); ///filtro los q no coiniden con la acural, osea q hagi una lista sin lapeli q ya esta y si apatrece de nuveo la saco asi no se repite
    const esta = nuevosFavoritos.length !== favoritos.length;

    if (!esta) {
      nuevosFavoritos.push(this.state.data); //si no estaba la agrego
    }

    localStorage.setItem(key, JSON.stringify(nuevosFavoritos));
    this.setState({ esFavorito: !esta }); //para q cambie el boron 
  }

  render() {
    const data = this.state.data;

    return (
      <React.Fragment>
        <Header />
        {data != null ?         
        <article className="character-card detail">
          <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.original_title} />
          <h2>{data.original_title}</h2>
          <p><strong>Calificación:</strong> {data.vote_average}</p>
          <p><strong>Fecha de estreno:</strong> {data.release_date}</p>
          {data.genres.map(g => <p> Generos: {g.name + "  " }</p>)}
          <p><strong>Duración:</strong> {data.runtime} min</p>
          <p><strong>Sinopsis:</strong> {data.overview}</p>
          <button onClick={()=>this.manejarFavorito()} className="botonesVer">
            {this.state.esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
          </button>
        </article>
      : <Loading/>  
      }

        <Footer />
      </React.Fragment>
    );
  }
}

export default UnaPeli;
