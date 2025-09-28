
import React, { Component } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SingleCardMovie from "../../components/SingleCardMovie/SingleCardMovie";
import Loading from "../../components/Loading/Loading";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busqueda: props.match.params.busqueda, //busca la palabra que  viene de la url osea que busco el usurauoo 
      resultados: [], ///guardamos lo wue devuelve la api
      tipo: this.props.match.params.tipo, 
      loading: true, 

    };
  }

  componentDidMount() {
    console.log(this.state.busqueda);
    console.log(this.state.tipo);
    
    
    const tipo = this.state.tipo;
    let url = ""
    if (tipo === "movie") {
       url = `https://api.themoviedb.org/3/search/movie?query=${this.state.busqueda}&api_key=0e24f8864be45bfee7d05660d5fc8739`;
    } else if (tipo === "tv") {
         url = `https://api.themoviedb.org/3/search/tv?query=${this.state.busqueda}&api_key=0e24f8864be45bfee7d05660d5fc8739`;
    }
    

    fetch(url)
      .then((res) => res.json()) //como la api devuelve una promes con res.json lo transforomo en un obj
      .then((data) => {//cuando ya tengo los datos
       this.setState({ resultados: data.results, loading: false });

      })
      .catch((err) => console.log(err));


      
  }
  render() {
    console.log("props de resultados de busqueda es: ", this.props);
    
    const resultados = this.state.resultados; //lo guatdo en una constq lo llene antes
    let tipo= this.state.tipo

    // //separo los resultados en pleiulas y series res cada elemnt del array
    // const peliculas = resultados.filter(res => res.media_type === "movie");
    // const series = resultados.filter(res => res.media_type === "tv");

    return (
      <React.Fragment>
        <Header />
        <div className="resultado-container">
           {resultados.length === 0 ? (
             <Loading/>
           ) : (
          <div className="resultado-seccion">
               <h2 className="categoriaHome">{tipo === "movie" ? "PELÍCULAS" : "SERIES"}</h2>
               <section className="resultados"> 
               {resultados.map(item => (
                <SingleCardMovie key={item.id} data={item} pelicula={tipo === "movie"}  />
                 ))}
               </section>
             </div>
             )}
              </div>
        <Footer/>          
      </React.Fragment>
    );
  }
}

export default Results;


