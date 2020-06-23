import React, { useState, useEffect } from "react";
import Column from "./Column";
import database from "./firebaseConfig";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

export default function CurOverView(props) {
  const [cardArr, setCardArr] = useState([]);

  async function chapterFetch() {
    const res = await database.collection("Curriculim").get();
    const data = res.docs.map((el) => el.data());
    setCardArr(data);
  }


  useEffect(() => {
    chapterFetch();
  }, []);

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol sm="4">
          {" "}
          <Column title="Finished" cardData={cardArr} refetch={chapterFetch} />
        </MDBCol>
        <MDBCol sm="4">
          {" "}
          <Column
            title="Not Finished"
            cardData={cardArr}
            refetch={chapterFetch}
          />
        </MDBCol>
        <MDBCol sm="4">
          {" "}
          <Column title="In Plan" cardData={cardArr} refetch={chapterFetch} />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
