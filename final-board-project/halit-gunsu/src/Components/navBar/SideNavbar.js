import React, { Fragment } from "react";
import "./index.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  ListItem,
  CssBaseline,
  Drawer,
  ListItemIcon,
  List,
  ListItemText,
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import {
  MoveToInbox as InboxIcon,
  Home as HomeIcon,
  InfoOutlined as InfoIcon,
} from "@material-ui/icons";

import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  return (
    <Grid className={classes.root} lg={1}>
      <CssBaseline />

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <div
          className="alo"
          style={{
            fontSize: "39px ",
            fontFamily: "Roboto",
            marginBottom: "44px",
            color: "#410096",
          }}
        >
          <DashboardIcon fontSize="default" />
          TO-DOER
        </div>
        <List>
          {["Home", "About", "Contact Us"].map((text, index) => (
            <NavLink
              style={{ textDecoration: "none" }}
              to={() => {
                switch (index) {
                  case 0:
                    return "/";
                  case 1:
                    return "/about";
                  case 2:
                    return "/contactus";
                  default:
                    return "/";
                }
              }}
            >
              <ListItem
                button
                key={text}
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItemIcon>
                  {index === 0 ? (
                    <HomeIcon style={{ color: "#410096" }} />
                  ) : (
                    <Fragment />
                  )}
                  {index === 1 ? (
                    <InboxIcon style={{ color: "#410096" }} />
                  ) : (
                    <Fragment />
                  )}
                  {index === 2 ? (
                    <InfoIcon style={{ color: "#410096" }} />
                  ) : (
                    <Fragment />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  style={{ textDecoration: "none" }}
                />
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Drawer>
    </Grid>
  );
}
