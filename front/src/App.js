import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import FilmsTable from "./filmsTable";
class App extends Component {
  render() {
    return (<BrowserRouter>
        <Route exact path="/" component={FilmsTable} />
    </BrowserRouter>);
  }
}

export default App;