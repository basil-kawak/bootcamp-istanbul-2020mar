let btn = document.getElementById("btn");
let input = document.getElementById("search");
let container = document.querySelector("#github-container")
let theList = document.querySelector("#user-list")

btn.addEventListener("click", function(e) {
  e.preventDefault();

  fetch(`https://api.github.com/search/users?q=${input.value}`)

  .then((response) => {

    return response.json();
  })

  .then((userInfo) => {
    //console.log(userInfo);
    console.log("----------------")
    //console.log(userInfo.name);

    //Loop on users
    
 for (let i = 0; i < userInfo.items.length; i++) {
        console.log(userInfo.items[i].login);

        let aUser = document.createElement("li");

        //Create user name text + avatar + profile-link
        let userName = document.createTextNode(userInfo.items[i].login);

        let avatar = document.createElement("img");
        avatar.src = userInfo.items[i].avatar_url;
        avatar.setAttribute("class", "avatar-img");

        let profileLink = document.createElement("a");
        profileLink.href = userInfo.items[i].html_url;
        profileLink.innerText = "visit profile";



        //Append user name to list item ("li")
        aUser.appendChild(userName);
        aUser.appendChild(avatar);
        aUser.appendChild(profileLink);


        //Append list item to unordered list ("ul")
        theList.appendChild(aUser);
        

        //Append unordered list ("ul") to the github-container
        container.appendChild(theList);
 }


  });

})



//Using the results of the search, display information about the users to the page. (You might include showing their username, avatar and a link to their profile.)
//users[i]