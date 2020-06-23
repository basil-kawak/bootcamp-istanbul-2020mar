import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import db from '../firebase';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', //16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  iconMargin:{
    flex: '1',
    alignItems: 'center',
  }
}));

export default function RecipeReviewCard({recipe,refetch}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [ingredients, updateIngredients] = useState(recipe.ingredients);
  const [description, updateDescription] = useState(recipe.description);
  let [hiddenEditButton ,hideEditButton] = useState(true);
  const [favorites, setFavorite]= useState(false);

// Delete each recipe from db and fetch all
  const deleteRecipe = (id, category, mainCategory) =>{
    if(category=== "favorite"){ db.collection(mainCategory).doc(id).update({
      isFavorite: false
    }) 
    setFavorite(false)
  } 
    db.collection(category).doc(id).delete().then(function() {
      
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
    
    refetch()
  }

  const editIconClicked= ()=>{
    setExpanded(!expanded);
    expanded === true ? hideEditButton(true):hideEditButton(false);
  }

  const expandIconClicked= ()=>{
    hideEditButton(true);
    setExpanded(!expanded);
   
  }
  
  const editRecipeOnSubmitChanges= (category,id)=>{ 
    db.collection(category).doc(id)
    .onSnapshot(()=> {
        db.collection(category).doc(id).update(
        {
          ingredients: ingredients,
          description: description
        });
    });
  }
  const addToFavorite= () =>{
    const recipeBody = {
      title: recipe.title,
      serving: recipe.serving,
      ingredients: recipe.ingredients,
      description: recipe.description,
      category: recipe.category,
      image: recipe.image,
      isFavorite: true
    }
    db.collection("favorite").doc(recipe.id).set(
      recipeBody
    )
    db.collection(recipe.category).doc(recipe.id).update({
      isFavorite: true
    }
      
    )
    setFavorite(true)
  }

  const handleFavorite=()=>{
    recipe.isFavorite ? 
    recipe.isFavorite  === false ?addToFavorite() : deleteRecipe(recipe.id,"favorite", recipe.category) : addToFavorite()
  }

  return (
    <Card className={classes.root} style={{margin: 10}}>
      <CardHeader
      title={recipe.title}
      subheader={`Serving: ${recipe.serving}`}
      />
      <CardContent>
        <img src = {recipe.image} width='100%'  height="200px"/>
      </CardContent>
      <CardActions disableSpacing>
      
      <FormControlLabel
      control={<Checkbox icon={<FavoriteBorder />} checked={recipe.isFavorite===true || favorites? true: false} checkedIcon={<Favorite />} name="checkedH" onChange={handleFavorite} className={classes.iconMargin}/>}
      />

      <Tooltip title="Delete">
        <IconButton aria-label="delete" onClick={()=>deleteRecipe(recipe.id,recipe.category)} className={classes.iconMargin}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Edit">
        <IconButton aria-label="edit"
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={editIconClicked}
          aria-expanded={expanded}
          className={classes.iconMargin}
          >
          <EditIcon />
        </IconButton>
      </Tooltip>

      <IconButton
        className={clsx(classes.expand, {
        [classes.expandOpen]: expanded,
        })}
        onClick={expandIconClicked}
        aria-expanded={expanded}
        aria-label="show more"
        className={classes.iconMargin}
        >
        <ExpandMoreIcon />
      </IconButton>

      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <Typography paragraph>
          <b>Ingredients:</b>
          <br/>
          <InputBase
          className={classes.margin}
          inputProps={{ 'aria-label': 'naked' }}
          rowsMax={40}
          label=" Ingridient:"
          multiline
          onChange= {e => updateIngredients(e.target.value)}
          defaultValue={recipe.ingredients}
          />
        </Typography>

        <Typography paragraph>
          <b>Description:</b>
          <br/>
          <InputBase
          className={classes.margin}
          defaultValue={recipe.description}
          inputProps={{'aria-label' : 'naked'}}
          onChange= {e => updateDescription(e.target.value)}
          multiline
          rowsMax={10}
          />
        </Typography>  

        <Box component="div" visibility={`${ hiddenEditButton=== false ? 'visible' : 'hidden'}`}>
          <Button variant="outlined" color="secondary" onClick={()=>editRecipeOnSubmitChanges(recipe.category, recipe.id)}>
            save changes
          </Button>
        </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}
