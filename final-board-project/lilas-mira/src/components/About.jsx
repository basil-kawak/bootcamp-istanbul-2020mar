import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    text: {
        fontFamily: 'Roboto Slab',
        margin: '10%',
        height:'600px',
    },
  });
  

const About= ()=>{
    const classes = useStyles();
    return (
        <div className={classes.text}>
           <h1>About</h1>
           <div>
            Cookbook is your smart cooking notepad app, offering a unique 
            personalized experience. It gives you a quick to write, edit, and 
            collect your favorite recipes.
           </div>
        </div>
    )

}
export default About;