import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import Pizza from "./components/Pizza";

const App = () => {
  return (
    <div className="App">
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/pizza" component={Pizza} />
    </div>
  );
};
export default App;
