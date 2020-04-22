/*animation */
let bg1 = document.getElementById('bg-1');
let bg2 = document.getElementById('bg-2');
let bg3 = document.getElementById('bg-3');
let box = document.querySelector('.box');
let mBtn = document.getElementById('mBtn');
let nav = document.getElementById('nav');
/*calculation */
let sqrNum = document.getElementById('square-input');
let halfNum = document.getElementById('half-input');
let sqrBtn = document.getElementById('square-button');
let halfBtn = document.getElementById('half-button');

let solution1 = document.getElementById('solution1');
let solution2 = document.getElementById('solution2');
let solution3 = document.getElementById('solution3');
let p1Num = document.getElementById('percent1-input');
let p2Num = document.getElementById('percent2-input');
let areaNum = document.getElementById('area-input');
let pBtn = document.getElementById('percent-button');
let areaBtn = document.getElementById('area-button');

//functions
function squareNumber(arg) {
	let sum = arg * arg;
	return (solution2.innerHTML = `The square of ${arg} = ${sum} <br>`);
}

function halfNumber(arg) {
	let sum = arg / 2;

	solution2.innerHTML = `half of  ${arg} = ${sum} <br>
   Rounded = ${Math.floor(sum)} <br>`;
	return sum;
}

function percentOf(arg1, arg2) {
	let sum = arg1 / arg2 * 100;
	solution3.innerHTML += `${arg1} = ${sum} % of ${arg2} <br>
   Rounded =  ${Math.floor(arg1 / arg2 * 100)} <br>`;
}

function areaOfCircle(arg) {
	let area51 = arg * arg * Math.PI;
	solution1.innerHTML += ` ${arg} = ${area51} <br>
   Rounded = ${Math.floor(arg * arg * Math.PI)} < <br>`;
}

//events
sqrBtn.addEventListener(
	'click',
	function(e) {
		e.preventDefault();
		let numSqrt = sqrNum.value;
		squareNumber(numSqrt);
	},
	false
);

halfBtn.addEventListener(
	'click',
	function(e) {
		e.preventDefault();
		let numHalf = halfNum.value;
		halfNumber(numHalf);
	},
	false
);

pBtn.addEventListener(
	'click',
	function(e) {
		e.preventDefault();
		let numP1 = p1Num.value;
		let numP2 = p2Num.value;
		percentOf(numP1, numP2);
	},
	false
);

areaBtn.addEventListener(
	'click',
	function(e) {
		e.preventDefault();
		let numArea = areaNum.value;
		areaOfCircle(numArea);
	},
	false
);

//Animation
let tl = new TimelineMax();

tl
	.fromTo(bg1, 1, { y: '-100%' }, { y: '0%' })
	.fromTo(bg2, 1, { width: '0' }, { width: '40%' })
	.fromTo(bg3, 1, { y: '-100%' }, { y: '0%' }, '-=2')
	.fromTo(bg3, 1, { width: '70%' }, { width: '30%' }, '-=1')
	.fromTo(mBtn, 1, { opacity: 0 }, { opacity: 1 }, '-=1');
