
import React, { Component } from "react";
import { withRouter } from "react-router-dom"; 

class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {input: "" } //estado incial el input vacio 
  }

  controlarForm (e){ ///se ejecuta cuando se envia el form
    e.preventDefault()
    this.props.history.push('/results/' + this.state.input) //usa react para dirigir a la ruta
  }

  controlarInput (e){ //cuando el usuario escibe
    this.setState({ input: e.target.value });
  }

  render() {
    return (
      <form onSubmit={(e) =>this.controlarForm(e)} className="buscador-form">
        <input
          placeholder="Buscador"
          value={this.state.input}
          onChange={(e) => this.controlarInput(e)}
          className="buscador-input"
        />
        <button type="submit" className="buscador-boton">Buscar</button>
      </form>
    )
  }
}

export default withRouter(Formulario);
