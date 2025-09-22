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
            esFavorito: this.estaEnFavoritos() //para q caclule si esta en favs o no
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
        const key = this.props.pelicula ? "peliculasFavoritas" : "seriesFavoritas"; ///elije si es pelo o serie 
        let guardados = localStorage.getItem(key); ///busca q hay en local 
        let esta = false;  //empeixa en false

        if (guardados) {
          let favoritos = JSON.parse(guardados);
          favoritos.map(fav => fav.id === this.props.data.id ? (esta = true) : null); ///si es el mismo id es true sino no 
        }

        return esta;
      }

    
      manejarFavorito () {
        const key = this.props.pelicula ? "peliculasFavoritas" : "seriesFavoritas";
        let guardados = localStorage.getItem(key);
        let favoritos = guardados ? JSON.parse(guardados) : []; //si hay alfo lo parsea sino vacio 
      
        let esta = false;
        let nuevosFavoritos = []; //nueva lista 
      
       favoritos.map(fav =>  fav.id === this.state.data.id  ? (esta = true) : nuevosFavoritos.push(fav));

    
        if (!esta) {
          nuevosFavoritos.push(this.state.data); //lo agrego a la lista 
        }
      
        localStorage.setItem(key, JSON.stringify(nuevosFavoritos));
      
  
          this.setState(
          { esFavorito: !this.state.esFavorito }, // actualiza estado
          () => (this.props.actualizarLista ? this.props.actualizarLista() : null) // ejecuta solo si existe
      );
      };
      
      

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
                    <button onClick={()=>this.manejarFavorito()} className="botonesVer"> {this.state.esFavorito  ? "Quitar de favoritos" : "Agregar a favoritos"} </button>
                </div>
                :
                <div className="cardBody">
                    <h5 className="card-title">{this.state.data.name}</h5>
                    <p className={"card-text " + this.state.clase}>{this.state.data.overview}</p>
                    <button onClick={() => this.boton()} className="botonesVer"> {this.state.textoBoton}</button>
                    <Link to={`/tv/id/${this.state.data.id}`} className="botonesVer"> Ver detalle </Link>
                    <button onClick={()=>this.manejarFavorito()} className="botonesVer"> {this.state.esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"} </button>
                </div>
                }

                
            </article>
        )
    }
}

export default SingleCardMovie