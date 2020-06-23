console.log("#########################");
console.log("###    MAP section    ###");
console.log("#########################\n");
// 1st MAP function
let string_1 = "kamal maher louis ammar hakan";

const capitalize = function(string){

  let strArray = string.split(" ");
  // console.log(strArray);
  
  // [ 'kamal', 'maher', 'louis', 'ammar' ]

  strArray = strArray.map(word => word.toUpperCase());

  return strArray.join(" ");

}
console.log("1st MAP function \"capitalize\":");
console.log("------------------------------");
console.log(`origin string = \"${string_1}\"`);
console.log(`result = \"${capitalize(string_1)}\"`);


//////////////////////
console.log("\n==============================\n");
//////////////////////


// 2nd MAP function
let string_2 = "hello! world i am maher";

const swapCase = function(string) {

  let strArray = string.split(" ");
  // console.log(strArray);

  strArray = strArray.map((currentWord, index) => {
    if (index % 2 === 0){
      return capitalize(currentWord);
    } else {
      return currentWord;
    }
  });
  // console.log(strArray);
  return strArray.join(" ");

}

console.log("2nd MAP function \"swapCase\":");
console.log("----------------------------");
console.log(`origin string = \"${string_2}\"`);
console.log(`result = \"${swapCase(string_2)}\"`);


//////////////////////
console.log("\n==============================\n");
//////////////////////


// 3rd MAP function
let string_3 = "hello world! Zz";
const shiftLetters = function(string){

  let strArray = string.split(" ");

  strArray = strArray.map(currentWord => {
    let wordArray = currentWord.split("");
    
    wordArray = wordArray.map(character => {
      let asciiCode; // to hold the ASCII code value of the letter that will be shifted

      let charResult = ""; // to hold the value of the letter after is being shifted

      let check = character.charCodeAt(0); // to check if the character is an alphabetic letter

      // a condition to apply shiftLetter() function only on the alphabetic letters 
      if ( (check >= 65 && check <= 90) || (check >= 97 && check <= 122) ) {
        if (check === 90) {
          asciiCode = 65; // to shift from Z to A
        } else if (check == 122) {
          asciiCode = 97; // to shift from z to a
        } else {
          asciiCode = character.charCodeAt(0) + 1; // the general case
        }
        charResult += String.fromCharCode(asciiCode);
      } else {
        charResult += character;
      }
      return charResult;
    });
    return wordArray.join("");
  });

  return strArray.join(" ");
}
console.log("3rd MAP function \"shiftLetters\":");
console.log("--------------------------------");
console.log(`origin string = \"${string_3}\"`);
console.log(`result = \"${shiftLetters(string_3)}\"`);


//////////////////////
console.log("\n############################");
console.log("###    REDUCE section    ###");
console.log("############################\n");
//////////////////////

// 1st REDUCE function
let string_4 = "Hello World!"; 

const countLetters = function(string){
  // removing symbols and white spaces from the string and then make all letters in lower case type
  string = string.replace(/[^a-zA-Z ]|\s/g, '').toLowerCase();

  // sorting the string
  string = string.split('').sort().join('')

  let result = [...string].reduce((accumulator, letter) => { accumulator[letter] = accumulator[letter] ? accumulator[letter] + 1 : 1; return accumulator }, {}); 
  console.log(result);

}
console.log("1st REDUCE function \"shiftLetters\":");
console.log("--------------------------------");
console.log(`origin string = \"${string_4}\"`);
console.log("result is:");
countLetters(string_4);


//////////////////////
console.log("\n==============================\n");
//////////////////////


// 2nd REDUCE function
let string_5 = "Hello World!"; 
let target = "H";

const isPresent = function(string, target){

  let strArray = string.split("");

  return strArray.reduce((found, element) => {
    return found || element === target;
  }, false);

}
console.log("2nd REDUCE function \"isPresent\":");
console.log("--------------------------------");
console.log(`Is the target \"${target}\" present in the string?`);
console.log(`result is: \"${isPresent(string_5, target)}\"`);


//////////////////////
console.log("\n##################################");
console.log("### PARTY WITH MAP AND REDUCE  ###");
console.log("##################################\n");
//////////////////////

// decode() function
let secret_message = "444689936146563731 2452966188592191874 52634311978613959924676311 4874232339 491973615889195397613151 64491375479568464397 2799868298847212752434 9464245911 84529438455334236247245 8131257451645317232949247 26471594451453281675411332 6631592725297745964837 616698332453173937881461 3311783543427862468268 385418321228899775431 4659867 73395213225525916984356 833792195426925124155181841 123388893 6941777837193213644325351 11353488912476869536954 61173937137292328237388335 5344692 452956158 31937616696951768494 584842118999165552436 8832121577139589884 15282516522883423742885 14713349724 6919979438697694 2252585676244745856486 5617683424485959291 547443594 2678324174797795449925 43753791352187862731151912 6875665565836721939262 35482977 84421878934473534291995 798457553821668942312 11114498238219156246883553 3599955 8831995953696776 8138759916933117676486 2388776737768787 37232647683297835458183 11318659392964788174775 683293746169875551252354 741545327395636643318531 38447974824822841161273 88768222547689886222 6345677462396774359 4942661761 1354569165 2553653936124138282 851786784517417366411515 42279319649497959785 5523951771 45941761289678527316294 37776454913244819275691 436669892715419465494342 682264111527 734681268219555989841131 882641896825571288724 382545666 12133138432672285179566156291 83644842221351483476411355532 9589336353993598224 184537669759184472427331 41851326945453796784 525783591 173773335961894524914465 47516715963756294236321 7296569497726217615 79487235 4931878519724923131437 31214731844284735237658435 1378458823933518466122 1241955123792435126557994 347427652476673662454 55596877477154112241923 9789414554758712319821 86228624276917113671233411 89659521 1352796469161477381192 69483824148396716861472 4766533634762298963245 5155973593459278561 1784478259974148659431 29583142566714785218623 244371427148584159487652 871836193187759591363 247956";

const decode = function(string){
  let strArray = string.split(' ');

  strArray = strArray.map(numberSet => {
    let numberArray = numberSet.split('');
    numberArray = numberArray.reduce((accumulator, currentNumber) => {
      currentNumber = parseInt(currentNumber, 10);
      return accumulator + currentNumber;
    }, 0)
    return String.fromCharCode(numberArray);
  });

  return strArray.join('');
}

console.log("\"decode\" function:");
console.log("------------------");
console.log(`The secret message is: \"${decode(secret_message)}\"`);


//////////////////////
console.log("\n==============================\n");
//////////////////////


// encode() function
let secret_String = "Maher";

const encode = function(string){

  function encodeChar(ch){

    let asciiCode = ch.charCodeAt(0); // to hold ASCII code value for each character

    let valuesArray = []; // to hold the values of the encoded character

    let sum = 0; // to use it stopping the "while" loop after getting the required values
    
    while(true){	

      /* rendom() to get random number & floor() to get rid of the floating point from that number*/	
      let randomNumber = Math.floor(Math.random()*10);
      
      /*
      I added the following condition 
      because I realized that the encoded string 
      in the previous encode() function doesn't have zeros
      */
      if (randomNumber === 0) {
        continue;
      }

      if(sum === asciiCode){
        break;
      }
      if(sum + randomNumber > asciiCode){
        valuesArray.push(asciiCode - sum);
        break;
      }
      sum += randomNumber;
      valuesArray.push(randomNumber);
    }

    return valuesArray.join("");
  }

  return [...string].map(char => encodeChar(char)).join(" ");
}

console.log("\"encode\" function:");
console.log("------------------");
console.log(`The encoded string is: \"${encode(secret_String)}\"`);


/*
we can check if encode() function works 
by decoding its result using decode() function, 
and the result should be equal to "secret_String" variable value
*/
console.log(`\nThe decoded string is: \"${decode(encode(secret_String))}\"`);
