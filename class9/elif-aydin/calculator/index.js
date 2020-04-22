// write your code here
document.addEventListener('DOMContentLoaded', () => {
  let square = document.getElementById('square-input');
  let squareButton = document.getElementById('square-button');
  let halfInput = document.getElementById('half-input');
  let halfButton = document.getElementById('half-button');
  let precent1 = document.getElementById('percent1-input');
  let precent2 = document.getElementById('percent2-input');
  let precentBtn = document.getElementById('percent-button');
  let areaInput = document.getElementById('area-input');
  let areaButton = document.getElementById('area-button');
  let bonusInput = document.getElementById('bonus');
  let bonusBtn = document.getElementById('bonus-button');
  let solution = document.getElementById('solution');
  squareButton.addEventListener('click', () => {
    let result = squareNumber(square.value);
    const str = `The result of squaring the number ${square.value} is ${result}`;
    solution.innerHTML = str;
  });

  halfButton.addEventListener('click', () => {
    const result = half(halfInput.value);
    let str = `The result of half the number ${halfInput.value} is ${result}.`;
    solution.innerHTML = str;
  });

  precentBtn.addEventListener('click', () => {
    const result = precentof(precent1.value, precent2.value);
    const str = `${precent1.value} is ${result}% of ${precent2.value}`;
    //2 is 50% of 4."

    solution.innerHTML = str;
  });

  areaButton.addEventListener('click', () => {
    const result = areaof(areaInput.value);

    const str = `The area for a circle with radius ${areaInput.value} is ${result.toFixed(2)}`;
    solution.innerHTML = str;
  });
  bonusBtn.addEventListener('click', () => {
    let result = bones(bonusInput.value);
    solution.innerHTML = result.toFixed(2);
  });
  squareNumber = (value) => {
    let result = value * value;

    return result;
  };
  half = (value) => {
    let result = value / 2;

    return result;
  };
  precentof = (value1, total) => {
    const result = (parseInt(value1) * 100) / parseInt(total);
    return result;
  };
  areaof = (radius) => {
    const result = radius * radius * Math.PI;
    const str = `The area for a circle with radius ${radius} is ${result.toFixed(2)}`;
    return result;
  };
  bones = (value) => {
    let result = half(value);
    resultsq = squareNumber(result);
    area = areaof(resultsq);
    result = precentof(resultsq, area);
    console.log(result);
    return result;
  };
});
// - Write a function that will take one argument (a number) and perform the following operations, using the functions you wrote earlier1:
//   1- Take half of the number and store the result.
//   2- Square the result of #1 and store that result.
//   3- Calculate the area of a circle with the result of #2 as the radius.
//   4- Calculate what percentage that area is of the squared result (#3).

// - For each operation, create an event listener for the button, and when it's clicked, find the value of the appropriate input and show the result of the calculation in the solution div.
