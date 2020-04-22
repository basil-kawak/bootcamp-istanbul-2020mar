let butVar = document.getElementById('lib-button');
let list = document.querySelectorAll('ul');
let listitem = document.querySelectorAll('li');
let nounItem = document.querySelector('#noun');
let adItem = document.querySelector('#adjective');
let perItem = document.querySelector('#person');
let storestory = document.querySelector('#story');
let items;


 //first and manuel way

//second and automate way
function makeMadLib (){
for(let i = 0; i < listitem.length ; i++){
   items = listitem[i].querySelector('input').value ;
    }
    storestory.innerHTML = `One and only ${items[0]} would truly appreciate  ${items[1]} people to be around of him like ${items[2]}`;
    
    toClear(); 
    
 }
 function toClear() {
      nounItem.value = '';
      adItem.value = '';
      perItem.value = '';
    };
 butVar.addEventListener("click", makeMadLib, false)