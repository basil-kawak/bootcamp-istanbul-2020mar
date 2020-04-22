// console.log('Your code here.'

let submit = document.querySelector('#github-form');
let search = document.querySelector('#search');
let userList = document.querySelector('#user-list');

submit.addEventListener('submit', function(e){
//   console.log('baba')
  e.preventDefault();
  let input = search.value;
   fetch('https://api.github.com/search/users?q=' + input)
    .then(res => res.json())
    .then(function(json) {   
    //    console.log(json);
       let items = json.items;
    //    console.log(items)
       let h1 = document.createElement('h1').innerText = 'Users';
    //    console.log(h1);
       for (const element of items) {
        //  console.log(element)
        h1 += `<div class"user">
        <h3>${element.login}</h3>
        <img src="${element.avatar_url}" width="50px"/>
        <p>${element.html_url}</p>
        </div>`;
       }
       userList.innerHTML = h1;

})
})



