import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SnackBars(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.type === "board" && (
        <Snackbar
          open={props.open}
          autoHideDuration={2000}
          onClose={props.closeAlret}
        >
          <Alert onClose={props.closeAlret} severity="success">
            Board added successfully
          </Alert>
        </Snackbar>
      )}
      {props.type === "deleteBoard" && (
        <Snackbar
          open={props.open}
          autoHideDuration={2000}
          onClose={props.closeAlret}
        >
          <Alert onClose={props.closeAlret} severity="error">
            Board deleted successfully
          </Alert>
        </Snackbar>
      )}
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </div>
  );
}
