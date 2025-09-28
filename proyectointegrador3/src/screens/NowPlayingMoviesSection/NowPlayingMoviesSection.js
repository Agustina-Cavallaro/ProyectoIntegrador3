import React from "react";
import Header from "../../components/Header/Header";
import NowPlayingMovies from "../../components/NowPlayingMovies/NowPlayingMovies";
import Footer from "../../components/Footer/Footer";

function NowPlayingMoviesSection(){
    return(
        <React.Fragment>
            <Header/>
            <h2 class="categoriaHome">Peliculas En Cartelera</h2>
            {/* filter es false en cada categoria para que muestre todos */}
            <NowPlayingMovies filter={false}/>
            <Footer/> 
        </React.Fragment>
    )
}

export default NowPlayingMoviesSection