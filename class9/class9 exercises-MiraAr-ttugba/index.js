window.addEventListener('DOMContentLoaded', (event) => {
  let div= document.getElementById('solution');
 
  //1st function 
  let squareBtn = document.getElementById('square-button');
  squareBtn.addEventListener("click",squareNumber);
  function squareNumber(){
    let num = document.getElementById("square-input").value;
    let square = Math.pow(num,2);
    div.textContent=`The result of squaring the ${num} is ${square}`;
  }
  //respond to Enter key presses
  document.getElementById("square-input").addEventListener('keyup',(e) =>{
    if(e.keyCode === 13){
      squareNumber();
    }
  } );
 
  //2nd function 
  let halfBtn = document.getElementById('half-button');
  halfBtn.addEventListener("click",halfNumber);
  function halfNumber(){
    let number = document.getElementById("half-input").value;
    let half = number/2;
    div.textContent=`Half of ${number} is ${half}`;
  }

  //respond to Enter key presses
  document.getElementById("half-input").addEventListener('keyup',(e) =>{
    if(e.keyCode === 13){
      halfNumber();
    }
  } );
  
  
  // 3rd function 
  let fractionBtn = document.getElementById('percent-button');
  
  fractionBtn.addEventListener("click",percentOf);
  function percentOf(){
    let num = document.getElementById("percent1-input").value;
    let per = document.getElementById("percent2-input").value;
    let result=(num*100)/per;
    div.textContent=`${num} is ${result}% of ${per}`;
  }

  //respond to Enter key presses
  document.getElementById("percent2-input").addEventListener('keyup',(e) =>{
    if(e.keyCode === 13){
      percentOf();
    }
  } );
  
  // 4th function 
  let areaBtn = document.getElementById('area-button'); 
  
  areaBtn.addEventListener("click",areaOfCircle);
  function areaOfCircle(){
    let radius = document.getElementById("area-input").value;
    let area = Math.PI *(radius * radius);
    div.textContent=`The area for a circle with radius ${radius} is ${Math.round(area*100)/100}.`;
  }
  //respond to Enter key presses
  document.getElementById("area-input").addEventListener('keyup',(e) =>{
    if(e.keyCode === 13){
      areaOfCircle();
    }
  } );
  
});

