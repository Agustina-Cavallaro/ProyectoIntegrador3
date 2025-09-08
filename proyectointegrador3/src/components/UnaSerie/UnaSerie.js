// components/DetailSeries/DetailSeries.jsx
import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

const AUTH ='Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmZlMjU5MjliNzExMDQ1ZDQwNGMyM2UxOTE4ZTJlZiIsIm5iZiI6MTc1NzE3MjgwMS4zNywic3ViIjoiNjhiYzU0NDE3OTY1MmEwNGU3NGU1OTY2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.mOmvs0Cidnu6ANiw9hZyOJugT7wHhqXjCoVFVVCwNNY' ////uso la misma de popularmovies

class UnaSerie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      error: null,
      verMas: false,
      textoBoton: "ver mas",
      clase: "noMostrar",
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    fetch(`https://api.themoviedb.org/3/tv/${id}?language=es-ES`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: AUTH,
      },
    })
      .then((res) => res.json())
      .then((data) => this.setState({ data, loading: false }))
      .catch((error) => this.setState({ error, loading: false }));
  }

  boton = () => {
    this.setState({
      verMas: !this.state.verMas,
      textoBoton: this.state.textoBoton === "ver mas" ? "ver menos" : "ver mas",
      clase: this.state.textoBoton === "ver mas" ? "" : "noMostrar",
    });
  };

  render() {
    const { data, loading, error, textoBoton, clase } = this.state;
    if (loading) return <p>Cargando…</p>;
    if (error) return <p>Ocurrió un error</p>;
    if (!data) return null;

    // 👇 armamos la variable generos igual que en movies
    let generos = "";
    if (data.genres) {
      generos = data.genres.map((g) => g.name).join(", ");
    }



    return (
      <article className="character-card detail">
        <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.name} />
        <h2>{data.name}</h2>
        <p><strong>Calificación:</strong> {data.vote_average}</p>
        <p><strong>Fecha de estreno:</strong> {data.first_air_date}</p>
        <p><strong>Géneros:</strong> {generos}</p>
        <p ><strong>Sinopsis:</strong> {data.overview}</p>
        {/* FALTA LO DE AGREGAR A FAVPRITOS  */}


        {/* <button className="more" onClick={this.boton}>{textoBoton}</button>
        <section className="extra">
        <p className={clase}><strong>Sinopsis:</strong> {data.overview}</p>
        </section> */}
        {/* <Link to="/" className="delete">Volver</Link> */}
      </article>
    );
  }
}

export default UnaSerie;
