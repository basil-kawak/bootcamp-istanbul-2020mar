'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3"; // for all data
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185"; // for actors
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780"; // for movies
const CONTAINER = document.querySelector(".container");
const actorsButton = document.getElementById("actors");
const homeBtn = document.getElementById("home");

// Don't touch this function please
const autorun = async(movieList) => {
    CONTAINER.innerHTML = ""
    const movies = await fetchMovies(movieList);
    renderMovies(movies.results);
};

// Don't touch this function please
const runActors = async() => {
    CONTAINER.innerHTML = ""
    const actors = await fetchActors();
    renderActors(actors.results);
};


// Don't touch this function please
const constructUrl = (path) => {
    return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};

// const searchConstructUrl = (path, input) => {
//     return `${TMDB_BASE_URL}/${path}?api_key=${atob(
//     "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=query="${input}
//   )}`;
// };


// You may need to add to this function, definitely don't delete it.
const movieDetails = async(movie) => {
    const movieRes = await fetchMovie(movie.id);

    let creditMovie = await fetchCredits(movie.id);
    let castMovie = creditMovie.cast
    let cast = []
    for (let index = 0; index < 5; index++) {
        cast.push({
            name: castMovie[index].name,
            poster: castMovie[index].profile_path,
            id: castMovie[index].id
        })
    }

    let crewMovie = creditMovie.crew

    let similarMovies = await fetchSimilar(movie.id);
    similarMovies = similarMovies.results
    let results = []
    for (let index = 0; index < 5; index++) {
        results.push({
        title: similarMovies[index].original_title,
        poster: similarMovies[index].poster_path
        })
    }

    let videoMovie = await fetchVideo(movie.id);
    let trailer = videoMovie.results

    console.log(videoMovie)
    renderMovie(movieRes, cast, crewMovie, results, trailer);
};


// You may need to add to this function, definitely don't delete it.
const actorDetails = async(actor) => {
    const actorRes = await fetchActor(actor.id);

    let actorMovieList = await fetchMovieActorList(actor.id);
    let actorMovList = actorMovieList.cast
    let cast = []
    for (let index = 0; index < 3; index++) {
        cast.push({
            name: actorMovList[index].title
        })
    }

    console.log(actorMovieList)
    renderActor(actorRes, cast);
};

// Search Bar
// const getInputValue = async () => {
//     const searchValue = document.querySelector('search-bar').value;
//     let results = await fetchSearch(searchValue);
//     results = results.results;
//     let actors = [];
//     let movies = [];
//     results.forEach(async (element) => {
//       if (element.known_for_department === 'Acting') {
//         actors.push(element);
//       } else if (element.media_type === 'movie') {
//         movies.push(element);
//       }
//     });
//     renderMovies();
//     renderActors();
//   };

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async(movieList) => {
    const url = constructUrl(`movie/${movieList}`);
    const res = await fetch(url);
    return res.json();
};


// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async(movieId) => {
    const url = constructUrl(`movie/${movieId}`);
    const res = await fetch(url);
    return res.json();
};

const fetchCredits = async(movieId) => {
    const url = constructUrl(`movie/${movieId}/credits`);
    const res = await fetch(url);
    return res.json();
};

const fetchSimilar = async(movieId) => {
    const url = constructUrl(`movie/${movieId}/similar`);
    const res = await fetch(url);
    return res.json();
};

const fetchVideo = async(movieId) => {
    const url = constructUrl(`movie/${movieId}/videos`);
    const res = await fetch(url);
    return res.json();
};

const fetchGeners = async() => {
    const url = constructUrl(`genre/movie/list`);
    const res = await fetch(url);
    return res.json();
};

// const fetchSearch = async(searchValue) => {
//     const url = searchConstructUrl(`search/multi`);
//     const res = await fetch(url);
//     return res.json();
// };

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchActors = async() => {
    const url = constructUrl(`person/popular`);
    const res = await fetch(url);
    return res.json();
};

// fetch for actor single page //
const fetchActor = async(personId) => {
    const url = constructUrl(`person/${personId}`);
    const res = await fetch(url);
    return res.json();
};

const fetchMovieActorList = async(personId) => {
    const url = constructUrl(`person/${personId}/movie_credits`);
    const res = await fetch(url);
    return res.json();
};

const renderGeners = async() => {
    const genreResponse = await fetchGeners();
    const genersArray = genreResponse.genres
    const movieDropDown = document.querySelector("#dropdown-menu1");
    genersArray.map(genre => {
        const genreLi = document.createElement("a")
        genreLi.innerText = genre.name
        genreLi.setAttribute("class", "dropdown-item")
        genreLi.setAttribute("href", "#")
        genreLi.addEventListener("click", () => {
            
        })
        movieDropDown.appendChild(genreLi);

    })
    console.log(genersArray);
}
renderGeners();





// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
    movies.map((movie) => {
        CONTAINER.setAttribute("class", "row m-0")
        const movieDiv = document.createElement("div");
        movieDiv.setAttribute("class", "col-lg-4 col-md-6")
        movieDiv.innerHTML = `
      <div class="Image-with-title">
      <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${movie.title} poster" class="w-100" id="movie-poster">
      <h3 class="movie-title">${movie.title}</h3>
      </div>`;
        movieDiv.addEventListener("click", () => {
            movieDetails(movie);
        });
        CONTAINER.appendChild(movieDiv);
    });
};

// You'll need to play with this function in order to add features and enhance the style.
const renderActors = (actors) => {
    actors.map((actor) => {
        CONTAINER.setAttribute("class", "row m-0")
        const actorDiv = document.createElement("div");
        actorDiv.setAttribute("class", "col-lg-4 col-md-6")
        actorDiv.innerHTML = `
      <div class="Image-with-title">
      <img src="${PROFILE_BASE_URL + actor.profile_path}" alt="${actor.name}" class="w-100" id="actor-poster">
      <h3 class="movie-title">${actor.name}</h3>
      </div>`;
          actorDiv.addEventListener("click", () => {
          actorDetails(actor);
        });
        CONTAINER.appendChild(actorDiv);
    });
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie, credit, director, similar, video) => {

    CONTAINER.innerHTML = `
  <div class="inner_movies">
    <div class="">
    <img id="movie-backdrop" src=${
      BACKDROP_BASE_URL + movie.backdrop_path
    }>
        <div class="col-md-4">
        </div>
        <div class="col-md-12">
            <iframe id="movie-video" width="630" height="360" src="https://www.youtube.com/embed/${video[0].key}"></iframe>
            <h2 id="movie-titles">${movie.title}</h2> <br>
            
            <div id="movie-body">
            <p id="movie-release-date"><b>Release Date:</b> ${
              movie.release_date}</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <p id="movie-overview"><b>Overview: </b> ${movie.overview}</p>
            <p><b>Language: </b> ${movie.original_language} </p>
            <p id="movie-vote"><b>Vote Average: </b>${movie.vote_average}</p>
            <p id="movie-vote_count"><b>Vote Counts: </b>${movie.vote_count}</p>
            <p id="movie-prod"><b>Production Companies: </b>${movie.production_companies[0].name}, ${movie.production_companies[1].name}</p>
            <p> <b> Director: </b>${director[1].name}</p>
            <br>
            
            <h3 id="actors-in"> Actors: </h3>
            <div class="inline-similars">
                <div id="similar-actors">
                <img src=${PROFILE_BASE_URL + credit[0].poster}> <p>${credit[0].name}</p>
                </div>
                
                <div id="similar-actors">
                <img src=${PROFILE_BASE_URL + credit[1].poster}> <p>${credit[1].name}</p>
                </div>

                <div id="similar-actors">
                <img src=${PROFILE_BASE_URL + credit[2].poster}> <p>${credit[2].name}</p>
                </div>

                <div id="similar-actors">
                <img src=${PROFILE_BASE_URL + credit[3].poster}> <p> ${credit[3].name} </p>
                </div>

                <div id="similar-actors">
                <img src=${PROFILE_BASE_URL + credit[4].poster}> <p> ${credit[4].name} </p>
                </div>
            </div>
            </p>


            <h3 id="movies-in"> Similar Movies: </h3> 
            <div class="inline-similars">
                <div id="similar-movies">
                <img src=${ PROFILE_BASE_URL +similar[0].poster}> <p> ${similar[0].title} </p>
                </div>

                <div id="similar-movies">
                <img src=${PROFILE_BASE_URL + similar[1].poster}> <p> ${similar[1].title} </p>
                </div>

                <div id="similar-movies">
                <img src=${PROFILE_BASE_URL +similar[2].poster}><p> ${similar[2].title} </p>
                </div>

                <div id="similar-movies">
                <img src=${PROFILE_BASE_URL +similar[3].poster}><p> ${similar[3].title} </p>
                </div>

                <div id="similar-movies">
                <img src=${PROFILE_BASE_URL +similar[4].poster}><p> ${similar[4].title} </p>
            </div>
            </div>
        </div>

    </div>
      `;
    console.log(credit);
};


// You'll need to play with this function in order to add features and enhance the style.
const renderActor = (actor, list) => {

    CONTAINER.innerHTML = `
  <div class="inner-actor">
    <img id="actor-backdrop" src=${
        PROFILE_BASE_URL + actor.profile_path
    }>

            <div id="actor-layout">
                <h2 id="actor-titles">${actor.name}</h2> <br>
                <p id="actor-gender"><b>Gender:</b> ${
                actor.gender}</p>
                <p id="actor-birthday"><b>Birthday:</b> ${actor.birthday}</p>
                <p id="actor-biography"><b>Biography: </b> ${actor.biography}</p>
                <p><b>Movies Participated In: </b> ${list[0].name}, ${list[1].name}, ${list[2].name}</p>
            </div>
        
    </div>
      `;
    console.log(list);
};


document.addEventListener("DOMContentLoaded", autorun('now_playing'));
homeBtn.addEventListener('click', autorun('now_playing'))
actorsButton.addEventListener('click', runActors)