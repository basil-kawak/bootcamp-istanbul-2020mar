const GRID = [
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 1, 0, 1],
  [1, 1, 0, 0],
];

function getNeighboringValues(x, y, grid) {
  let result = 0;

  let neighbors = [
    [x - 1, y -1], [x - 1, y], [x - 1, y + 1],
    [x, y - 1], [x, y + 1],
    [x + 1, y - 1], [x + 1, y],  [x + 1, y + 1]
  ];
  let newNeighbors = [];

  for (let coordinateArray of neighbors) {
    let coordinateX = coordinateArray[0]; 
    let coordinateY = coordinateArray[1];
    if (coordinateX >= 0 && coordinateX < grid.length && coordinateY >= 0 && coordinateY < grid[0].length) {
      newNeighbors.push(coordinateArray);
    };
  };

  for (let n of newNeighbors) {
    let row = n[0];
    let col = n[1];
    result += grid[row][col];
  };
  return result;
};
//console.log(getNeighboringValues(2, 0, GRID))

const minesweeperMap = (inputGrid) => {
  return inputGrid.map((row, rowIndex) => {
    return row.map((mineOrNot, colIndex) => {
      if (mineOrNot === 1) {
        return 9;
      } else { 
        return getNeighboringValues(rowIndex, colIndex, inputGrid);
      };
    });
  });
};

minesweeperMap(GRID);