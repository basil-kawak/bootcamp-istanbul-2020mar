
  function getFirstSelector(selector) {
    return document.querySelector(selector);
  }
  
  function nestedTarget() {
    return document.querySelector('#nested .target');
  }
  
  
  function increaseRankBy(n) {
    const list = document.quarySelectorAll('ul.ranked-list li')
    for (var i = 0; i < list.length; i++) {
        list[i].innerHTML = parseInt(list[i].innerHTML) + n;
      }
    }
  
  function deepestChild() {
    let gNode = document.querySelector('#grand-node')
    let nextNode = gNode.children[0];
    
    while (nextNode) {
      gNode = nextNode;
      nextNode = gNode.children[0];
    }
    return (gNode);
  }
  