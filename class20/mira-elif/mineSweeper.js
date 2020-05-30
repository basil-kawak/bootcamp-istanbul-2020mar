

const GRID = [
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 1, 0, 1],
  [1, 1, 0, 0],
];

/*
thought exercise: how do you loop through this one?
const GRID = [
  [0, 1, 0, 0, 1],
  [0, 0, 1, 0, 2],
  [0, 1, 0, 1, 3],
  [1, 1, 0, 0, 4],
];
*/
//USING LOOPS
// const minesweeper = (inputGrid) => {
//   let outputGrid = new Array();
//   for (let row = 0; row < inputGrid.length; row++) {
//     outputGrid[row] = new Array();
//     for (let col = 0; col < inputGrid[0].length; col++) {
//     if(inputGrid[row][col]===1){
//       outputGrid[row][col]= 9
//     }
//     else{
//         const neighbors = getNeighboringValues(row, col,inputGrid);
//         let sum = 0;
//         for (let i = 0; i < neighbors.length; i++) {
//           if (neighbors[i] === 1) {
//             sum = sum + 1;
//           }
//         }
//         outputGrid[row].push(sum);
//       }
//   }
//   }
//   console.log(outputGrid)
// }

// minesweeper(GRID);

function getNeighboringValues(x,y,grid){
  let coordinateArray= [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1], [x+1, y+1], [x - 1, y-1], [x+1,y -1], [x-1, y +1]];
  let sum=0;
  let validCoordinates=[]
  for(const element of coordinateArray){
    const coord = element;
    const x = coord[0];
    const y = coord[1];
    let theNeighboringValue;
    if (grid[x]!== undefined) {
      theNeighboringValue = grid[x][y];
    } else {
      theNeighboringValue = 0;
    }
    validCoordinates.push(theNeighboringValue)
  } 
  return validCoordinates;
}

//USING MAP
const minesweeperMap = (inputGrid) => {
  return inputGrid.map((row, rowIndex) => {
    return row.map((mineOrNot, colIndex) => {
      if(mineOrNot===1){
        return [rowIndex][colIndex]=9;
      }
      else{
        return [rowIndex][colIndex]=getNeighboringValues(rowIndex, colIndex,inputGrid).reduce((acc,e)=>{
          if(e==1){
            acc+=1;
          }
          return acc;
        });
      }
      });
  });
};

minesweeperMap(GRID);