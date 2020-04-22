// write your code here
let el = document.getElementById("lib-button");
let noun = document.getElementById("noun");
let adj = document.getElementById("adjective");
let person = document.getElementById("person");
let story = document.getElementById("story");

el.addEventListener ("click", function (e) {
  const storyText = `${person.value} was a ${adj.value} ${noun.value}.`;
  console.log(storyText);
  story.innerText = storyText
});