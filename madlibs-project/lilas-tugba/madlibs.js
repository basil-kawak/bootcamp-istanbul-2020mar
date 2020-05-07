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

// PARSING !! 
function parseStory(rawStory) {
  let array = [];
  let newStory = rawStory;
  let splitting = newStory.split(" "); // splitting the text (string) into an array of substrings, and returns the new array. 
  //console.log(splitting)

// regular expressions !! 
  let noun = /n(?=])/; 
  let verb = /v(?=])/;
  let adjective =/a(?=])/;
// loop in the substring array !! 
  for (let i=0; i<splitting.length; i++){
    let word = splitting[i]
    let lastLetter = word[word.length-1]
    let punctuation;
    if (lastLetter== "," || lastLetter== ".") {
      word = word.slice(0, word.length-1) // slice returns the selected elements in an array, as a new array object slice(start, end)
    }
// tests for a match in a string and returns true if it finds a match, otherwise it returns false.
    if(noun.test(word)) { 
      let replaceN = word.replace('[n]','');
      array.push(newArray(replaceN,'noun'));

    } else if (verb.test(word)){
      let replaceV = word.replace('[v]','');
      array.push(newArray(replaceV,'verb'));

    } else if (adjective.test(word)){ 
      let replaceA = word.replace('[a]','');
      array.push(newArray(replaceA,'adjective'));
    }
    else {
      array.push(newArray(word));
    }
    if (lastLetter == "." || lastLetter == ",") {
      array.push(newArray(lastLetter))
    }
  }
  function newArray(theWord,pos){
    let newObj = {};
    newObj["word"]= theWord
    if (pos) {
      newObj["pos"]= pos
    } 
    return newObj;
  }
  return array; 
}

  
/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 * 
 * You'll want to use the results of parseStory() to display the story on the page.
 */

getRawStory().then(parseStory).then((processedStory) => {
  twoTexts(processedStory);
});
//input div
let madLibsEdit = document.getElementsByClassName('madLibsEdit')[0]
//preview div
let madLibsPreview = document.getElementsByClassName('madLibsPreview')[0]

function twoTexts(array) { 
  let inputId = 0 
for (let i=0; i<array.length; i++) { 
  if(!array[i].pos){ // if it is not a part of speech
    let span = document.createElement("span")
    let prevSpan = document.createElement("span")

    span.innerText = array[i].word+""
    prevSpan.innerText = array[i].word+""

    madLibsEdit.appendChild(span)
    madLibsPreview.appendChild(prevSpan)

  } else { // if it is a pos we create an input element wit max length 20 and iterate inside it 
    let input= document.createElement("input")
    input.id= inputId
    inputId = (inputId +1)%10; 
    input.maxLength="20"; //maximum 20 letters
    input.setAttribute("placeholder", array[i].pos)
    input.style.color='pink';
    

    madLibsEdit.appendChild(input)
    let inputvalue = document.createElement("span")
    //input value is empty ,we add pos to it
    inputvalue.innerText = `(${array[i].pos})`
    input.addEventListener('input', function(){
      if (input.value){
        inputvalue.innerText = `${input.value}`
        inputvalue.style.color='#deeb93';
      } else {
        inputvalue.innerText = `(${array[i].pos})`
        inputvalue.style.color='pink';
      }
    });
    madLibsPreview.appendChild(inputvalue);
    //console.log(inputvalue)

//  keydown event is fired when a Enter key is pressed
    input.addEventListener('keypress', e => keyDown(e, inputvalue)); // an event with a function that uses the iterations of inputId to iterate through the blanks 
     (function(inputId){ 
        input.addEventListener('keypress',
     function(e) { keyDown(e, inputvalue, inputId)});
     })(inputId)
  } 
}   
}
// when we press enter it will move to the next blank, when it is in the last blank we go back to the first one 
function keyDown(e, previewSpan, inputId) {
  //  console.log(e.key)
  //  console.log(e.target)
  //  console.log(e)
  //  console.log(e.keyCode)
  if (e.keyCode == 13 ) {
    let nextInput = document.getElementById(inputId)
    //console.log(nextInput)
    //console.log(`inputId: ${inputId}`)
    if (!nextInput) { // an if statement for highlighting the current input box
      return
    }
    nextInput.focus()
  }
  previewSpan.innerText= e.target.value; 
  //e.target.value is whats in the input keyDown function. it receives event and the span element corresponding to the input element which received the event.
}
