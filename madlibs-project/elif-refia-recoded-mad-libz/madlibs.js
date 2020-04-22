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



  //////// Creating Input ///////
 let noun = document.createElement("INPUT");
 let adj = document.createElement("INPUT");
 let verb = document.createElement("INPUT");
 let excl = document.createElement("INPUT");
 document.addEventListener('DOMContentLoaded', () => {
    ////// NOUN /////
   noun.setAttribute("type", "text");
   noun.setAttribute("placeholder", "noun");
   document.getElementById('madLibsEdit').appendChild(noun);
   noun.addEventListener('change', function() {
    console.log('[n]: ' + this.value)
    setStory();
      }, false);
    noun.addEventListener('keypress', function(e) {
      if (e.keyCode == 13) {
        adj.focus();
        setStory();
        }
    });
    /////// ADJECTIVE ////////  
   adj.setAttribute("type", "text");
   adj.setAttribute("placeholder", "adjective");
   document.getElementById('madLibsEdit').appendChild(adj);
    adj.addEventListener('change', function() {
        console.log('[a]: ' + this.value)
        setStory();
      }, false);
      adj.addEventListener('keypress', function(e) {
        if (e.keyCode == 13) {
          verb.focus()
          setStory()
        };
      });
    ////// VERB /////////
  verb.setAttribute("type", "text");
  verb.setAttribute("placeholder", "verb");
  document.getElementById('madLibsEdit').appendChild(verb);
    verb.addEventListener('change', function() {
      console.log('[v]: ' + this.value)
      setStory();
      }, false);
    verb.addEventListener('keypress', function(e) {
      if (e.keyCode == 13) {
        excl.focus();
        setStory();
      };
      
    });
   ////// EXCLAMATION //////
  excl.setAttribute("type", "text");
  excl.setAttribute("placeholder", "exclamation");
  document.getElementById('madLibsEdit').appendChild(excl);
  excl.addEventListener('change', function() {
    console.log('[exc]: ' + this.value)
    setStory();
    }, false);
  excl.addEventListener('keypress', function(e) {
    if (e.keyCode == 13) {
      noun.focus();
      setStory();
    };
  });
  });/////// End of DOMcontentLoad Event ///////
  
 function setStory() {
  getRawStory().then(parseStory).then((processedStory) => {
    title = document.getElementById('title-h4')
    title.innerHTML = processedStory
  });
 };


function parseStory(rawStory) {
  let newStory = ''
  const splitBySpaces = rawStory.split(" ");
  for (let i = 0; i < splitBySpaces.length; i++) {
    
    if (splitBySpaces[i].indexOf('[n]') > 0) {
      splitBySpaces[i] = noun.value 
    } else if (splitBySpaces[i].indexOf('[v]') > 0) {
      splitBySpaces[i] = verb.value 
    } else if (splitBySpaces[i].indexOf('[adj]') > 0) {
      splitBySpaces[i] = adj.value
    } else if (splitBySpaces[i].indexOf('[exc]') > 0) {
      splitBySpaces[i] = excl.value
    }
    newStory += splitBySpaces[i] + ' '
  }
  return newStory; 
};

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */
getRawStory().then(parseStory).then((processedStory) => {
  console.log(processedStory);
});