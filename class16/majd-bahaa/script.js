const myForm = document.getElementById('github-form');
myForm.addEventListener("submit", function(e){
  e.preventDefault();
  
  function printResult(json){
    let list = document.getElementById('user-list');
    // const object = {};
    for (const object of json){
      console.log(object);
      let userli = document.createElement('li');
      userli.innerHTML = object.login;
      list.appendChild(userli);
      let profileli = document.createElement('li');
      profileli.innerHTML = object["html_url"];
      list.appendChild(profileli);
      let avatar = document.createElement('img');
          avatar.src = object['avatar_url'];
          avatar.width = 200;
          list.appendChild(avatar);

    }
    
  }
  
let input = document.getElementById('search').value;
    

let url = `https://api.github.com/search/users?q=${input}`;

  // Here, you need to replace 'octocat' with the string that the input contains.
fetch(url)
.then(function(response){
  return response.json();
})
.then(function(json) {
  console.log(json);
  // Here, you need to use printResult to add things to the page.
 printResult(json.items);
  
});
});





