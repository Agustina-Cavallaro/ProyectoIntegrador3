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
        const key = this.props.pelicula ? "peliculasFavoritas" : "seriesFavoritas";
        let guardados = localStorage.getItem(key); //agarra del local 
        if (guardados) {
          let favoritos = JSON.parse(guardados);
          let esta = false;
    
          favoritos.map((fav) => { //recorre todos los favs 
            if (fav.id === this.props.data.id) { //si encuentra uno con el mismo id engonces dice q ya etsa 
              esta = true;
            }
            return null; // para que map no se queje
          });
    
          return esta;
        }
        return false;
      }
    
      manejarFavorito () {
        const key = this.props.pelicula ? "peliculasFavoritas" : "seriesFavoritas";
        let guardados = localStorage.getItem(key);
        let favoritos = guardados ? JSON.parse(guardados) : []; //si hay alfo lo parsea sino vacio 
      
        let esta = false;
        let nuevosFavoritos = []; //nueva lista 
      
        favoritos.map((fav) => { //recorre gavs de nuevo 
          if (fav.id === this.state.data.id) { //si el id coincide con el que ya estaba true, sino pushea y lo agrega 
            esta = true;
          } else {
            nuevosFavoritos.push(fav);
          }
          return null;
        });
    
        if (!esta) {
          nuevosFavoritos.push(this.state.data); //lo agrego a la lista 
        }
      
        localStorage.setItem(key, JSON.stringify(nuevosFavoritos));
      
  
        this.setState({ esFavorito: !this.state.esFavorito }, () => { //actualizo para q cambie el boron 
          if (this.props.actualizarLista) { // si el parde paso la funcion actualizar lista la ejecuto
            this.props.actualizarLista();
          }
        });
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