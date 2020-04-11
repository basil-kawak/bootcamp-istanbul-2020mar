function getFirstSelector(selector){
  return document.querySelector(selector);
}

function nestedTarget(){
  return document.getElementById("nested").querySelector(".target");
}

function increaseRankBy(n){
  let rankedLists= document.getElementsByClassName("ranked-list");
  for(let i = 0; i<rankedLists.length; i++){
    let listElements=rankedLists[i].getElementsByTagName("li");
    for(let j =0; j<listElements.length; j++){
      listElements[j].innerHTML= parseInt(listElements[j].innerHTML) + n;

    }
  }
}

function deepestChild(){
  let childsOfGrandNode = document.getElementById("grand-node").getElementsByTagName("div");
  return childsOfGrandNode[childsOfGrandNode.length-1];
}
