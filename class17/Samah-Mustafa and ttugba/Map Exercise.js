/////// First Exercise ///////


const capitalize = function(string){
  let array = string.split("");
  let wordArray = array.map(function(x) {
    return x.toUpperCase();
  }).join("");
  return wordArray;
}
console.log(capitalize("samah and tugba"))



/////// Second Exercise ///////


const swapCase = function(string) {
  let array = string.split(" ");
  let swapArray = array.map(function(word, index){
    if (index % 2 === 0) {
      return word.toUpperCase();
    }else {
      return word;
    }
  }).join(" ")
  return swapArray;
}
console.log (swapCase('hey gurl, lets javascript together sometime'));



/////// Third Exercise ///////


const shiftLetters = function(string) {
  let array = string.split("");
  return array.map(function(z){
    let nextValue = z.charCodeAt()+1;
      return String.fromCharCode(nextValue);
  }).join("");
}
console.log(shiftLetters('hello'));
console.log(shiftLetters('abcxyz'));



