 //---------first----------//
 function getFirstSelector(x) {
    return document.querySelector(x);
  }
  console.log(getFirstSelector("#nested"));

//---------second----------//
  function nestedTarget() {
    return document.querySelector("#nested div.target");
  }
  console.log(nestedTarget());

//---------Third----------//

function increaseRankBy(n) {
    let ranks = document.querySelectorAll('ul.ranked-list li');
    for (let i = 0; i < ranks.length; i++) {
        ranks[i].innerHTML = parseInt(ranks[i].innerHTML) + n
    }
  }

//---------Forth----------//

function deepestChild() {
    return document.querySelector("#grand-node div div div div");
}
