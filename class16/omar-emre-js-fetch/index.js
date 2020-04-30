document.addEventListener('DOMContentLoaded', () => {
	//start of dom
	let ulONE = document.querySelector('#user-list');
	let ultwo = document.querySelector('#repos-list');
	let submit = document.querySelector('#github-form').querySelector('input[type=submit]');
	submit.addEventListener('click', (e) => {
		e.preventDefault();
		let input = document.querySelector('#search').value;
		getUsers(input).catch((err) => console.log(err));
	}); //end of 7 line
	async function getUsers(input) {
		const response = await fetch('https://api.github.com/search/users?q=' + input);
		const data = await response.json();
		//add them to ul - username - avatar - profile link
		data.items.forEach((item) => {
			let crtLI = document.createElement('li');
			let crtIMG = new Image(30, 30);
			let crtAnchor = document.createElement('a');
			let crtP = document.createElement('p');
			let crtS = document.createElement('span');
			crtS.setAttribute('class', 'iconSPAN');
			let crtTxt = document.createTextNode(item.login);
			crtAnchor.href = item.html_url;
			crtAnchor.appendChild(document.createTextNode(''));
			crtIMG.src = item.avatar_url;
			crtP.appendChild(crtTxt);
			crtP.appendChild(crtS);
			crtLI.appendChild(crtP);
			crtLI.appendChild(crtIMG);
			crtLI.appendChild(crtAnchor);
			ulONE.appendChild(crtLI);
		});
		called();
	} //async getUsers end
	function called() {
		document.querySelectorAll('li').forEach((item) => {
			let takeIT = item.querySelector('p').innerText;
			item.querySelector('p').querySelector('span').addEventListener('click', () => {
				//let takeIT = this.innerText.slice(0, this.innerText.indexOf('Prof'));
				forrepos(takeIT).catch((err) => console.log(err));
				document.getElementById('repos-list').style.visibility = 'visible';
			});
			async function forrepos(takeIT) {
				const res = await fetch('https://api.github.com/users/' + takeIT + '/repos');
				const data1 = await res.json();

				data1.forEach((arritems) => {
					let crtLI2 = document.createElement('li');
					let getIndex = data1.indexOf(arritems);
					let svganimate = document.createElement('span');
					svganimate.setAttribute('class', 'svganimate');
					let spantext = document.createTextNode(`${takeIT}'s Repo List`);
					svganimate.appendChild(spantext);
					if (getIndex === 0) {
						crtLI2.setAttribute('class', 'first');
						crtLI2.setAttribute('value', takeIT);
						crtLI2.appendChild(svganimate);
					}
					let newP = document.createElement('p');
					let newP2 = document.createElement('p');
					let nullSPAN = document.createElement('span');
					nullSPAN.setAttribute('class', 'nullSPAN');
					let txtNode1 = document.createTextNode(arritems['description']);
					let anc1 = document.createElement('a');
					anc1.href = arritems['html_url'];
					let txtNode2 = document.createTextNode(arritems['html_url']);
					anc1.appendChild(txtNode2);
					newP.appendChild(txtNode1);
					while (newP.innerText === 'null') {
						newP.innerText = '';
						newP.appendChild(nullSPAN);
					}
					crtLI2.appendChild(newP);
					crtLI2.appendChild(anc1);
					ultwo.appendChild(crtLI2);
				});
				//end of fetch
			} //end of async func forrepos
		}); //end of queryselector all li
	}
});
