import { Card, ButtonGroup, ToggleButton } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import fire from "./../containers/db";
import uid from "uid";
import CompletedItem from "./completedItem";

const Board = () => {
  const [Board, setBoard] = useState([]);

  // fetching the Data reuseable function
  const fetchData = async () => {
    const res = await fire.collection("posts").orderBy("title", "desc").get(); //[]
    const posts = await res.docs.map((post) => post.data());
    setBoard(posts);
  };

  const deleteBoard = async (id) => {
    try {
      const deleteFromBase = await fire.collection("posts").doc(id).delete();
      const board = await Board.filter((el) => el.id !== id);
      setBoard(board);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="con">
      <div className="boardcon">
        {Board.map((board) => (
          <Card key={uid()} style={{ width: "25rem" }} className="cards">
            <ButtonGroup toggle className="mb-2">
              <ToggleButton
                variant="secondary"
                type="checkbox"
                defaultChecked
                onClick={(e) => deleteBoard(board.id)}
              >
                Delete Board
              </ToggleButton>
            </ButtonGroup>
            <Card.Body>
              <Card.Title>{board.title}</Card.Title>
              <Card.Title>{board.id}</Card.Title>
              <CompletedItem board={board} />
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default Board;
