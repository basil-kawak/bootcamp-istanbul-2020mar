const capitalize = function (string) {
	string = string
		.split(' ')
		.map((word) => word.toUpperCase())
		.join(' ');
	console.log(string);
};
capitalize('majd, hey all');

const swapCase = function (string) {
	string = string.split(' ');
	return string
		.map((word, i) => {
			if (i % 2 == 0) {
				return word.toUpperCase();
			} else {
				return word;
			}
		})
		.join(' ');
};

swapCase('hey gurl, lets javascript together sometime');

const shiftLetters = function (string) {
	string = string.split('');

	console.log(string);

	const shiftedString = string
		.map((letter) => {
			nextLetterCode = letter.charCodeAt();
			nextLetterCode++;
			return String.fromCharCode(nextLetterCode);
		})
		.join('');

	//console.log(shiftedString);
	return shiftedString;
};

console.log(shiftLetters('hello'));
