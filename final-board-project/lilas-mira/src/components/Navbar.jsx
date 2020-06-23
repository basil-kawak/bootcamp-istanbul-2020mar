import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    font: {
      fontFamily: 'Pacifico',
      color:'#5F4E38',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      display: 'none'
    },
    grow: {
      flexGrow: 1,
    },
    hatIcon: {
      marginRight: theme.spacing(0.1),
      background: 'white'
    },
    title: {
      background:'#ff9f1c',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }));
  
  export default function Navbar() {

    const classes = useStyles();

    return (
      <div className={classes.grow}>
        <AppBar position="static" className={classes.title}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.hatIcon}
              disabled='true'
            >
              <img src="https://img.icons8.com/ios/50/000000/chef-hat.png"/>
            </IconButton>
            <Typography className={classes} className={classes.font} variant="h4" noWrap>
              Cookbook
            </Typography>
            <div className={classes.grow} />
            <div >


            <NavLink
              to="/"
              exact
            >
              <IconButton>
                <HomeIcon />
              </IconButton>
            </NavLink>

            <NavLink
              to="/Favorite"
              exact
            >
              <IconButton >
                <FavoriteIcon />
              </IconButton>
            </NavLink>

            <NavLink
              to='/About'
              exact
            >
              <IconButton >
                <InfoIcon />
              </IconButton>
            </NavLink>

            </div>
        
          </Toolbar>
        </AppBar>
      </div>
    );
  }