'use strict';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const PROFILE_BASE_URL = 'http://image.tmdb.org/t/p/w185';
const BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780';
const CONTAINER = document.querySelector('.container-fluid');
const BODY_MAIN = document.querySelector('body');
CONTAINER.classList.add('editContainer', 'position-relative');
// Don't touch this function please
const autorun = async () => {
	const movies = await fetchMovies();
	renderMovies(movies.results);
};
const altAutorun = async (filter) => {
	const movies = await fetchMovies(filter);
	CONTAINER.innerHTML = '';
	renderMovies(movies.results);
};
//API-key 542003918769df50083a13c415bbc602
// Don't touch this function please
const constructUrl = (path) => {
	return `${TMDB_BASE_URL}/${path}?api_key=${atob('NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=')}`;
};

///// Search section ////
const search = async (value) => {
	const searchRes = await fetchSearch(value[0].value);
	// console.log(searchRes.results);
	renderSearch(searchRes.results);
};
const fetchSearch = async (value) => {
	const url = constructUrl(`search/movie`) + '&query=' + value;
	const res = await fetch(url);
	return res.json();
	// https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher
};
const renderSearch = (searchRes) => {
	CONTAINER.innerHTML = '';
	//console.log(searchRes);
	const rowDiv = document.createElement('div');
	rowDiv.setAttribute('class', 'row');
	rowDiv.classList.add('justify-content-center');
	///MAP IT
	searchRes.map((result, index) => {
		const searchDiv = document.createElement('div');
		let streamPoster = checkPoster(result.poster_path, BACKDROP_BASE_URL);
		searchDiv.innerHTML = `<img src="${streamPoster}" alt="${result.original_title} poster" class="movie-poster">`;
		const forSearchName = document.createElement('div');
		forSearchName.setAttribute('class', 'movie-title');
		forSearchName.innerHTML = `<h3 style="font-size: 110%; text-align: center;">${result.original_title}</h3>`;
		//main div
		const colDiv = document.createElement('div');
		colDiv.classList.add('col-6', 'col-sm-4', 'col-md-3', 'col-lg-2', 'col-xl-2', 'mb-3', 'for-each-movie');
		//add poster to main div
		colDiv.appendChild(searchDiv);
		//add title to main div
		colDiv.appendChild(forSearchName);
		forSearchName.addEventListener('click', () => {
			// actorDetails(actor.name, actor.profile_path, actor.id);
		});
		searchDiv.addEventListener('click', () => {
			// actorDetails(actor.name, actor.profile_path, actor.id);
		});
		rowDiv.appendChild(colDiv);
		CONTAINER.appendChild(rowDiv);
	});

	// making "mouse pointer" when hovering on an image
	let getIMG = document.querySelectorAll('img');
	getIMG.forEach((img) => img.addEventListener('mouseover', () => (img.style.cursor = 'pointer')));
	let getTitle = document.querySelectorAll('.movie-title');
	getTitle.forEach((title) => title.addEventListener('mouseover', () => (title.style.cursor = 'pointer')));
};

//////////////////////////////////////
///////   actor section   ////////////
const actorDetails = async (actorName, actorPhoto, actorId) => {
	const actorCreditsRes = await fetchActor(`${actorId}/movie_credits`);
	const personRes = await fetchActor(actorId);
	renderActor(actorName, actorPhoto, actorCreditsRes.cast, personRes);
};

//TO BE CLEAR: person/person_id/movie_credits? for character that is played
//TO BE CLEAR: person/person_id? for real person itself

/*----cast obj:
   "release_date": "1986-08-02",
   "overview": "The problems faced by both teenagers and adults in a small Minnesota town who are trying to get dates for a Saturday night.",
  "poster_path": null,
*/
/*
Data Display
The actor name-------------------------------- 
The actor gender -> personid?
A picture of the actor-------------------------
The actor popularity -> personid?
The birthday of the actor and (if available) death day ->personid?
A biography about the actor -> personid?
A list of movies the actor participated in---------------
*/

const fetchActor = async (path) => {
	const url = constructUrl(`person/${path}`);
	const res = await fetch(url);
	return res.json();
	//https://api.themoviedb.org/3/person/11/movie_credits?api_key=542003918769df50083a13c415bbc602&language=en-US obj.cast
};

const renderActor = (actorName, actorPhoto, actorCredits, personRes) => {
	let genderHolder, bioHolder, birthHolder, deathHolder;
	const actorDiv = document.querySelector('.container-fluid');
	actorDiv.innerHTML = '';
	const actor = document.createElement('h1');
	actor.innerHTML = actorName;
	const actor_photo = document.createElement('img');
	actor_photo.setAttribute('src', `${BACKDROP_BASE_URL + actorPhoto}`);
	const creditUL = document.createElement('ul');
	const divHolder = document.createElement('div');
	divHolder.setAttribute('class', 'person-main-info');
	creditUL.setAttribute('class', 'person-movie-list');
	if (personRes.deathday === '' || personRes.deathday === null) {
		deathHolder = '-';
	} else {
		deathHolder = personRes.deathday;
	}
	if (personRes.birthday === '' || personRes.birthday === null) {
		birthHolder = '-';
	} else {
		birthHolder = personRes.birthday;
	}
	if (personRes.biography === '' || personRes.biography === null) {
		bioHolder = '-';
	} else {
		bioHolder = personRes.biography;
	}
	if (personRes.gender === 1) {
		genderHolder = 'Female';
	} else if (personRes.gender === 2) {
		genderHolder = 'Male';
	} else {
		genderHolder = '-';
	}
	let deathD = document.createElement('h2');
	deathD.innerHTML = 'Deathday: ' + deathHolder;
	let birthD = document.createElement('h2');
	birthD.innerHTML = 'Birthday: ' + birthHolder;
	let bioPer = document.createElement('h2');
	bioPer.innerHTML = 'Biography: ' + bioHolder;
	let popularity = document.createElement('h2');
	popularity.innerHTML = 'Popularity: ' + personRes.popularity;
	let gender = document.createElement('h2');
	gender.innerHTML = 'Gender: ' + genderHolder;
	actorCredits.map((credit) => {
		const creditLi = document.createElement('li');
		let hHolder = document.createElement('h3');
		hHolder.classList.add('actor-movielist-cursor');
		hHolder.innerHTML = credit.title;
		hHolder.addEventListener('click', () => movieDetails(credit));
		creditLi.appendChild(hHolder);
		creditUL.appendChild(creditLi);
	});
	//".actors-list"
	let newNewDiv = document.createElement('div');
	let newNewRow = document.createElement('div');
	newNewRow.setAttribute('class', 'row');
	newNewDiv.setAttribute('class', 'gatherActorH');
	newNewDiv.classList.add('col-9');
	divHolder.appendChild(actor_photo);
	divHolder.appendChild(actor);
	newNewRow.appendChild(divHolder);
	newNewDiv.appendChild(gender);
	newNewDiv.appendChild(popularity);
	newNewDiv.appendChild(birthD);
	if (personRes.deathday) {
		newNewDiv.appendChild(deathD);
	}
	newNewDiv.appendChild(bioPer);
	newNewRow.appendChild(newNewDiv);
	actorDiv.appendChild(newNewRow);
	actorDiv.appendChild(creditUL);
	//there is already an HTML elements now, but we wanna get rid of them. To make them
};
///////   end of actor section   ////////////
///////////////////////////////////

// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
	// the URL of a movie details to fetch it: "https://api.themoviedb.org/3/movie/${movie.id}?api_key=542003918769df50083a13c415bbc602&language=en-US"
	const movieRes = await fetchMovie(movie.id);

	// the URL of a movie cast to fetch it: "https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=542003918769df50083a13c415bbc602&language=en-US"
	const movieCredit = await fetchMovie(`${movie.id}/credits`);
	const movieSimilar = await fetchMovie(`${movie.id}/similar`);
	const movieTrailer = await fetchMovie(`${movie.id}/videos`);
	const movieSingleActor = await fetchMovie(`${movie.id}/movie_credits`);

	//https://developers.themoviedb.org/3/people/get-person-movie-credits
	///person/{person_id}/movie_credits
	//const actorPage = await fetchMovie(`${movie.id}/videos`);
	// function to create a page with details for each movie
	renderMovie(movieRes, movieCredit, movieSimilar, movieTrailer);
};
const bringMoviesWGenre = async (genreID) => {
	const gatherGenreList = await fetchMoviesWGenre(genreID);
	latestFunc(gatherGenreList.results);
};
const fetchMoviesWGenre = async (genreID) => {
	const url = constructUrl(`discover/movie`) + '&with_genres=' + genreID;
	const res = await fetch(url);
	return res.json();
};

const callGenres = async () => {
	const movieGenreList = await fetchGenres(`genre/movie/list`);
	setSections(movieGenreList);
};
const fetchGenres = async (genres) => {
	//const movieGenreList = await fetchMovie(`genre/movie/list`);
	const url = constructUrl(genres);
	const res = await fetch(url);
	return res.json();
};
// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async (filter = 'now_playing') => {
	const url = constructUrl(`movie/${filter}`);
	const res = await fetch(url);
	return res.json();
};

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
	const url = constructUrl(`movie/${movieId}`);
	const res = await fetch(url);
	return res.json();
};
const fetchActors = async () => {
	const url = constructUrl(`person/popular`);
	const res = await fetch(url);
	return res.json();
};

const checkPoster = (path, backdropPath) => {
	let posterHolder;
	if (!path) {
		posterHolder =
			'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTpWR0beQybs6M-Tw1GqxLLUFrbYSz_kggucy4j0MXkqtwaP56V&usqp=CAU';
	} else {
		posterHolder = backdropPath + path;
	}
	return posterHolder;
};
// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
	CONTAINER.innerHTML = '';
	const rowDiv = document.createElement('div');
	rowDiv.setAttribute('class', 'row');
	rowDiv.classList.add('justify-content-center');
	///MAP IT
	movies.map((movie, index, movies) => {
		let streamPoster = checkPoster(movie.poster_path, BACKDROP_BASE_URL);
		const movieDiv = document.createElement('div');
		movieDiv.innerHTML = `<img src="${streamPoster}" alt="${movie.title} poster" class="movie-poster">`;
		const forMovieTitle = document.createElement('div');
		forMovieTitle.setAttribute('class', 'movie-title');
		forMovieTitle.innerHTML = `<h3 style="font-size: 110%; text-align: center;">${movie.title}</h3>`;
		//main div
		const colDiv = document.createElement('div');
		colDiv.classList.add('col-6', 'col-sm-4', 'col-md-3', 'col-lg-2', 'col-xl-2', 'mb-3', 'for-each-movie');
		//add poster to main div
		colDiv.appendChild(movieDiv);
		//add title to main div
		colDiv.appendChild(forMovieTitle);
		forMovieTitle.addEventListener('click', () => {
			movieDetails(movie);
		});
		movieDiv.addEventListener('click', () => {
			movieDetails(movie);
		});
		rowDiv.appendChild(colDiv);
		CONTAINER.appendChild(rowDiv);
	});

	// making "mouse pointer" when hovering on an image
	let getIMG = document.querySelectorAll('img');
	getIMG.forEach((img) => img.addEventListener('mouseover', () => (img.style.cursor = 'pointer')));
	let getTitle = document.querySelectorAll('.movie-title');
	getTitle.forEach((title) => title.addEventListener('mouseover', () => (title.style.cursor = 'pointer')));
};

//console.log(sample);
// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie, movieCredit, movieSimilar, movieTrailer) => {
	// creating a list of top 5 actors in the movie
	let main_5_actors = [];
	movieCredit.cast.map((actor) => {
		if (actor['order'] < 6) {
			const genres = movie.genres.map((dt) => dt.name);
			const obj = { name: actor.name, id: actor.id, profile_path: actor.profile_path };
			main_5_actors.push(obj);
		}
	});
	// language of the movie
	const language = movie.original_language.toUpperCase();
	//product companies and their logos
	const company_obj = {};
	const COMPANIES = movie.production_companies;
	COMPANIES.forEach((nested_objs) => {
		for (let [ key, value ] of Object.entries(nested_objs)) {
			if (key == 'logo_path' || key == 'name') {
				company_obj[key] = value;
			}
		}
	});
	//director name
	let directorOBJ;
	movieCredit.crew.map((nested_objs) => {
		if (nested_objs.job === 'Director') {
			directorOBJ = { job: nested_objs.job, name: nested_objs.name, profile_path: nested_objs.profile_path };
		}
	});
	//rating and vote counts
	const RATING = { voteRating: movie.vote_average, voteCount: movie.vote_count, popularity: movie.popularity };
	//related movies, recommendation

	//A related movies section which includes at least five related movies
	let ADDTRAILER = [];
	movieTrailer.results.map((trailer) => {
		const obj2 = { key: trailer['key'], name: trailer['name'] };
		ADDTRAILER.push(obj2);
	});
	//movie hover-overview
	//const { overview, vote_average, release_date } = movies;
	//https://api.themoviedb.org/3/person/3/movie_credits?api_key=542003918769df50083a13c415bbc602&language=en-US
	/*creating list of main 5 actor, add event listener to creat a page of each of them and append all of those to our HTML
   */
	/* const setActorPage = () => {
    for (let i = 0; i < main_5_actors.length; i++) {
      const actorPage = document.querySelector(`#actor${i}`);
      actorPage.addEventListener('click', () => actorDetails(main_5_actors[i].name, main_5_actors[i].profile_path, main_5_actors[i].id));
    }https://blogsaays-com-3vkgf8gqdp8entcca1.netdna-ssl.com/wp-content/uploads/2014/02/no-user-profile-picture-whatsapp-1200x1341.jpg
  };*/
	const setActorPage = () => {
		for (let i = 0; i < main_5_actors.length; i++) {
			const actorPage = document.querySelector(`#actor${i}`);
			actorPage.addEventListener('click', () => {
				actorDetails(main_5_actors[i].name, main_5_actors[i].profile_path, main_5_actors[i].id);
			});
		}
	};
	//single movie page html
	CONTAINER.classList.add('w-100');
	CONTAINER.innerHTML = `
    <div class="row">
        <div class="col-12 bg-image m-0 p-0">
             <div id="movie-backdrop" style="background-image: url('${BACKDROP_BASE_URL +
					movie.backdrop_path}');"></div>
        </div>
        <div class="col-2 offset-1">
        <div class="left-movie-poster">
        <img src="${BACKDROP_BASE_URL + movie.poster_path}" alt="${movie.name}"></div>
        </div>
        <div class="col-8  movie-top">
            <h2 id="movie-title">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${movie.release_date}</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
            <li class="lang-item d-flex">
            <h3>Language:</h3> <span>${language}</span>
            </li>
            <li class="company-item company-item d-flex flex-column justify-content-center">
            <h3>Company Name:</h3><p>${company_obj.name}</p>
            <img src="${BACKDROP_BASE_URL + company_obj.logo_path}" alt="company-logo">
            </li>
        </div>
        <div class="row">
          <div class="col-12 bg-dark actors-bg">
            <h3>Actors:</h3>
            <ul id="actors" class="list-unstyled">
            <li class="actors-list">
              <ul class="main-actors d-flex justify-content-around">
                <li><a href="#" id="actor0" class="actor-single-page"><img src="${BACKDROP_BASE_URL +
					main_5_actors[0].profile_path}">${main_5_actors[0].name}</a></li>
                <li><a href="#" id="actor1" class="actor-single-page"><img src="${BACKDROP_BASE_URL +
					main_5_actors[1].profile_path}">${main_5_actors[1].name}</a></li>
                <li><a href="#" id="actor2" class="actor-single-page"><img src="${BACKDROP_BASE_URL +
					main_5_actors[2].profile_path}">${main_5_actors[2].name}</a></li>
                <li><a href="#" id="actor3" class="actor-single-page"><img src="${BACKDROP_BASE_URL +
					main_5_actors[3].profile_path}">${main_5_actors[3].name}</a></li>
                <li><a href="#" id="actor4" class="actor-single-page"><img src="${BACKDROP_BASE_URL +
					main_5_actors[4].profile_path}">${main_5_actors[4].name}</a></li>
              </ul>
            </li></ul></div>

            <div class="col-12">
            <ul class="lang-company-director d-flex justify-content-around">
            <li class="director-item">
            <h5><b>Director:</b></h5><p>${directorOBJ.name}</p><br>
            <img src="${BACKDROP_BASE_URL +
				directorOBJ.profile_path}" alt="This director does not like to be in a photo."></li>
            </ul>
            <li class="related-movies row d-flex justify-content-center">
            </li>
            <div class="singleMovie-trailer d-flex justify-content-center">
              <li class="movie-trailer d-flex justify-content-center flex-column">
              <div>
              <iframe width="400" height="300" src="https://www.youtube.com/embed/${ADDTRAILER[0]
					.key}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
              <p class="trailer-title">${ADDTRAILER[0].name}</p>
            </li>
            
    </div>`;
	let RECOMMANDED = [];
	movieSimilar.results.map((movie, index) => {
		if (index < 8) {
			const obj = { name: movie['original_title'], poster_path: movie['poster_path'], id: movie['id'] };
			RECOMMANDED.push(obj);
		}
	});
	//console.log(RECOMMANDED)
	RECOMMANDED.map((item, index) => {
		let aHolder2 = document.createElement('a');
		aHolder2.href = 'javascript:void()';
		let divHolder = document.createElement('div');
		divHolder.classList.add('recommended-focus');
		divHolder.setAttribute('id', `${item.id}`);
		let pHolder = document.createElement('p');
		pHolder.innerHTML = `${item.name}`;
		let imgHolder = document.createElement('img');
		imgHolder.src = `${BACKDROP_BASE_URL + item.poster_path}`;
		imgHolder.classList.add('related-movies-poster');
		divHolder.addEventListener('click', () => {
			movieDetails(item);
			window.scrollTo(0, 0);
		});
		divHolder.appendChild(aHolder2);
		divHolder.appendChild(imgHolder);
		divHolder.appendChild(pHolder);
		document.querySelector('.related-movies').appendChild(divHolder);
	});
	setActorPage();
};

//MOVIE LANGUAGE
//A related movies section which includes at least five related movies
/*---A trailer section that has the movie trailer from youtube
  -----The movie production company name and logo
  -----The director name
-------The movie rating and how many votes has it received
*/

// function to build the structure of HTML body
callGenres();
const setSections = async (genreList) => {
	// selecting the body of HTML
	const body = document.body;
	// creating and setting the nav bar
	const navBar = document.createElement('header');
	navBar.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4 p-0 fixed-top">
        <a href="#" class="navbar-brand pl-3">Movie-Project</a>
        <button class="navbar-toggler" data-toggle="collapse" data-target="#openMenu" type="button">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse px-0 bg-dark position-relative pr-2" id="openMenu">
            <ul class="navbar-nav ml-auto topNavbar">
            </ul>
        </div>
    </nav>`;
	body.insertBefore(navBar, body.firstElementChild);
	const navArr = [ 'Home', 'Movies', 'Actor List', 'About Us', 'Filter' ];
	const anchorArr1 = [ '#', '#', '#', '#', '#', '#' ];
	const searchBar = document.createElement('li');
	searchBar.classList.add('nav-search', 'm-auto');
	searchBar.innerHTML = `
  <form class="form-inline my-2 my-lg-0  justify-content-center mb-3" action="#" onsubmit="return search(this);">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>`;
	for (let i = 0; i < 5; i++) {
		const navList = document.createElement('li');
		navList.setAttribute('class', 'nav-item');
		navList.classList.add('ml-2', 'mr-3');
		navList.setAttribute('id', `nav-item${i + 1}`);
		navList.innerHTML = `<a href="${anchorArr1[i]}" class="nav-link">${navArr[i]}</a>`;
		document.querySelector('.topNavbar').appendChild(navList);
	}
	document.querySelector('.topNavbar').appendChild(searchBar);
	//movie genres list
	let navMovies = document.querySelector('#nav-item2');
	navMovies.classList.add('dropdown');
	navMovies.innerHTML = `
  <button class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Movies
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
  </div>`;
	let genreHolder = genreList.genres;
	genreHolder.map((item, index) => {
		let [ genId, genName ] = Object.entries(item).map((i) => i[1]);
		let tempCreate = document.createElement('a');
		tempCreate.setAttribute('id', `${genId}`);
		tempCreate.classList.add('dropdown-item', 'only-navbar');
		tempCreate.innerHTML = genName;
		document.querySelector('.dropdown-menu').appendChild(tempCreate);
	});

	const actorBtn = document.getElementById('nav-item3');
	actorBtn.addEventListener('click', async () => {
		const actorList = await fetchActors();
		console.log(actorList);
		renderActors(actorList.results);
	});

	//////////////////////////////
	//// Actors List  ////////////
	const renderActors = (actorList) => {
		CONTAINER.innerHTML = '';
		const rowDiv = document.createElement('div');
		rowDiv.setAttribute('class', 'row');
		rowDiv.classList.add('justify-content-center');
		///MAP IT
		actorList.map((actor, index) => {
			const actorDiv = document.createElement('div');
			actorDiv.innerHTML = `<img src="${BACKDROP_BASE_URL +
				actor.profile_path}" alt="${actor.name} poster" class="movie-poster">`;
			const forActorName = document.createElement('div');
			forActorName.setAttribute('class', 'movie-title');
			forActorName.innerHTML = `<h3 style="font-size: 110%; text-align: center;">${actor.name}</h3>`;
			//main div
			const colDiv = document.createElement('div');
			colDiv.classList.add('col-6', 'col-sm-4', 'col-md-3', 'col-lg-2', 'col-xl-2', 'mb-3', 'for-each-movie');
			//add poster to main div
			colDiv.appendChild(actorDiv);
			//add title to main div
			colDiv.appendChild(forActorName);
			forActorName.addEventListener('click', () => {
				actorDetails(actor.name, actor.profile_path, actor.id);
			});
			actorDiv.addEventListener('click', () => {
				actorDetails(actor.name, actor.profile_path, actor.id);
			});
			rowDiv.appendChild(colDiv);
			CONTAINER.appendChild(rowDiv);
		});

		// making "mouse pointer" when hovering on an image
		let getIMG = document.querySelectorAll('img');
		getIMG.forEach((img) => img.addEventListener('mouseover', () => (img.style.cursor = 'pointer')));
		let getTitle = document.querySelectorAll('.movie-title');
		getTitle.forEach((title) => title.addEventListener('mouseover', () => (title.style.cursor = 'pointer')));
	};
	//////// End of Actors List ///////
	///////////////////////////////////

	// Filter List

	let navFilter = document.querySelector('#nav-item5');
	navFilter.classList.add('dropdown');
	navFilter.innerHTML = `
  <button class="dropdown-toggle" type="button" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Filter
  </button>
  <div id="filterMenu" class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
  </div>`;

	const filterFunction = () => {
		let filters = [
			{ name: 'Popular', val: 'popular' },
			{ name: 'Release Date', val: 'release_date' },
			{ name: 'Top Rated', val: 'top_rated' },
			{ name: 'Now Playing', val: 'now_playing' },
			{ name: 'Upcoming', val: 'upcoming' }
		];
		filters.map((filter, index) => {
			let selection = document.createElement('a');
			selection.setAttribute('id', `filter${index}`);
			selection.classList.add('dropdown-item');
			selection.innerHTML = filter.name;
			selection.addEventListener('click', function() {
				altAutorun(filter.val);
			});
			document.querySelector('#filterMenu').appendChild(selection);
		});
	};
	filterFunction();
	//get movies by ids

	//add dropdown items
	//<a class="dropdown-item" href="#">Action</a>
	//get movie genres from: /genre/movie/list
	//get movies by genre id: /discover/movie
	document.querySelectorAll('.only-navbar').forEach((item) => {
		item.addEventListener('click', () => {
			bringMoviesWGenre(item.id);
		});
	});

	//load homepage
	document.querySelector('#nav-item1').addEventListener('click', function() {
		location.reload();
	});
	// creating and setting the footer
	const footer = document.createElement('footer');
	footer.setAttribute('class', 'container-fluid');
	footer.classList.add('font-small', 'bg-dark');

	footer.innerHTML = `<nav class="navbar navbar-dark bg-dark d-flex justify-content-center h-100 p-0 flex-column">
  <ul class="navbar-nav flex-row w-75 justify-content-center align-items-center">
    <li class="nav-item p-1 pr-2">
        <ul class="navbar-nav flex-row">
        <li class="nav-item nav-item-nested">
          <a href="https://github.com/maher-suleyman" class="navbar-brand  mx-1">
          <img class="gitLogo" src="./hex_github.svg" alt="github icon"></a>
            </li>
        <li class="nav-item nav-item-nested">
          <a href="https://www.linkedin.com/in/maher-suleyman/" class="navbar-brand  mx-1">
        <img src="./hex_linkedin.svg" alt="linkedin icon"></a>
        </li></ul></li>
    <li class="nav-item p-1 footerCredits"><p>The movie project made by <span class="maher">Maher</span> and <span class="emre">Emre</span> out of <img src="./heart.svg" id="heart-logo" alt="<3" /></p></li>
    <li class="nav-item p-1 pl-2">
          <ul class="navbar-nav flex-row">
          <li class="nav-item nav-item-nested">
            <a href="https://github.com/emrerdem1" class="navbar-brand  mx-1">
            <img class="gitLogo" src="./hex_github.svg" alt="github icon"></a>
              </li>
          <li class="nav-item nav-item-nested">
            <a href="https://www.linkedin.com/in/emrerdem94/" class="navbar-brand  mx-1">
          <img src="./hex_linkedin.svg" alt="linkedin icon"></a>
              </li></ul></li></li>
    </nav>`;
	//body.insertBefore(footer, body.children[2]);
	let tempCONTAINER = document.querySelector('.editContainer');
	body.insertBefore(footer, tempCONTAINER.nextSibling);
};
//setSections();

//movie genres' function
const latestFunc = (matchedGenres) => {
	let genresTempHolder = matchedGenres;
	renderMovies(genresTempHolder);
};

//actor, trailers, details in moviepage

document.addEventListener('DOMContentLoaded', autorun);
