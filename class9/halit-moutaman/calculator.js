// BUTTON SELECTOR

let sqBtn = document.querySelector('#square-button');
let halfBtn = document.querySelector('#half-button');
let percentBtn = document.querySelector('#percent-button');
let areaBtn = document.querySelector('#area-button');

// INPUT SELECTOR

let squareInput = document.querySelector('#square-input');
let halfInput = document.querySelector('#half-input');
let percent1Input = document.querySelector('#percent1-input');
let percent2Input = document.querySelector('#percent2-input');
let areaInput = document.querySelector('#area-input');

// OUTPUT SELECTOR 

let sol = document.querySelector('#solution');

// SQUARE FUNCTION
function squareNumber () {
sol.innerHTML= `The result of squaring ${squareInput.value} is ${Math.pow(squareInput.value,2)}`;
squareInput.value="";
}

sqBtn.addEventListener('click',function (e){
calculate(1);
});

// HALF FUNCTION

function halfNumber (){
sol.innerHTML= `Half of ${halfInput.value} is ${(halfInput.value)/2}`;
halfInput.value="";
}

halfBtn.addEventListener('click',function (e){
calculate(2);
});

// PERCENTAGE FUNCTION 

function percentOf(){
sol.innerHTML= `${percent1Input.value} is ${(percent1Input.value/percent2Input.value)*100} % of ${percent2Input.value}`;
percent1Input.value="";
percent2Input.value="";
}

percentBtn.addEventListener('click',function (e){
calculate(3);
});

// AREA FUNCTION

function areaOfCircle(){
sol.innerHTML=`The are of a circle with radius ${areaInput.value}  is `+ Math.pow(areaInput.value,2) * Math.PI;
areaInput.value="";
}

areaBtn.addEventListener('click',function (e){
calculate(4);
});



function calculate (no){
if (no===1){
squareNumber();
}else if (no===2){
halfNumber();
}else if (no===3){
percentOf()
}else if (no===4){
areaOfCircle()
}
}



// EXTRA FUNCTION THAT MAKES THE BUTTON ACITVIATE BY PRESSING ENTER KEY


document.addEventListener('keypress',function (e){

if(e.code === "Enter" && areaInput.value != ""){calculate(4);
}
else if(e.code === "Enter" && percent1Input.value != "" && percent2Input.value != ""  ){
calculate(3);
}
else if(e.code === "Enter" && halfInput.value != ""){
calculate(2);
}
else if(e.code === "Enter" && squareInput.value != ""){
calculate(1);
}
});