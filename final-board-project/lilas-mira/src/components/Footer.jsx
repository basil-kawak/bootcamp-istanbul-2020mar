import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import GitHubIcon from '@material-ui/icons/GitHub';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: '100%',
    backgroundColor: '#2ec4b6',
    marginBottom: '0',
    // left: '0',
    // height: '10%',
    //marginTop: '20'
    
  },

  icons:{
      padding: '5%',  
  },

  font: {
    fontFamily: 'Pacifico',
    color:'#5F4E38',
    fontSize: '100%'
  }
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
        <Typography className={classes.font}>
        &copy; 2020 by Lilas & Mira 
            <BottomNavigationAction icon={< GitHubIcon onClick={() => window.open('https://github.com/lilas-saleh')}/>} className={classes.icons}/>
            |
            <BottomNavigationAction icon={< GitHubIcon onClick={() => window.open('https://github.com/MiraAr')}/>} className={classes.icons}/>
        </Typography>
     
    </BottomNavigation>
  );
}