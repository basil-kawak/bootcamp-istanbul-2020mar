let arr = ["cats", "cat", "dog", "catsdog", "s", "dogs", "khaled", "khaleds"];
const concateFinder = (arr) => {
  let concatedStrings = [];
  arr.map((string, index) => {
    let counter = 0,
      relooper = 0,
      subStr = string,
      detectorString = "";
    for (let i = 0; i < arr.length; i++) {
      if (i === index) {
        continue;
      } else {
        if (subStr.indexOf(arr[i]) !== -1) {
          let foundSubStr = subStr.substr(
            subStr.indexOf(arr[i]),
            arr[i].length
          );
          detectorString += foundSubStr;
          counter++;
          subStr = subStr.replace(foundSubStr, "");
          if (detectorString.length === string.length) {
            break;
          } else if (detectorString.length !== string.length && counter === 2) {
            i = relooper++;
            counter = 0;
            subStr = string;
            detectorString = "";
          }
        }
      }
    }
    if (detectorString.length === string.length && counter === 2) {
      concatedStrings.push(string);
    }
  });
  return concatedStrings;
};

console.log(concateFinder(arr));
