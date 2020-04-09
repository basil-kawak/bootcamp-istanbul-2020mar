function divisibleByFive(num){
    if(num%5==0){
        return true;
    }
  else return false;
} 
console.log(divisibleByFive(5));
console.log(divisibleByFive(55));
console.log(divisibleByFive(37));
///2nd
function sumHundred(num1,num2){
var sum= num1+num2;
if(sum<100 ){
  return true;
}
else return false;
}
console.log(sumHundred(22,15));
console.log(sumHundred(83,34));
// 3rd
function evenFibonacci(){
  var first=1;
  var second=2;
  var sum;
  var sum2=0;
  for (let i=0;;i++){
    sum= first+second;
    if(sum%2==0){
      sum2+=sum;
    }
    first= second;
    second=sum;
    if(sum>4000000){
      break;
    }

  }
  console.log('Even febo sum = '+sum2);

}
evenFibonacci();