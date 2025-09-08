import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import UpcomingMovies from "../../components/UpcomingMovies/UpcomingMovies";

function UpcpmingMoviesSection(){
    return(
        <React.Fragment>
            <Header/>
            <h2 class="alert alert-warning">Upcoming Movies</h2>
            <UpcomingMovies filter={false}/>
            <Footer/> 
        </React.Fragment>
    )
}

export default UpcpmingMoviesSection