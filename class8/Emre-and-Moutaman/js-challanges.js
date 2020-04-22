/* Code Challange 1
//create the new and top-secret name of the secret society
*/

let hideout = [ 'Jaime', 'Louis', 'Hakan', 'Ammar' ];
let firstletter;
function nameIsImportant(hideout) {
	let gangAssemble = [];
	for (let i = 0; i < hideout.length; i++) {
		firstletter = hideout[i].substring(1, 0);
		gangAssemble.push(firstletter);
	}
	console.log(gangAssemble);
}
nameIsImportant([ 'Luffy', 'Nami', 'Zoro', 'Robin' ]);
nameIsImportant([ 'Usopp', 'Brook', 'Franky', 'Chopper' ]);

/* Code Challange 2 
//find the online users' name and count in chat*/

let onlineList;
let othersCount;
function whoIsOnline(array) {
	onlineList = [];
	if (array.length > 2) {
		othersCount = 0;
		for (let i = 0; i < array.length - 1; i++) {
			onlineList.push(array[i]);
			if (onlineList.length >= 2) {
				othersCount++;
			}
		}
		console.log(`${onlineList[0]}, ${onlineList[1]} and ${othersCount} more online`);
	} else if (array.length == 2) {
		console.log(`${array[0]} and ${array[1]} online`);
	} else if (array.length == 1) {
		console.log(`${array} online`);
	} else console.log('no one is online');
}

whoIsOnline([]);
whoIsOnline([ 'Garp' ]);
whoIsOnline([ 'Dragon', 'Sabo' ]);
whoIsOnline([ 'Luffy', 'Nami', 'Jinbe', 'Merry', 'Sunny' ]);
