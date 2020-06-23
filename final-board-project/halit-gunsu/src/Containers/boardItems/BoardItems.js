import React, { useState } from "react";
import BoardItem from "../../Components/boardItem/BoardItem";
import { FormControlLabel, Switch, Grid } from "@material-ui/core";

export default function BoardItems(props) {
  const [showCompleted, setShowCompleted] = useState(false);

  const handleChange = () => {
    setShowCompleted(!showCompleted);
  };
  const render = () => {
    return props.boardItems.map((boardItem) => {
      return (
        <BoardItem
          showCompleted={showCompleted}
          data={boardItem.data()}
          boardId={props.id}
          itemId={boardItem.id}
          key={boardItem.id}
        />
      );
    });
  };

  return (
    <>
      <Grid item lg={6} style={{ paddingTop: "10px" }}>
        <FormControlLabel
          control={
            <Switch
              checked={showCompleted}
              onChange={handleChange}
              name="antoine"
            />
          }
          label="Show Completed!"
        />
      </Grid>
      {render()}
    </>
  );
}
