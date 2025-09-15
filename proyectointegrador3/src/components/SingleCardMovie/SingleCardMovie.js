import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

class SingleCardMovie extends Component{
    constructor(props){
        super(props);
        this.state = {  ////guarda los datos de la peli en el state 
            data: props.data,
            verMas: false,
            textoBoton: " Ver mas ",
            clase: "noMostrar",
            pelicula: props.pelicula, 
            esFavorito: this.estaEnFavoritos()
        }
    }

    boton (){
        this.setState({
            verMas: !this.state.verMas,
            textoBoton: this.state.textoBoton === " Ver mas "? " Ver menos " : " Ver mas ",
            clase: this.state.textoBoton === " Ver mas " ? "" : "noMostrar"
        })
    }
    estaEnFavoritos() {
      const key = this.props.pelicula ? "peliculasFavoritas" : "seriesFavoritas";
      let guardados = localStorage.getItem(key);
      if (guardados) {
        let favoritos = JSON.parse(guardados);
        for (let i = 0; i < favoritos.length; i++) {
          if (favoritos[i].id === this.props.data.id) {
            return true;
          }
        }
      }
      return false;
    }
  
    // Agregar o sacar de favoritos 
    manejarFavorito = () => {
      const key = this.props.pelicula ? "peliculasFavoritas" : "seriesFavoritas";
      let guardados = localStorage.getItem(key);
      let favoritos = guardados ? JSON.parse(guardados) : [];
  
      let estaba = false;
      let nuevosFavoritos = [];
  
      for (let i = 0; i < favoritos.length; i++) {
        if (favoritos[i].id === this.state.data.id) {
          estaba = true;            // si estaba, NO lo copio al nuevo array
        } else {
          nuevosFavoritos.push(favoritos[i]); // dejo los demás
        }
      }
  
      if (!estaba) {
        nuevosFavoritos.push(this.state.data); // si no estaba lo agrego
      }
  
      localStorage.setItem(key, JSON.stringify(nuevosFavoritos));
      this.setState({ esFavorito: !this.state.esFavorito });
  
     
      if (this.props.actualizarLista) { ///vine del component
        this.props.actualizarLista();
      }
    };
      ;

    render(){
        return(
            <article className="single-card-movie">
                <img src={"https://image.tmdb.org/t/p/w342" + this.state.data.poster_path} className="card-img-top" alt="..."/>
                {this.state.pelicula ? 
                <div className="cardBody">
                    <h5 className="card-title">{this.state.data.title}</h5>
                    <p className={"card-text " + this.state.clase}>{this.state.data.overview}</p>
                    <button onClick={() => this.boton()} className="botonesVer"> {this.state.textoBoton}</button>
                    <Link to={`/movie/id/${this.state.data.id}`} className="botonesVer"> Ver detalle </Link>
                    <button onClick={this.manejarFavorito} className="botonesVer"> {this.state.esFavorito  ? "Quitar de favoritos" : "Agregar a favoritos"} </button>
                </div>
                :
                <div className="cardBody">
                    <h5 className="card-title">{this.state.data.name}</h5>
                    <p className={"card-text " + this.state.clase}>{this.state.data.overview}</p>
                    <button onClick={() => this.boton()} className="botonesVer"> {this.state.textoBoton}</button>
                    <Link to={`/tv/id/${this.state.data.id}`} className="botonesVer"> Ver detalle </Link>
                    <button onClick={this.manejarFavorito} className="botonesVer"> {this.state.esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"} </button>
                </div>
                }

                
            </article>
        )
    }
}

export default SingleCardMovie