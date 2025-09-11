import React, { Component } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SingleCardMovie from "../../components/SingleCardMovie/SingleCardMovie";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busqueda: props.match.params.busqueda,
      resultados: [],
    };
  }

  componentDidMount() {
    // fetch(
    //   `https://api.themoviedb.org/3/search/movie?query=${this.state.busqueda}&api_key=9ed45d655a81dcc3d8732fddd5bc0588`
    // )
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
          <h2>Cargando...</h2>
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

    
//     render(){

//         const { resultados, cargando } = this.state;

//     if (cargando) return <h3>Cargando...</h3>;

//     if (resultados.length === 0) return <h3>No se encontraron personajes</h3>;

//    return (
//   <React.Fragment> 
//     <Header/>  
//     <div>
//       {resultados.map(peli => (
//         <SingleCardMovie key={peli.id} data={peli} />
//       ))}
//     </div>
//     <Footer/> 
//   </React.Fragment>
// );
//     }
// }

// export default Results