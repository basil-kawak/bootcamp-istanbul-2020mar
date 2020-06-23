import React from "react";
import "./App.css";
import Nav from "./components/nav";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App(props) {
  

  return (
    <div className="App">
      <Router>
        <Route path="/" component={Nav} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route exact path="/" component={Home} />
      </Router>
    </div>
  );
}

export default App;
