// Sovling tasks without functions

// 1st task: " Divisible By Five? "
//---------------------------------
console.log("1st task: \" Divisible By Five? \"");
console.log("--------------------------------");
let number = 5;
console.log("\nFor number [ "+ number+" ] : ");
if (number % 5 == 0)
  	console.log("--> "+true);
else
  	console.log("--> "+false);

number = 55;
console.log("\nFor number [ "+ number+" ] : ");
if (number % 5 == 0)
  	console.log("--> "+true);
else
  	console.log("--> "+false);

number = 37;
console.log("\nFor number [ "+ number+" ] : ");
if (number % 5 == 0)
  	console.log("--> "+true);
else
  	console.log("--> "+false);

console.log("\n........................");
console.log("........................\n");


// 2nd task: " Less than 100? "
//-----------------------------
console.log("2nd task: \" Less than 100 ? \"");
console.log("------------------------------");
let number1 = 22;
let number2 = 15;
let sum = number1 + number2;
console.log("\nFor numbers ( "+ number1+" , "+ number2 +" ) : ");
if (sum < 100)
  	console.log("--> "+true);
else
  	console.log("--> "+false);

number1 = 83;
number2 = 34;
sum = number1 + number2;
console.log("\nFor numbers ( "+ number1+" , "+ number2 +" ) : ");
if (sum < 100)
  	console.log("--> "+true);
else
  	console.log("--> "+false);
  
console.log("\n........................");
console.log("........................\n");


// 3rd task: " Sum of the even-valued terms in Fibonacci: "
//--------------------------------------------
console.log("3rd task:\n\" Sum of the even-valued terms in Fibonacci: \"");
console.log("----------------------------------------------");
var term1 = 0, term2 = 1, evenSum = 0;
const lim = 4000000;
while(term2 <= lim) {
  temp = term2;
  term2 += term1;
  term1 = temp;
  if (term2 % 2 == 0)
    evenSum += term2;
}
console.log("Sum of all terms = "+term2);
console.log("Sum of even terms = "+evenSum);

console.log("NOTE: I have written functions for the previous tasks,");
console.log("these functions are bellow!!!!");


/* Solving tasks with functions:

1st task: " Divisible By Five? "
--------------------------------
function divisibleByFive(number) {
	mod = number % 5;
  if (mod == 0)
  	return true;
  else
  	return false;
}
console.log(divisibleByFive(5));
console.log(divisibleByFive(55));
console.log(divisibleByFive(37));


2nd task: " Less than 100 ? "
-----------------------------
function sumOfTwoNumbers(num1, num2) {
  sum = num1 + num2;
  if (sum < 100)
  	return true;
  else
  	return false;
}
console.log(sumOfTwoNumbers(22, 15));
console.log(sumOfTwoNumbers(83, 34));


3rd task: " Sum of the even-valued terms in Fibonacci: "
--------------------------------------------
function fibonacci(number) {
  number1 = 0;
  number2 = 1;
  sum = 0;
  let number3;
  if (number < 0)
    return console.log("Please insert a positive number!!");
  else if (number == 0 || number == 1)
    return console.log("Sum of the even terms = "+sum);
  else {
    for(i=2 ; i < number ; i++){
      number3 = number1 + number2;
      if (number3 % 2 == 0)
        sum += number3;
      number1 = number2;
      number2 = number3;
    }
  }
}

fibonacci(5);

*/





