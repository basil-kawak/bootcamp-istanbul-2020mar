import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { List, Grid } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
    minHeight: 30,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
export default function SingleBoard(props) {
  const classes = useStyles();
  const [boardName] = useState(props.data.name);
  const db = useSelector((state) => state.value);
  const [id] = useState(props.boardId);
  const [boardItems, setBoardItems] = useState([]);
  const [open, setOpen] = useState(false);
  // Adds new item to our board

  const liveUpdate = async () => {
    await db
      .collection("boardstest")
      .doc(id)
      .collection("boardItems")
      .onSnapshot((ss) => {
        const changes = ss.docChanges();
        changes.forEach((change) => {
          if (change.type === "added") {
            setBoardItems((boardItems) => [...boardItems, change.doc]);
          } else if (change.type === "removed") {
            setBoardItems((boardItems) => {
              const newItems = boardItems.filter(
                (boardItem) => boardItem.id !== change.doc.id
              );
              return [...newItems];
            });
          }
        });
      });
  };

  useEffect(() => {
    liveUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid style={{ maringBottom: "5px" }} item lg={12}>
      <List divider className="single-board" data-id={id}>
        <ListItem button onClick={() => setOpen(!open)}>
          <ListItemText className="list-header">
            <h2>{boardName}</h2>
          </ListItemText>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {boardItems.map((item) => {
              return (
                <ListItem divider button className={classes.nested}>
                  <ListItemText>
                    {item.data().name}{" "}
                    {item.data().completed && (
                      <span style={{ color: "green" }}>Completed !</span>
                    )}
                  </ListItemText>
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      </List>
    </Grid>
  );
}
