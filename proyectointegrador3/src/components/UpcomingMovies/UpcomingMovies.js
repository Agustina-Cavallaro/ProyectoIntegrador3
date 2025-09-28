import React, { Component } from "react";
import SingleCardMovie from "../SingleCardMovie/SingleCardMovie";
import Loading from "../Loading/Loading";

class UpcomingMovies extends Component {
    constructor(props){
        super(props);
        this.state = {
            datos: [], //aca voy a guardar mis datos cuando haga el fetch
            filter: props.filter, //me dice si filtro los primeros 4 o no
            contador: 1, //primer pagina de la api 
            valorFormulario: "", // texto para filtrar por titulo 
        }
    }

    evitarSubmit(event){
        event.preventDefault();
    }

    controlarCambios(event){
        this.setState({
            valorFormulario: event.target.value ///cada vez que haya un cambio, en cada cambio trae lo q escirbio y lo guarda como el nuevo valor 
            }//actualiza valorFormulario con lo que se escribe en el input
        )}


    cargarMas(){
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmZlMjU5MjliNzExMDQ1ZDQwNGMyM2UxOTE4ZTJlZiIsIm5iZiI6MTc1NzE3MjgwMS4zNywic3ViIjoiNjhiYzU0NDE3OTY1MmEwNGU3NGU1OTY2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.mOmvs0Cidnu6ANiw9hZyOJugT7wHhqXjCoVFVVCwNNY'
            }
          };
          
        fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${this.state.contador}`, options)
        .then(res => res.json())
        .then((datos)=> {
            this.setState({
                datos: this.state.datos.concat(datos.results), //concatena los nuevos datos a los que ya tenemos 
                contador: this.state.contador + 1 //le agrega uno al contador para la proxima vez
            })
        })
        .catch((error) => console.log(error))
    }
    
    filtrarElementos (busqueda, datos) {  ///es el filter de cada seccion
                //filtra por coincidencia o parecido de title, devuelve solo los que se parecen
        return datos.filter(objetoElemento=> objetoElemento.title.toLowerCase().includes(busqueda.toLowerCase()))
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
          
          fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
            .then(res => res.json())
            .then( json => this.setState({
                datos: json.results,
                contador: this.state.contador + 1 //guardo mis resultados del fetch pasados a json, en lo que era [] abajo de super();
            })  )
            .catch(err => console.error(err));
    }



    render(){
        let tieneBusqueda = this.state.valorFormulario !== ""; ///devuelve booleano ///si el input esta vacio es false
        let filtroONo = (this.state.filter? this.state.datos.filter((_,i) => i<4) : this.state.datos) //si filter es verdadero, me devuelve una lista con los primero 4, sino todos los datos que ya tenia
        let filtrarFormularioONo = tieneBusqueda ? this.filtrarElementos(this.state.valorFormulario, filtroONo) : filtroONo 
        return(
            <React.Fragment>
                {/* filtrar */}
                { !this.state.filter ?    ///si filter es false aparece el buscador para  filtrar
                    <form onSubmit={(event)=> this.evitarSubmit(event)} className="ContainerFiltrador">
                         {/* cada vez que escribís llama a controlarCambios que actualiza el estado con event.target.value. */}
                        <input className="Filtrador" placeholder="Insertar Filtro" type="text" onChange= {(event)=> this.controlarCambios(event)} value={this.state.valorFormulario}/>
                    </form> 
                : null}

                {/* Seccion cartas de cada pelicula/serie */}
                <section className="row cards" id="movies">
                        {!tieneBusqueda ? 
                        ((this.state.datos.length === 0) ? <Loading/> : filtroONo.map((card) => <SingleCardMovie key={card.id} data={card} pelicula={true}/>))  :          
                                                ///si tiene busqueda muestro las pelicuals filtradas       
                        filtrarFormularioONo.map((card) => <SingleCardMovie key={card.id} data={card} pelicula={true}/>)}  {/* el problema era que no le habia puesto key*/}
                </section>
                {/* Cargar Mas */}
                { !this.state.filter ? <button onClick={() => this.cargarMas()}> Cargar Más </button> : null}
            </React.Fragment>
        )
    }
}


export default UpcomingMovies