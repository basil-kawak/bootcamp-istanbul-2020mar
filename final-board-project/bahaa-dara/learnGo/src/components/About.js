import React, { Component } from "react";
import { MDBCardText } from "mdbreact";

export default class About extends Component {
  render() {
    return (
      <React.Fragment>

        <div className="about">
          <h1 display="flex" flex="column">
            LearnGO
        </h1>
          <br />
          <h4 display="flex" flex="column">
            LearnGO is An idea and Ideas don't die.<br /><br />
          The idea behind this app is to help people who are going through what we already went through and try to make it easier for them
          </h4>
          <br />
          <MDBCardText display="flex" flex="column">
            Today, we're excited to give you a closer look at LearnGo, The App based on Learn.co the platform that powers Flatiron School's Re:Coded Bootcamp curriculim

        </MDBCardText>
        </div>
      </React.Fragment>
    );
  }
}
