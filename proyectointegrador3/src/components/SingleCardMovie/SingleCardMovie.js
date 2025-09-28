import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

class SingleCardMovie extends Component{
    constructor(props){
        super(props);
        this.state = {  ////guarda los datos de la peli en el state 
            data: props.data,
            verMas: false, 
            textoBoton: " Ver mas ",
            clase: "noMostrar", //// clase css para ocultar o mostrar 
            pelicula: props.pelicula, 
            esFavorito: this.estaEnFavoritos() //para q caclule si esta en favs o no
        }
    }

    boton (){
        this.setState({
            verMas: !this.state.verMas, ///invierte el valor de ver mas 
            textoBoton: this.state.textoBoton === " Ver mas "? " Ver menos " : " Ver mas ", //this.state se fija que valot tiene el boton y se fija si cambiarlo 
            clase: this.state.textoBoton === " Ver mas " ? "" : "noMostrar" 
        })
    }
    
      estaEnFavoritos() { ///se fija si la pelo o serie esta o no en favs y sirve para el boton de agregar o quitar 
        const key = this.props.pelicula ? "peliculasFavoritas" : "seriesFavoritas"; ///elije si es pelo o serie 
        let guardados = localStorage.getItem(key); ///busca q hay en local 
        let esta = false;  //empeixa en false
        
        if (guardados) {   /// si hay guardados los recorre
          let favoritos = JSON.parse(guardados);
          favoritos.map(fav => fav.id === this.props.data.id ? (esta = true) : null); ///si es el mismo id es true sino no 
        }

        return esta;
      }

    
      manejarFavorito () { ///modofica la lista agregando o dejanod igual
        const key = this.props.pelicula ? "peliculasFavoritas" : "seriesFavoritas";
        let guardados = localStorage.getItem(key);
        let favoritos = guardados ? JSON.parse(guardados) : []; //si hay alfo lo parsea sino vacio 
      
        let esta = false;
        let nuevosFavoritos = []; //nueva lista sin el actual
      
       favoritos.map(fav =>  fav.id === this.state.data.id  ? (esta = true) : nuevosFavoritos.push(fav));

    
        if (!esta) {
          nuevosFavoritos.push(this.state.data); // si no esta lo agrego a la lista 
        }
      
        localStorage.setItem(key, JSON.stringify(nuevosFavoritos));
      
  
          this.setState(
          { esFavorito: !this.state.esFavorito }, // actualiza estado --> cambia de valor el es fav si era true cambio a false

          ///ESTO ESTA DE MAS 
          () => (this.props.actualizarLista ? this.props.actualizarLista() : null) // ejecuta solo si existe lo de actualixzr lista
          //sin argumentos xq quiero q se haga dsp de actualizsr lo de favs
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