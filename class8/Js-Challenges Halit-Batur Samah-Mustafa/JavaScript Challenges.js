
// function socName (names){

//   let socName="";
  
//   names.sort();

//   for(let i=0; i < names.length; i++)
//   {
//     // socName= socName + names[i][0];
//     socName= socName + names[i].charAt(0);
//   }

// return socName;

// }

//let secretName=socName(["Ahmet","Mohammed","Sara"]);
//console.log(secretName);

// console.log(socName(["Ahmet","Mohammed","Sara"]));
// console.log(socName(["Harry", "Newt", "Luna", "Cho"]));
// console.log(socName(["Phoebe", "Chandler", "Rachel", "Ross", "Monica", "Joey"]));

////



// challange two

let result = "";
function chatroomStatus(users) {
// Second Attempt
  switch (users.length){

    case 0: result="no one online";
    break;

    case 1:result =users[0] +" online";
    break;

    case 2:result =users[0] + " and " + users[1] + " online";
    break;

    default: result =users[0]+","+users[1] +" and "+ (users.length-2) +" more online" ;
    break;
  
  }

  return result;
  }

console.log(chatroomStatus(""));
// chatroomStatus(["Emre"]);
// chatroomStatus(["Emre","Halit"]);
// chatroomStatus(["Emre","Halit", "Aydin"]);




// First Attempt
  // if (users.length==0) {
  //   result="no one online";
   
  // }
  //  else if (users.length==1) {
  //    result =users[0] +" online";
    
  // }
  // else if (users.length==2){
  //   result =users[0] + " and " + users[1] + " online";
   
  // }
  // else {
  //   result =users[0]+","+users[1] +" and "+ (users.length-2) +" more online" ;
   
  // }

  // return result;
// }

// console.log(chatroomStatus(["Halit", "Batur", "Zeyad"]));




// challange 3

let firstName= "Halit";
let lastName ="Batur";

// let fullName = firstName +" " + lastName;

function fullName (x,y){
 return x.concat(" ",y);
}
// let fullName=firstName.concat(" ",lastName);

console.log("Hello " + fullName(firstName,lastName) + "!");