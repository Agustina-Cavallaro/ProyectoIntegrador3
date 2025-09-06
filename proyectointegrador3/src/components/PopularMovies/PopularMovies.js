import React, { Component } from "react";
import SingleCardMovie from "../SingleCardMovie/SingleCardMovie";

class PopularMovies extends Component {
    constructor(props){
        super(props);
        this.state = {
            datos: [], //aca voy a guardar mis datos cuando haga el fetch
            filter: props.filter, //me dice si filtro los primeros 4 o no
        }
    }

    render(){
        let filtroONo = (this.state.filter? this.state.datos.filter((_,i) => i<4) : this.state.datos) //si filter es verdadero, me devuelve una lista con los primero 4, sino todos los datos que ya tenia
        return(
            <React.Fragment>
                <section className="row cards" id="movies">
                        {(this.state.datos.length === 0) ?  <h3>Cargando...</h3> : filtroONo.map((card) => <SingleCardMovie data={card} />)}
                </section>
            </React.Fragment>
        )
    }

    componentDidMount(){
        // el fetch te lo da la API asi para node
        const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
        const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmZlMjU5MjliNzExMDQ1ZDQwNGMyM2UxOTE4ZTJlZiIsIm5iZiI6MTc1NzE3MjgwMS4zNywic3ViIjoiNjhiYzU0NDE3OTY1MmEwNGU3NGU1OTY2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.mOmvs0Cidnu6ANiw9hZyOJugT7wHhqXjCoVFVVCwNNY'
        }
        };

        fetch(url, options)
        .then(res => res.json())
        .then(json => this.setState({
            datos: json.results //guardo mis resultados del fetch pasados a json, en lo que era [] abajo de super();
        }))
        .catch(err => console.error(err));
    }
}

export default PopularMovies