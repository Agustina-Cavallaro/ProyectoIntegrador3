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
    const pelis = this.state.resultados;
    console.log("props de resultados de busqueda es: ", this.props);

    return (
      <React.Fragment>
        <Header />

        {pelis.length === 0 ? (
          <Loading/>
        ) : (
          <div className="resultados-container">
            <h1 className="resultados-titulo">
              Resultados de: {this.state.busqueda}
            </h1>
            <section className="resultados-lista">
              {pelis.map((elm, idx) => (
                <SingleCardMovie
                  data={elm}
                  key={idx + elm.original_title}
                />
              ))}
            </section>

            <br />
            <Footer />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Results;

