import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AddBtn from "../../Components/addBtn/AddBtn";
import SingleBoard from "../../Components/singleBoard/SingleBoard";
import SingleList from "../../Components/singleList/SingleList";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { Grid } from "@material-ui/core";
import SnackBars from "../../Components/snackBars/SnackBars";

export default function BoardContainer(props) {
  const db = useSelector((state) => state.value);
  const [isOnListView, shouldSetViewToList] = useState(false);
  const [boards, setBoards] = useState([]);
  const [switchState, setState] = React.useState(false);
  const [open, setOpen] = useState(false);

  // Live updates the boards
  const liveUpdate = async () => {
    await db.collection("boardstest").onSnapshot((ss) => {
      const changes = ss.docChanges();
      changes.forEach((change) => {
        if (change.type === "added") {
          setBoards((boards) => [...boards, change.doc]);
        } else if (change.type === "removed") {
          setBoards((boards) => {
            const newBoards = boards.filter(
              (board) => board.id !== change.doc.id
            );

            return [...newBoards];
          });
        } else if (change.type === "modified") {
          setBoards((boards) => {
            const changedId = change.doc.id;
            const indexToReplace = boards.findIndex(
              (board) => board.id === changedId
            );

            const updatedBoards = boards.slice();
            updatedBoards[indexToReplace] = change.doc;

            boards[indexToReplace] = change.doc;
            return updatedBoards;
          });
        }
      });
    });
  };

  const deleteBoard = async (id) => {
    await db
      .collection("boardstest")
      .doc(id)
      .delete()
      .then(() => console.log("delete board with the id:" + id));
    setOpen(true);
    setBoards(() => boards.filter((board) => board.id !== id));
  };
  // Hello World
  const renderDemBoards = (isOnListView) => {
    return boards.map((board) => {
      console.log(board);
      return isOnListView ? (
        <SingleList
          data={board.data()}
          boardId={board.id}
          key={board.id}
          deleteBoard={deleteBoard}
        ></SingleList>
      ) : (
        <SingleBoard
          data={board.data()}
          boardId={board.id}
          key={board.id}
          deleteBoard={deleteBoard}
        ></SingleBoard>
      );
    });
  };

  useEffect(() => {
    liveUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid
      item
      container
      lg={10}
      md={6}
      xs={3}
      spacing={1}
      style={{ marginTop: "50px", marginLeft: "250px", marginRight: "40px" }}
    >
      <Grid
        item
        container
        lg={10}
        md={9}
        xs={6}
        spacing={1}
        alignContent="center"
        style={{ marginRight: "0px" }}
      >
        {renderDemBoards(isOnListView)}
      </Grid>

      <AddBtn>
        <FormControlLabel
          control={
            <Switch
              checked={switchState}
              onChange={() => {
                shouldSetViewToList(!isOnListView);
                renderDemBoards(isOnListView);
                setState(!switchState);
              }}
              name="checkedA"
            />
          }
          label="Switch Look"
        />
      </AddBtn>
      <SnackBars
        key={2}
        open={open}
        closeAlret={() => setOpen(false)}
        type="deleteBoard"
      />
    </Grid>
  );
}
