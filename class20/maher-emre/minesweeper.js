 // Minesweeper Number of Neighbouring Mines
//////////////////////////////////////////////////
// it works with square AND rectangular matrices
//////////////////////////////////////////////////

const array = [
    [0, 1, 0, 1, 0], 
    [1, 0, 1, 1, 0], 
    [0, 1, 0, 1, 0],
    [1, 1, 1, 0, 0]
  ];
  
  // 1st way
  const minesweeper1 = (inputArray) => {
    /*
    checking if the given array is valid 
    to apply this function on it or NOT
    */
    let check = true;
    //make sure all the rows have same length
    for (let i = 0 ; i < inputArray.length-1 ; i++) {
      if (inputArray[i].length != inputArray[i+1].length) {
        check = false;
      }
    }
    if (!check) {
      return "The given array is NOT valid matrix to apply \nthe function \"minesweeper()\" on it because \nit does NOT have a constant \"Y\" dimension!!! "
    }
    
  
    const outputArray = [];
    for (let i = 0 ; i < inputArray.length ; i++) {
      // initializing the output array
      outputArray.push([]);
      
      for (let j = 0 ; j < inputArray[0].length ; j++) {
        //add mines to new array as 9's
        if (inputArray[i][j] == 1) {
          outputArray[i][j] = 9;
        } 
        //add empty fields to new array as calling a func
        else {
          outputArray[i][j] = getNeighborsValues1(i, j, inputArray);
        }
      }
    }
    return outputArray;
  }
  
  function getNeighborsValues1(x, y, sumArray) {
    let dX = sumArray.length; //get the length of all array --> 4
    let dY = sumArray[0].length; //get the length of rows --> 5
    let result = 0;
    // for the first element in the array that will be [x=0, y=0] and this element is a corner
    //[-1,-1],[-1,0],[-1,1],[0,-1],[0,0],[0,1],[1,-1],[1,0],[1,1]
    //[0,1],[1,0],[1,1]
    for (let i = x-1 ; i < x+2 ; i++) {
      for (let j = y-1 ; j < y+2 ; j++) {
        // to NOT add the element itself to the sum of the surrounded elements
        if ( (i == x) && (j == y) ) {
          continue;
        }
        // to delete all the imagination elements
        if ( (i != -1) && (j != -1) && (i != dX) && (j != dY) ) {
          result += sumArray[i][j];
        }
      }
    }
    return result;
  }
  
  //////////////////////////////////
  //////////////////////////////////
  
  // 2nd way
  const minesweeper2 = (inputArray) => {
    /*
    checking if the given array is valid 
    to apply this function on it or NOT
    */
    let check = true;
    for (let i = 0 ; i < inputArray.length-1 ; i++) {
      if (inputArray[i].length != inputArray[i+1].length) {
        check = false;
      }
    }
    if (!check) {
      return "The given array is NOT valid matrix to apply \nthe function \"minesweeper()\" on it because \nit does NOT have a constant \"Y\" dimension!!! "
    }
    
    const outputArray = [];
    for (let i = 0 ; i < inputArray.length ; i++) {
      // initializing the output array
      outputArray.push([]);
      for (let j = 0 ; j < inputArray[0].length ; j++) {
        if (inputArray[i][j] == 1) {
          outputArray[i][j] = 9;
        } else {
          outputArray[i][j] = getNeighborsValues2(i, j, inputArray);
        }
      }
    }
    return outputArray;
  }
  
  function getNeighborsValues2(x, y, sumArray) {
    let dX = sumArray.length;
    let dY = sumArray[0].length;
    let result;
    for (let i in sumArray) {
      for (let j in sumArray[0]) {
        
        if ( x==0 && y==0 ) {
          result = 0;
          for (let i = 0 ; i < 2 ; i++) {
            for (let j = 0 ; j < 2 ; j++) {
              if ( (i == x) && (j == y) ) {
                continue;
              }
              result += sumArray[i][j];
              //console.log("Corner1");
            }
          }
          return result;
        } else if ( x==0 && y == (dY-1) ) {
          result = 0;
          for (let i = 0 ; i < 2 ; i++) {
            for (let j = (dY-2) ; j < dY ; j++) {
              if ( (i == x) && (j == y) ) {
                continue;
              }
              result += sumArray[i][j];
              // console.log("Corner2");
            }
          }
          return result;
        } else if ( x == (dX-1) && y==0 ) {
          result = 0;
          for (let i = (dX-2) ; i < dX ; i++) {
            for (let j = 0 ; j < 2 ; j++) {
              if ( (i == x) && (j == y) ) {
                continue;
              }
              result += sumArray[i][j];
              // console.log("Corner3");
            }
          }
          return result;
        } else if ( x == (dX-1) && y == (dY-1) ) {
          result = 0;
          for (let i = (dX-2) ; i < dX ; i++) {
            for (let j = (dY-2) ; j < dY ; j++) {
              if ( (i == x) && (j == y) ) {
                continue;
              }
              result += sumArray[i][j];
              // console.log("Corner4");
            }
          }
          return result;
        } else if ( x == 0 ) {
          result = 0;
          for (let i = 0 ; i < 2 ; i++) {
            for (let j = y-1 ; j < y+2 ; j++) {
              if ( (i == x) && (j == y) ) {
                continue;
              }
              result += sumArray[i][j];
              // console.log("First row elements");
            }
          }
          return result;
        } else if ( y == 0 ) {
          result = 0;
          for (let i = x-1 ; i < x+2 ; i++) {
            for (let j = 0 ; j < 2 ; j++) {
              if ( (i == x) && (j == y) ) {
                continue;
              }
              result += sumArray[i][j];
              // console.log("First column elements");
            }
          }
          return result;
        } else if ( x == (dX-1) ) {
          result = 0;
          for (let i = (dX-2) ; i < dX ; i++) {
            for (let j = y-1 ; j < y+2 ; j++) {
              if ( (i == x) && (j == y) ) {
                continue;
              }
              result += sumArray[i][j];
              // console.log("Last row elements");
            }
          }
          return result;
        } else if ( y == (dY-1) ) {
          result = 0;
          for (let i = x-1 ; i < x+2 ; i++) {
            for (let j = (dY-2) ; j < dY ; j++) {
              if ( (i == x) && (j == y) ) {
                continue;
              }
              result += sumArray[i][j];
              // console.log("Last column elements");
            }
          }
          return result;
        } else {
          result = 0;
          for (let i = x-1 ; i < x+2 ; i++) {
            for (let j = y-1 ; j < y+2 ; j++) {
              if ( (i == x) && (j == y) ) {
                continue;
              }
              result += sumArray[i][j];
              // console.log("Center elements");
            }
          }
          return result;
        }
      }
  
    }
  
  }
  
  // result from the 1st way
  let result1 = minesweeper1(array);
  
  // result from the 2nd way
  let result2 = minesweeper2(array);
  
  
  
  // outputting the results
  ////////////////////////
  
  // printing the original array
  console.log("Original:\n---------");
  for (let i in array) {
    console.log(array[i]);
  }
  
  // printing result1
  console.log("\nResult from the 1st way:");
  console.log("------------------------");
  if (Array.isArray(result1)) {
    for (let i in result1) {
      console.log(result1[i]);
    }
  } else {
    console.log(result1)
  }
  
  // printing result2
  console.log("\nResult from the 2nd way:");
  console.log("------------------------");
  if (Array.isArray(result2)) {
    for (let i in result2) {
      console.log(result2[i]);
    }
  } else {
    console.log(result2)
  }