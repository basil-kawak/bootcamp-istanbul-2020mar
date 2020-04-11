//first function 
function getFirstSelector(selector) {
  return document.querySelector(selector).innerHTML;
}
getFirstSelector(".ranked-list");

//second function 
function nestedTarget(selector) {
  let nested = document.querySelectorAll(selector);

  console.log(nested[nested.length- 1].textContent);
}
nestedTarget("#nested");

//third function 
function increaseRankBy(n){
  let lis= document.getElementById('app').querySelectorAll('ul.ranked-list li');
    for (let i = 0; i < lis.length; i++) {
      let item = lis[i].textContent.toString();
      item= parseInt(item,10)+n;
      lis[i].textContent= item;
      
      console.log(item);
    }
}
increaseRankBy(1);

// fourth function
function deepestChild(selector){
  let grandChild = document.querySelectorAll(selector);
  console.log(grandChild[grandChild.length- 1].textContent);

}
deepestChild('div#grand-node');