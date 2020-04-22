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
    // Your code here.
    const storyArr = new Array;
    let result;
    let pos1;

    const nRegex = /^\s?\w+\W[nva]\W/;
    // const vRegex = /^\s?\w+\Wv\W/;

    while (rawStory.length){
    if (nRegex.exec(rawStory)){
      result= nRegex.exec(rawStory);
      switch (result[0][result[0].length-2]){
        case 'n': pos1 = 'noun';
                break;
        case 'v': pos1 ='verb';
                break;
        default : pos1 = 'adjective';
                break;
      }
      
      if(result[0][0]===' '){
        storyArr.push({
          word : result[0].substr(1,result[0].length-4),
          pos: pos1
        })
      }else{
      storyArr.push({
        word : result[0].substr(0,result[0].length-3),
        pos: "verb"
      })}// PUSHING THE STRING TO THE ARRAY
      
      rawStory= rawStory.replace(result[0],'');
      
     }}
     console.log(storyArr)
     return storyArr;
    }

    // function parsingStory (result , rawStory, ...storyArr){
    //   storyArr.push({
    //     word : result[0].substr(0,result[0].length-3),
    //     pos: "noun"
    //   }) // PUSHING THE STRING TO THE ARRAY
    
    //   console.log(storyArr)
    //   // CHECKING IF THERE'S WHITE SPACE BEFORE
    //   switch(result.index){
    //   case 0:rawStory= rawStory.replace(result[0],'');
    //         break;
    //   case 1:rawStory= rawStory.replace(' ' + result[0],'');
    //       break
    //     }
        
    // }
  

  /**
   * All your other JavaScript code goes here, inside the function. Don't worry about
   * the `then` and `async` syntax for now.
   * 
   * You'll want to use the results of parseStory() to display the story on the page.
   */
  getRawStory().then(parseStory).then((processedStory) => {
    console.log(processedStory);
  });
  