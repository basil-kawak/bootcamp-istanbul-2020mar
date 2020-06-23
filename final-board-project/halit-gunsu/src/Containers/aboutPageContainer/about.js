import React from "react";
import "./index.css";
import Stepper from "./stepper/Stepper";
import { Grid } from "@material-ui/core";
export default function About() {
  //document.getElementById()
  const picStyle = { width: "220px", paddingLeft: "44px" };
  return (
    <Grid className="wrapper" item container lg={11}>
      <Grid item lg={12} className="tutorialHeader">
        <header className="header">Welcome to the tutorial!</header>
        <Stepper />
      </Grid>

      <Grid item lg={12}>
        <br />
        <br />
        <br />
        <img
          style={picStyle}
          alt="tutorial"
          src="https://cdn.pixabay.com/photo/2019/11/07/20/24/check-list-4609829_1280.png"
        />
      </Grid>
    </Grid>
  );
}
