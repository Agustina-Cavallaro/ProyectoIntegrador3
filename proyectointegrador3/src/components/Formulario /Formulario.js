
import React, { Component } from "react";
import { withRouter } from "react-router-dom"; 

class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "" ,  ///input lo voy a usar para guardar ko que el usaurio escibre
      tipo: "" //el radio elegido que es tv o movie 
    } //estado incial el input vacio 
  }

   controlarForm(e) {
    if (this.state.tipo === "") { //si el tipo esta vacio q no lo pueda mandar
      e.preventDefault(); 
    }
    this.props.history.push(`/results/${this.state.tipo}/${this.state.input}`); ///push parta redireccionar al usuario 
    ///history guarda el hisotrial de nav y push te direcciona a la ruta 
  }

  controlarInput (e){ //cuando el usuario escibe
    this.setState({ input: e.target.value }); ///gaurda la info quemando el usaurio por el busacodr, osea lo que busco
  }

    controlarTipo(e) {
    this.setState({ tipo: e.target.value }); ///me guarda si el usuario toco serie o peli
  }

  render() {
    return (
      // on submit anda cuando la persona toca buscar ; llama al evento cf
      <form onSubmit={(e) =>this.controlarForm(e)} className="buscador-form">
        <input
          placeholder="Buscador"
          value={this.state.input} ////lo q escibre se guarda en state y esta asi xq depende del usario 
          onChange={(e) => this.controlarInput(e)} ////cuando la persona escirbe algo llama a ci q actualiza lo q hay en e.target.value
          className="buscador-input"
        />

          <div className="buscador-opciones">
            <div className="ff">
          <input type="radio"
          value="tv" //aca estan fijos
          name="tipo"  
          onChange={(e) => this.controlarTipo(e)} //onchange xq cada vez q escribe algo ejecuta controlartipo
        />
        
        <label className ="label">Series</label><br />
          </div>

          <div className="ff">
        <input type="radio"
          value="movie" //valor fijo 
          name="tipo"  
          onChange={(e) => this.controlarTipo(e)}
        />
        </div>
        <label className ="label">Películas</label><br />
        </div>

        <button type="submit" className="buscador-boton">Buscar</button>
      </form>
    )
  }
}

export default withRouter(Formulario);  //para lo de history 
