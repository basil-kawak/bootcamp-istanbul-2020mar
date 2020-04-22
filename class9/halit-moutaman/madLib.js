noun = document.querySelector('#noun');
adj = document.querySelector('#adjective');
person = document.querySelector('#person');
story = document.querySelector('#story');
libBtn = document.querySelector('#lib-button');
libBtn2 = document.querySelector('#lib-button-2');

function makeMadLib (x) {
if(x===1){
let p = document.createElement('p');
p.innerHTML=`${person.value} really likes ${noun.value} ${adj.value}`;
story.appendChild(p);
}else if (x===2) {
let p = document.createElement('p');
p.innerHTML=`${person.value} really hates ${noun.value} ${adj.value}`;
story.appendChild(p);
}
person.value="";
noun.value="";
adj.value="";
}


libBtn.addEventListener("click", function(e){
makeMadLib(1);
e.preventDefault();
});

libBtn2.addEventListener("click", function(e){
makeMadLib(2);
e.preventDefault();
});