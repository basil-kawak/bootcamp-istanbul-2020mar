// First Task Done
/*const five =5;

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
<<<<<<< HEAD
=======
*/

function societyName(arr) {
  let temp = [];
  arr.forEach((element) => {
    temp.push(element.charAt('0'));
    temp.sort();
  });
  let str = temp.join('');
  console.log(str);
}

societyName(['Adam', 'Sarah', 'Malcolm']);

let str = function chatroomStatus(param) {
  if (param.length === 0) {
    return 'no one online';
  } else if (param.length === 1) {
    return `${param[0]}, is online`
  } else if (param.length === 2) {
    return `${param[0]}, and ${param[1]} is online`
  } else {
    re`${param[0]},  ${param[1]} and ${param.length - 2} more online`);
  }
};
chatroomStatus([]);
chatroomStatus(['Liz']);
chatroomStatus(['Liz', 'Ammar']);
chatroomStatus(['Liz', 'Hakan', 'Ammar', 'Feras', 'Jaime', 'Derya']);
