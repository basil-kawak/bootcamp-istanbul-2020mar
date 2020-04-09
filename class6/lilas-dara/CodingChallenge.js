// 1st 
function func(constFirst) {
    if(constFirst%5 == 0){
      console.log ("True");
    } else{
      console.log ("False");
    }
  }
  func(55); 
  
  
  //2nd
  function second(a,b) {
    if(a+b<100){
      console.log("True")
    } else{
      console.log ("False");
    }
  }
  second(432 ,50);
  
  
  //3rd 
  function adding(a,b) {
      b = a+1;
      let sum1 = a+b;
      let sum2 = sum1 + b;
      
        console.log(sum2);
      }
adding(2,3);