
import React, { Component } from "react";
import { withRouter } from "react-router-dom"; 

class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "" ,
      tipo: ""
    } //estado incial el input vacio 
  }

   controlarForm(e) {
    if (this.state.tipo === "") {
      e.preventDefault(); 
    }
    this.props.history.push(`/results/${this.state.tipo}/${this.state.input}`);

  }

  controlarInput (e){ //cuando el usuario escibe
    this.setState({ input: e.target.value }); ///valor que se escibe en el input
  }

    controlarTipo(e) {
    this.setState({ tipo: e.target.value });
  }

  render() {
    return (
      // on submit anda cuando la persona toca buscar ; llama al evento cf
      <form onSubmit={(e) =>this.controlarForm(e)} className="buscador-form">
        <input
          placeholder="Buscador"
          value={this.state.input} ////lo q escibre se guarda en state
          onChange={(e) => this.controlarInput(e)} ////cuando la persona escirbe algo llama a ci q actualiza lo q hay en e.target.value
          className="buscador-input"
        />
          <input type="radio"
          value="tv"
          name="tipo"  
          onChange={(e) => this.controlarTipo(e)}
        />
        <label className ="label">Series</label><br />

        <input type="radio"
          value="movie"
          name="tipo"  
          onChange={(e) => this.controlarTipo(e)}
        />
        <label className ="label">Películas</label><br />


        <button type="submit" className="buscador-boton">Buscar</button>
      </form>
    )
  }
}

export default withRouter(Formulario);
