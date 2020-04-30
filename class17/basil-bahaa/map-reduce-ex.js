// ---------- THE FUNCTIONS -------------//

// ---------- CAPITALIZE FUNCTION--------//
const capitalize = function(string){
  const arr= string.split(' ');
  return arr.map(function (e) {
    return e.toUpperCase();
}).join(' ')
// return console.log(map);
}
capitalize('baba ')
console.log(capitalize('baba '))

// ---------- SWAP CASE FUNCTION --------//
const swapCase = function(string) {
  let arr= string.split(' ');
  return arr.map(function(string, index) {
  if (index % 2 === 0) {
     return string.toUpperCase();
  }else{
    return string;
  }
}).join(' ');
  // console.log(map);
}
swapCase('baba dada');
console.log(swapCase('baba dada'))


// ---------- SHIFT LETTERS ------------//
const shiftLetters = function(string) {
  const arra= string.split('');
   return arra.map(function(e) {
    const num= e.charCodeAt() + 1;
    return String.fromCharCode(num);
}).join(''); 
// console.log(map) 
}
shiftLetters('baba');
console.log(shiftLetters('baba'));