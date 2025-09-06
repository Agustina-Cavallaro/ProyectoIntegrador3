import React from "react";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Route } from "react-router-dom/cjs/react-router-dom";
import Home from "./screens/Home/Home";

function App() {
  return (
    <Switch>
      <Route path="/" exact= {true} component={Home}/>
    </Switch>
  );
}

export default App;
