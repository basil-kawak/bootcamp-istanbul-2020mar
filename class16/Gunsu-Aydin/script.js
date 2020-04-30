


// document.addEventListener("DOMContentLoaded", function() {
  
//       });
  let form = document.getElementById("github-form");
  form.addEventListener("submit", function(e){
   e.preventDefault();
   let inputVal = document.getElementsByName("search")[0].value;
   
  fetch(`https://api.github.com/search/users?q=${inputVal}`).then(res => res.json()).then(res => {
    const container = document.getElementById('github-container').getElementsByTagName("ul")[0];
    const image = document.createElement("img");
    image.src = res.items[0].avatar_url;
    container.appendChild(image);
    const h2 = document.createElement("H2");
    h2.innerText =res.items[0].login;
    container.appendChild(h2);
    const a = document.createElement("a");
    a.setAttribute("href",`#`)
    a.innerText =res.items[0].login;
    container.appendChild(a);
    a.addEventListener("click",function(){
            

      fetch(`https://api.github.com/users/${inputVal}/repos`)
      .then(re => re.json())
      .then(function(res){
              e.preventDefault();

        const ul = document.querySelector("#repos-list");
        res.forEach((el)=>{
          const li = document.createElement("li");
          const anchor = document.createElement("a");
          anchor.setAttribute("href", el["html_url"]);
          anchor.innerHTML = `${el["name"]} <br>` ;
          ul.appendChild(li.appendChild(anchor));

        })
      })


    })
    

  });
    
  } );

  
