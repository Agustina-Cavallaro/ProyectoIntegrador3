import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

class SingleCardMovie extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: props.data,
        }
    }
    render(){
        return(
            <article className="single-card-movie">
                <img src={"https://image.tmdb.org/t/p/w342" + this.state.data.poster_path} className="card-img-top" alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">{this.state.data.original_title}</h5>
                    <p className="card-text">{this.state.data.overview}</p>
                    <a href="movie.html" className="btn btn-primary">Ver más</a> 
                    {/* falta ir a detalle*/}
                    <a href="" className="btn alert-primary">🩶</a>
                </div>
            </article>
        )
    }
}

export default SingleCardMovie