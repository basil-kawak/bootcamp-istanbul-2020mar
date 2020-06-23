import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import { TextField, makeStyles } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function EditDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen}>
        <EditIcon style={{ color: "white" }} />
      </Button>

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit Item
        </DialogTitle>
        <DialogContent dividers>
          <form
            onSubmit={(e) => props.editItem(e)}
            className={classes.root}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              padding: "auto",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Item name"
              variant="outlined"
              size="small"
              defaultValue={props.data.name}
            />
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              type="date"
              defaultValue={props.data.dueDate}
            />

            <TextField
              id="outlined-basic"
              label="Assignes"
              variant="outlined"
              size="small"
              defaultValue={props.data.assignedTo.join(" ")}
            />

            <DialogActions>
              <Button autoFocus onClick={props.deleteItem} color="secondary">
                Delete Item
              </Button>
              <Button
                autoFocus
                type="submit"
                onClick={handleClose}
                color="primary"
              >
                Save changes
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
