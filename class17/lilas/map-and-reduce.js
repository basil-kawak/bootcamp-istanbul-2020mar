// first question 
let capitalize = (word) => {
    let splitting = word.split(' ');
    let mapping = splitting.map((n) => {
      return n.toUpperCase()
    }); 
    return mapping.join(' ');
  }
  console.log(capitalize("hey there!"));
  
  // second question
  const swapCase = (n) => {
    const words = n.split(" ");
    return words
    .map((words, num) => {
      if (num%2 ===0) {
        return words.toUpperCase()
      }
      return words
    })
    .join(" ");
  };
  console.log(swapCase('hey, let us javascript together sometimes!')); 
  
  // third question 
  const shiftLetters = function(string) {
  
    const array= string.split('');
  
    console.log(array); 
  
     return array.map(function(e) {
  
        const itr= e.charCodeAt() + 1;
        return String.fromCharCode(itr);
  }).join(''); 
  
  }
  
  shiftLetters('password');
  console.log(shiftLetters('password'));
  
  