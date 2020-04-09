// First Task Done
const five =5;

function divde(a){
  if (a % five === 0 ){
    return true;
  }
  else {
    return false;
  }
}

console.log(divde(10));


// Second Task Done
function checker(a, b) {
 if ( a + b < 100 ){
   return true;
 } else {
   return false;
 }
}
console.log(checker(26,75));



//Third Task
let cur = 1;
let prev = 0;
let next;
let total=0;
while (cur < 4000000) {
  next = cur + prev;
  prev = cur;
  cur = next;
  if (next % 2 === 0) {
    total += next;
  }
}
console.log(total);
