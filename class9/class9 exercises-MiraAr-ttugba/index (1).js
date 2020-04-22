// write your code here
      
let nounInput= document.getElementById("noun");
let adjectiveInput= document.getElementById("adjective"); 
let nameInput = document.getElementById("person");
let btn= document.getElementById("lib-button");

btn.addEventListener("click",function makeMadLib(){
  let div= document.querySelector('#story');
  div.innerText = nameInput.value+" "+"really likes "+adjectiveInput.value+" "+ nounInput.value ;

});
