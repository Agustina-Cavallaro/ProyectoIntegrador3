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
            pelicula: props.pelicula
        }
    }

    boton (){
        this.setState({
            verMas: !this.state.verMas,
            textoBoton: this.state.textoBoton === " Ver mas "? " Ver menos " : " Ver mas ",
            clase: this.state.textoBoton === " Ver mas " ? "" : "noMostrar"
        })
    }

    render(){
        return(
            <article className="single-card-movie">
                <img src={"https://image.tmdb.org/t/p/w342" + this.state.data.poster_path} className="card-img-top" alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">{this.state.data.title}</h5>
                    <p className={"card-text " + this.state.clase}>{this.state.data.overview}</p>
                    <button onClick={() => this.boton()} className="botonesVer"> {this.state.textoBoton}</button>
                    {this.state.pelicula ? <Link to={`/movie/id/${this.state.data.id}`} className="botonesVer"> Ver detalle </Link> : <Link to={`/tv/id/${this.state.data.id}`} className="botonesVer"> Ver detalle </Link>}
                    <button className="botonesVer">🩶</button> {/* Aca le falta el on clic para hacerlo funcional*/}
                </div>
            </article>
        )
    }
}

export default SingleCardMovie