import React from "react";
import Header from "../../components/Header/Header";
import NowPlayingMovies from "../../components/NowPlayingMovies/NowPlayingMovies";

function NowPlayingMoviesSection(){
    return(
        <React.Fragment>
            <Header/>
            <h2 class="alert alert-primary">Movies now playing</h2>
            <NowPlayingMovies filter={false}/>
        </React.Fragment>
    )
}

export default NowPlayingMoviesSection