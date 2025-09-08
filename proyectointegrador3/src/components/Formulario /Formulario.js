import React, { Component } from "react";
import {withRouter} from "react-router-dom"

class Formulario extends Component{
    constructor(props){
        super(props);
        this.state= {
            busquedaValor : "", 
            kind: "movie" // para ver si busk pel o serie  --> valor incial peli 
        }
    };

    evitarSubmit(e){
        e.preventDefault();
        this.props.history.push(`/results/${this.state.busquedaValor}`)
    }

    controlarCambios(event){
        this.setState({busquedaValor: event.target.value});
    };

    render(){
        return(
            <form onSubmit={(event)=> this.evitarSubmit(event)}>
                <input type="text" placeholder="Buscar pelicula o serie..." onChange={(event)=>this.controlarCambios(event)} value={this.state.busquedaValor} />
                <button type="submit" className="btn btn-success btn-sm"> Buscar... </button>
            </form>
        )
    }
}

// export default Formulario; 
export default withRouter(Formulario)