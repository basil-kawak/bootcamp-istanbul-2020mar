// Task-0 of "Coding Challenges-1"
// "Secret Society" challenge.
console.log("Task-0 \"Secret Society\":")
console.log("------------------------");
// declaring & initializing members' arrays
let societyMembers_1 = ["Adam", "Sarah", "Malcolm"];
let societyMembers_2 = ["Harry", "Newt", "Luna", "Cho"]
let societyMembers_3 = ["Phoebe", "Chandler", "Rachel", "Ross", "Monica", "Joey"];
// sorting the arrays
societyMembers_1.sort();
societyMembers_2.sort();
societyMembers_3.sort();
// fuction to create the secret name
function secretName(membersArray){
  let secretName = "";
    for (let member in membersArray) {
      secretName += membersArray[member].charAt(0); // a += b  <=>  a = a + b
    }

  console.log("The secret name of the society is:");
  console.log("--> \" "+secretName+" \"");
}

secretName(societyMembers_1); // for the 1st array
secretName(societyMembers_2); // for the 2nd array
secretName(societyMembers_3); // for the 3rd array


console.log("\n######################################\n");


// Task-1 of "Coding Challenges-1"
// "Chat Room Status" challenge.
console.log("Task-1 \"Chat Room Status\":")
console.log("--------------------------");
// declaring & initializing chat rooms' arrays
let chatRoom_1 = [];
let chatRoom_2 = ["Liz"];
let chatRoom_3 = ["Liz", "Ammar"];
let chatRoom_4 = ["Liz", "Hakan", "Ammar", "Feras", "Jaime", "Derya"];
// fuction to return no. of online users in the chat room
function chatRoomStatus (chatRoomArray) {
  if (chatRoomArray.length == 0){
    console.log("no one online");
  }
  else if (chatRoomArray.length == 1){
    console.log(chatRoomArray[0]+" online");
  }
  else if (chatRoomArray.length == 2){
    console.log(chatRoomArray[0]+" and "+chatRoomArray[1]+" online");
  }
  else{
    console.log(chatRoomArray[0]+", "+chatRoomArray[1]+" and "+(chatRoomArray.length-2)+" more online");
  }
}

chatRoomStatus(chatRoom_1); // for the 1st array
chatRoomStatus(chatRoom_2); // for the 2nd array
chatRoomStatus(chatRoom_3); // for the 3rd array
chatRoomStatus(chatRoom_4); // for the 4th array


console.log("\n######################################\n");


// Challenge-3: "Concatenate First and Last Name Into One String and Write Out A Greeting"
console.log("Challenge-3 \"Concatenate 2 Strings\":")
console.log("------------------------------------");
// without a function:
//--------------------
const firstName = "Maher";
const lastName = "Suleyman";
// 1st way:
// const fullName= `${firstName} ${lastName}`;

// 2nd way:
// const fullName = firstName.concat(" ", lastName);

// 3rd way:
// const fullName = firstName + " " + lastName;

// 4th way:
// const fullName = [], space = " ";
// fullName.splice(0, 0, firstName+space+lastName);

// 5th way:
const fullName = [firstName + " " + lastName].join("");

////////////////////////////////////////
// result:
console.log(`Hello ${fullName}!`);
////////////////////////////////////////

// 6th way; directly and without the "fullName" variable:
// console.log(`Hello ${firstName} ${lastName}!`);

// with a function:
//-----------------
// 6th way:
function fullNameFunc (first, last) {
  const fullName= `${first} ${last}`;
  console.log(`Hello ${fullName}!`);
}
// result:
console.log("\n----------------------------------\n");
console.log("The following result is executed by a function:\n");

fullNameFunc("Maher", "Suleyman");
// NOTE: I wrote the 1st way in the function. However, you can write any of the previous statements


console.log("\n######################################\n");


// Optional Challenges:
///////////////////////
// 1st optional challenge "deleting the odd frequency elements from an array" :
console.log("Optional-1 \n\"Removing odd frequency elements from an array\":")
console.log("------------------------------------------------");
const array = [1, 3, 1, 3, 3, 4, 5, 5];

function removeOddFrequency (array) {
  const array_2 = [... array];
  const oddElements = [];
  // creating an array for odd frequency elements
  for (var i in array_2){
    let counter = 0;
    for (let j = 0 ; j < array_2.length ; j++) {
      if (array_2[i] == array_2[j])
        counter++;
    }
    if (counter % 2 != 0)
      oddElements.push(array_2[i]);
  }
  // comparing and deleting odd frequency elements from the original array
  for (j = 0 ; j < oddElements.length ; j++){
    for (var i in array_2){
      if (oddElements[j] == array_2[i]){
        array_2.splice(i, 1);
      }  
    }
  }
  console.log("\nThe array of even frequency elements:");

  console.log(array_2);
}

console.log("Original array:");
console.log(array);

removeOddFrequency(array);


console.log("\n######################################\n");


// 2nd  optional challenge "the smallest positive number that is evenly divisible by all of the numbers from 1 to 20"
function smallestDivisibleByRange (range) {
  var number = range;

  function divisionFunc(number){
    for (var i = 1 ; i <= 20 ; i++){
        if (number % i != 0)
          return false;
    }
    return true;
  }

  while (!(divisionFunc(number))){
    number += range;
  }
  console.log("Optional-2 :")
console.log("------------");
  console.log("The smallest positive number that is evenly divisible by all of the numbers from 1 to 20 is :\n")
  console.log("--> "+number);
}

smallestDivisibleByRange(20);


///////////////////////////////////
//  Made with love by Maher :)  //
//////////////////////////////////