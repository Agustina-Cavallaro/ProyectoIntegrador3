import React, { Component } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SingleCardMovie from "../../components/SingleCardMovie/SingleCardMovie";
import Loading from "../../components/Loading/Loading";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busqueda: props.match.params.busqueda,
      resultados: [],
      loading: true,
    };
  }

  componentDidMount() {

    fetch(
      `https://api.themoviedb.org/3/search/multi?query=${this.state.busqueda}&api_key=0e24f8864be45bfee7d05660d5fc8739`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ resultados: data.results }, () =>
          console.log("los resultados son:", this.state.resultados)
        );
      })
      .catch((err) => console.log(err));

      
  }

  render() {
    console.log("props de resultados de busqueda es: ", this.props);
    console.log(this.state.resultados);
    const resultados = this.state.resultados;
    const busqueda = this.state.busqueda;

    const peliculas = resultados.filter(res => res.media_type === "movie");
    const series = resultados.filter(res => res.media_type === "tv");

    return (
      <React.Fragment>
        <Header />

        {/* resultados peliculas */}
        {peliculas.length > 0 ? (
        <div className="resultados-container">
          <h1 className="resultados-titulo">
            Resultados de peliculas: {busqueda}
          </h1>
          <section className="resultados-lista">
            {peliculas.map((dato) => <SingleCardMovie data={dato} pelicula={true} key={dato.id}/>)}
          </section>
        </div>
        ) : 
        <p>No hay resultados para esa busqueda</p> }

        {/* resultados series */}
        {series.length > 0 ? (
          <div className="resultados-container">
            <h1 className="resultados-titulo">
              Resultados de series: {busqueda}
            </h1>
            <section className="resultados-lista">
              {series.map((dato) => <SingleCardMovie data={dato} pelicula={false} key={dato.id}/>)}
            </section>
          </div>
        ) : 
        <p>No hay resultados para esa busqueda</p> }
        <Footer/>          
      </React.Fragment>
    );
  }
}

export default Results;

