import React ,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Fab from '@material-ui/core/Fab';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import db from "../firebase";
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
  root: {
  '& .MuiTextField-root': {
    margin: theme.spacing(1),
    width: '100%'
  },
  },
  font:{
    fontFamily: 'Balsamiq Sans'
  }

}));
const defaultProps = {
  bgcolor: '#2EC4B6',
  borderColor: '#2EC4B6',
  m: 1,
  border: 1,
  style: { width: '35%', height: '100%' },
  justifyContent:"center",
  padding: "2%",
};

const Form = (props)=> {

  const [title, setTitle] = useState('');
  const [serving, setServing] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');  
  const [selectedCategory, selectCategory]= useState('food');
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();

    
//Add new recipe then refetch with the new added recipe
  const addRecipe = e => {
  e.preventDefault();
  const recipeBody = {
    title: title,
    serving: serving,
    ingredients: ingredients,
    description: description,
    category: selectedCategory,
    image: image,
    isFavorite: false
  }
  db.collection(selectedCategory).add(
    recipeBody
  )
  props.fetchAllRecipies();
  setTitle('');
  setServing('');
  setIngredients('');
  setDescription('');
  setImage('');

};

const handleExpandClick =() => {
  setExpanded(!expanded);
};

  return (
    <Box display="flex" justifyContent="center">  
      <Box borderRadius="borderRadius" {...defaultProps}>


      <Button className={clsx(classes.expand, {
        [classes.expandOpen]: expanded,
        })}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        className={classes.font}
        >
        Click to add recipe</Button>


        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={addRecipe}>
          <div style={{ display: 'column' }}>
            {/* select Category */}

            <Grid container spacing={24} style={{width: '70%'}}>

              <Grid xs={12}>
                <TextField
                  select
                  label="Select"
                  value={selectedCategory}
                  onChange={e=>selectCategory(e.target.value)}
                  helperText="select category"
                  >
                  {['food','drinks','desserts'].map((option) => (
                    <MenuItem value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid xs={12}>
              {/* {Title input} */}
                <TextField
                label="Recipe Title"
                onChange={e=>setTitle(e.target.value)}
                value={title}
                required
                />
              </Grid>  

              <Grid xs={12}>
              {/* Serving */}
                <TextField
                label="Serving Number"
                type="number"
                required
                onChange={e=> setServing(e.target.value)}
                value={serving}
                InputLabelProps={{
                  shrink: true,
                }}
                />
              </Grid>

              {/* ingredients */}
              <Grid xs={12}>
                <TextField
                label="Ingredients"
                multiline
                rows={4}
                onChange={e => setIngredients(e.target.value)}
                value={ingredients}
                // defaultValue="Add ingredients"
                required
                />
              </Grid>

              {/* description */}
              <Grid xs={12}>
                <TextField
                  label="Description"
                  multiline
                  rows={4}
                  // defaultValue="Add description"
                  onChange={e => setDescription(e.target.value)}
                  value={description}
                  required
                />
              </Grid>

              <Grid xs={12}>
              {/* image input */}
                <TextField
                label="Image URL"
                type="url"
                onChange={e => setImage(e.target.value)}
                value={image}
                required
                />
              </Grid>

              {/* submit button */}
              <Grid xs={12} >
                <Fab type="submit" variant="extended" style={{margin: '10%'}}>
                  <FastfoodIcon />
                    Add recipe
                </Fab>
              </Grid>

            </Grid>
          </div>
        </form>
        </Collapse>
      </Box>
    </Box>


  );
}
export default Form;





