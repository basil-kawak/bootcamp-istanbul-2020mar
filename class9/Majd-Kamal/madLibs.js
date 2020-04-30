let button = document.getElementById('lib-button');
button.addEventListener("click", function makeMadLib(){

 
  let noun = document.getElementById('noun').value
  let adjective = document.getElementById('adjective').value
  let person = document.getElementById('person').value
  let p = document.getElementById('story');
      p.innerHTML = `${noun} really likes ${adjective} ${person}`;
      console.log(noun);
      
});

