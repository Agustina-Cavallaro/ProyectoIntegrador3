import React from "react";
import PopularMovies from "../../components/PopularMovies/PopularMovies";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom/cjs/react-router-dom";

import NowPlayingMovies from "../../components/NowPlayingMovies/NowPlayingMovies";
import UpcomingMovies from "../../components/UpcomingMovies/UpcomingMovies";
import PopularSeries from "../../components/PopularSeries/PopularSeries";
import TopRatedSeries from "../../components/TopRatedSeries/TopRatedSeries";

function Home(){
    return(
        <React.Fragment>
            <Header/>
            <div className="container">
                <h2 className="categoriaHome">Películas Populares</h2>
                <PopularMovies filter={true} />
                <Link to="/popularMovies">Ver Todas</Link>

                <h2 class="categoriaHome">Series Populares</h2>
                <PopularSeries filter={true}/>
                <Link to="/popularSeries">Ver Todas</Link> 

                <h2 class="categoriaHome">Películas En Cartelera</h2>
                <NowPlayingMovies filter={true}/>
                <Link to="/nowplaying">Ver Todas</Link>

                <h2 class="categoriaHome">Mejores Series</h2>
                <TopRatedSeries filter={true}/>
                <Link to="/topSeries">Ver Todas</Link> 

                <h2 class="categoriaHome">Películas Próximamente</h2>
                <UpcomingMovies filter={true}/>
                <Link to="/upcoming">Ver Todas</Link>
            </div>
            <Footer/>
        
        </React.Fragment>
    )
}

export default Home