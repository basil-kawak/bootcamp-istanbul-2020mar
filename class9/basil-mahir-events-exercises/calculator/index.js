
// Styling our webpage
document.getElementById("solution").style.color = "blue";
document.body.style.backgroundColor = "#7A98A5";

// Square this number
const sqrt = document.getElementById("square-button");

sqrt.addEventListener("click", function() {
  let number = document.getElementById("square-input").value;

  document.getElementById("solution").innerHTML = `\n<h1>Result: ( ${number} ^ 2) = ${(number*number)} </h1>`
});

// Half this number:
const half = document.getElementById("half-button");

half.addEventListener("click", function() {
  let number = document.getElementById("half-input").value;

  document.getElementById("solution").innerHTML = `\n<h1>Result: ( ${number} / 2) = ${(number/2)} </h1>`
});

// Fraction / Whole
const fractionWhole = document.getElementById("percent-button");

fractionWhole.addEventListener("click", function() {
  let fraction = document.getElementById("percent1-input").value;
  let whole = document.getElementById("percent2-input").value;

  document.getElementById("solution").innerHTML = `\n<h1>Result:</h1><h4>Percentage of ${fraction} and ${whole} = ${(fraction / whole).toFixed(1)} =  ${(fraction*100 /whole).toFixed(1)} %</h4>`
});

// Area of a circle
const area = document.getElementById("area-button");

area.addEventListener("click", function() {
  let number = document.getElementById("area-input").value;

  document.getElementById("solution").innerHTML = `\n<h1>Result:<br> area of radius ${number} = ${(number*number*Math.PI).toFixed(1)}  unit^2</h1>`
});