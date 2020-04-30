//https://github.com/learn-co-curriculum/js-github-project
//documentation - https://developer.github.com/v3/


let submitQuery = document.getElementById('submitquery');
let searchBox = document.getElementById('search');
let usersList = document.getElementById('user-list');
let reposList = document.getElementById('repos-list');



submitQuery.addEventListener('click', function(e) {
    e.preventDefault();

    let searchVariable = searchBox.value;
    fetch('https://api.github.com/search/users?q=' + searchVariable)
    .then( res => res.json())
    .then( res_json => {
      let usersArr = res_json.items;

      usersList.innerHTML = "";

      
      for (let i = 0; i < usersArr.length; i++) {
        let user = usersArr[i];
        let userLi = document.createElement("li");
        let userImg = document.createElement("img");
        userImg.setAttribute("src", user["avatar_url"]);
        userImg.style.width = "auto";
        userImg.style.height = "20em";

        let userInfoDiv = document.createElement("div");
        let userLogin = document.createElement("a");
        userLogin.innerText = user["login"];
        userLogin.setAttribute("href", user["html_url"]);
        userLogin.setAttribute("target", "_blank");

        
        let repoUrl = document.createElement("button");
        repoUrl.innerText = "Go to repos";

        repoUrl.addEventListener("click", function(e) {
          fetch(user["repos_url"])
          .then(res => res.json())
          .then(reposArr => {
            reposList.innerHTML = `${user["login"]}'s Repositories`;
            for (let repo of reposArr) {
              let repoLi = document.createElement("li");
              let repoLink = document.createElement("a");
              repoLink.setAttribute("href", repo["html_url"]);
              repoLink.setAttribute("target", "_blank");
              repoLink.innerText = repo["name"];
              
              repoLi.appendChild(repoLink);
              reposList.appendChild(repoLi);
            }
          })
        });


        userInfoDiv.appendChild(userLogin);
        userInfoDiv.appendChild(repoUrl);
        userLi.appendChild(userImg);

        userLi.appendChild(userInfoDiv);
      

        usersList.appendChild(userLi);
        
        console.log(user)
      }
    });
})


