import React from "react";
import BoardContainer from "./Containers/boardContainer/BoardContainer";
import AboutContainer from "./Containers/aboutPageContainer/about";
import SideNavBar from "./Components/navBar/SideNavbar";
import { Grid } from "@material-ui/core";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ContactContainer from "./Containers/contactUsContainer/contact";

export default function App() {
  return (
    <Router>
      <div className="App">
        {/* <AppBar></AppBar> */}
        <Grid container spacing={0}>
          <SideNavBar />
          <Route exact path="/" component={BoardContainer} />
          <Route exact path="/about" component={AboutContainer} />
          <Route exact path="/contactus" component={ContactContainer} />
        </Grid>
      </div>
    </Router>
  );
}
