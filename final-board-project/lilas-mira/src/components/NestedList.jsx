import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));

export default function NestedList({category,recipes}) {
    const classes = useStyles();  
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
      setOpen(!open);
    };


    return (
        <>    
            <ListItem button onClick={handleClick}>
                <ListItemText primary={category.toUpperCase()}/>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                {recipes[category].map((recipe)=>{
                    return(
                        <ListItem button className={classes.nested} key={recipe.id} >
                            <ListItemText primary={recipe.title} />
                        </ListItem>
                    );
                    })
                }
                
                </List>
            </Collapse>
        </>
    )
}
