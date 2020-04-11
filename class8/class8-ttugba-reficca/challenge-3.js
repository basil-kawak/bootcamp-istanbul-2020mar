// Instructions For The Exercise

// Concatenate First and Last Name Into One String and Write Out A Greeting
// In the console, define two variables. One should hold a first name and the other a last name. Then write code that will create a single string in the format “first last” and save that to a third variable. Finally, write code that will console.log a greeting to that person in this format: “Hello <full name>!” 

// One way
let firstName = ("John")
let lastName = ("Doe")

console.log(firstName + " " + lastName)

// Or another
let full = firstName.concat(" ", lastName);
console.log(full);
