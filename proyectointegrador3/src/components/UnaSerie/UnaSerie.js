import React, { Component } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";

class UnaSerie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //estado incial del componente
      data: null, //guarda la indo de la serie. q llega de la apo
      esFavorito: false //para saber si esta en favortips o no
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=0e24f8864be45bfee7d05660d5fc8739&language=es-ES`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          data, //toda la indo 
          esFavorito: this.estaEnFavoritos(data) ////t/f si esta en favs o no
        });
      })
      .catch(error => this.setState({ error }));
  }

  estaEnFavoritos  (data)  {
    const key = "seriesFavoritas";
    const guardados = localStorage.getItem(key); //veo lo guarado
    if (!guardados) return false; //si no hay nada flase xq no esta

    const favoritos = JSON.parse(guardados);
    const encontrados = favoritos.filter(fav => fav.id === data.id); //filtro x id
    return encontrados.length > 0;
  }

  manejarFavorito  ()  { //agrega o saca la serie de favoriso 
    const key = "seriesFavoritas";
    const guardados = localStorage.getItem(key);
    const favoritos = guardados ? JSON.parse(guardados) : [];

    const nuevosFavoritos = favoritos.filter(fav => fav.id !== this.state.data.id); //creo una lista nueva sin la serue q ta esta y si esta de nuevo la saco para q no se repita
    const esta = nuevosFavoritos.length !== favoritos.length;

    if (!esta) { // si no estaba la agrego
      nuevosFavoritos.push(this.state.data);
    }

    localStorage.setItem(key, JSON.stringify(nuevosFavoritos));
    this.setState({ esFavorito: !esta });
  }

  render() {
    const data = this.state.data;

    return (
      <React.Fragment>
        <Header />
        {data != null ?       
        <article className="character-card detail">
          <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.name} />
          <h2>{data.name}</h2>
          <p><strong>Calificación:</strong> {data.vote_average}</p>
          <p><strong>Fecha de estreno:</strong> {data.first_air_date}</p>
          <p> Generos:{data.genres.map(g => <p> {g.name + "  " }</p>)}</p>
          <p><strong>Sinopsis:</strong> {data.overview}</p>
          {/* cuando haga click que ejecite esa funcion */}
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

export default UnaSerie;
