Instructions For The Exercise

//Secret Society?
//A group of friends have decided to start a secret society. The name will be the first letter of each of their names, sorted in alphabetical order.
//In the console, create a function that takes in an array of names and returns the name of the secret society.

//Notes:

//If you get stuck on a challenge please search it online and try to find resources
//If you are really stuck, please ask your Instructors.

let name = ['tugba', 'refia'];

name.sort();
console.log(name)

function secretSociety(name) {
  let groupArray = [];
  for (let i = 0; i < name.length; i++) {
    let secretName = name[i].charAt(0);
    groupArray.push(secretName);
  }
  console.log(groupArray.join(""));

}

secretSociety(name)