import React, { useState } from "react";
import { useSelector } from "react-redux";
// import AddIcon from "@material-ui/icons/Add";
import { Button, Grid, TextField } from "@material-ui/core";
import SnackBars from "../snackBars/SnackBars";

export default function AddBtn(props) {
  const [boardName, setBoardName] = useState("");
  const [open, setOpen] = useState(false);
  const db = useSelector((state) => state.value);

  // Adding a new board
  const addBoard = async (e) => {
    e.preventDefault();
    setOpen(true);
    await db.collection("boardstest").add({
      name: boardName,
    });
    setBoardName("");
  };

  return (
    <Grid item lg={2}>
      <form
        onSubmit={(e) => addBoard(e)}
        style={{
          marginBottom: "10px",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Board Name"
          variant="outlined"
          size="meduim"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
        />

        <Button type="submit">ADD BOARD</Button>
      </form>
      {props.children}
      {open && (
        <SnackBars
          key={1}
          open={open}
          closeAlret={() => setOpen(false)}
          type="board"
        />
      )}
    </Grid>
  );
}
