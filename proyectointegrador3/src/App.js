import React from "react";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Route } from "react-router-dom/cjs/react-router-dom";

import Home from "./screens/Home/Home";
import PopularMoviesSection from "./screens/PopularMoviesSection/PopularMoviesSection";
import NowPlayingMoviesSection from "./screens/NowPlayingMoviesSection/NowPlayingMoviesSection";
import UpcomingMoviesSection from "./screens/UpcomingMoviesSection/UpcomingMoviesSection";
import PopularSeriesSection from "./screens/PopularSeriesSection/PopularSeriesSection";
import TopRatedSeriesSection from "./screens/TopRatedSeriesSection/TopRatedSeriesSection";

import UnaPeli from "./components/UnaPeli/UnaPeli";
import UnaSerie from "./components/UnaSerie/UnaSerie";
import NotFound from "./components/NotFound/NotFound";
import Results from "./screens/Results/Results";
import Favoritos from "./screens/Favoritos/Favoritos";

function App() {
  return (
    <Switch>
      {/* esxactamene a esa ruta */}
      <Route path="/" exact= {true} component={Home}/> 
      <Route path="/favoritos" component={Favoritos} /> 
      <Route path="/popularMovies" component={PopularMoviesSection} />
      <Route path="/popularSeries" component={PopularSeriesSection}/> 
      <Route path="/nowplaying" component={NowPlayingMoviesSection} />
      <Route path="/upcoming" component={UpcomingMoviesSection} />
      <Route path="/topSeries" component={TopRatedSeriesSection}/>


      <Route path="/movie/id/:id" component={UnaPeli} />
      <Route path="/tv/id/:id" component={UnaSerie} />
      <Route path="/results/:tipo/:busqueda" component={Results} />
      
      {/* vacio xq la ruta no coincide con las ya definidad  */}
      <Route path="" component={NotFound}/>
    </Switch>  
  );
}

export default App;
