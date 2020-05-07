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
 *  { word: "to" },
 *  { word: "the" },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 * 
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */
function parseStory(rawStory) {
  const array = []
  const storyArr = rawStory.split(' ');
  
    let noun = /n(?=])/;
    let verb = /v(?=])/;
    let adjective = /a(?=])/;

    for (let i= 0; i<storyArr.length; i++){
      let word = storyArr[i]
      let last = word[word.length-1]
      if (last == "," || last == ".") {
         word = word.slice(0, word.length - 1)
      }
      if (noun.test(word)) {
            let replaceN = word.replace('[n]', '');
            array.push({"word": replaceN, 'pos': 'noun'});

        } else if (verb.test(word)) {
            let replaceV = word.replace('[v]', '');
            array.push({"word": replaceV, 'pos': 'verb'});

        } else if (adjective.test(word)) {
            let replaceA = word.replace('[a]', '');
            array.push({"word": replaceA, 'pos': 'adjective'});
        } else {
            array.push({"word": word});
        }
      if (last == "," || last == ".") {
        array.push({"word": last})
      } 
    }
    
  
   // Your code here.
   return array;
}

  

  /**
   * All your other JavaScript code goes here, inside the function. Don't worry about
   * the `then` and `async` syntax for now.
   * 
   * You'll want to use the results of parseStory() to display the story on the page.
   */

getRawStory().then(parseStory).then((processedStory) => {
  console.log(processedStory);
  output(processedStory);
});


function output(array){
for (let i=0; i< array.length; i++){
  let edit= document.getElementsByClassName('madLibsEdit')[0]
  let prev= document.getElementsByClassName('madLibsPreview')[0]
if (!array[i].pos){
  let span = document.createElement("span")
  span.innerText= array[i].word + " "
  let prevSpan = document.createElement("span")
  prevSpan.innerText= array[i].word + " "
  edit.appendChild(span)
  prev.appendChild(prevSpan)
}else if (array[i].pos) {
  let input = document.createElement("input")
  input.setAttribute('placeholder', `${array[i].pos}`)
  input.setAttribute('maxlength', `20`)
  edit.appendChild(input)
  let prevSpan = document.createElement("span")
  prevSpan.innerText= `(${array[i].pos}) `
  input.oninput= function(){
    if(this.value){
    prevSpan.innerText = this.value + " "
    prevSpan.style.color = "gold"
    } else {
      prevSpan.innerText= `(${array[i].pos}) `
    }
  }
  prev.appendChild(prevSpan)
}

}
}

// document.getElementById("").oninput = function {
//   document.querySelector("").innerHTML = this.value;
// }

/*
input.onkeyup = function(e) {
    if () {
       e.preventDefault();
       var nextInput = input.get(input.index(document.activeElement) + 1);
       }else {
          nextInput.focus();
       }
    }
};
*/
document.addEventListener("DOMContentLoaded", function () {
////////////////////
///
document.addEventListener("keypress", function blanks(e) {
  if (e.key === "Enter") {
    if (document.activeElement === document.querySelectorAll("input")[document.querySelectorAll("input").length - 1]){
      document.querySelector("input").focus();//to go to first input from the last
    } else {
      var el = document.activeElement;
      var nextStop = getNextSibling(el, 'input')
      nextStop.focus();
    }
  }

    function getNextSibling(elem, selector) {
	// Get the next sibling element
	var sibling = elem.nextElementSibling;
	// If the sibling matches our selector, use it
	// If not, jump to the next sibling and continue the loop
	while (sibling) {
		if (sibling.matches(selector)) 
    return sibling;
		sibling = sibling.nextElementSibling;
	}
};
} )
////////////////////
})

/*
var getNextSibling = function (elem, selector) {

	// Get the next sibling element
	var sibling = elem.nextElementSibling;

	// If the sibling matches our selector, use it
	// If not, jump to the next sibling and continue the loop
	while (sibling) {
		if (sibling.matches(selector)) return sibling;
		sibling = sibling.nextElementSibling
	}
var nextStop = getNextSibling(findMe, '.stop-here')
};
*/