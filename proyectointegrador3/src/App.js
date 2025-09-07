import React from "react";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Route } from "react-router-dom/cjs/react-router-dom";
import Home from "./screens/Home/Home";
import PopularMoviesSection from "./screens/PopularMoviesSection/PopularMoviesSection";
import NowPlayingMoviesSection from "./screens/NowPlayingMoviesSection/NowPlayingMoviesSection";
import UpcomingMoviesSection from "./screens/UpcomingMoviesSection/UpcomingMoviesSection";
import PopularSeriesSection from "./screens/PopularSeriesSection/PopularSeriesSection";
import NotFound from "./components/NotFound/NotFound";

function App() {
  return (
    <Switch>
      <Route path="/" exact= {true} component={Home}/>
      <Route path="/favoritos" component={PopularSeriesSection} />
      <Route path="/popular" component={PopularMoviesSection} />
      <Route path="/nowplaying" component={NowPlayingMoviesSection} />
      <Route path="/upcoming" component={UpcomingMoviesSection} />
      
      <Route path="*" component={NotFound}/>  {/* asterisco abarca cualquier otra ruta que no sea estas */}
    </Switch>  
  );
}

export default App;
