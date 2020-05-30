
const getNeighboringCoordinates = (x,y) =>{
    let neighbourArr = [];
    for (let row = x-1; row <= x+1; row++){
      for(let col = y-1; col <= y+1; col++){
        if (row >= 0 && row < GRID.length &&col >= 0 && col < GRID[0].length){
        neighbourArr.push([row,col]);
      }
    }}
  return neighbourArr;
  }
  const GRID = [
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 1, 0, 1],
    [1, 1, 0, 0],
  ];
  const minesweeperMap = (inputGrid) => {
    return inputGrid.map((row, rowIndex) => {
      return row.map((mineOrNot, colIndex) => {
        let neighbourArr = [];
        let minesCounter = 0;
        if(mineOrNot===0){
          neighbourArr = getNeighboringCoordinates(rowIndex,colIndex);
          for (let coordinate of neighbourArr){
            if(inputGrid[coordinate[0]][coordinate[1]] === 1 ){
             minesCounter ++;
            }
          }
          return minesCounter;
        }else {
          return 9;
        }
      });
    });
  };
  minesweeperMap(GRID);
  
  