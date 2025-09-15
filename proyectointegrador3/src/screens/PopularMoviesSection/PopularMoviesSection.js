import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PopularMovies from "../../components/PopularMovies/PopularMovies";

function PopularMoviesSection(){
    return(
        <React.Fragment>
            <Header/>
            <h2 className="categoriaHome">Películas Populares</h2>
            <PopularMovies filter={false}/>
            <Footer/> 
        </React.Fragment>
    )
}

export default PopularMoviesSection