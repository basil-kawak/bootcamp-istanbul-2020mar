import React, {useState} from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import CardsBoard from '../containers/CardsBoard';
import CardsList from '../containers/CardsList'; 
import {Grid} from '@material-ui/core';
import Form from './Form';

const ToggleButtonDisplay= ({recipes,refetch})=>{
    const [view, setView] = useState("module");

    const handleChange = (event, nextView) => {
        setView(nextView);
    };
  
    return(
        <>
            <ToggleButtonGroup orientation="horizontal" exclusive onChange={handleChange} style={{margin:'10px'}}>
                <ToggleButton value="list" style={{fontFamily: 'Balsamiq Sans'}}>
                    List 
                </ToggleButton>
                <ToggleButton value="module"  style={{fontFamily: 'Balsamiq Sans'}}>
                    Board
                </ToggleButton>
            </ToggleButtonGroup>
            <Form fetchAllRecipies={refetch}/>
            {view==="module" ? 
            <Grid container>
                {Object.keys(recipes).map((key)=>
                    <CardsBoard cards={recipes[key]}  category={key} refetch={refetch}/>
                )}
            </Grid> : <CardsList recipes={recipes} refetch={refetch}/>}
        </>
    );

}
export default ToggleButtonDisplay;