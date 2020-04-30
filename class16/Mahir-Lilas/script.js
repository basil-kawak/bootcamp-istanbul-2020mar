// fetching users data of GitHub website 
document.getElementById("github-form").addEventListener("submit", function(e){
    e.preventDefault();
  
    // clearing previous search results
    document.getElementById("user-list").innerHTML = "";
    document.getElementById("repos-list").innerHTML = "";
  
    let x = document.getElementById("search").value;
    let url = "https://api.github.com/search/users?q=" + x;
    // console.log(url); 
    fetch(url)
      .then( res => {
        return res.json()
      })
      .then( json => {
        printInfo(json);
    
        // Here you process the results and
        // 1. Get some info about the users (your choice, open-ended)
        // 2. Loop through the JSON as we did in the demo
        // 3. Add elements to the page (using innertext or innerhtml or appendchild) to display information about the users.
        // And it needs to be in here, the function inside then().
        
      });
  
      e.target.reset();
  });
  
  
  
  
  
  
  function printInfo(json) {
    // console.log(json);
    // determining users number of our search 
    let total_count = json.total_count;
  
    // a loop to create list of all users of our search
    for (let i = 0 ; i < total_count ; i++) {
  
      // creating constructure of our lists
      let li = document.createElement("li");
      let ul = document.createElement("ul");
      let btn= document.createElement("button");
      let li1 = document.createElement("li");
      let img = document.createElement("img");
      let li2 = document.createElement("li");
      let anchor = document.createElement("a");
      let li3 = document.createElement("li");
      let br = document.createElement("br");
      
      // Saving data to our lists
      li1.innerHTML = `UserName: <b style="color:red">${json.items[i]["login"]}</b>  `;
      img.setAttribute("src", `${json.items[i]["avatar_url"]}`);
      img.setAttribute("width", `${75}`);
      li2.appendChild(img);
  
      // creating link to user's profile
      anchor.innerHTML = `go to <b>${json.items[i]["login"]}</b> profile.`;
      anchor.setAttribute("href", `${json.items[i]["html_url"]}`);
      li3.appendChild(anchor);
  
      // setting up a button for user's repos
      btn.textContent = "repos";
      btn.addEventListener("click", function() {
        
        // scrolling to user's repos list
        const element= document.querySelector("#repos-list");
        element.scrollIntoView();
  
        let repos = document.getElementById("repos-list");
        repos.innerHTML = "";
  
        let allUserRepos = httpGet(json.items[i]["repos_url"]);
   
        if (allUserRepos.length == 0) {
  
          let liName = document.createElement("li");
          liName.innerHTML=`<b>Repositories of <span style="color:red"><i>${json.items[i]["login"]}</i></span> :<b>`;
          let ulRepos = document.createElement("ul");
          let liRepo = document.createElement("li");
          liRepo.classList.add("none_li");
          liRepo.innerHTML = `<h3 style="color:gold">Sorry! this user has NO repos !!</h3>`;
          ulRepos.appendChild(liRepo);
          liName.appendChild(ulRepos);
          repos.appendChild(liName);
  
        } else {
  
          let liName = document.createElement("li");
          liName.innerHTML=`<b>Repositories of <span style="color:red"><i>${json.items[i]["login"]}</i></span> :<b>`;
  
          // a loop to create list of all user's respos
          for (let i = 0 ; i < allUserRepos.length ; i++) {
  
            let ulRepos = document.createElement("ul");
            let liRepo = document.createElement("li");
            liRepo.classList.add("circle_li");
            liRepo.innerHTML = allUserRepos[i];
            ulRepos.appendChild(liRepo);
            liName.appendChild(ulRepos);
  
          }
  
          repos.appendChild(liName);
  
        }
  
      });
  
      li.innerHTML = `<b style="text-decoration: underline; color: darkgreen">User ${i+1}: </b>`;
      li1.classList.add("circle_li");
      li2.classList.add("none_li");
      li3.classList.add("circle_li");
  
      // Appending all children and displaying info
      li1.appendChild(btn);
      ul.appendChild(li1);
      ul.appendChild(li2);
      ul.appendChild(li3);
      li.appendChild(ul);
      document.getElementById("user-list").appendChild(li);
      document.getElementById("user-list").appendChild(br);
  
    }
  
  }
  
  // function to get user's repos
  function httpGet(repoUrl) {
      const xmlHttp = new XMLHttpRequest();
      xmlHttp.open( "GET", repoUrl, false ); // false for synchronous request
      xmlHttp.send( null );
  
      // getting all user's repos info after parsing the data 
      const data = xmlHttp.responseText;
      const jsonResponse = JSON.parse(data);
  
      // creating an array to carry all user's repos
      let allUserRepos = [];
      for (let i = 0 ; i < jsonResponse.length ; i++) {
        allUserRepos.push(jsonResponse[i]["name"]);
      }
  
      return allUserRepos;
  }
  
  window.onload = function() {
    console.log("Page loaded!");
  };
  
  