let result = [];
const RegNVA = /(?:^|\W)[n|v|a](?:$|\W)/g;
const RegPC = /\.|,/;
let i = 0;
const inputs = [];
/****************************Functions Calls************************ */
const parseStory = (rawStory) => {
  const arr = rawStory.split(' ');
  arr.forEach((el) => {
    checkEverything(el);
  });
  return result;
};
const printResult = (array) => {
  array.forEach((el) => {
    if (el.pos != undefined) {
      const temp = createInputFields(el);
      inputs.push(temp);
    } else {
      CreateInputWords(el);
    }
  });
};
const printStory = (array) => {
  let id = 0;
  array.forEach((el, index) => {
    if (el.pos != undefined) {
      createOutputFields(id, el);
      id++;
    } else {
      createOutputWords(id, el);
      id++;
    }
  });
};
/****************************Functions checks************************ */
checkEverything = (el) => {
  if (RegNVA.test(el)) {
    if (RegPC.test(el)) {
      checkCP(el);
    } else {
      CheckNVA(el);
    }
  } else {
    result.push({
      word: el,
    });
  }
};
checkCP = (el) => {
  let cp = el.match(RegPC)[0];
  el = el.replace(RegPC, '');
  CheckNVA(el);
  result.push({
    word: cp,
  });
};
CheckNVA = (el) => {
  if (el.match(RegNVA) && el.match(RegNVA)[0] === '[n]') {
    el = el.replace(RegNVA, '');
    result.push({
      word: el,
      pos: 'noun',
    });
  } else if (el.match(RegNVA) && el.match(RegNVA)[0] === '[v]') {
    el = el.replace(RegNVA, '');
    result.push({
      word: el,
      pos: 'verb',
    });
  } else if (el.match(RegNVA) && el.match(RegNVA)[0] === '[a]') {
    el = el.replace(RegNVA, '');
    result.push({
      word: el,
      pos: 'adj',
    });
  }
};
/****************************Create output and words************************ */
createOutputFields = (id, el) => {
  let story2 = document.getElementById('output');
  let space = document.createElement('SPAN');
  let s = document.createElement('SPAN');
  s.setAttribute('id', `output${id}`);
  space.innerText = ' ';
  let t = document.createTextNode(`(${el.pos}) `);
  s.appendChild(t);
  story2.appendChild(s);
  story2.appendChild(space);
  s.style.color = 'red';
};
createOutputWords = (id, el) => {
  let story2 = document.getElementById('output');
  let s = document.createElement('SPAN');
  let t = document.createTextNode(`${el.word} `);
  s.setAttribute('id', `output${id}`);
  s.appendChild(t);
  story2.appendChild(s);
};
/****************************Create inputs and words************************ */
createInputFields = (el) => {
  let mid = document.getElementById('printInput');
  let newElement = document.createElement('INPUT');
  newElement.setAttribute('type', 'text');
  newElement.setAttribute('class', 'allInputs');
  newElement.setAttribute('id', `input${i}`);
  newElement.setAttribute('maxlength', '20');
  newElement.oninput = handleUserInput;
  newElement.setAttribute('placeholder', `${el.pos} `);
  mid.appendChild(newElement);
  i++;
  return newElement;
};
CreateInputWords = (el) => {
  let mid = document.getElementById('printInput');
  let s = document.createElement('SPAN');
  let t = document.createTextNode(`${el.word} `);
  s.setAttribute('id', `input${i}`);
  s.appendChild(t);
  mid.appendChild(s);
  i++;
};
////**********************************live Update*********** */
function handleUserInput(event) {
  const id = event.target.id;
  const value = event.target.value;
  const outputId = id.replace('input', 'output');
  const output = document.getElementById(outputId);
  if (value.length > 0) {
    output.innerText = value;
    output.style.color = 'blue';
  } else {
    output.innerText = `(${event.target.placeholder})`;
    output.style.color = 'red';
  }
}
/*******************************Event enter ********************** */
document.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    changeColor(e);
    let allInputs = document.querySelectorAll('.allInputs');
    let inputs = [...allInputs];
    let currentInputIndex = inputs.indexOf(e.target);
    let nextinputIndex = currentInputIndex + 1;
    if (nextinputIndex != inputs.length) {
      inputs[currentInputIndex].focus();
      inputs[nextinputIndex].focus();
    } else {
      nextinputIndex = 0;
      nextinputIndex = inputs[nextinputIndex].focus();
    }
  }
});
document.addEventListener('click', (e) => {
  let allInputs = document.querySelectorAll('.allInputs');
  let inputs2 = [...allInputs];
  let currentInputIndex = inputs2.indexOf(e.target);
  console.log(currentInputIndex === 0);
  if (currentInputIndex === 0) {
  } else {
    if (inputs2[currentInputIndex - 1].value.length > 0) {
      console.log(inputs2[currentInputIndex - 1].id);
      let outputId = inputs2[currentInputIndex - 1].id.replace('input', 'output');
      let output = document.getElementById(outputId);
      output.style.color = 'aqua';
    }
  }
});
function changeColor(event) {
  const id = event.target.id;
  const value = event.target.value;
  if (value.length > 0) {
    const outputId = id.replace('input', 'output');
    const output = document.getElementById(outputId);
    output.style.color = 'aqua';
  }
}
getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    console.log(processedStory);
    printStory(processedStory);
    printResult(processedStory);
  });
