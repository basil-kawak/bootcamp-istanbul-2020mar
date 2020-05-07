let storyObj = []; //  Array of objects that containe {"word" : "Louis", "pos" : "noun"}

function parseStory(rawStory) {
	let temp = rawStory.split(/[\s]/);
	console.log(temp);

	let noun = /n(?=])/;
	let verb = /v(?=])/;
	let adj = /a(?=])/;

	for (let i = 0; i < temp.length; i++) {
		let word = temp[i];
		let last = word[word.length - 1];

		if (last == ',' || last == '.') {
			word = word.slice(0, word.length - 1);
		}
		if (noun.test(word)) {
			word = word.replace(/\[n\]/, '');
			storyObj.push({ word: word, pos: 'noun' });
		} else if (verb.test(word)) {
			word = word.replace(/\[v\]/, '');
			storyObj.push({ word: word, pos: 'verb' });
		} else if (adj.test(word)) {
			word = word.replace(/\[a\]/, '');
			storyObj.push({ word: word, pos: 'adj' });
		} else {
			storyObj.push({ word: word });
		}
		if (last == ',' || last == '.') {
			storyObj.push({ word: last });
		}
	}

	console.log(storyObj);
}
/* builing the stroy using the objects inside objArray[], and injects them inside the DOM.*/

function buildStory() {
	const inputDiv = document.getElementsByClassName('madLibsEdit')[0];
	const previewDiv = document.getElementsByClassName('madLibsPreview')[0];

	for (let i = 0; i < storyObj.length; i++) {
		const previewSpan = document.createElement('span');
		const inputSpan = document.createElement('span');

		if (!storyObj[i].pos) {
			previewSpan.innerText = storyObj[i].word + ' ';
			inputSpan.innerText = storyObj[i].word + ' ';
			previewDiv.appendChild(previewSpan);
			inputDiv.appendChild(inputSpan);
		} else if (storyObj[i].pos == 'noun') {
			const nounInput = document.createElement('input');
			nounInput.setAttribute('type', 'text');
			nounInput.setAttribute('id', `input${i}`);
			nounInput.setAttribute('placeholder', 'noun');
			nounInput.setAttribute('maxlength', '20');
			previewSpan.setAttribute('id', `output${i}`);
			previewSpan.innerText = `(${storyObj[i].pos}) `;
			previewSpan.style.color = 'white';
			nounInput.addEventListener('input', function (e) {
				if (nounInput.value) {
					previewSpan.innerText = nounInput.value + ' ';
					previewSpan.style.color = 'teal';
				} else {
					previewSpan.innerText = `(${storyObj[i].pos}) `;
					previewSpan.style.color = 'white';
					previewSpan.style.backgroundColor = 'none';
				}
			});
			previewDiv.appendChild(previewSpan);
			inputDiv.appendChild(nounInput);
		} else if (storyObj[i].pos == 'verb') {
			const verbInput = document.createElement('input');
			verbInput.setAttribute('type', 'text');
			verbInput.setAttribute('id', `input${i}`);
			verbInput.setAttribute('placeholder', 'verb');
			verbInput.setAttribute('maxlength', '20');
			previewSpan.setAttribute('id', `output${i}`);
			previewSpan.innerText = `(${storyObj[i].pos}) `;
			previewSpan.style.color = 'white';
			verbInput.addEventListener('input', function (e) {
				if (verbInput.value) {
					previewSpan.innerText = verbInput.value + ' ';
					previewSpan.style.color = 'teal';
				} else {
					previewSpan.innerText = `(${storyObj[i].pos}) `;
					previewSpan.style.color = 'white';
					previewSpan.style.backgroundColor = 'none';
				}
			});
			previewDiv.appendChild(previewSpan);
			inputDiv.appendChild(verbInput);
		} else if (storyObj[i].pos == 'adj') {
			const adjInput = document.createElement('input');
			adjInput.setAttribute('type', 'text');
			adjInput.setAttribute('id', `input${i}`);
			adjInput.setAttribute('placeholder', 'adj');
			adjInput.setAttribute('maxlength', '20');
			previewSpan.setAttribute('id', `output${i}`);
			previewSpan.innerText = `(${storyObj[i].pos}) `;
			previewSpan.style.color = 'white';
			adjInput.addEventListener('input', function (e) {
				if (adjInput.value) {
					previewSpan.innerText = adjInput.value + ' ';
					previewSpan.style.color = 'teal';
				} else {
					previewSpan.innerText = `(${storyObj[i].pos}) `;
					previewSpan.style.color = 'white';
					previewSpan.style.backgroundColor = 'none';
				}
			});

			previewDiv.appendChild(previewSpan);
			inputDiv.appendChild(adjInput);
		}
	}

	/* add event "Enter Key Pressed"*/

	inputDiv.addEventListener('keyup', function (e) {
		let inputArr = [...document.querySelectorAll('input')];
		let i = inputArr.indexOf(e.target);
		if (e.keyCode === 13) {
			if (i < inputArr.length - 1) {
				inputArr[i + 1].focus();
			} else {
				inputArr[0].focus();
			}
		}
	});
}

getRawStory()
	.then(parseStory)
	.then((processedStory) => {
		buildStory(storyObj);
	});
