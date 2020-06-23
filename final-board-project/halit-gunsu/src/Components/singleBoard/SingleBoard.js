import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import BoardItems from "../../Containers/boardItems/BoardItems";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import InputLabel from "@material-ui/core/InputLabel";
import { Card, Grid, TextField } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

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
  const [boardName, setBoardName] = useState(props.data.name);
  const db = useSelector((state) => state.value);
  const [id] = useState(props.boardId);
  const [boardItems, setBoardItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [isOnEditMode, setEditMode] = useState(false);
  const [sortBy, setSortBy] = useState("");

  const itemsRef = db.collection("boardstest").doc(id).collection("boardItems");

  // Adds new item to our board
  const addItem = async (e) => {
    e.preventDefault();
    const newItem = {
      name: itemName,
      dueDate: "",
      assignedTo: [],
      completed: false,
    };
    setItemName("");
    await itemsRef.add(newItem);
  };

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
          } else if (change.type === "modified") {
            setBoardItems((boardItems) => {
              const changedId = change.doc.id;
              const indexToReplace = boardItems.findIndex(
                (boardItem) => boardItem.id === changedId
              );

              const updatedBoardItems = boardItems.slice();
              updatedBoardItems[indexToReplace] = change.doc;

              boardItems[indexToReplace] = change.doc;
              return updatedBoardItems;
            });
          }
        });
      });
  };

  const handleChange = (e) => {
    setSortBy(e.target.value);
    sortDemItems(e.target.value);
  };

  // This function will sort the items withing the board
  const sortDemItems = (sortBy) => {
    switch (sortBy) {
      case "DDD":
        setBoardItems(() => {
          const sortedArr = boardItems.sort((a, b) => {
            return (
              parseInt(b.data().dueDate.split("-").join(""), 10) -
              parseInt(a.data().dueDate.split("-").join(""), 10)
            );
          });
          return [...sortedArr];
        });
        break;
      case "DDA":
        setBoardItems(() => {
          const sortedArr = boardItems.sort((a, b) => {
            return (
              parseInt(a.data().dueDate.split("-").join(""), 10) -
              parseInt(b.data().dueDate.split("-").join(""), 10)
            );
          });
          return [...sortedArr];
        });
        break;
      case "TD":
        setBoardItems((boardItems) => {
          const sortedArr = boardItems.sort((a, b) => {
            if (a.data().name.toLowerCase() > b.data().name.toLowerCase()) {
              return -1;
            }
            if (b.data().name.toLowerCase() > a.data().name.toLowerCase()) {
              return 1;
            }
            return 0;
          });
          return [...sortedArr];
        });
        break;

      case "TA":
        setBoardItems((boardItems) => {
          const sortedArr = boardItems.sort((a, b) => {
            if (a.data().name.toLowerCase() > b.data().name.toLowerCase()) {
              return 1;
            }
            if (b.data().name.toLowerCase() > a.data().name.toLowerCase()) {
              return -1;
            }
            return 0;
          });
          return [...sortedArr];
        });
        break;
      default:
    }
  };

  useEffect(() => {
    liveUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeBoardName = async (e) => {
    e.preventDefault();
    e.persist();
    await db.collection("boardstest").doc(id).update({
      name: e.target[0].value,
    });
    setBoardName(e.target[0].value);
    setEditMode(false);
  };

  return (
    <Grid container item lg={6} md={9}>
      <Card
        style={{ flexGrow: "1", boxShadow: "100px" }}
        className="single-board"
        data-id={id}
      >
        <Grid item container lg={12}>
          <Grid item lg={11} style={{ paddingTop: "10px" }}>
            {isOnEditMode ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <form onSubmit={(e) => changeBoardName(e)}>
                  <TextField
                    id="outlined-basic"
                    label="Board Name"
                    variant="outlined"
                    size="small"
                    defaultValue={boardName}
                  />
                  <Button type="submit">SAVE</Button>
                </form>
                <Button
                  onClick={() => {
                    props.deleteBoard(props.boardId);
                  }}
                >
                  <DeleteIcon />
                </Button>
              </div>
            ) : (
              <h2 style={{ display: "inline" }}>{boardName}</h2>
            )}
          </Grid>
          <Grid
            item
            lg={1}
            style={{ paddingRight: "40px", justifyContent: "center" }}
          >
            {!isOnEditMode && (
              <Button onClick={() => setEditMode(true)}>
                <EditIcon style={{ color: "#410096" }} />
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid item container lg={12}>
          <Grid item lg={6}>
            <FormControl className={classes.formControl}>
              <InputLabel shrink id="sortby-label">
                Sort By
              </InputLabel>
              <Select
                labelId="sortby-label"
                id="demo-simple-select-outlined"
                value={sortBy}
                onChange={(e) => handleChange(e)}
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="DDA">DueDate Ascending</MenuItem>
                <MenuItem value="DDD">DueDate Descending</MenuItem>
                <MenuItem value="TA">Title Ascending</MenuItem>
                <MenuItem value="TD">Title Descending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <BoardItems boardItems={boardItems} id={id} />
        </Grid>
        <form onSubmit={(e) => addItem(e)} style={{ paddingBottom: "6px" }}>
          <TextField
            // id="outlined-basic"
            label="Item Name"
            variant="outlined"
            size="small"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <Button type="submit">Add item</Button>
        </form>
      </Card>
    </Grid>
  );
}
