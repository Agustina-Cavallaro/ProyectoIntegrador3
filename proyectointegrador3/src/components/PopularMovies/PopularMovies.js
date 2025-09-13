import React, { Component } from "react";
import SingleCardMovie from "../SingleCardMovie/SingleCardMovie";
import Loading from "../Loading/Loading";

class PopularMovies extends Component {
    constructor(props){
        super(props);
        this.state = {
            datos: [], //aca voy a guardar mis datos cuando haga el fetch
            filter: props.filter, //me dice si filtro los primeros 4 o no
            contador:1,
            valorFormulario: "",
        }
    }
    evitarSubmit(event){
        event.preventDefault();
    }

    controlarCambios(event){
        this.setState({
            valorFormulario: event.target.value
            }
        )}

    filtrarElementos (busqueda, datos) { 
        return datos.filter(objetoElemento=> objetoElemento.title.toLowerCase().includes(busqueda.toLowerCase()))
    }

    cargarMas () {
        this.setState(prev => ({contador: prev.contador +1}))
    }

    componentDidMount(){
        // el fetch te lo da la API asi para js
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmZlMjU5MjliNzExMDQ1ZDQwNGMyM2UxOTE4ZTJlZiIsIm5iZiI6MTc1NzE3MjgwMS4zNywic3ViIjoiNjhiYzU0NDE3OTY1MmEwNGU3NGU1OTY2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.mOmvs0Cidnu6ANiw9hZyOJugT7wHhqXjCoVFVVCwNNY'
            }
          };
          
          fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
            .then(res => res.json())
            .then(json => this.setState({
                datos: json.results //guardo mis resultados del fetch pasados a json, en lo que era [] abajo de super();
            }))
            .catch(err => console.error(err));
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.contador !== this.state.contador){ 
            const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmZlMjU5MjliNzExMDQ1ZDQwNGMyM2UxOTE4ZTJlZiIsIm5iZiI6MTc1NzE3MjgwMS4zNywic3ViIjoiNjhiYzU0NDE3OTY1MmEwNGU3NGU1OTY2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.mOmvs0Cidnu6ANiw9hZyOJugT7wHhqXjCoVFVVCwNNY'
                }
              };
              
            fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${this.state.contador}`, options)
            .then(res => res.json())
            .then((json)=> this.setState((prev)=> ({
                datos: prev.datos.concat(json.results)
            })     ) )
            .catch((error) => console.log(error))
    }
    }

    render(){
        let tieneBusqueda = this.state.valorFormulario !== ""; ///devuelve booleano
        let filtroONo = (this.state.filter? this.state.datos.filter((_,i) => i<4) : this.state.datos) //si filter es verdadero, me devuelve una lista con los primero 4, sino todos los datos que ya tenia
        let filtrarFormularioONo = tieneBusqueda ? this.filtrarElementos(this.state.valorFormulario, filtroONo) : filtroONo 
        return(
            <React.Fragment>
                {/* filtrar */}
                { !this.state.filter ?   
                    <form onSubmit={(event)=> this.evitarSubmit(event)}>
                        <input type="text" onChange= {(event)=> this.controlarCambios(event)} value={this.state.valorFormulario}/>
                    </form> 
                : null}

                {/* Cargar Mas */}
                { !this.state.filter ? <button onClick={() => this.cargarMas()}> Cargar Más </button> : null}

                {/* Seccion cartas de cada pelicula/serie */}
                <section className="row cards" id="movies">
                        {!tieneBusqueda ? 
                        ((this.state.datos.length === 0) ? <Loading/> : filtroONo.map((card) => <SingleCardMovie key={card.id} data={card} pelicula={true}/>))  :          
                        filtrarFormularioONo.map((card) => <SingleCardMovie key={card.id} data={card} pelicula={true}/>)}  {/* el problema era que no le habia puesto key*/}
                </section>          
            </React.Fragment>
        )
    }
}

export default PopularMovies