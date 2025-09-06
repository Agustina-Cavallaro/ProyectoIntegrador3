import React from "react";
import PopularMovies from "../../components/PopularMovies/PopularMovies";


function Home(){
    return(
        <React.Fragment>
            <div className="container">
                <h1>UdeSA Movies</h1>
                {/* header/navbar */}
                <h2 className="alert alert-primary">Popular movies this week</h2>
                <PopularMovies filter={true} />
                <h2 class="alert alert-primary">Movies now playing</h2>

                <h2 class="alert alert-warning">Upcoming Movies</h2>
            </div>
            <footer>
             <p>Maria Agustina Cavallaro y Ana Paula Oldani </p>
        </footer>
        </React.Fragment>
    )
}

export default Home