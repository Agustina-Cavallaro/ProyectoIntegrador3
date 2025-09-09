import React from "react";
import Header from "../../components/Header/Header";
import NowPlayingMovies from "../../components/NowPlayingMovies/NowPlayingMovies";
import Footer from "../../components/Footer/Footer";

function NowPlayingMoviesSection(){
    return(
        <React.Fragment>
            <Header/>
            <h2 class="alert alert-primary">Movies now playing</h2>
            <NowPlayingMovies filter={false}/>
            <Footer/> 
        </React.Fragment>
    )
}

export default NowPlayingMoviesSection