/**
 * Complete the implementation of parseStory.
 * 
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 * 
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 * 
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 * 
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 * 
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */
function parseStory(rawStory) {
    const arr = rawStory.split(' ');
    const newArr = arr.map(x => {
      if(x.includes('[')){
        let pos;
        const index = x.indexOf('[');
        const word = x.slice(0,index);
        const regex = x.match(/\[(.*?)\]/)[1];
        if(regex === 'verb'){
          pos = 'verb';
        } else if(regex === 'noun'){
          pos = 'noun';
        } else if(regex === 'adjective'){
          pos = 'adjective';
        } else if(regex === 'subject'){
          pos = 'subject';
        } else if(regex === 'article'){
          pos = 'article';
        } else if(regex === 'object'){
          pos = 'object';
        } else if(regex === 'possessive'){
          pos = 'possessive';
        }
        return {word: word, pos: pos}
      } else{
        return {word: x}
      }
    });
    // Your code here.
    return newArr; // This line is currently wrong :)
  }
  
  let inputsArray = [34,35,37,39,40,43,48,50,51,52,53,57,59,61,62,64,65,66];
  
  /**
   * All your other JavaScript code goes here, inside the function. Don't worry about
   * the `then` and `async` syntax for now.
   * 
   * You'll want to use the results of parseStory() to display the story on the page.
   */
  getRawStory().then(parseStory).then((processedStory) => {
    console.log(processedStory);
  
      const madLibsPreview = document.querySelector('.madLibsPreview');
  
      for (let i = 0 ; i < processedStory.length ; i++) {
      if (!("pos" in processedStory[i])) {
        let newSpan = document.createElement("span");
        newSpan.innerHTML = processedStory[i].word;
        newSpan.innerHTML += " ";
        madLibsPreview.appendChild(newSpan);
      } else {
        let newSpan1 = document.createElement("span");
        if ((processedStory[i+1].word == ",") || (processedStory[i+1].word == ".")) {
          newSpan1.setAttribute("id", `${i}`);
          newSpan1.innerHTML = "(" + processedStory[i].pos + ")";
          newSpan1.style.opacity = 0.4;
          madLibsPreview.appendChild(newSpan1);
        } else {
          let newSpan2 = document.createElement("span");
          newSpan2.innerHTML = " ";
          newSpan1.setAttribute("id", `${i}`);
          newSpan1.innerHTML = "(" + processedStory[i].pos + ")";
          newSpan1.style.opacity = 0.4;
          madLibsPreview.appendChild(newSpan1);
          madLibsPreview.appendChild(newSpan2);
        }
      }
    }
  
  
  
  
    for (let i = 0 ; i < processedStory.length ; i++) {
      if (!("pos" in processedStory[i])) {
        let span = document.getElementById(`${i+processedStory.length}`);
        span.innerHTML = processedStory[i].word;
      } else {
        let input = document.getElementById(`${i+processedStory.length}`);
        input.setAttribute("placeholder", `${processedStory[i].pos}`);
        input.setAttribute("maxlength", "20");
        input.classList.add("inputs");
        let log = document.getElementById(`${i}`);
        input.oninput = handleInput;
        function handleInput(e) {
          if (e.target.value.length == 0){
            log.textContent = "(" + processedStory[i].pos + ")";
            log.style.opacity = 0.4;
          } else {
            log.textContent = e.target.value;
            log.style.opacity = 1;
          }
        }
      }
    }
  
    for (let i = 0 ; i < inputsArray.length ; i++){
      let inputs = document.getElementById(`${inputsArray[i]}`);
      inputs.addEventListener("keydown", function(event){
        if (event.keyCode == 13){
            document.getElementById(`${inputsArray[i+1]}`).focus();
          }
        })
    }
  
  
  });
  
  
  window.onload = (event) => {
    console.log('page is fully loaded');
  };
  
  
  
  