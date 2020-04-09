

let varOne= 5;
isDivByFive(varOne);
varOne = 55;
isDivByFive(varOne);
varOne = 37;
isDivByFive(varOne);

let lessThanVarOne = 22;
let lessThanVarTwo = 15;
lessThan100(lessThanVarOne, lessThanVarTwo);

lessThanVarOne = 83;
lessThanVarTwo = 34;
lessThan100(lessThanVarOne, lessThanVarTwo);

fiboSums(4000000);



function isDivByFive(a){
  console.log( a%5===0);
}


function lessThan100(e, f) {
  if(e+f<100){
  console.log(false);
}
  else{
    console.log(true);
  }
}

function fiboSums(lim){
  let x = 1;
  let y = 2;
  let temp = 0;
  let sum = 0;
  while (x<=lim){
    //console.log(x); #commented out for the sake of the question
    if(x%2===0){
      sum = sum + x;
    }
    temp =x;
    x = y ;
    y = temp+x;
    
  }
  console.log("The sum is: "+ sum)
  
}
