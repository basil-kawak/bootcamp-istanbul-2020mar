/*
Examples

[
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 1, 0, 1],
  [1, 1, 0, 0],
]
The 0 represents an empty space . The 1 represents a mine.
You will have to replace each mine with a 9 and each empty space with the number of adjacent mines, the output will look like this:

[
  [1, 9, 2, 1],
  [2, 3, 9, 2],
  [3, 9, 4, 9],
  [9, 9, 3, 1],
]
*/

// Should we use loops or map or reduce? 
// Loops are always a safe option. Maybe not the most "beautiful" code, but I will be able to understand it.
// But I think that map() could be good? Why?
// 
// I think map is good because the input array and output array have the exact same dimensions. We want to return exactly "one cell" for each input cell.

// Reasons why I think map might be bad:
// it's a 2-dimensional (array of arrays) and this always makes map confusing, even for me!
// So when we get to two-dimensions, I like to use loops

// What are the cases?
// 1. There is a mine at a certain position
// - Replace it with a 9 
// 2. There is not a mine at a certain position
// - So we are asked to collect the number of neighboring mines
// 
// BRAINSTORMING:
// - What am I given? I'll be given:
// a) the coordinates of a mine
// b) the grid representing the original minefield
//
// Using these, how can I find the number of neighboring mines?
// 
// Why don't I write a function called this?
// 
// getNeighboringValues(x, y, grid)
// 
// What will this function return?
// getNeighboringValues(0, 0, grid);
// [0, 0, 1]
//
// getNeighboringValues(1, 1, grid)
// [0, 1, 0, 0, 1, 0, 1, 0]
//
// OVERALL PLAN
// Loop through the minefield
// For each position in the grid:
//    - If the position is a 1:
//        - Put 9 in a new grid
//    - If the position is a 0:
//       - EITHER Call getNeighboringCoordinates or getNeighboringValues (you can choose to make either, you probably don't need both, but you could use both in some way), it returns 8 coordinates; some might be valid, some might not be.
//       - Using one of these functions, you now check if there are mines around the current position.
//       - Sum the values/number of mines (or count the 1s), this is the number of adjacent mines
//       - Put the number in the new grid 

// getNeighboringValues PLAN
// 
// Let's pretend there are no edges at all. Like you can't go "outside the array", it's an infinite board
//
// getNeighboringCoordinates(x, y) PLAN
// There's two ways to approach this: you can say that it only returns valid ones or it unconditionally returns all 8, even if they're invalid (including negative coordinates).
// 
// getNeighboringCoordinates(1, 1) =>
// It should return eight coordinates:
// [[0, 0], [0, 1], [0, 2], [1, 0], [1, 2], [2[2, 0], [2,1], [2,2]] ]
//
// return [x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1], ...
//
// getNeighboringCoordinates(0, 0) =>
// [[0, -1], [-1, 0], [1, 1], [-1, -1], [1, 0]...]
//
// Now pretend the board has edges. If we called get getNeighboringCoordinates, some of these coordinates will be "valid", some will be "invalid."
// 
// Question is: how do we tell which one has neighboring coordinates or not?
// * Check if the one below it has a number (it's not undefined) or something like that.
// * Or check boundaries of array (see if the coordinate is out of bounds. for example: [100, 1000]. why do we know this is not a valid coordinate?)
//
// 1. If it's in the corner or border (on an edge). In corner, there are only 3 values. In the border (but not corner), it will be 5 values.
// 2. It's in the center, it has 8 values.
const GRID = [
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 1, 0, 1],
  [1, 1, 0, 0],
];


const minesweeper = (inputGrid) => {
  const outputGrid = [[0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],];
  for (let row = 0; row < inputGrid.length; row++) {
    for (let col = 0; col < inputGrid[0].length; col++) {
      if(inputGrid[row][col]===0){
          outputGrid[row][col]= getNeigborsValue(row,col,inputGrid);
      }  
    }
  }
  for (let row = 0; row < inputGrid.length; row++) {
    for (let col = 0; col < inputGrid[0].length; col++) {
      if(inputGrid[row][col]===1){
        outputGrid[row][col]=9
      }  
    }
  }
  for(let k = 0; k<outputGrid.length;k++){
    console.log(outputGrid[k])
  }
  
}


//console.log(getNeigborsValue(3,0,GRID));
function getNeigborsValue(x,y,grid){
  let valueSum = 0;
  if((x-1>=0&&x-1<grid.length)&&(y-1>=0&&y-1<grid[x].length)){
    valueSum += grid[x-1][y-1];
  }
  if((x+1>=0&&x+1<grid.length)&&(y-1>=0&&y-1<grid[x].length)){
    valueSum += grid[x+1][y-1];
  }
  if((x-1>=0&&x-1<grid.length)&&(y+1>=0&&y+1<grid[x].length)){
    valueSum += grid[x-1][y+1];
  }
  if((x+1>=0&&x+1<grid.length)&&(y+1>=0&&y+1<grid[x].length)){
    valueSum += grid[x+1][y+1];
  }
  if((x+1>=0&&x+1<grid.length)){
    valueSum += grid[x+1][y];

  }
  if((x-1>=0&&x-1<grid.length)){
    valueSum += grid[x-1][y];
  }
  if((y+1>=0&&y+1<grid[0].length)){
    valueSum += grid[x][y+1];
  }
  if((y-1>=0&&y-1<grid[0].length)){
    valueSum += grid[x][y-1];
  }
  return valueSum;
}

minesweeper(GRID);
/*
const minesweeperMap = (inputGrid) => {
  return inputGrid.map((row, rowIndex) => {
    return row.map((mineOrNot, colIndex) => {
      console.log(mineOrNot);
      console.log([rowIndex, colIndex]);
      // This line should either return 9 or the number of surrounding mines :)
      return null;
    });
  });
};

minesweeperMap(GRID);
*/