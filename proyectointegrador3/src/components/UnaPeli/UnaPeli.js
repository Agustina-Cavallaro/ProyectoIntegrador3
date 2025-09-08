// components/DetailMovie/DetailMovie.jsx
import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

const AUTH ='Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmZlMjU5MjliNzExMDQ1ZDQwNGMyM2UxOTE4ZTJlZiIsIm5iZiI6MTc1NzE3MjgwMS4zNywic3ViIjoiNjhiYzU0NDE3OTY1MmEwNGU3NGU1OTY2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.mOmvs0Cidnu6ANiw9hZyOJugT7wHhqXjCoVFVVCwNNY' ////uso la misma de popularmovies

class UnaPeli extends Component {
  constructor(props){
    super(props);
    this.state = { ////defino el esyado incial del comp
      data: null,
      loading: true,   // true mientras hacemos el fetch
      error: null,
      verMas: false,
      textoBoton: "ver mas",
      clase: "noMostrar"
    };
  }

  componentDidMount(){
    const { id } = this.props.match.params; //agarro el id de la url
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=es-ES`, {
      method: "GET",
      headers: { accept: "application/json", Authorization: AUTH } ///lopde popular movies 
    })
      .then(res => res.json())
      .then(data => this.setState({ data, loading: false }))
      .catch(error => this.setState({ error, loading: false }));
  }

  boton = () => {
    this.setState({
      verMas: !this.state.verMas,
      textoBoton: this.state.textoBoton === "ver mas" ? "ver menos" : "ver mas",
      clase: this.state.textoBoton === "ver mas" ? "" : "noMostrar"
    });
  };

  render(){
    const { data, loading, error, textoBoton, clase } = this.state;
    if (loading) return <p>Cargando…</p>;
    if (error) return <p>Ocurrió un error</p>;
    if (!data) return null;
    let generos = "";
    if (data.genres) {  //si existe genres  creo un array vacío
      let nombres = [];
      for (let i = 0; i < data.genres.length; i++) {
        nombres.push(data.genres[i].name); // meto solo el nombre
      }
      generos = nombres.join(", "); //LO SEPARO CON COMAS XQ SINO ME QUEDA TODO JUNTO 
    }
    console.log(data);

    return (
      <article className="character-card detail">
        <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.original_title} />
        <h2>{data.original_title}</h2>
        <p><strong>Calificación:</strong> {data.vote_average}</p>
        <p><strong>Fecha de estreno:</strong> {data.release_date}</p>
        <p><strong>Géneros:</strong> {generos}</p>
        <p><strong>Duración:</strong> {data.runtime} min</p>
        {/* {data.runtime ? <p><strong>Duración:</strong> {data.runtime} min</p> : null} */}
        {/* <button className="more" onClick={this.boton}>{textoBoton}</button> */}
        <p ><strong>Sinopsis:</strong> {data.overview}</p>
         {/* FALTA LO DE AGREGAR A FAVPRITOS  */}
      
        {/* <section className="extra">
          <p className={clase}><strong>Sinopsis:</strong> {data.overview}</p>
        </section> */}

        {/* <Link to="/" className="delete">Volver</Link> */}
      </article>
    );
  }
}

export default UnaPeli;
