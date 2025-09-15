
import React, { Component } from "react";
import { withRouter } from "react-router-dom"; 

class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }


  controlarForm(e) {
    e.preventDefault();
    this.props.history.push('/results/' + this.state.input);
  }

  controlarInput(e) {
    this.setState({ input: e.target.value });
  }

  render() {
    return (
      <form onSubmit={this.controlarForm} className="buscador-form">
        <input
          placeholder="Buscador"
          value={this.state.input}
          onChange={this.controlarInput}
          className="buscador-input"
        />
        <button type="submit" className="buscador-boton">Buscar</button>
      </form>
    );
  }
}

export default withRouter(Formulario);
