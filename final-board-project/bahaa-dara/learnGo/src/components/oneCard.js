import React, { useState } from "react";
import database from "./firebaseConfig";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardHeader,
  MDBCardText,
  MDBIcon,
} from "mdbreact";

export default function OneCard(props) {

  const [resources, setresources] = useState('')
  const handleFineshed = async (e) => {
    console.log(props);

    let finishState = database.collection("Curriculim").doc(e.target.id);
    if (props.card.finished) {
      await finishState.update({ finished: false })
      await props.refetch();
    }
    else if (!props.card.finished) {
      await finishState.update({ finished: true, inPlan: false })
      await props.refetch();

    }
    props.refetch();
  };
  const addToPlan = async (e) => {
    await database
      .collection("Curriculim")
      .doc(e.target.id)
      .update({ inPlan: true });
    props.refetch();

  };

  const resourcesInputHandler = async (e) => {
    setresources(e.target.value)
  }
  const addResources = async (e) => {
    e.preventDefault()
    const abi = await e.target.id;
    const fetchDoc = await database.collection("Curriculim").doc(abi).get();
    const toData = await fetchDoc.data();
    const resourcesArr = toData.res;
    resourcesArr.push(resources)
    await database.collection("Curriculim").doc(abi).update({ res: resourcesArr })
    props.refetch();
  }

  return (
    <MDBCard className="oneCard" style={{ maxWidth: "35rem" }}>
      <MDBCardHeader>{props.card.sec}</MDBCardHeader>
      <p className="font-weight-bold">{props.card.name}</p>

      <MDBCardBody>
        <MDBCardText>Time needed:{props.card.time} minutes</MDBCardText>
        <MDBCardText>Number of Lessons:{props.card.lessons}</MDBCardText>
        {!props.card.finished && !props.card.inPlan ? (
          <MDBBtn onClick={addToPlan} id={props.card.id}>
            Plan It <MDBIcon icon="magic" className="ml-1" />
          </MDBBtn>
        ) : (
            ""
          )}

        <form onSubmit={addResources} id={props.card.id}>
          <MDBInput
            type="text"
            label="Resources"
            id={props.card.id}
            onChange={resourcesInputHandler}
          />{" "}
          <MDBBtn type="submit">
            Add
            </MDBBtn>
        </form>
        {props.card.res ? (
          <a href={props.card.res}>
            <MDBCardText className="res">{props.card.res.map(function (abi, index) { return "Source # " + index + " " })}</MDBCardText>
          </a>
        ) : (
            ""
          )}
        <MDBBtn onClick={handleFineshed} id={props.card.id}>
          {" "}
          {props.card.finished ? "Moved to not finished" : " Move to finished"}
        </MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
}
