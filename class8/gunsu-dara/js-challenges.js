let societyName = ["Gunsu" , "Dara", "Malcolm"];
alphabetical(societyName);

societyName = ["Harry", "Newt", "Luna", "Cho"];
alphabetical(societyName);
societyName = ["Phoebe", "Chandler", "Rachel", "Ross", "Monica", "Joey"];
alphabetical(societyName);
console.log("\n------------challenge one done------------\n");

function alphabetical(societyName){
  let initialsArray=[];
  for(let i =0; i<societyName.length;i++){
    initialsArray.push(societyName[i].charAt(0));
  } 

  initialsArray.sort();
  let namesOrdered = [];

  for(let j = 0; j<initialsArray.length;j++){
    for(let k =0; k<societyName.length;k++){
    if(societyName[k].charAt(0)==initialsArray[j]){
      namesOrdered.push(societyName[k]);
      societyName.splice(k, 1);
    }    
   } 
  }
  console.log(namesOrdered);
}
/////////////////////////////////////////////////////////////
function  users(userList){
  if (userList.length === 0){
    return 'no one online'
  }
else if (userList.length === 1){
  return userList[0]+' online'
}
else if (userList.length === 2){
  return userList[0]+ ' and ' + userList[1] + ' online'
}

 else{ 
   return userList[0]+ ', ' + userList[1] + ' '+(userList.length-2) +' more online'
  
}
}
console.log(users([]))
console.log(users(['Dara']))
console.log(users(['Dara','Gunsu']))
console.log(users(['Dara','Gunsu','Feras']))
console.log(users(['Dara','Gunsu','Feras', 'Ammar']))

console.log("\n------------challenge two done------------\n");
/////////////////////////////////////////////////////////////

let name="Günsu B.";
let surname= "Dal";
let fullName = setFullName(name,surname);
console.log("Hello "+ fullName);

function setFullName(n, sn){
  return  n + " " + sn;
}

console.log("\n------------challenge three done------------\n");