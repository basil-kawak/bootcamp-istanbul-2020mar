
let calculateBtn = document.getElementById('square-button');

calculateBtn.addEventListener("click", function(e) {
  let inputSquare = document.getElementById('square-input').value; 
  let bTag = document.getElementById("firstResult");
  let calculation = parseInt(inputSquare*inputSquare);
  
  btag.appendChild(calculation);
  
  
});
