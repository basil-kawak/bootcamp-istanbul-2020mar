const idInput = document.querySelector('#search')
const searchBtn = document.querySelector('#github-form')
const ul = document.querySelector('#user-list');
const repoUl = document.querySelector('#repos-list');
let id='';

searchBtn.addEventListener('submit', function (e){
  e.preventDefault();
  id=idInput.value;
  ul.innerHTML="";
  repoUl.innerHTML="";
  findUsers(id);
})


function findUsers (id){
fetch (`https://api.github.com/search/users?q=${id}`)
  .then(resp => resp.json())
  .then(json => outputUsers(json))
  .catch(error => console.log(error.message))
  }


function outputUsers (json){
    console.log(json);
    const users = json.items;
    for(let i = 0 ; i<users.length ; i++){
      let li = document.createElement('li');
      li.innerHTML=`<img src=${users[i].avatar_url} width=50px /> <h2>${users[i].login}</h2><a href="#" class='user' id="${users[i].login}"> Repos</a>  <a href="${users[i].html_url}" target="_blank">Profile link</a> `
      ul.appendChild(li);
    }

  const repo = document.querySelectorAll('.user');

  repo.forEach(item => {
  item.addEventListener('click', function (e){
    ul.innerHTML=e.target.parentNode.innerHTML;
    fetch(`https://api.github.com/users/${e.target.id}/repos`)
    .then (resp => resp.json())
    .then(json => outputRepos(json))
    .catch(error => console.log(error.message))
  })
})
  }



function outputRepos (json){
console.log(json);
let repo = "";
for(let i=0; i<json.length;i++){
repo= json[i].name
let li = document.createElement('li');
      li.innerHTML=`Repo Name: ${repo}`
      repoUl.appendChild(li);}

}