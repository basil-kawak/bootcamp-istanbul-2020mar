// write your code here
let squareButton = document.getElementById("square-button");
let areaButton = document.getElementById("area-button");
let halfButton = document.getElementById("half-button");
let percentButton = document.getElementById("percent-button");
/*
let entry = document.createElement("p");
entry.appendChild(document.createTextNode(squareNumber(2)));
document.getElementById("solution").appendChild(entry);
*/
squareButton.addEventListener("click", function(e){
  let number = parseInt(document.getElementById("square-input").value);
  document.getElementById("solution").innerHTML = squareNumber(number);
  console.log("The result of squaring the number " + number+ " is " + squareNumber(number));
});

halfButton.addEventListener("click", function(e){
  let number = parseInt(document.getElementById("half-input").value);
  document.getElementById("solution").innerHTML = halfNumber(number);
  console.log("Half of "+number+" is "+ halfNumber(number));
});

percentButton.addEventListener("click", function(e){
  let f = parseInt(document.getElementById("percent1-input").value);
  let w= parseInt(document.getElementById("percent2-input").value);
  document.getElementById("solution").innerHTML = percentOf(f,w);
  console.log( f+ " is "+percentOf(f,w)+" of "+ w+".");
});

areaButton.addEventListener("click", function(e){
  let r = document.getElementById("area-input").value;
  document.getElementById("solution").innerHTML = areaOfCircle(r);
  console.log("The area for a circle with radius "+r +" is "+areaOfCircle(r)+".");
});


//this does the mathematical stuff
function squareNumber(n){
  return n*n;
}
function halfNumber(n){
  return (parseInt((n/2)*10)/10);
}
function percentOf(f,w){
  return ((f/w)*100)+"%";
}

function areaOfCircle(r){
  return r * Math.PI * r;
}
/*

let entry = document.createElement("p");
entry.appendChild(document.createTextNode(squareNumber(3)));
document.getElementById("solution").appendChild(entry);


 */
