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
    const storyArr = new Array;
    let result = '';
    let resultLength = '';
    let posType = '';

    const nRegex = /^\s?\w+(\[[nvapct]\])?/i;
    const cRegex = /^\s?\W/i;

    while (rawStory.length){

    if (nRegex.exec(rawStory)){

      result = nRegex.exec(rawStory);
      resultLength = result[0].length;
      if (result[0][resultLength-1]==="]"){
      let checkLetter = result[0][resultLength-2];

      switch (checkLetter){
        case 'n': posType = 'noun';
                break;
        case 'v': posType ='verb';
                break;
        case 'p': posType = 'person';
                break;
        case 'c': posType = 'place';
                break;
        case 't': posType ='time';
                  break;
        default : posType = 'adj';
                break;
      }
      
      if(result[0][0]===' '){
        storyArr.push({
          word : result[0].substr(1,resultLength-4),
          pos: posType
        })
      }else{
      storyArr.push({
        word : result[0].substr(0,resultLength-3),
        pos: posType
      })}// PUSHING THE STRING TO THE ARRAY
      
      rawStory = rawStory.replace(result[0],'');
      
     }else{
      if(result[0][0]===' '){
        storyArr.push({
          word : result[0].substr(1,resultLength)
        })
      }else{
      storyArr.push({
        word : result[0].substr(0,resultLength)
      })}// PUSHING THE STRING TO THE ARRAY

      rawStory = rawStory.replace(result[0],'');

    }}else{

      result = cRegex.exec(rawStory);
      resultLength = result[0].length;
     

      if(result[0][0]===' '){
        storyArr.push({
          word : result[0].substr(1,resultLength),
        })
      }else{
      storyArr.push({
        word : result[0].substr(0,resultLength),
      })}// PUSHING THE STRING TO THE ARRAY

      rawStory = rawStory.replace(result[0],'');

    }}
    
    return storyArr;
  }
    
  

  /**
   * All your other JavaScript code goes here, inside the function. Don't worry about
   * the `then` and `async` syntax for now.
   * 
   * You'll want to use the results of parseStory() to display the story on the page.
   */
  getRawStory().then(parseStory).then((processedStory) => {
    let counter = 0;
    for (let i of processedStory){
      
    if(i.pos){
      createOutandInput(i, counter);
      counter ++;
    }else {
      createOutputStory(i);
    }}

    liveUpdate (counter);
    makeEnterWorkPls(counter);
  });




  // FUNCTIONS FOR processedStory()
  
  let createOutandInput = (i, counter) => {
    const edit = document.createElement('input');

    edit.type='text';
    edit.setAttribute('maxlength', '20')
    edit.setAttribute('id', `input${counter}`);
    edit.placeholder=i.pos;

    document.querySelector('.madLibsEdit').appendChild(edit);
    
    const preview = document.createElement('span');

    preview.innerHTML=`(${i.pos}) `
    preview.style.color="black";

    document.querySelector('.madLibsPreview').appendChild(preview);
  }

  let createOutputStory = (i) => {
    const storyEdit = document.createElement('p');
    const storyPreview = document.createElement('p');

    storyEdit.innerHTML=`${i.word} `
    storyPreview.innerHTML=`${i.word} `

    document.querySelector('.madLibsEdit').appendChild(storyPreview);
    document.querySelector('.madLibsPreview').appendChild(storyEdit);
  }

  let liveUpdate = (counter) => {
    for (let i = 0 ; i < counter ; i++){
      const edit = document.querySelectorAll('input')[i];

      edit.addEventListener('input', function (e){
      e.preventDefault();
      const value = edit.value;
      const result = document.querySelector('.madLibsPreview').querySelectorAll('span')[i];
      if(value===''){
      result.innerHTML= `(${edit.placeholder}) `;
      result.style.color="black";
      }else{
      result.innerHTML= value;
      result.style.color="#EAF8BF";
    }})}
  }

  function makeEnterWorkPls(counter){
    for (let i = 0 ; i < counter ; i++){
      console.log(document.querySelectorAll('input'));
      const edit = document.querySelectorAll('input')[i];

      edit.addEventListener('keydown',function(e){
      if (e.key === "Enter") {
      let id = e.target.id.substr(0,5);//(input)5
      let number= parseInt(e.target.id.substr(5,6));//input(5)
      number ++;//6
      if(number === counter){
        number = 0;
      }
      
      id+=number;//input6
      document.querySelector(`#${id}`).focus();
    } });}
  }
  document.querySelector('.menu-btn').addEventListener('click', () => document.querySelector('ul').classList.toggle('show'));