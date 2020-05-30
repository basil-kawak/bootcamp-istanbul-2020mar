const GRID = [
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 1, 0, 1],
  [1, 1, 0, 0],
];
// (row-1,col-1),(row-1,col),(row-1,col+1)
// (row,col-1),(row,col+1)
// (row+1,col-1),(row+1,col),(row+1,col+1)
const minesweeper = (inputGrid) => {
  const outputGrid = [];
  for (let row = 0; row < inputGrid.length; row++) {
    let newRow=[];
    // outputGrid.push(newRow);
    // newRow.push(inputGrid[row]);
    // outputGrid.push(inputGrid[row]);
    // console.log(newRow);

    for (let col = 0; col < inputGrid[0].length; col++) {
      // And in here, you execute "THE PLAN".
      if (inputGrid[row][col]==0){
        // newRow.push(inputGrid[row][col]);
        // console.log(inputGrid[row][col+1])
     getNeighboringValue(row,col,inputGrid);
     
    }
else{
  newRow.push(9);
}
      // console.log(inputGrid[row])
      // console.log(inputGrid[row][col]);
    }
    outputGrid.push(newRow);
  //console.log(newRow);
  }
  // console.log(outputGrid)
}
function getNeighboringValue(row,col,grid){
const result = [];

const negighbors = [[row-1,col-1],[row-1,col],[row-1,col+1],[row,col-1],[row,col+1],[row+1,col-1],[row+1,col],[row+1,col+1]];
for (let i=0; i<negighbors.length;i++){
  let total = 0;
  if (negighbors[i]==undefined || negighbors[i]==0){
    total = total+0;
  }
  else{
total=total+1;
  }
  console.log(total);

}


}
 // console.log("baba");

minesweeper(GRID);
// function getNeighboringValue(){
//   const 
// }
// const neighboringCoordinates = [
// [x + 1, y], [x + 1, y + 1], …]
