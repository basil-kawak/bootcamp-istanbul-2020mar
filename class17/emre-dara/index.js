//------------------------------------------------------------
//let arr= [...arg];
  /*let map1 = arg.map(function(dara) { 
    return dara.toUpperCase() })*/
let capitalize = (arg) => {
  let make1 = arg.split(' ');
  let map1 = make1.map(x => x.toUpperCase());
  return map1.join(' ');
}
let mapStr1 = "dara emre baha";
console.log("answer of q1: " + capitalize(mapStr1));

//------------------------------------------------------------
let mapStr2 = "it is just an example";
let swapCase = (string) => {
  let make2 = string.split(' ');
  let takeIT2 = make2.map((arg2, index) => (index%2 == 0) ? capitalize(arg2) : arg2)
  return takeIT2.join(' ');
}
console.log("answer of q2: " + swapCase(mapStr2));

//------------------------------------------------------------
//abc -> bcd
let shiftLetters = (string) => {
let make3 = string.split(' ').join('').split('');
let shiftedDown = [];
let takeIT3 = make3.map((letters, index) => {
   shiftedDown.push(String.fromCharCode(letters.charCodeAt(0) + 1));
  })
  return shiftedDown.join('');
}
let mapStr3 = "abcde";
console.log("answer of q3: " + shiftLetters(mapStr3));

/*REDUCE
//------------------------------------------------------------*/
let obj = {};
let checkArr = [];
let redOne = (string) => {
  let createArr = string.split('');  
  createArr.reduce((acc, curr, index) => {
   //obj[curr] = index;
    //return console.log(obj)
    //return obj;
    if (!checkArr.includes(curr)) {
    console.log(Object.assign(obj, {[curr]: index}))}
    else {
    console.log(Object.assign(obj, {[curr + " of " + index]: index}))}
    checkArr.push(curr);
    //return Object.assign(obj, {[curr]: index});
    //return Object.entries(obj)
  }, 0);
  /*for(let key of createArr) {
    obj[key] = index;
  }*/
}
let reduceStr1 = "heidididi";
redOne(reduceStr1);
/*
2) Write a function that takes a string and a target, and returns true or false if the target is present in the string. Use .reduce to accomplish this.

ex. isPresent('abcd', 'b') // => true
ex. isPresent('dara', 't') // => false

const isPresent = function(string, target) {
  // your code
}*/
let isPresent = (string, target) => {
    let gatherArr = string.split('');
    console.log(gatherArr[1] + "-" + target);
    console.log(gatherArr.reduce((acc, curr) => {
      if (curr === target){
        return curr} }, 0));
}
let reduceStr2 = "abcd";
let target = "b";
isPresent(reduceStr2, target);

/*
PARTY WITH MAP AND REDUCE *AT THE SAME TIME*

1) Write a function decode that will take a string of number sets and decode it using the following rules:
When each digit of each set of numbers is added together, the resulting sum is the ascii code for a single letter.
Convert each set of numbers into a letter and discover the secret message! 
Try using map and reduce together to accomplish this task.
*/

let sample = "361581732726247521644353 4161492813593986955 84654117917337166147521";
let news;
let news2;
let decode = (string) => {
  let lastQArr = string.split(' ');
  console.log(lastQArr);
  lastQArr.map( x => {
    let eachletters = x.split('');
    
    console.log(String.fromCharCode(eachletters.reduce((acc,curr) => {
      return acc + curr;
    })))
  })
}

let string2 = "444689936146563731 2452966188592191874 52634311978613959924676311 4874232339 491973615889195397613151 64491375479568464397 2799868298847212752434 9464245911 84529438455334236247245 8131257451645317232949247 26471594451453281675411332 6631592725297745964837 616698332453173937881461 3311783543427862468268 385418321228899775431 4659867 73395213225525916984356 833792195426925124155181841 123388893 6941777837193213644325351 11353488912476869536954 61173937137292328237388335 5344692 452956158 31937616696951768494 584842118999165552436 8832121577139589884 15282516522883423742885 14713349724 6919979438697694 2252585676244745856486 5617683424485959291 547443594 2678324174797795449925 43753791352187862731151912 6875665565836721939262 35482977 84421878934473534291995 798457553821668942312 11114498238219156246883553 3599955 8831995953696776 8138759916933117676486 2388776737768787 37232647683297835458183 11318659392964788174775 683293746169875551252354 741545327395636643318531 38447974824822841161273 88768222547689886222 6345677462396774359 4942661761 1354569165 2553653936124138282 851786784517417366411515 42279319649497959785 5523951771 45941761289678527316294 37776454913244819275691 436669892715419465494342 682264111527 734681268219555989841131 882641896825571288724 382545666 12133138432672285179566156291 83644842221351483476411355532 9589336353993598224 184537669759184472427331 41851326945453796784 525783591 173773335961894524914465 47516715963756294236321 7296569497726217615 79487235 4931878519724923131437 31214731844284735237658435 1378458823933518466122 1241955123792435126557994 347427652476673662454 55596877477154112241923 9789414554758712319821 86228624276917113671233411 89659521 1352796469161477381192 69483824148396716861472 4766533634762298963245 5155973593459278561 1784478259974148659431 29583142566714785218623 244371427148584159487652 871836193187759591363 247956";
decode(sample);
decode(string2);
//https://docs.google.com/document/d/1wWnFua4pb-XfVmJhO_eqtlQ3qnleRZHoKCqih21aKcg/edit


