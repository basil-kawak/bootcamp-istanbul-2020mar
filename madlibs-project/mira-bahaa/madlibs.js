function parseStory(rawStory) {
  let splitStory=rawStory.split(' ');
  let noun =/n(?=])/;
  let verb =/v(?=])/; 
  let adj =/a(?=])/; 
  let arr= [];
  for(const element of splitStory){
    if(element.endsWith('.')||element.endsWith(',')){ 
      let dc=element.slice(-1);
      pos(element.replace(dc,''));
      arr.push(createObject(dc,''));
      }
    else{
      pos(element);
      }
    } 
  function pos(word){
    if(noun.test(word)){
        let retN = word.replace('[n]','');
        arr.push (createObject(retN,'noun'));
      }
    else if(verb.test(word)) {
        let retV = word.replace('[v]','');
        arr.push (createObject(retV,'verb'));  
      }
    else if(adj.test(word)){
        let retA = word.replace('[a]','');
        arr.push (createObject(retA,'adj'));
      }
    else{
      arr.push(createObject(word,''));
      }
    }
  function createObject(word,pos){ 
    let newObj = {
    word : word,
    pos : pos };
    if(pos==''){
      delete newObj.pos;
      }
    return newObj; 
    }
  return arr; 
}

function addElements(processedStory){
  let div= document.querySelector('.madLibsEdit');
  let par = document.createElement("p");
  div.appendChild(par);
  for (const element of processedStory){
    if(element.pos=='noun'){
      let nInput = document.createElement("input")
      nInput.type = "text";
      nInput.placeholder="noun";
      nInput.maxLength="20";
      par.appendChild(nInput);
      }
    else if(element.pos=='verb'){
      let vInput = document.createElement("input");
        vInput.type = "text";
        vInput.placeholder="verb";
        vInput.maxLength="20";
        par.appendChild(vInput);
      }
    else if(element.pos=='adj'){
      let aInput = document.createElement("input");
        aInput.type ='text';
        aInput.placeholder="adj";
        aInput.maxLength="20";
        par.appendChild(aInput);
      }
    else{
       let text = document.createTextNode(" "+element.word+" ");
       par.appendChild(text);
      }
    }
} 
function preview(processedStory) {
  let div= document.querySelector('.madLibsPreview');
  let par = document.createElement("p");
  div.appendChild(par);
  for (const element of processedStory){
     if(element.pos==='noun'){
      let nOutput = document.createElement("span");
        nOutput.textContent="(noun)";
        nOutput.style.color = "#acdae6";
      par.appendChild(nOutput);
      }
    else if(element.pos==='verb'){
      let vOutput = document.createElement("span");
      vOutput.textContent= "(verb)";
      vOutput.style.color="#acdae6";
      par.appendChild(vOutput);
      }
    else if(element.pos==='adj'){
      let aOutput = document.createElement("span");
      aOutput.textContent= "(adj)";
      aOutput.style.color= "#acdae6";
        par.appendChild(aOutput);
      }
    else{
       let text = document.createTextNode(" "+element.word+" ");
       par.appendChild(text);
      }
    }
    
}
function moveNext(){
  let inputArr = document.querySelectorAll("input[type='text']");
  let j=1;
  let i=0;
  while(j<inputArr.length){
    let next= inputArr[j++];
    inputArr[i].addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
      if(!e.target.value){
        alert("please fill the blank");
      }
      else{
        next.focus();
      }
    
    } });
    i++
  }
}

function liveUpdate(){
  let inputArr = document.querySelectorAll("input");
  let spans = document.querySelectorAll("p span");
  for(let i=0; i<inputArr.length;i++){
    let test =spans[i].textContent;
    inputArr[i].addEventListener('input',function(){
        spans[i].textContent=inputArr[i].value;
        spans[i].style.color="#c1e1e8";
        if(spans[i].textContent.length===0){
          spans[i].innerText= test;
          spans[i].style.color='red';
        }
    
      });
  }
     
}
getRawStory().then(parseStory).then((processedStory) => {
    addElements(processedStory);
    preview(processedStory);
    moveNext();
    liveUpdate();
  });