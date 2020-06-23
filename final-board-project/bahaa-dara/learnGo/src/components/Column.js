import React, { useState } from "react";
import OneCard from "./oneCard";
import { MDBBtn } from "mdbreact";
import OneCardList from "./oneCardList"

export default function Cards(props) {
  const [cardView, setcardView] = useState(true);
  const handleView = () => {
    if (cardView) { setcardView(false) }
    else { setcardView(true) }
  }

  function renderfinsihedCard() {
    console.log(props.cardData);
    const FinishedArr = []
    props.cardData.forEach(function (card) {
      if (props.title === "Finished" && card.finished) {
        if (cardView) {
          FinishedArr.push(<OneCard card={card} key={card.id} refetch={props.refetch} />)
        }
        else {
          FinishedArr.push(<OneCardList card={card} key={card.id} refetch={props.refetch} />)
        }
      }
      else if (props.title === "Not Finished" && !card.finished && !card.inPlan) {
        if (cardView) {
          FinishedArr.push(<OneCard card={card} key={card.id} refetch={props.refetch} />)
        }
        else {
          FinishedArr.push(<OneCardList card={card} key={card.id} refetch={props.refetch} />)
        }
      }
      else if (props.title === "In Plan" && card.inPlan) {
        if (cardView) {
          FinishedArr.push(<OneCard card={card} key={card.id} refetch={props.refetch} />)
        }
        else {
          FinishedArr.push(<OneCardList card={card} key={card.id} refetch={props.refetch} />)
        }
      }
    })

    return FinishedArr;
  }
  return (
    <div className="column">
      <div className="viewList">
        <MDBBtn  onClick={handleView}>change view</MDBBtn>
        </div>
        <h2>{props.title}</h2>
      
      <div>
        {renderfinsihedCard()}</div>
    </div>
  );
}
