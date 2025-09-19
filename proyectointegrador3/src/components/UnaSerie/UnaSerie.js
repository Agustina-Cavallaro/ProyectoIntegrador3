
// import React, { Component } from "react";
// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";

// class UnaSerie extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: null,
//       // esFavorito: this.estaEnFavoritos()
//     };
//   }

//   componentDidMount() {
//     const { id } = this.props.match.params; // agarro el id de la URL

//     fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=0e24f8864be45bfee7d05660d5fc8739&language=es-ES`)
//       .then((res) => res.json())
//       .then((data) => this.setState({ data, loading: false }))
//       .catch((error) => this.setState({ error, loading: false }));
//   }

//   estaEnFavoritos() {
//     const key = this.props.pelicula ? "peliculasFavoritas" : "seriesFavoritas";
//     let guardados = localStorage.getItem(key);
//     if (guardados) {
//       let favoritos = JSON.parse(guardados);
//       for (let i = 0; i < favoritos.length; i++) {
//         if (favoritos[i].id === this.props.data.id) {
//           return true;
//         }
//       }
//     }
//     return false;
//   }
  
//   manejarFavorito () {
//     const key = this.props.pelicula ? "peliculasFavoritas" : "seriesFavoritas";
//     let guardados = localStorage.getItem(key);
//     let favoritos = guardados ? JSON.parse(guardados) : [];
  
//     let esta = false;
//     let nuevosFavoritos = [];
  
//     for (let i = 0; i < favoritos.length; i++) {
//       if (favoritos[i].id === this.state.data.id) {
//         esta = true;
//       } else {
//         nuevosFavoritos.push(favoritos[i]);
//       }
//     }
  
//     if (!esta) {
//       nuevosFavoritos.push(this.state.data);
//     }
  
//     localStorage.setItem(key, JSON.stringify(nuevosFavoritos));
  

//     this.setState({ esFavorito: !this.state.esFavorito }, () => {
//       if (this.props.actualizarLista) {
//         this.props.actualizarLista();
//       }
//     });
//   };
  



//   render() {
//     const { data } = this.state;
//     if (!data) return null;

//     // Armar géneros
//     let generos = [];
//     if (data.genres) {
//       for (let i = 0; i < data.genres.length; i++) {
//         generos.push(data.genres[i].name);
//       }
//     }

//     return (
//       <React.Fragment>
//         <Header/>
//       <article className="character-card detail">
//         <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.name}/>
//         <h2>{data.name}</h2>
//         <p><strong>Calificación:</strong> {data.vote_average} </p>
//         <p> <strong>Fecha de estreno:</strong> {data.first_air_date}</p>
//         <p><strong>Géneros:</strong> 
//           {generos.map((gene, i) => (
//             <p key={i}> {gene} </p>
//           ))}
//         </p>
//           <p><strong>Sinopsis:</strong> {data.overview}</p>  
//           <button onClick={()=>this.manejarFavorito()} className="botonesVer"> {this.state.esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"} </button>
                
//       </article>
//       <Footer/>
//       </React.Fragment>
//     );
//   }
// }

// export default UnaSerie;


import React, { Component } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

class UnaSerie extends Component {
  constructor(props){
    super(props);
    this.state = { 
      data: null, 
      esFavorito: false
    };
  }

  componentDidMount(){
    // const { id } = this.props.match.params;
    const id = this.props.match.params.id
    
    fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=0e24f8864be45bfee7d05660d5fc8739&language=es-ES`)
      .then(res => res.json())
      .then(data => {
        this.setState({ 
          data,
          esFavorito: this.estaEnFavoritos(data)
        });
      })
      .catch(error => this.setState({ error }));
  }

  // Verifica favoritos con for en lugar de some
  estaEnFavoritos(data) {
    const key = "seriesFavoritas";
    const guardados = localStorage.getItem(key);
    if (guardados) {
      const favoritos = JSON.parse(guardados);
      for (let i = 0; i < favoritos.length; i++) {
        if (favoritos[i].id === data.id) {
          return true;
        }
      }
    }
    return false;
  }

  manejarFavorito() {
    const key = "seriesFavoritas";
    const guardados = localStorage.getItem(key);
    const favoritos = guardados ? JSON.parse(guardados) : [];

    let nuevosFavoritos = [];
    let esta = false;

    for (let i = 0; i < favoritos.length; i++) {
      if (favoritos[i].id === this.state.data.id) {
        esta = true;
      } else {
        nuevosFavoritos.push(favoritos[i]);
      }
    }

    if (!esta) {
      nuevosFavoritos.push(this.state.data);
    }

    localStorage.setItem(key, JSON.stringify(nuevosFavoritos));
    this.setState({ esFavorito: !esta });
  }

  render(){
    const { data } = this.state;
    if (!data) return null;

    let generos = [];
    if (data.genres) {
      for (let i = 0; i < data.genres.length; i++) {
        generos.push(data.genres[i].name);
      }
    }

    return (
      <React.Fragment>
        <Header/>
        <article className="character-card detail">
          <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.name}/>
          <h2>{data.name}</h2>
          <p><strong>Calificación:</strong> {data.vote_average}</p>
          <p><strong>Fecha de estreno:</strong> {data.first_air_date}</p>
          <p><strong>Géneros:</strong> {generos.join(', ')}</p>
          <p><strong>Sinopsis:</strong> {data.overview}</p>
          <button onClick={()=>this.manejarFavorito()} className="botonesVer">
            {this.state.esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
          </button>
        </article>
        <Footer/>
      </React.Fragment>
    );
  }
}

export default UnaSerie;