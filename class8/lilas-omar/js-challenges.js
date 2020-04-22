let array = ["Omar","Lilas","Louis","Ammar","Hakan"]
let newarray = [];
 for (let i=0; i<array.length; i++){
   newarray.push(array[i].charAt(0));
   console.log(newarray)
 }
newarray.sort()
let string = newarray.join("");
console.log(string)


let names = ["Liz", "Hakan", "Ammar", "Feras", "Jaime", "Derya"];
function status(arr) {
  if (arr.length === 0) {
    return `no one online`
    }
    else if(arr.length === 1) {
    return `${arr[0] }online`
    }else if(arr.length === 2){
     return `${arr[0]} and ${arr[1]} online are online`
    }else if(arr.length >= 3){
      return `${arr[0]} and ${arr[1]} online and ${arr.length -2} others`
    }
}
status(names);


let arr = []
let firstName = 'Ali';
let lastName = 'Ahmed';
arr.push(firstName);
arr.push(lastName);
let fullName = arr.join(" ");
console.log(`Hello ${fullName}` );


let nums = [1, 3, 1, 3, 3, 4, 5, 5];
function odd(array){
  let arr = [];
  for (let i = 0; i < array.length; i++){
    if (i % 2 === 0){
      arr.push(array[i]);
    }
  }
  return arr;
}
console.log(odd(nums));


