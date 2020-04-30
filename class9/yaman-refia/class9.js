function squareNumber2(num){
  let n = num**2
  console.log(`The result of squaring the number ${num} is ${n}.`);
  return n;
}
const squareButton = document.querySelector("#square-button");
squareButton.addEventListener("click", function(){
  let n = document.getElementById("square-input").value;
  document.getElementById('solution').innerHTML = squareNumber2(n);
});

function halfNumber(num){
  let n = num/2
  console.log(`The result of half the number ${num} is ${n}.`);
  return n;
}
const halfButton = document.querySelector("#half-button");
halfButton.addEventListener("click", function(){
  let n = document.getElementById("half-input").value;
  document.getElementById('solution').innerHTML = halfNumber(n);
});


function percentOf(){
  let number1 = document.getElementById("percent1-input").value;
  let number2 = document.getElementById("percent2-input").value;
  let result = ((number1/number2)*100);
  let solution = document.getElementById("solution");
  solution.innerHTML= number1 + "is"+result +"% of"+number2;}
  let fracButton= document.getElementById("percent-button");
  fracButton.addEventListener("click", percentOf);
  

function areaOfCircle(num){
  let n = Math.PI * num * num;
  console.log(`The result of radius the number ${num} is ${n}.`);
  return n;
}
const areaButton = document.querySelector("#area-button");
areaButton.addEventListener("click", function(){
  let n = document.getElementById("area-input").value;
  document.getElementById('solution').innerHTML = areaOfCircle(n);
})




