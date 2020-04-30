let squareButton = document.getElementById('square-button');
    squareButton.addEventListener("click", function squareNumber() {
  let number = parseInt(document.getElementById('square-input').value);
  let squareNumber = number * number;
  let p = document.getElementById('solution');    
    p.innerHTML = `The result of squaring the number ${number} is ${squareNumber}`;
});
  
/*////////halfNumber//////////*/

let halfNumberButton = document.getElementById('half-button');
     halfNumberButton.addEventListener("click", function halfNumber() {
let number = document.getElementById('half-input').value;
let halfnumber = number / 2;
let p = document.getElementById('solution');    
    p.innerHTML = `half of ${number} is ${halfnumber}`;
});

/*////////percentOf//////////*/

let percentButton = document.getElementById('percent-button');
     percentButton.addEventListener("click", function percentOf() {
let number1 = parseInt(document.getElementById('percent1-input').value);
let number2 = parseInt(document.getElementById('percent2-input').value);
let percentnumber = (number1/number2) * 100;
let p = document.getElementById('solution');    
    p.innerHTML = `${number1} is ${percentnumber}% Of ${number2}`;
});


/*////////////areaOfCircle///////*/

let areaButton = document.getElementById('area-button');
    areaButton.addEventListener("click", function areaOfCircle() {
let number = parseInt(document.getElementById('area-input').value);
let area = Math.round(number * number * Math.PI);
let p = document.getElementById('solution');    
    p.innerHTML = `The area for a circle with radius ${number} is ${area}`;
});
