import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Cards from '../components/Cards';
import CardHeader from '@material-ui/core/CardHeader';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      backgroundColor: '#cbf3f0', 
      margin: "auto",
      marginTop:"2%",
      marginBottom:"1%",
      fontFamily: 'Balsamiq Sans',

    },
  });

const CardsBoard = ({cards, category, refetch}) => {
    const classes = useStyles();
    //sort alphabetically
    const sortedCards = cards.sort((a, b) => (a.title > b.title) ? 1 : -1)

    return(
        <Card className={classes.root}>
            <CardHeader 
                className={classes.root}
                title={category.toUpperCase()}/>
            <CardContent>
                {sortedCards.map(card=><Cards recipe={card} refetch={refetch} key={card.id}/>)}
            </CardContent>
        </Card>
    ); 
}
export default CardsBoard;
