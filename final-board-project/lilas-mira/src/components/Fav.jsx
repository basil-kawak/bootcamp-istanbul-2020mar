import React, {useEffect, useState} from 'react';
import db from "../firebase";
import {Grid} from '@material-ui/core';
import CardsBoard from '../containers/CardsBoard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    text: {
        fontFamily: 'Roboto Slab',
        marginLeft: "5%"
    },
  });

const Fav= () => {
    const classes = useStyles();
    const [favorite, setFavorite] = useState({});
    const fetch = () => {
        db.collection('favorite').get().then(function(querySnapshot) {
            const favoriteData = {"food": [],"drinks":[],"desserts":[]};
            querySnapshot.forEach(function(doc) {
                const data = doc.data();
                // doc.data() is never undefined for query doc snapshots
                data.id = doc.id;
                favoriteData[data.category].push(data);
                
                console.log(data)
            });
            setFavorite(favoriteData)
        });
    }
    useEffect(() =>{
        fetch();
          
        },[]);
    return (
        <div>
            {console.log(favorite)}
           <h1 className={classes.text}> Favorites 🤍</h1> 
           <Grid container>
                {Object.keys(favorite).map((key)=>
                    <CardsBoard cards={favorite[key]}  category={key} refetch={fetch}/>
                )}
            </Grid>
        </div>
    )

}
export default Fav 

