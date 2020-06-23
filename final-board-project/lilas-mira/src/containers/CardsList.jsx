import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import NestedList from '../components/NestedList';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: "#cbf3f0",
    alignItems: "center",
    display:"block",
    margin: 'auto',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function CardsList({recipes}) {

  const classes = useStyles();
  

  return (
    <>
      <div style={{marginBottom:"5%"}}>  
        <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
            <ListSubheader component="div" id="nested-list-subheader">
            Recipe List
            </ListSubheader>
        }
        className={classes.root}
        >
          
        {Object.keys(recipes).map((key)=>{
        return(
          <NestedList category={key} recipes={recipes}/>
        );
        })}
        

        </List>
      </div> 
    </>
  );
}