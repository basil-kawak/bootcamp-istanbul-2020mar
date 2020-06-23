import React from "react";
import { MDBListGroupItem } from "mdbreact";

export default function oneCardList(props) {
 
  return (
    <MDBListGroupItem style={{ maxWidth: "35rem" }}>
      <p className="font-weight-bold">{props.card.name}</p>
        <p>Time needed:{props.card.time} minutes</p>
        <p>Number of Lessons:{props.card.lessons}</p>
    </MDBListGroupItem  >
  );
}
