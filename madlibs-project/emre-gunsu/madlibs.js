
document.addEventListener("DOMContentLoaded", function () {
  //hotkeys, second assignment
  let blankSpaces = document.querySelectorAll(".inputs");
  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      if (document.activeElement === document.querySelectorAll(".inputs")[document.querySelectorAll(".inputs").length - 1]) {
        document.querySelector(".inputs").focus();
      } else { document.activeElement.nextElementSibling.focus(); }
    }
    

    //-------------------------------------------------------\\
  });
  
  document.getElementsByTagName('input')[0];
  
  
});

//live update, forth assignment 
document.addEventListener("input", function(e){
  let spans = document.getElementsByTagName('span');
  if(document.activeElement  instanceof HTMLInputElement && document.activeElement.type == 'text'){
    let inputElement = document.activeElement;
    let oldText = inputElement.value;
      for(let i=0;i<spans.length;i++){
          if(inputElement.getAttribute("id")==spans[i].getAttribute("id")){
            let newText=inputElement.value;
              if (newText==oldText){
                if(spans[i].innerText!= newText){
                    if(inputElement.getAttribute("class").includes("verb")){
                      spans[i].innerText = " "+newText+"(verb)";
                      spans[i].setAttribute("class", "input-font");
                    }
                    else if(inputElement.getAttribute("class").includes("noun")){
                      spans[i].innerText = " "+newText+"(noun)";
                      spans[i].setAttribute("class", "input-font");
                    }
                    else if(inputElement.getAttribute("class").includes("adjective")){
                      spans[i].innerText = " "+newText+"(adjective)";
                      spans[i].setAttribute("class", "input-font");
                    }
                  }   
                }
              else {
                oldText=newText;
              }
          }
      }      
  }
  });
//-------------------------------------------------------\\
function parseStory(rawStory) {
  let madLibsAll = [];

  let re = /([.,]|\b\w+\[(n|v|a|adv)\]|\b\w+\b)/g;
  let items = rawStory.match(re);

  let reForPunctuation = re = /[.,]/;
  let reForMadLibz = /\b\w+\[(n|v|a|adv)\]/g;
  let reForWords = /\b\w+\b/g;
  reForWords.test("is");

  for (let i = 0; i < items.length; i++) {
    let objecT = {};
    if (reForPunctuation.test(items[i])) {
      madLibsAll.push(createObjectWord(objecT, items[i]));
    }
    else if (reForMadLibz.test(items[i])) {
      if (items[i].includes("[n]")) {
        let item = items[i].substring(0, items[i].length - 3);
        madLibsAll.push(createObjectWordAndPOS(objecT, item, "noun"));
      }
      else if (items[i].includes("[v]")) {
        let item = items[i].substring(0, items[i].length - 3);
        madLibsAll.push(createObjectWordAndPOS(objecT, item, "verb"));
      }
      else if (items[i].includes("[a]")) {
        let item = items[i].substring(0, items[i].length - 3);
        madLibsAll.push(createObjectWordAndPOS(objecT, item, "adjective"));
      }
      else {
        console.log("error in else");
      }
    }
    else if (reForWords.test(items[i])) {
      madLibsAll.push(createObjectWord(objecT, items[i]));
    }
    else {
      // console.log("unlisted: "+ items[i])
      if (reForWords.test(items[i])) {
        madLibsAll.push(createObjectWord(objecT, items[i]));
      }
    }
  }
  return madLibsAll;
}



function createObjectWord(obj, val) {
  obj["word"] = val;
  return obj;
}
function createObjectWordAndPOS(obj, wordVal, posVal) {
  obj["word"] = wordVal;
  obj["pos"] = posVal;
  return obj;
}



getRawStory().then(parseStory).then((processedStory) => {
  let edit = document.getElementsByClassName("forStory")[0];
  let preview = document.getElementsByClassName("forStory")[1];
  let p1 = document.createElement("p");
  let p2 = document.createElement("p");
  edit.appendChild(p1);
  preview.appendChild(p2);

  var pEdit = document.querySelector(".forStory").getElementsByTagName("p")[0];
  var pPreview = document.querySelectorAll(".forStory")[1].getElementsByTagName("p")[0];



  for (let i = 0; i < processedStory.length; i++) {

    if (processedStory[i].pos === "adjective" || processedStory[i].pos === "noun" || processedStory[i].pos === "verb") {

      let val = processedStory[i].word + "("+processedStory[i].pos+")" ;
      let val1 = " ("+processedStory[i].pos+")" ;
      pEdit.innerHTML += ` <input id ="span${i}" class = "inputs ${processedStory[i].pos}" maxlength="20" type="text" placeholder = ${processedStory[i].pos} value = ""  maxlength="20">`;
      pPreview.innerHTML += `<span id = "span${i}"> ${val}</span>`;

    }
    else if (processedStory[i].word === "." || processedStory[i].word === ",") {

      let val = processedStory[i].word;
      pEdit.appendChild(document.createTextNode(val));
      pPreview.appendChild(document.createTextNode(val));
      edit.appendChild(pEdit);
      preview.appendChild(pPreview);


    }
    else {
      let val = processedStory[i].word;
      pEdit.appendChild(document.createTextNode(" " + val));
      pPreview.appendChild(document.createTextNode(" " + val));
      edit.appendChild(pEdit);
      preview.appendChild(pPreview);
    }




  }
});
