import React, { Component } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

class UnaPeli extends Component {
  constructor(props){
    super(props);
    this.state = { 
      data: null,
      verMas: false,
      textoBoton: "ver mas",
      clase: "noMostrar"
    };
  }

  componentDidMount(){
    const { id } = this.props.match.params;
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=0e24f8864be45bfee7d05660d5fc8739&language=es-ES`)
      .then(res => res.json())
      .then(data => this.setState({ data, loading: false }))
      .catch(error => this.setState({ error, loading: false }));
  }

  render(){
    const { data } = this.state;
    if (!data) return null;

    let generos = [];
    if (data.genres) {
      for (let i = 0; i < data.genres.length; i++) {
        generos.push(data.genres[i].name);
      }
    }

    return (
      <React.Fragment>
      <Header/>
      <article className="character-card detail">
        <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.original_title} />
        <h2>{data.original_title}</h2>
        <p><strong>Calificación:</strong> {data.vote_average}</p>
        <p><strong>Fecha de estreno:</strong> {data.release_date}</p>
        <p><strong>Géneros:</strong> 
          {generos.map((gene, i) => (
            <p key={i}> {gene} </p>
          ))}
        </p>
        <p><strong>Duración:</strong> {data.runtime} min</p>
        <p><strong>Sinopsis:</strong> {data.overview}</p>
      </article>
      <Footer/>
      </React.Fragment>
    );
  }
}

export default UnaPeli;