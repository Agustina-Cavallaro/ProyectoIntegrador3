
import React, { Component } from "react";
import { withRouter } from "react-router-dom"; 

class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {input: "" } //estado incial el input vacio 
  }

  controlarForm (e){ ///se ejecuta cuando se envia el form
    e.preventDefault() ///evuto q se recargue la pag
    this.props.history.push('/results/' + this.state.input) //usa react para dirigir a la ruta
  }

  controlarInput (e){ //cuando el usuario escibe
    this.setState({ input: e.target.value }); ///valor que se escibe en el input
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
        <button type="submit" className="buscador-boton">Buscar</button>
      </form>
    )
  }
}

export default withRouter(Formulario);
