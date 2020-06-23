"use strict";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector("#container");
const searchBox = document.getElementById("inputValue");
const genreDropDown = document.getElementById("genreDropdown");
const filterDropdown = document.getElementById("filterDropdown");
const actorsNavBarBtn = document.getElementById("actors-navebar");

const autorun = async (filterResults) => {
  const movies = await fetchMovies(filterResults);
  CONTAINER.innerHTML = '';
  renderMovies(movies.results);
};

const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};


const movieDetails = async (movie) => {
  CONTAINER.innerHTML = "";
  const movieRes = await fetchMovie(movie.id);
  const actorsRes = await FetchActors(movie.id);
  let similarRes = await FetchSimilar(movie.id);
  const trailerRes = await FetchTrailer(movie.id);
  const trailerInfo = trailerRes.results; 
 
  similarRes = similarRes.results;
  
  renderMovie(movieRes, actorsRes, similarRes, trailerInfo);
};


const fetchMovies = async (filternavbar) => {
  const url = constructUrl(`movie/${filternavbar}`);
  const res = await fetch(url);
  return res.json();
};


const FetchActors = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/credits`);
  const res = await fetch(url);
  return res.json();
};

const FetchSimilar = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/similar`);
  const res = await fetch(url);
  return res.json();
};

const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};

const FetchTrailer = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/videos`);
  const res = await fetch(url);
  return res.json();
};

// genre
const FetchGenres = async () => {
  const url = constructUrl(`genre/movie/list`);
  const res = await fetch(url);
  return res.json();
};


// genre movies
const fetchGenreMovieList = async (genreID) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=542003918769df50083a13c415bbc602&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreID}`
  );
  return res.json();
};

const renderGenres = async () => {
  CONTAINER.innerHTML = '';
  let genresRes = await FetchGenres();
  genresRes = genresRes.genres;
  genresRes.map((gen) => {
    let genreAtag = document.createElement("a");
    genreAtag.setAttribute("class", "dropdown-item");
    genreAtag.value = gen.id;
    genreAtag.innerText = gen.name;
    genreAtag.addEventListener("click", async () => {
      let MoviesByGenre = await fetchGenreMovieList(gen.id);
      renderMovies(MoviesByGenre.results);
    });
    genreDropDown.appendChild(genreAtag);
  });
};


const FetchInputValue = async (inputFromUser) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=542003918769df50083a13c415bbc602&language=en-US&query=${inputFromUser}`
  );
  return res.json();
};
searchBox.addEventListener("input", async () => {
  let inputFromUser = searchBox.value;
  let usersOutput = await FetchInputValue(inputFromUser);
  let actorsArr = [];
  let moviesArr = [];
  console.log(usersOutput);
  usersOutput.results.map((result) => {
    if (result.known_for_department === "Acting") {
      actorsArr.push(result);
    } else if (result.media_type === "movie") {
      moviesArr.push(result);
    }
  });
  CONTAINER.innerHTML = "";
 
  console.log(actorsArr);
  console.log(usersOutput);
  renderMovies(moviesArr);
  renderActors(actorsArr);
});

const renderSearchResults = (searchActors) => {

  // CONTAINER.innerHTML = '';

  const ActorDiv = document.createElement("div");
  ActorDiv.setAttribute("class", "row");
  CONTAINER.appendChild(ActorDiv);
  searchActors.map((searchOutcome) => {
    console.log(searchOutcome);
    const ActorDiv2 = document.createElement("div");
    ActorDiv2.setAttribute("class", "col-4 moviePoster");
    ActorDiv2.innerHTML = `
        <img src="${searchOutcome.profile_path ? BACKDROP_BASE_URL + searchOutcome.profile_path: "./img/img.png"}" alt="${searchOutcome.name} poster" class="w-100">
        
        <h3>${searchOutcome.name}</h3>`;

    // movieDiv.addEventListener('click', () => {
    //   movieDetails(movie);
    // });
    ActorDiv.appendChild(ActorDiv2);
  });
};

const ActrorsDetails = async ()=>{
    CONTAINER.innerHTML = "";

  let actorsNavBar = await fetchPopularActors();
  renderActors(actorsNavBar.results);
}
const fetchPopularActors = async () => {
  const url = constructUrl(`person/popular`);
  const res = await fetch(url);
  // const json = await res.json();
  // renderActors(json);
  return res.json();
};

const renderActors = async (actorsNavBar) => {
  console.log(actorsNavBar)
  // actorsNavBar = actorsNavBar.results;
  // CONTAINER.innerHTML = "";
  console.log(actorsNavBar);
  const homeDiv = document.createElement("div");
  homeDiv.setAttribute("class", "row");
  CONTAINER.appendChild(homeDiv);
  actorsNavBar.map((actor) => {
    const actorDiv = document.createElement("div");
    actorDiv.setAttribute("class", "col-4");
    actorDiv.innerHTML = `
        <img src="${actor.profile_path ? BACKDROP_BASE_URL + actor.profile_path: "./img/img.png"}" alt="${actor.name}" class="w-100">
        <h3>${actor.name}</h3>`;
        
    actorDiv.addEventListener("click", () => {
      // movieDetails(movie);
      renderActorDetails(actor.id);
    });
    homeDiv.appendChild(actorDiv);
  });
};

/****************  Singl Actor Page ************** */

const fetchActor = async (person_id) => {
  const url = constructUrl(`person/${person_id}`);
  const res = await fetch(url);
  return res.json();
};

const FetchActorMovies = async (actorId) => {
  const url = constructUrl(`person/${actorId}/movie_credits`);
  const res = await fetch(url);
  return res.json();
};

const renderActorDetails = async (actorId) => {
  CONTAINER.innerHTML = "";
  let actorInfo = await fetchActor(actorId);
  let actorMoviesInfo = await FetchActorMovies(actorId);
  let actorInfoArr =actorMoviesInfo.cast;
  console.log(actorInfoArr)
 
  const actorsInfosObj = {
    Name: actorInfo.name,
    Birthday: actorInfo.birthday || "unknown!",
    Deathday: actorInfo.deathday || "alive",
    Popularity: actorInfo.popularity,
    Picture: actorInfo.profile_path
      ? BACKDROP_BASE_URL + actorInfo.profile_path
      : "./img/noImage.svg",
    Biography: actorInfo.Biography || "No Biography",
    Movies: actorInfoArr.length > 0 ? actorInfoArr : "No Available Movies",
    Gender: actorInfo.gender === 2 ? "Male" : "Female",
  };

  console.log(actorsInfosObj);
  CONTAINER.innerHTML = `
    <div class="row">
        <div class="col-md-4">
             <img id="actor-img" src="${actorsInfosObj.Picture}" width= 200px>
        </div>
        <div class="col-md-8">
              <h2 id="actor-name">${actorsInfosObj.Name}</h2>
              <p id="actor-birthday"><b>Birthday:</b> ${actorsInfosObj.Birthday}</p>
              <p id="actor-deathday"><b>Deathday:</b> ${actorsInfosObj.Deathday}</p>
              <p id="actor-gender"><b>Gender:</b> ${actorsInfosObj.Gender}</p>
              <p id="actor-popularity"><b>Popularity:</b> ${actorsInfosObj.Popularity}</p>
              <p id="actor-biography "><b>Biography:</b> ${actorsInfosObj.Biography}</p>
        </div>
        <div>
              <h3>A list of movies the actor participated in:</h3>
              <ul id="actorParticipatedMovies" class="list-unstyled row">
              </ul>
        </div>
	</div>`;
  const partivioatedMoviesList = document.getElementById(
    "actorParticipatedMovies"
  );

  /*********to chick if the actor has a movies or not (print No Available Movies )******* */

  if (typeof actorsInfosObj.Movies === "string") {
    let movieLi = document.createElement("li");
    movieLi.setAttribute("class", "col-lg-2 col-md-4 col-sm-6")
    movieLi.innerHTML = `<p id="no-movie-found">${actorsInfosObj.Movies}</p>`;
    partivioatedMoviesList.appendChild(movieLi);
  } else if (typeof actorsInfosObj.Movies === "object") {
    actorsInfosObj.Movies.map((movie, index) => {
      if (index < 5) {
        
        let movieLi = document.createElement("li");
        movieLi.setAttribute("class", "col-lg-2 col-md-4 col-sm-6")
        movieLi.addEventListener("click", ()=>{
          movieDetails(movie);
          console.log(movie.id)
        })
        movieLi.innerHTML = `<p id="movie-title">${movie.title}</p>
				<img id="movie-img" src='${movie.poster_path ? BACKDROP_BASE_URL + movie.poster_path: "./img/img.png"}' alt = '${movie.title}' width = '100'>`;
        partivioatedMoviesList.appendChild(movieLi);
      }
    });
  }
};

//**********Rendering************//
// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  CONTAINER.innerHTML = "";
  const homeDiv = document.createElement("div");
  homeDiv.setAttribute("class", "row");
  CONTAINER.appendChild(homeDiv);
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.setAttribute("class", "col-4 moviePoster");
    movieDiv.setAttribute("data-toggle", "tooltip");
    movieDiv.setAttribute("title", `${movie.overview}`);
    movieDiv.setAttribute("data-placement", "top");
    movieDiv.innerHTML = `
    <img src="${ movie.backdrop_path ? BACKDROP_BASE_URL + movie.backdrop_path:  "./img/img.png"}" alt="${movie.title} poster" class="w-100">        
        <h3>${movie.title}</h3>
        <h4> <span class="fa fa-star checked"> </span> ${movie.vote_average} </h4>`;
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    homeDiv.appendChild(movieDiv);
  });
};


const renderMovie = (movie, credits, similar, trailor) => {
  // director
  
  let directorArray = [];
  const crew = credits.crew;
  crew.forEach((e) => {
    if (e.job === "Director") directorArray.push(e.name);
  });
  console.log(trailor)
  const trailerHtml = trailor.length > 0 ? trailor[0].key : "No Trailers Available";

  // Gender: actorInfo.gender === 2 ? "Male" : "Female",
  // the HTML part
  CONTAINER.innerHTML = `
    <div class="row">

        <div class="col-md-4">
             <img id="movie-backdrop" src=${movie.backdrop_path ? BACKDROP_BASE_URL + movie.backdrop_path: "./img/img.png" }>
        </div>

        <div class="col-md-8">
            <h2 id="movie-title">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${movie.release_date}</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} minutes</p>
            </div>
            <div>
            <h3>OVERVIEW</h3>
            <p id="movie-overview">${movie.overview}</p>
        </div>
        <div class= "col-md-8">
          <iframe width='560' height='315' src="http://youtube.com/embed/${trailerHtml}"></iframe>
        </div>
        <div class="col-md-4">
            <p><b>Director:</b> ${directorArray}</p>
            <p><b>Rating:</b> ${movie.vote_average} / 10 </p>
            <p><b>Votes:</b> ${movie.vote_count}</p>
            <img id="movie-production-company-logo"  src='${movie.production_companies.length > 0 ? BACKDROP_BASE_URL + movie.production_companies[0].logo_path : "./img/img.png"}'>
            <p id="movie-production-company"><b>production company:</b> ${movie.production_companies.length > 0  ? movie.production_companies[0].name : "Not Available"}</p>
            <p><b>Language:</b> ${movie.original_language}</p>
         </div>
    
        </div>
            <h4>ACTORS</h4>
            <ul id="actors" class="list-unstyled row align-center"></ul>


            <h4>RELATED MOVIES</h4>
            <ul id="similar" class="list-unstyled row align-center"></ul>
        </div>`;
//-------- event for the related movies 
let similarss = document.querySelector("#similar");
  similar.slice(0,6).map((relatedMovie) => {
    const similiarLi = document.createElement("li");
    similiarLi.setAttribute("class", "col-lg-2 col-md-4 col-sm-6")
    similiarLi.innerHTML = `
               <img src="${relatedMovie.poster_path ? BACKDROP_BASE_URL + relatedMovie.poster_path :  "./img/img.png"}" alt="${relatedMovie.title}">
               <h4>${relatedMovie.title}</h4>`;
               similiarLi.addEventListener("click", () => {
      movieDetails(relatedMovie);
      console.log(relatedMovie);
    });
    similarss.appendChild(similiarLi);
  });



// end of the previous 

  let actors = document.querySelector("#actors");
  credits.cast.slice(0, 6).map((actor) => {
    const actorLi = document.createElement("li");
    actorLi.setAttribute("class", "col-lg-2 col-md-4 col-sm-6")
        actorLi.innerHTML = `
               <img src="${actor.profile_path ? PROFILE_BASE_URL + actor.profile_path: "./img/img.png"}" alt="${
      actor.name
    }">
               <h4>${actor.name}</h4>`;
    actorLi.addEventListener("click", () => {
      renderActorDetails(actor.id);
    });
    actors.appendChild(actorLi);
  });
};

document.addEventListener("DOMContentLoaded", async function () {
  autorun('now_playing');
  renderGenres();
  CONTAINER.innerHTML = '';
});


// NAV BAR burger
const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");

    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.5
        }s`;
      }
    });
    burger.classList.toggle("toggle");
  });
};
navSlide();


//link for fetching:
// https://api.themoviedb.org/3/movie/now_playing?api_key=542003918769df50083a13c415bbc602
//https://api.themoviedb.org/3/movie/122?api_key=542003918769df50083a13c415bbc602&language=en-US
//original_language
//https://api.themoviedb.org/3/discover/movie?api_key=542003918769df50083a13c415bbc602&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=
// key is bewlo 
//542003918769df50083a13c415bbc602
