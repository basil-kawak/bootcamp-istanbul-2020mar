//------first java JavaScript coding challenge----//

let names = ["Hakan", "Basil", "Hassan", "Ammar"];

let orgNam = [];

for (let i = 0; i < names.length; i++) {
  names[i][0];
  orgNam.push(names[i][0]);
  
}
orgNam.sort();
console.log(orgNam.join(''));


//------Second java JavaScript coding challenge----//
function test(myarray) {
  const mystring =  myarray.toString();
  const studentNum = (myarray.length - 2) ;

  if(myarray.length === 0){
    console.log("no one is online");
  }else if(myarray.length === 1){
    console.log(mystring + " is only online");
  }else if(myarray.length === 2){
    console.log(myarray[0] + " and " + myarray[1] + " are online");
  }else{
    console.log(myarray[0] + ", "  + myarray[1] + " and other " + studentNum + " are online ");
  }
    
};

test(["basil", "othman", "abdo", "abo", "j7ash"]);

//------Third java JavaScript coding challenge----//

////////////////////////////first solution///////////////////////////
let firstName = 'Hakan';  
let lastName = ' Yildiz';

function greeting() {
  let fullName = firstName + lastName;
  console.log (`Hello  ${fullName}`)
}
greeting();
////////////////////////////Second Solution///////////////////////////
function greeting(firstName, lastName) {
  console.log (`Hello ${firstName} ${lastName}`)
}

greeting("basil", "hassan");

