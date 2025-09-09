import React from "react";
import PopularMovies from "../../components/PopularMovies/PopularMovies";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom/cjs/react-router-dom";

import NowPlayingMovies from "../../components/NowPlayingMovies/NowPlayingMovies";
import UpcomingMovies from "../../components/UpcomingMovies/UpcomingMovies";
import PopularSeries from "../../components/PopularSeries/PopularSeries";
import TopRatedSeries from "../../components/TopRatedSeries/TopRatedSeries";
import Formulario from "../../components/Formulario /Formulario";
// import SearchForm from "../../components/SearchForm/SearchForm";

function Home(){
    return(
        <React.Fragment>
            <Header/>
            {/* <SearchForm/> */}
            <Formulario/>
            <div className="container">
                <h1>UdeSA Movies</h1>
                 
                <h2 className="alert alert-primary">Popular movies this week</h2>
                <PopularMovies filter={true} />
                <Link to="/popularMovies">Ver Todas</Link>

                <h2 class="alert alert-warning">Popular series this week</h2>
                <PopularSeries filter={true}/>
                <Link to="/popularSeries">Ver Todas</Link> 

                <h2 class="alert alert-primary">Movies now playing</h2>
                <NowPlayingMovies filter={true}/>
                <Link to="/nowplaying">Ver Todas</Link>

                <h2 class="alert alert-primary">Top Rated series</h2>
                <TopRatedSeries filter={true}/>
                <Link to="/topSeries">Ver Todas</Link> 

                <h2 class="alert alert-warning">Upcoming Movies</h2>
                <UpcomingMovies filter={true}/>
                <Link to="/upcoming">Ver Todas</Link>
            </div>
            <Footer/>
        
        </React.Fragment>
    )
}

export default Home