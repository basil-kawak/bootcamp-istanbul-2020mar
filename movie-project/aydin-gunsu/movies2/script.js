'use strict';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const PROFILE_BASE_URL = 'http://image.tmdb.org/t/p/w185';
const BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780';
const CONTAINER = document.querySelector('.container');
const ACTORESDV = document.querySelector('.actors');
const CONT_ACTOR = document.querySelector('.container-actor');



// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob('NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=')}`;
};
// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  renderMovies(movies.results);
};

const autorun2 = async () => {
  const genre = await fetchGenres();
  renderGenreDropDown(genre.genres);
  //event listeners
  let filtered = document.getElementById('filtersDropDown');
  filtered.addEventListener('change', function () {
    let optionsFilter = filtered.querySelectorAll('option');
    sortMovies(filtered.value);
  });

  let genres = document.getElementById('genresDropDown');
  genres.addEventListener('change', function () {
    let optionsGenre = genres.querySelectorAll('option');
    genreMovies(genres.value, genre);
  });

  let actorBtn = document.getElementById('actorsPage');
  actorBtn.addEventListener('click', async () => {
    let actorsInfo = await fetchAllActors();
    let actorsData = parseActorsData(actorsInfo);
   
    renderActorInfoPage(actorsData);
  });
  let aboutBtn = document.getElementById('about');
  aboutBtn.addEventListener('click', async () => {
    aboutPage();
     });
  //event listeners
};



/*FETCH FUNCTIONS*/
// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async (sortingType = 'now_playing') => {
  const url = constructUrl(`movie/${sortingType}`);
  const res = await fetch(url);
  return res.json();
};
const fetchAllActors = async () => {
  const url = constructUrl(`person/popular`);
  const res = await fetch(url);
  return res.json();
};

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};
const fetchActorDetail = async (actorId) => {
  const url = constructUrl(`person/${actorId}`);
  const res = await fetch(url);
  return res.json();
};
const fetchActors = async () => {
  const url = constructUrl(`person/popular`);
  const res = await fetch(url);
  return res.json();
};
const fetchActorsMovies = async (actorId) => {
  const url = constructUrl(`person/${actorId}/movie_credits`);
  const res = await fetch(url);
  return res.json();
};
const fetchCredits = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/credits`);
  const res = await fetch(url);
  return res.json();
};
const fetchRelatedMovies = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/similar`);
  const res = await fetch(url);

  return res.json();
};
const fetchTrailer = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/videos`);
  const res = await fetch(url);

  return res.json();
};
const fetchSearchMoviesAndActors = async (searchValue) => {

  const url = `https://api.themoviedb.org/3/search/multi?api_key=9902b134582ad4ddad59aa7e54a5164f&language=en-US&query=${searchValue}`;
  const res = await fetch(url);

  return res.json();
};
const fetchGenres = async () => {
  const url = constructUrl(`genre/movie/list`);
  const res = await fetch(url);
  return res.json();
};

const fetchMoviesWithGenre = async (genreId) => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=542003918769df50083a13c415bbc602&with_genres=${genreId}`;
  const res = await fetch(url);
  return res.json();
};
/*FETCHING FUNCTIONS*/

/*RENDERING FUNCTIONS*/
const renderActorsPage = async () => {
  let data = await fetchActors();

  CONTAINER.innerHTML = ``;
  data.results.forEach((actor) => {
    CONT_ACTOR.innerHTML += `<div>
   <img src="${BACKDROP_BASE_URL + actor.profile_path}" alt="${actor.name} poster">
        <h3>${actor.name}</h3></div>`;
  });
};
const aboutPage = () => {
  CONTAINER.innerHTML = `<div style = "width: 100%;"><h1>The Movie DB Exercise Project</h1><br><p>This was a project at Re:Coded Bootcamp.</p></div>`
}

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {

  CONTAINER.innerHTML = '';
  let rowDiv = document.getElementsByClassName('row')[0];
  movies.map((movie) => {
    movie.backdrop_path = movie.backdrop_path == null ? "defaultMov.png" : BACKDROP_BASE_URL + movie.backdrop_path
    const movieDiv = document.createElement('div');
    movieDiv.setAttribute('class', 'col-md-4');
    movieDiv.innerHTML = `
      <div  class = "visible">
        <div class = "bum">
        <img class="movie" src="${movie.backdrop_path}"  alt="${movie.title} poster">
        <h3>${movie.title} <div class = "hidden"><h3 class = "desc-film"> &#11088; ${movie.vote_average}</h3></div></h3>
        </div>
        </div>
        `;

    movieDiv.addEventListener('click', () => {
      movieDetails(movie);
    });


    CONTAINER.appendChild(movieDiv);
  });
};
const renderActorInfoPage = (actors) => {

  CONTAINER.innerHTML = '';
  let rowDiv = document.getElementsByClassName('row')[0];
  actors.map((actor) => {
    const actorDiv = document.createElement('div');
    actorDiv.setAttribute('class', 'col-md-4');
    actorDiv.innerHTML = `
        <img class="movie" src="${BACKDROP_BASE_URL + actor.picture}" alt="${actor.name} poster">
        <h3>${actor.name}</h3>
        `;
    actorDiv.addEventListener('click', async () => {
      let actorDetail = await fetchActorDetail(actor.id);
      let actorMovie = await fetchActorsMovies(actor.id);
      let allActorMovie = [];
      actorMovie.cast.forEach((element) => {
        allActorMovie.push(element.title);
      });
      const obj = {
        id: actor.id,
        birthday: actorDetail.birthday,
        name: actorDetail.name,
        popularity: actorDetail.popularity,
        gender: actorDetail.gender === 2 ? 'Male' : 'Female',
        picture: actorDetail.profile_path,
        deathday: actorDetail.deathday || 'Alive',
        biography: actorDetail.biography,
        actorMovies: allActorMovie.length > 0 ? allActorMovie : 'Did not act in a movie',
      };
      renderActor(obj);
    });
    CONTAINER.appendChild(actorDiv);
  });
};
const renderActors = async (actors) => {
  ACTORESDV.innerHTML = '';
  actors.map(async (actor) => {
    let actorDetail = await fetchActorDetail(actor.id);
    let actorMovie = await fetchActorsMovies(actor.id);
    let allActorMovie = [];
    actorMovie.cast.forEach((element) => {
      allActorMovie.push(element.title);
    });
    actor.profile_path = actor.profile_path == null ? "defaultAct.png" : BACKDROP_BASE_URL + movie.backdrop_path
    const actorDiv = document.createElement('div');
    actorDiv.setAttribute("class", "col-md-4");
    actorDiv.innerHTML = `
    <div class = "col-md-4">
        <img src="${BACKDROP_BASE_URL + actor.profile_path}" alt="${actor.name} poster">
        <h3>${actor.name}</h3></div>`;
    CONTAINER.innerHTML += actorDiv.innerHTML;
    actorDiv.addEventListener('click', () => {
      const obj = {
        birthday: actorDetail.birthday,
        name: actorDetail.name,
        popularity: actorDetail.popularity,
        gender: actorDetail.gender === 2 ? 'Male' : 'Female',
        picture: actorDetail.profile_path,
        deathday: actorDetail.deathday || 'Alive',
        biography: actorDetail.biography,
        actorMovies: allActorMovie,
      };

      renderActor(obj);
    });
    // ACTORESDV.appendChild(actorDiv);
  });
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie, credits, similarMovies, trailer) => {
  let arrayOfSimilarMovies = similarMovies.results;
  let trailerMarkup = `
  <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer.results[0].key}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

  `;
  let directorName = '';
  let movieLang = movie.original_language.toUpperCase();
  for (let i = 0; i < credits.crew.length; i++) {
    if (credits.crew[i].job === 'Director') {
      directorName = credits.crew[i].name;
    }
  }
  let actorList = [];

  for (let i = 0; i < 5; i++) {
    actorList.push(credits.cast[i]);

  }

  CONTAINER.innerHTML = `
   <div class = "movie-title "><h2 id="movie-title">${movie.title}</h2></div>
     <div class="row ">

        <div class="col-md-6">
             <img id="movie-backdrop" src=${BACKDROP_BASE_URL + movie.backdrop_path}>
     <div class = "other-infos">
     <div class = "creation">

     <div id = "production-company"> <div class =  "col-md-6"> <h4>${movie.production_companies[0].name}</h4> </div>
         <div class =  "col-md-6"><img src = "${BACKDROP_BASE_URL + movie.production_companies[0].logo_path}" alt = "${movie.production_companies[0].name} logo">
        </div></div>

    </div>
    <h4>Director:\n${directorName}</h4>
        <h4>Original Language: ${movieLang}</h4>
        </div>
        <div class = "actorS"><h3>Actors:</h3> 
          <ul id="actors">
            <li value=${credits.cast[0].id} onclick="displayActor(this)"><div><img src = "${BACKDROP_BASE_URL + credits.cast[0].profile_path}"><p>${credits.cast[0].name}</p></div></li>
            <li value=${credits.cast[1].id} onclick="displayActor(this)"><div><img src = "${BACKDROP_BASE_URL + credits.cast[1].profile_path}"><p>${credits.cast[1].name}</p></div></li>
            <li value=${credits.cast[2].id} onclick="displayActor(this)"><div><img src = "${BACKDROP_BASE_URL + credits.cast[2].profile_path}"><p>${credits.cast[2].name}</p></div></li>
            <li value=${credits.cast[3].id} onclick="displayActor(this)"><div><img src = "${BACKDROP_BASE_URL + credits.cast[3].profile_path}"><p>${credits.cast[3].name}</p></div></li>
            <li value=${credits.cast[4].id} onclick="displayActor(this)"><div><img src = "${BACKDROP_BASE_URL + credits.cast[4].profile_path}"><p>${credits.cast[4].name}</p></div></li>
            </ul></div>
                    
        </div>
        
        <div class="col-md-6">
            <div class = "trailer">
            ${trailerMarkup}
            </div>
             <div class = "under-trailer">

                <div class = "col-md-6">
                <p id="movie-release-date"><b>Release Date:</b> ${movie.release_date}</p>
                <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
                <p id="rating"><b>Rating:</b> ${movie.vote_average} </p>
                </div>

                <div class = "col-md-6">
                <h3>Overview:</h3>
                <p id="movie-overview">${movie.overview}</p>
                </div>

             </div>
        </div>
        </div>

      <div class = "related-movies row"></div>
    </div>`;
  //movie.production_companies[0]
  let relatedMovieDive = document.querySelector('.related-movies');

  for (let i = 0; i < 4; i++) {
    const simMovDiv = document.createElement('div');
    simMovDiv.setAttribute('class', 'col-md-3');
    const img = document.createElement('img');
    const title = document.createElement('h4');
    title.innerText = `${arrayOfSimilarMovies[i].title}`;
    simMovDiv.addEventListener('click', () => {
      movieDetails(arrayOfSimilarMovies[i]);
    });
    
    img.setAttribute('src', `${BACKDROP_BASE_URL + arrayOfSimilarMovies[i].poster_path}`);
    simMovDiv.appendChild(title);
    simMovDiv.appendChild(img);
    relatedMovieDive.appendChild(simMovDiv);
  }

};
const renderActor = (obj) => {
  ACTORESDV.innerHTML = '';
  if (typeof obj.actorMovies === 'string') {
    CONTAINER.innerHTML = `
    <div class="row">
        <div class="col-md-4">
             <img id="movie-backdrop" src=${BACKDROP_BASE_URL + obj.picture}>
        </div>
        <div class="col-md-8">
            <h2 id="movie-title">${obj.name}</h2>
            <p id="movie-release-date"><b> Date Of birth:</b> ${obj.birthday}</p>
            <p id="movie-release-date"><b> Gender:</b> ${obj.gender}</p>
            <p id="movie-runtime"><b>Popularity:</b> ${obj.popularity} </p>
            <h3>Biography:</h3>
            <p id="movie-overview">${obj.biography}</p>
        </div>
        </div>
        <div class="actedIn" style="width: 100%;">
            <h3>Acted in:</h3>
            <ul id="actors" class="list-unstyled">
            <p> ${obj.actorMovies}<p>
        </div>
            </ul>`;
  } else {
    CONTAINER.innerHTML = `
    <div class="row">
        <div class="col-md-4">
             <img id="movie-backdrop" src=${BACKDROP_BASE_URL + obj.picture}>
        </div>
        <div class="col-md-8">
            <h2 id="movie-title">${obj.name}</h2>
            <p id="movie-release-date"><b> Date Of birth:</b> ${obj.birthday}</p>
            <p id="movie-release-date"><b> Gender:</b> ${obj.gender}</p>
            <p id="movie-runtime"><b>Popularity:</b> ${obj.popularity} </p>
            <h3>Biography:</h3>
            <p id="movie-overview">${obj.biography}</p>
        </div>
        </div>
        <div class="actedIn" style="width: 100%;">
            <h3>Acted in:</h3>
            <ul id="actors" class="list-unstyled">
            <li value=${obj.actorMovies[0]} > ${obj.actorMovies[0]}</li>
            <li value=${obj.actorMovies[1]} > ${obj.actorMovies[1]}</li>
            <li value=${obj.actorMovies[2]} > ${obj.actorMovies[2]}</li>
            <li value=${obj.actorMovies[3]} > ${obj.actorMovies[3]}</li>
            <li value=${obj.actorMovies[4]} > ${obj.actorMovies[4]}</li>
        </div>
            </ul>`;
  }
};

/*RENDERING FUNCTIONS*/


const parseActorsData = (actors) => {
  actors = actors.results;
  let actorObj = [];
  actors.forEach((actor) => {
    actor.known_for.forEach((products, counter = 0) => {
      let actorObject = {
        id: actor.id,
        picture: actor.profile_path,
        name: actor.name,
      };
      let idCount = 0;
      for (let i = 0; i < actorObj.length; i++) {
        if (actorObj[i].id === actor.id) {
          counter++;
        }
      }
      if (counter == 0) {
        actorObj.push(actorObject);
      }
    });
  });

  return actorObj;
};

// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  const credits = await fetchCredits(movie.id);
  const similarMovies = await fetchRelatedMovies(movie.id);
  const trailer = await fetchTrailer(movie.id);

  renderMovie(movieRes, credits, similarMovies, trailer);
};


const genreMovies = async (genreName) => {
  const genresJson = await fetchGenres();
  let genreId = 28;
  for (let i = 0; i < genresJson.genres.length; i++) {
    if (genresJson.genres[i].name === genreName) {
      genreId = genresJson.genres[i].id;
    }
  }

  const movies = await fetchMoviesWithGenre(genreId);
  renderMovies(movies.results);
};


const sortMovies = async (sortingType) => {
  const movies = await fetchMovies(sortingType);
  renderMovies(movies.results);
};
//this renders the genre dropdown
const renderGenreDropDown = (genres) => {
  let dropDownList = document.getElementById('genresDropDown');
  for (let i = 0; i < genres.length; i++) {
    const option = document.createElement('option');
    option.innerHTML = `${genres[i].name}`;
    dropDownList.appendChild(option);
  }
};

document.addEventListener('DOMContentLoaded', async function () {
  autorun2();
  autorun();
});
const displayActor = async (elm) => {

  let id = elm.getAttribute('value');
  let actorDetail = await fetchActorDetail(id);

  let actorMovie = await fetchActorsMovies(id);
  
  let allActorMovie = [];
  actorMovie.cast.forEach((element) => {
    allActorMovie.push(element.title);
  });
  const obj = {
    birthday: actorDetail.birthday,
    name: actorDetail.name,
    popularity: actorDetail.popularity,
    gender: actorDetail.gender === 2 ? 'Male' : 'Female',
    picture: actorDetail.profile_path,
    deathday: actorDetail.deathday || 'Alive',
    biography: actorDetail.biography,
    actorMovies: allActorMovie,
  };
  renderActor(obj);
};
const getInputValue = async () => {
  const searchValue = document.getElementById('myInput').value;
  let results = await fetchSearchMoviesAndActors(searchValue);
  results = results.results;
  let actors = [];
  let movies = [];
  results.forEach(async (element) => {
    if (element.known_for_department === 'Acting') {
      actors.push(element);
    } else if (element.media_type === 'movie') {

      movies.push(element);
    }
  });
  renderMovies(movies);
  renderActors(actors);
};
