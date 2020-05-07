/* MAP EXAMPLES */ 
const capitalize = function(txt){
  return txt.toUpperCase();
}

const swapCase = function(string){
  let wordArray = string.split(" ");
  let newWords = wordArray.map((el, index) => {
     if(index%2===0){
        return wordArray[index].toUpperCase();
     }
     return wordArray[index];   
  } 
  )
  return newWords.join(" ");
}

const shiftLetters = function(string){
  let wordArray = string.split("");
  let newWords = wordArray.map((el) =>{
    return String.fromCharCode(el.charCodeAt(0)+1);
  } 
  )
  return newWords.join("");
  
}

/* MAP EXAMPLES */ 

/* REDUCE EXAMPLES */
const isPresent = function(string, target) {
 
}


const countLetters = function(string){
  
};

/* REDUCE EXAMPLES */

/* MAP AND REDUCE EXAMPLES */



/* MAP AND REDUCE EXAMPLES */
const decode = function(string){

}


/*

https://docs.google.com/document/d/1wWnFua4pb-XfVmJhO_eqtlQ3qnleRZHoKCqih21aKcg/edit

*/






