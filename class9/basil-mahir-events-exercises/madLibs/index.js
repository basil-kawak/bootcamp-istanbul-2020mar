// write your code hereconst 
el = document.getElementById("lib-button");

el.addEventListener("click", function() {
    // const noun = document.getElementById("noun").value;
    // const adjective = document.getElementById("adjective").value;
    // const personName = document.getElementById("person").value;
  
    const noun = document.querySelector("#noun").value;
    const adjective = document.querySelector("#adjective").value;
    const personName = document.querySelector("#person").value;
  
    document.getElementById("story").style.color = "red";
  
    // document.getElementById("story").innerText = `\n\"${personName} really likes ${adjective} ${noun}.\"`;
  
    document.getElementById("story").innerHTML = `<h1>\n\"${personName} really likes ${adjective} ${noun}.\"</h1>`;
  
    });
  
  