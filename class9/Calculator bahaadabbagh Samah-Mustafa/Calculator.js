// write your code here
function squareNumber(){
  let numberGiven = document.getElementById("square-input").value;
  let result = numberGiven * numberGiven;
  let solution = document.getElementById("solution");
solution.innerHTML =  "The result of squaring the number " + numberGiven + " is " + result;
}

let squareButton = document.getElementById("square-button");
squareButton.addEventListener("click",squareNumber);

/////

function halfNumber (){
let numberGiven = document.getElementById("half-input").value;
  let result = numberGiven/2;
  let solution = document.getElementById("solution");
solution.innerHTML =  "Half of " + numberGiven + " is " + result;
}
let halfButton = document.getElementById("half-button");
halfButton.addEventListener("click",halfNumber);

/////

function percentOf(){
  let numberGiven1 = document.getElementById("percent1-input").value;
  let numberGiven2 = document.getElementById("percent2-input").value;
  let result =((numberGiven1/numberGiven2)*100);
  let solution = document.getElementById("solution");
solution.innerHTML = numberGiven1 + " is " + result +"% of "+ numberGiven2;
}
let fracButton = document.getElementById("percent-button");
fracButton.addEventListener("click",percentOf);

/////

function areaOfCircle (){
let numberGiven = document.getElementById("area-input").value;
  let result = Math.PI *numberGiven*numberGiven;
  let solution = document.getElementById("solution");
solution.innerHTML =  "The area for a circle with radius " + numberGiven + " is " + result;
}
let areaButton = document.getElementById("area-button");
areaButton.addEventListener("click",areaOfCircle);
