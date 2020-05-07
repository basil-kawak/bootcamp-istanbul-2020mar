
////////
const capitalize = function(string){
  const wordArr = string.split('');
  const newArr = wordArr.map(ch => {
    return ch.toUpperCase();
  });
  return newArr.join('');
}
console.log(capitalize('whoop'));

const swapCase = function(string){
  const wordArr = string.split(' ');
  const capFun = wordArr.map((word,index) => {
    if(index % 2 === 0 ){
      return capitalize(word);
    } else {
      return word;
    }
  });
  return capFun.join(' ');
}

console.log(swapCase('hey gurl, lets javascript together sometime'))

const shiftLetters = function(string){
  const wordArr = string.split('');
  const secretMes = wordArr.map((word, index) => {
    return string.charCodeAt(index) + 1;
  });
  return String.fromCharCode(...secretMes);
}

console.log(shiftLetters('hello'));
console.log(shiftLetters('abcxyz'));
// ex. shiftLetters('hello') // => 'ifmmp'
// ex. shiftLetters('abcxyz') // => "bcdyz{"
