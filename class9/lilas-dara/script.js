
let libButton = document.getElementById('lib-button');

libButton.addEventListener("click", function(e) {

let noun = document.getElementById("noun").value;
let adjective = document.getElementById('adjective').value;
let person = document.getElementById("person").value;
let message =  document.getElementById("story");

message.innerHTML = `${person} really likes ${adjective} ${noun}`;


});

 
