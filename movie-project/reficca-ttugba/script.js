'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");

// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  console.log(movies)
  renderMovies(movies.results);
};

// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};

// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieDetail = await fetchMovie(movie.id);
  const movieCredits = await fetchMovieCredits(movie.id);
  const movieSimilar = await fetchMovieSimilar(movie.id);
  const movieVideos = await fetchMovieVideos(movie.id);

  let actors = movieCredits.cast.slice(0, 5);
  let lang = movieDetail.original_language;
  let similarMovies = movieSimilar.results.slice(0, 6);
  let trailer = movieVideos.results.find(element => {
    return element.type === "Trailer";
  });
  let prodCompanies = movieDetail.production_companies;
  let directors = movieCredits.crew.filter(element => {
    return element.job === "Director";
  });
  let rating = movieDetail.vote_average;
  let voteCount = movieDetail.vote_count;
  let backdropPath = movieDetail.backdrop_path;
  let title = movieDetail.title;
  let releaseDate = movieDetail.release_date;
  let runtime = movieDetail.runtime;
  let overview = movieDetail.overview;

  let movieObj = {
    actors,
    lang,
    similarMovies,
    trailer,
    prodCompanies,
    directors,
    rating,
    voteCount,
    backdropPath,
    title,
    releaseDate,
    runtime,
    overview,
  };

  renderMovie(movieObj);
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async (string="now_playing") => {
  const url = constructUrl(`movie/${string}`);
  const res = await fetch(url);
  return res.json();
};

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};

/////////////////////////////////////////////////////////////More Fetch
const fetchMovieCredits = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/credits`);
  const res = await fetch(url);
  return res.json();
};

const fetchMovieSimilar = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/similar`);
  const res = await fetch(url);
  return res.json();
};

const fetchMovieVideos = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/videos`);
  const res = await fetch(url);
  return res.json();
};


// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  CONTAINER.innerText = "";
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.setAttribute("id", "movie-div");
    movieDiv.innerHTML = `
        <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${movie.title} poster">
        <h3>${movie.title}</h3>`;
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    CONTAINER.appendChild(movieDiv);
  });
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie) => {

  let actorsHTML = movie.actors.map(element => {
  //   let divTag = document.createElement("div");
  //   divTag.classList.add("actor");
  //   let actorImg = document.createElement("img");
  //   actorImg.setAttribute("src", `${BACKDROP_BASE_URL + element.profile_path}`);
  //   actorImg.setAttribute("height", "100em");
  //   actorImg.setAttribute("placeholder", "${element.name}")
  //   let nameSpan = document.createElement("span");
  //   let charSpan = document.createElement("span");
  //   nameSpan.innerText = `${element.name}`;
  //   charSpan.innerText = `${element.character}`;

  //   divTag.appendChild(actorImg);
  //   divTag.appendChild(nameSpan);
  //   divTag.appendChild(charSpan);

  //   divTag.addEventListener("click", () => {
  //     console.log()
  //     renderActor(element);
  //   });

  //   return divTag.innerHTML;
    return `
      <div class="actor"> 
        <img src=${BACKDROP_BASE_URL + element.profile_path} height=100em placeholder="Actor photo">
        ${element.name} 
        ${element.character}
      </div>`;
  }).join("\n");

  let prodCompaniesHTML = movie.prodCompanies.map(element => {
    return `
      <p class="production-company"> 
        <img src=${BACKDROP_BASE_URL + element.logo_path} height=25em placeholder="Production Company logo">
        ${element.name} 
      </p>`;
  }).join("\n");

  let similarMoviesHTML = movie.similarMovies.map(element => {
    return `
      <div class="similar-movies"> 
        <img src=${BACKDROP_BASE_URL + element.poster_path} height=100em placeholder="Movie poster">
        ${element.title} 
      </div>`;
  }).join("\n");

  let directorsHTML = movie.directors.map(element => {
    return `
      <p class="directors"> 
        <img src=${BACKDROP_BASE_URL + element.profile_path} height=100em placeholder="Director">
        ${element.name} 
      </p>`;
  }).join("\n");

  let trailerHTML;
  if (movie.trailer) {
    trailerHTML = `<iframe src="https://www.youtube.com/embed/${movie.trailer.key}"></iframe>`
  } else {
    trailerHTML = "";
  };

  CONTAINER.innerHTML = `
    <div class="row">
        <div class="col-md-6">
             <img id="movie-backdrop" src=${BACKDROP_BASE_URL + movie.backdropPath}>
        </div>

        <div class="col-md-6">
            <h2 id="movie-title">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${movie.releaseDate}</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <p id="movie-language"><b>Language:</b> ${movie.lang}</p>
            <p id="movie-rating"><b>Rating:</b> ${movie.rating}</p>
            <p id="movie-vote"><b>Votes:</b> ${movie.voteCount}</p>
            <h3>Overview:</h3>
              <p id="movie-overview">${movie.overview}</p>
        </div>

        <div>${trailerHTML}</div>

        <div class="col-md-12" id="movie-directors">
            <h3>Director(s):</h3> 
            ${directorsHTML}
        </div>

        
        <div class="col-md-12">
            <h3>Actors</h3>
            ${actorsHTML}
        </div>

        <div class="col-md-12">
            <h3>Production Companies</h3>
            ${prodCompaniesHTML}
        </div>

        <div class="col-md-12">
            <h3>Similar Movies</h3>
            ${similarMoviesHTML}
        </div>
    </div>`;
};


const filterMoviesByGenre = (movies, genreId) => {
  return movies.filter(movie => {
    console.log(movie["genre_ids"])
    return movie["genre_ids"].indexOf(genreId) >= 0;
  });
};


/////////////////////////////////////////////////////////////////Actors
const fetchActors = async () => {
  const url = constructUrl(`person/popular`);
  const res = await fetch(url);
  return res.json();
};

const fetchActor = async (personId) => {
  const url = constructUrl(`person/${personId}`);
  const res = await fetch(url);
  return res.json();
};

const renderActors = (people) => {
  console.log(people)
  CONTAINER.innerText = "";
  people.forEach(person => {
    const actorDiv = document.createElement("div");
    actorDiv.setAttribute("id", "container");
    actorDiv.setAttribute("class", "col-6 col-md-4")
    actorDiv.innerHTML = `
        <img src="${BACKDROP_BASE_URL + person.profile_path}" height=100em alt="${person.name}'s photo">
        <h3>${person.name}</h3>`;
    actorDiv.addEventListener("click", () => {
      actorDetails(person);
    });
    CONTAINER.appendChild(actorDiv);
  });
};

const renderActor = (person) => { 
  let knownForHTML = person.listOfMovies.map(element => {
    console.log(person.listOfMovies)
    let show = element.title;
      if (!show) {
        name = element.name;
      };
    return `
      <p class="known-for"> 
        <img src=${BACKDROP_BASE_URL + element.poster_path} height=100em placeholder="Movie Poster">
        ${name} 
      </p>`;
  }).join("\n");

  CONTAINER.innerHTML = `
  <div class="row">
      <div class="col-md-6">
           <img id="movie-backdrop" src=${BACKDROP_BASE_URL + person.image}>
      </div>

      <div class="col-md-6">
          <h2 id="person-name">${person.name}</h2>
          <p id="person-gender"><b>Gender:</b> ${person.gender}</p>
          <p id="person-popularity"><b>Popularity:</b> ${person.popularity}</p>
          <p id="person-birthday"><b>Birthday:</b> ${person.birthday}</p>
          <p id="person-deathday"><b>Deathday:</b> ${person.deathday}</p>
          <h3>Bio:</h3>
            <p id="person-bio">${person.bio}</p>
      </div>

      <div>
        <h3>Known For:</h3>
          <p>${knownForHTML}</p>
      </div>
  </div>`;
};


const mapGender = element => {
  if (element === 1) {
    return "Female";
  } else if (element === 2) {
    return "Male";
  };
};

const actorDetails = async (person) => {
  const actorDetail = await fetchActor(person.id);
  
  let name = actorDetail.name;
  let gender = mapGender(actorDetail.gender);

  let image = actorDetail.profile_path;
  let popularity = actorDetail.popularity;
  let birthday = actorDetail.birthday;
  let deathday =  actorDetail.deathday;
  let bio = actorDetail.biography;
  let listOfMovies = person.known_for;

  let actorObj = {
    name,
    gender,
    image,
    popularity,
    birthday,
    deathday,
    bio,
    listOfMovies,
  };
  renderActor(actorObj);
};


////////////////////////////////////////////////About page
const renderAbout = () => {
  CONTAINER.innerHTML = `This page is for the Movie Project for Re:Coded Istanbul Bootcamp, prepared by Tugba and Refia. All data and images used in the project are taken from TMDB.`;
};

const fetchQuery = async (query) => {
  let url = constructUrl(`search/multi`);
  query = query.replace(" ", "%20");
  url += `&query=${query}`
  console.log(url)
  const res = await fetch(url);
  return res.json();
};


////////////////////////////////////////////////Event Listeners
document.addEventListener("DOMContentLoaded", autorun);

let navbarHome = document.getElementById("navbar-home");
  navbarHome.addEventListener("click", autorun);

////////////////////////////////////navbar genre dropdown
let genreDropdown = document.querySelectorAll("#genre-dropdown .dropdown-item");
  genreDropdown.forEach(element => {
    element.addEventListener("click", e => {
      const moviesObj = fetchMovies();
      let genreId = parseInt(element.getAttribute("genre-id"), 10);
      moviesObj.then(obj => filterMoviesByGenre(obj["results"], genreId)).then(renderMovies)
    });
  });

////////////////////////////////////navbar filter dropdown
let popularDropdown = document.getElementById("popular");
  popularDropdown.addEventListener("click", e => {
    const moviesObj = fetchMovies();
    moviesObj.then(obj => obj.results)
    .then(arr => {
    arr.sort((a, b) => a.popularity < b.popularity ? 1 : -1); 
    return arr;
    })
    .then(renderMovies);
  });

let releaseDropdown = document.getElementById("release-date");
  releaseDropdown.addEventListener("click", e => {
    const moviesObj = fetchMovies();
    moviesObj.then(obj => obj.results)
    .then(arr => {
    arr.sort((a, b) => a.release_date < b.release_date ? 1 : -1); 
    return arr;
    })
    .then(renderMovies);
  });

let ratingDropdown = document.getElementById("rating");
  ratingDropdown.addEventListener("click", e => {
    const moviesObj = fetchMovies();
    moviesObj.then(obj => obj.results)
    .then(arr => {
    arr.sort((a, b) => a.vote_average < b.vote_average ? 1 : -1); 
    return arr;
    })
    .then(renderMovies);
  });

let topRatedDropdown = document.getElementById("top-rated");
  topRatedDropdown.addEventListener("click", e => {
    const moviesObj = fetchMovies("top_rated");
    moviesObj.then(obj => obj.results)
    .then(renderMovies);
  });

let nowPlaying = document.getElementById("now-playing");
nowPlaying.addEventListener("click", e => {
  const moviesObj = fetchMovies();
  moviesObj.then(obj => obj.results)
  .then(arr => {
  arr.sort((a, b) => a.now_playing < b.now_playing ? 1 : -1); 
  return arr;
  })
  .then(renderMovies);
});

let upcoming = document.getElementById("upcoming");
  upcoming.addEventListener("click", e => {
    const moviesObj = fetchMovies("upcoming");
    moviesObj.then(obj => obj.results)
    .then(renderMovies);
  });


///////////////////////////////navbar actor list
let actorListNav = document.getElementById("actor-list");
actorListNav.addEventListener("click", e => {
  const actorsObj = fetchActors();
  actorsObj
  .then(e => e.results)
  .then(renderActors)
});

////////////////////////////////navbar about
let about = document.getElementById("about");
about.addEventListener("click", e => {
  renderAbout();
});

/////////////////////////////////navbar serach box
// let searchBox = document.getElementById("search-button");
// searchBox.addEventListener("click", e => {
//   e.preventDefault();
//   let query = document.getElementById("query").value;
//   if (query.length > 0) {
//     let resultsObj = fetchQuery(query);
//     resultsObj
//       .then(e => e.results)
//   }
// });
// //////////
