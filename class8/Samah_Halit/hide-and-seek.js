// TARGETING FIRST CHILD 

function getFirstSelector(selector){
        return document.querySelector(selector);
}

// PULLING OUT .TARGET OUT OF #NESTED

function nestedTarget(){
        return document.querySelector('#nested').querySelector('.target');
}

// INCREASING ALL THE LIs THE .RANKED-LIST BY N

function increaseRankBy(n){x
    const lists = document.querySelectorAll('.ranked-list');

    for (let i=0 ; i < lists.length ; i++ ){
      let numbers=lists[i].children
       for (let z =0; z<numbers.length;z++){
         let temp = parseInt(numbers[z].innerHTML);
         numbers[z].innerHTML= temp + n;
       }
    }
}

// TARGETING THE DEEPESTCHILD OF #GRAND-NODE 

function deepestChild(){
     const grand=document.querySelector('#grand-node').querySelectorAll('div');
     const last=grand[grand.length - 1];
     return last;
}
  