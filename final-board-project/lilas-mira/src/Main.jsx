import React, {useEffect, useState} from 'react';
import db from "./firebase";
import ToggleButtonDisplay from './components/ToggleButton';

const Main = () => {
  const [recipes, setRecipes] = useState({});
  // Fetch from all 3 collections at the same time 
  const fetchAllRecipies=() =>{
    const foodRecipiesRes = db.collection('food');
    const drinksRecipiesRes = db.collection('drinks');
    const dessertsRecipiesRes = db.collection('desserts');
    Promise.all([foodRecipiesRes.get(), drinksRecipiesRes.get(), dessertsRecipiesRes.get() ])
    .then(promiseResults => {
      const mergedData = {"food": [],"drinks":[],"desserts":[]};
      promiseResults.forEach( snapshot => {
        snapshot.forEach( doc => {
            const data = doc.data();
            mergedData[data.category].push(data);
            // Adding the id to the object
            data.id = doc.id;
          }    
        );
      });
      setRecipes(mergedData)
    })
  }

  useEffect(() =>{
  fetchAllRecipies();
  },[]);


  
  return (
    <>
      <ToggleButtonDisplay recipes={recipes} refetch={fetchAllRecipies}/>
    </>
);
}

export default Main;