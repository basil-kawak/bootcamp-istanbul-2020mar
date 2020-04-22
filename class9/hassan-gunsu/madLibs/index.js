let libButton = document.getElementById("lib-button");
let noun = document.getElementById("noun");
let adjective = document.getElementById("adjective");
let person = document.getElementById("person");

makeMadLibs();

function makeMadLibs(){
  libButton.addEventListener("click", function(e){
    nounHere = noun.value;
    adjHere= adjective.value;
    perHere = person.value;

    let entry = document.createElement("p");
    let storyText = randomAnswer(perHere, adjHere, nounHere);

    entry.appendChild(document.createTextNode(storyText));
    document.getElementById("story").appendChild(entry);

  })

}

function randomAnswer(a, b ,c){
  let num = parseInt(Math.random()*4);

  if(num%4 === 0)
    return a + " waked up today. " + a+" realised that " + a + " really likes " + b + " " + c;
  else if(num%4 === 1)
    return a + " loves buying " + b + " " + c +". When "+a+" went to shopping,  "+a +" saw a woman with " + b + " " + c ;
  else if(num%4 === 2)
    return a + " enjoys reading " + b + " " + c +". I did not know that " + b + " " + c+ " was readable.";
  else
    return "And suddenly, "+ a + " threw " + b + " " + c + " to the wall, shame!";


}
