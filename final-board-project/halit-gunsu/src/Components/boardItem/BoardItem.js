import React, { useState } from "react";
import { Button, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import styled from "styled-components";
import EditDialog from "../dialog/EditDialog";
import "./index.css";

const Container = styled.div`
  border: 1px solid grey;
  padding: 8px;
  margin: 8px;
  border-radius: 5px;
  color: white;
  background-color: #410096;
`;
export default function BoardItem(props) {
  const db = useSelector((state) => state.value);
  const [data, setData] = useState(props.data);

  const deleteItem = () => {
    db.collection("boardstest")
      .doc(props.boardId)
      .collection("boardItems")
      .doc(`${props.itemId}`)
      .delete();
  };

  const editItem = (e) => {
    e.preventDefault();
    e.persist();
    const newData = {
      name: e.target[0].value,
      dueDate: e.target[2].value,
      assignedTo: e.target[4].value.split(" "),
    };
    db.collection("boardstest")
      .doc(props.boardId)
      .collection("boardItems")
      .doc(`${props.itemId}`)
      .update(newData);

    setData({ ...data, ...newData });
  };

  const completed = () => {
    db.collection("boardstest")
      .doc(props.boardId)
      .collection("boardItems")
      .doc(`${props.itemId}`)
      .update({
        completed: true,
      });

    setData({ ...data, completed: true });
  };

  return (
    <>
      {(props.showCompleted ? data.completed : !data.completed) && (
        <Grid item lg={12}>
          <Container
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
            }}
          >
            {!data.completed && (
              <Button
                onClick={(e) => {
                  e.persist();
                  setTimeout(() => {
                    e.target.parentNode.parentNode.parentNode.classList.add(
                      "fadeOut"
                    );
                  }, 500);
                  setTimeout(() => completed(), 1400);
                }}
              >
                <CheckCircleOutlineOutlinedIcon style={{ color: "white" }} />
              </Button>
            )}
            <h3>{data.name}</h3>
            {data.dueDate !== "" && (
              <h4 style={{ padding: "auto" }}> Due date: {data.dueDate}</h4>
            )}
            <EditDialog
              editItem={editItem}
              deleteItem={deleteItem}
              data={data}
            ></EditDialog>
          </Container>
        </Grid>
      )}
    </>
  );
}
