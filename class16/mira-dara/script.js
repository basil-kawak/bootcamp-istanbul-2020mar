
function submit(){
  let submit= document.querySelector('#github-form');

  submit.addEventListener('click',function (e){
  e.preventDefault();

  let userName= document.getElementById('search').value;
  document.getElementById('search').value=' ';
  let configObject={
    method:"GET",
    header:{"Accept": "application/vnd.github.v3+json"}
  }
 
  fetch(`https://api.github.com/search/users?q=${userName}`,configObject)
  .then(Response => Response.json())
  .then((data) => {
      //console.log(Object.keys(data));
      // console.log(data["items"][0].login);
      // console.log(data["items"][0].avatar_url);
      // console.log(data["items"][0].url);
      findUser(data);
     
    })

});  
}
function findUser(data){
    let ul=document.getElementById('user-list');
    for(let i=0;i<data["items"].length;i++){
      let p=document.createElement('p');
      p.innerText= data["items"][i].login;
      p.addEventListener("click",function() {
          userRepo(data["items"][i].login);
      }, false);

      ul.appendChild(p); 
      let img= document.createElement('img');
      img.src=data["items"][i].avatar_url;
      img.width=100;
      img.addEventListener("click",function() {
          userRepo(data["items"][i].login);
      }, false);
      ul.appendChild(img);
      let a= document.createElement('a');
      a.innerHTML=`<a href=${data["items"][i].url}>page URL</a>`;
      a.addEventListener("click",function() {
          userRepo(data["items"][i].login);
      }, false);
      ul.appendChild(a);
    }
      

  }
function userRepo(userName){
 
  fetch(`https://api.github.com/users/${userName}/repos`)
  .then(Response => Response.json())
  .then((data) => {
    repos(data);
    });
  function repos(data){
     let repos=document.querySelector('#repos-list');
     for(const element of data){
      let li=document.createElement('li');
      li.textContent= JSON.stringify(element);
      repos.appendChild(li);
    }
  }
}

submit();
