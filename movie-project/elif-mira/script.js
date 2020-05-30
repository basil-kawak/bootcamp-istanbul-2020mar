'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const CONTAINER = document.querySelector(".wrapper");
let isNotEmpty= true;
const autorun = async () => {
  const movies = await fetchMovies('now_playing');
  renderMovies(movies.results);
};
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};
// This function is to fetch movies.
//added a type as a global paramater so i'll use to render different type of movies with filter//
const fetchMovies = async (type) => {
  const url = constructUrl(`movie/${type}`);
  const res = await fetch(url);
  return res.json();
};
//This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};

const renderMovies =async (movies) => {
  CONTAINER.innerHTML = ``;
  
  const genresList=await fetchGenres();
  function hoverGenre(id){
    for(const genre of genresList.genres){
      if(genre.id===id){
        return genre.name;
      }
    }
  }
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.setAttribute("class", "movie-items col-xl-4 col-md-6 col-sm-10")
    movieDiv.innerHTML = `
      <div class="container">
        <img class="movie-img" src="${BACKDROP_BASE_URL + movie.poster_path}" alt="${movie.title} poster">
        <div class="overlay">
          <div class="text"><i class="fas fa-star">${movie.vote_average}</i>
          <hr style="height:2px;background-color:white">
          <h4>${movie.genre_ids.map(genreId=>hoverGenre(genreId)).join("</br>")}</h4>
          </div>
        </div>
      </div>`;
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    CONTAINER.appendChild(movieDiv);
  });
};
const renderMovie = (movie) => {
  CONTAINER.innerHTML = `
    <div class="single-movie">
      <div class="allinfo-movie">
        <div class="movie-img-box">
             <img id="movie-backdrop"  src=${
               BACKDROP_BASE_URL + movie.poster_path
             }>
        </div>
        <div class="movie-information">
        <h1 id="movie-title">${movie.title}</h1>
        <table class="table table-borderless">
          <tbody>
            <tr>
              <td colspan="2"><span id="movie-release-date"><i class="fas fa-calendar-alt"></i> ${movie.release_date}</span></td>
              <td><img class="fas" src="./images/film.png" width="20px><span id="director">${movie.director}</span></td>
              <td colspan="2"><span id="movie-runtime"><i class="fas fa-clock"></i> ${movie.runtime} Minutes</span></td>
              <td colspan="2"><span id="movie-language"><i class="fas fa-globe"></i> ${movie.spoken_languages.map(lan=> lan.name)}</span></td>
              <td><span id="rating"><i class="fas fa-star"></i> ${movie.vote_average}</span></td>
              <td><span id="votes"><i class="fas fa-users"></i>${movie.vote_count}</span></td>
            </tr>
          </tbody>
        </table>
        <h3>Overview</h3>
        <p id="movie-overview">${movie.overview}</p>
        <h3>Actors</h3>
        <div id="actors" class="list-unstyled"></div>
        </div>
      </div> <!-- allinfo movie div ends -->
        <div class="iframe-section">
          <h3>Trailer </h3>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/${movie.trailer_key}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="production-brands">
          <span id="production-companies"></span>
        </div>
        <div id="related-movies"><b><p class="related-movie-title">You Migh Also Like:</p></b></div>      
    </div>`;
};

const movieDetails = async (movie) => {
  window.scrollTo(0, 0);
  const movieRes = await fetchMovie(movie.id);
  const actors = await getActors(movie.id);
  const trailer = await getTrailer(movie.id);
  const related_movies= await recommendations(movie.id);
  const director = actors.crew.find(e=>e.job==='Director')
  movieRes['trailer_key'] = renderTrailer(trailer)
  movieRes['director'] = director.name;
  renderMovie(movieRes);
  renderActorList(actors.cast);
  productionCompanies(movieRes);
  renderRelatedMovies(related_movies);

};

//SINGLE MOVIE PAGE FUNCTIONS
async function getActors(movie_id){
  const url = constructUrl(`movie/${movie_id}/credits`);
  const res = await fetch(url);
  return res.json();
}
const renderActorList = (actors) => {
  const actorsDiv= document.querySelector('#actors');
  for( let i = 0; i< 5; ++ i) {
  let actorImg= document.createElement('img');
    actorImg.setAttribute("class", "actor-img")
    actorImg.src= PROFILE_BASE_URL + actors[i].profile_path 
    actorImg.addEventListener("click", (e) => {
      e.preventDefault();
      singleActorPage(actors[i]);
    });
    actorsDiv.appendChild(actorImg);
}}
const getTrailer = async (movie_id) => {
  const url = constructUrl(`movie/${movie_id}/videos`);
  const res = await fetch(url)
  return res.json();
}
const renderTrailer = (trailers) => {
  let trailersBox = '';
  if(trailers.results.length > 0 ) {
    return trailers.results[0].key;
  }
}
function productionCompanies(movie){
  let productionCompaniesP= document.querySelector('#production-companies');
  let productionCompanies= movie.production_companies;
  for(let i=0;i<productionCompanies.length;i++){
    let logo= document.createElement('img');
    logo.setAttribute("class", "logo-img")
    logo.src= BACKDROP_BASE_URL + productionCompanies[i].logo_path;
    productionCompaniesP.appendChild(logo);
  }
}
async function recommendations(movie_id){
  const url = constructUrl(`movie/${movie_id}/recommendations`);
  const res = await fetch(url);
  return res.json();
}
const renderRelatedMovies= (related_movies) => {
  let relatedMoviesdiv= document.querySelector('#related-movies');
  for( let i = 0; i< 5; ++ i) {
    let relatedMovieImg= document.createElement('img');
    relatedMovieImg.setAttribute("class", "RM-img")
    relatedMovieImg.src= BACKDROP_BASE_URL + related_movies.results[i].poster_path 
    relatedMovieImg.addEventListener("click", () => {
      movieDetails(related_movies.results[i]);
    });
    relatedMoviesdiv.appendChild(relatedMovieImg);
} 
}
////////////////single actor page/////////////////////////////
const popularActorsMain= async () => {
  const popularActors = await fetchPopularActors();
  renderActorsPage(popularActors.results);
};
const fetchPopularActors = async () => {
  const url = constructUrl(`person/popular`);
  const res = await fetch(url);
  return res.json();
};
const renderActorsPage = (actors,isNotEmpty=true) => {
  if(isNotEmpty){
    CONTAINER.innerHTML = ``;
  }
  actors.map((actor) => {
    const actorDiv = document.createElement("div");
    actorDiv.setAttribute("class", "movie-items col-xl-3 col-md-4 col-sm-5")
    actorDiv.innerHTML = `
    <div class="container">
    <img class="movie-img" src="${PROFILE_BASE_URL + actor.profile_path}" alt="${actor.name} poster"><div class="overlay">
    <div class="text"><h2>${actor.name}</h2></div>
  </div>
</div>`;
    actorDiv.addEventListener("click", () => {
      singleActorPage(actor);
    });
    CONTAINER.appendChild(actorDiv);
  });
};
const singleActorPage= async(actor) => {
  window.scrollTo(0, 0);
  let actorInfo=await actorRes(actor.id)
  console.log(actorInfo)
  function actorGender(gender){
    if(gender===1){return 'female';}
    else{return 'male';}
  }
  let dethDay= actorInfo.deathday || "still alive"
 CONTAINER.innerHTML = `
    <div class="single-movie">
      <div class="single-actor-page">
        <div>
             <img id="movie-backdrop"  src=${
               BACKDROP_BASE_URL + actor.profile_path
             }>
        </div>
        <div class="movie-information">
        <h1 id="movie-title">${actor.name}</h1>
        <table class="table table-borderless">
          <tbody>
            <tr>
              <td colspan="2"><span id="movie-release-date"><i class="fas fa-calendar-alt"></i>Birthday: ${actorInfo.birthday}<span>, Dethday: ${dethDay}</span></span></td>
              <td colspan="2"><span id="movie-runtime"><i class="fas fa-venus-mars"></i> ${actorGender(actor.gender)}</span></td>
              <td><span id="votes"><i class="fas fa-users"></i>${actorInfo.popularity}</span></td>
            </tr>
          </tbody>
        </table>
        <h3>Biography</h3>
        <p id="movie-overview">${actorInfo.biography}</p>
        </div>
      </div>
    </div>
         <div id="actorsParticipations"><b><div class="container-fluid actor-participation-title">Filmography</div></b></div>     
    </div>`;
    actorsParticipations(actorInfo.cast)
};
const actorsParticipations= (movies) => {
  let actorsParticipationsdiv= document.querySelector('#actorsParticipations');
  for( let i = 0; i<movies.length;i++) {
    let actorsParticipationsMovieImg= document.createElement('img');
    actorsParticipationsMovieImg.setAttribute("class", "RM-img")
    actorsParticipationsMovieImg.src= BACKDROP_BASE_URL + movies[i].poster_path 
    actorsParticipationsMovieImg.addEventListener("click", () => {
      movieDetails(movies[i]);
    });
    actorsParticipationsdiv.appendChild(actorsParticipationsMovieImg);
} 
}
const actorRes = async (personId) => {
  const actorInfo = await fetchActorInfo(personId);
  const actorMovies = await fetchActorMovies(personId);
  const info= Object.assign({},actorInfo,actorMovies);
  return info;
}
const fetchActorInfo = async (person_id) => {
  const url = constructUrl(`person/${person_id}`);
  const res = await fetch(url);
  return res.json();
}
const fetchActorMovies = async (person_id) => {
  const url = constructUrl(`person/${person_id}/movie_credits`);
  const res = await fetch(url);
  return res.json();
}

/////////actor page functions finishes here////////////////////////////
//NAVBAR FUNCTIONS
//HOME function 
document.querySelector('#navHome').addEventListener('click',autorun);
//GENRES DROPDOWN
//fetching the genres
const fetchGenres = async () => {
  const url = constructUrl(`genre/movie/list`);
  const res = await fetch(url);
  return res.json();
};
//adding genres to the dropdown
async function addGenres(){
  const genresList=await fetchGenres();
  const genresDropdown= document.querySelector('#genresDropdown');
  for(const e of genresList.genres){
    let li= document.createElement('li');
    li.setAttribute('class',"dropdown-item");
    li.innerHTML=e.name;
    li.addEventListener('click',async function(){ 
        const genreResult= await displayGenres(e.id);
        renderMovies(genreResult.results)
    });
    genresDropdown.appendChild(li);
  }
}
addGenres();
//fetching movies for each genre
const displayGenres = async(genreId) => {
  const url= constructUrl(`discover/movie`)+`&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}`
  const res = await fetch(url);
  return res.json();
};
//Actor list function
document.querySelector("#actorListBtn").addEventListener('click',popularActorsMain)

//About
// ABOUT PAGE 
const aboutPageRender = () => {
  CONTAINER.innerHTML = `
  <div class="about-page">
  <div id="about-page">
  <div class="middle-container">
  <div class="skills">
    <div class="skill-row">
    <i class="fas fa-icons fa-7x myskills"></i>
      <h1>Who are We?</h1>
      <p>Movie Guide is a comprehensive and in-depth resource for finding out more about the movies, 
      actors and filmmakers you love.</p>
            <h1 class="features-about">What You'll find </h1>
      <ul>
      <li>Ratings of upcoming and classic films </li>
      <li>In-depth Information about your favorite movies, actors and filmmakers</li>
      <li>Now Available to Watch - Movies that are available in cinema</li>
      <li>Recommendations section devoted to personalized movie recommendations for you</li>
      <li>Explore movies by genre, mood or theme</li>
      </ul>
    </div>
    <div class="skill-row">
      <i class="fab fa-connectdevelop background fa-7x"></i>
      <h1>Background</h1>
      <p class="education">We are web designers/developers based in Istanbul,Turkey.
      We have a passion for web design and love to create new sites.</p>
    </div>
  </div>
</div>
  </div>
</div>
  `}
//FILTER functions
const runFilter = (type) => {
  runByFilter(type);
};
const runByFilter = async (type) => {
  const movies = await fetchMovies(type);
  renderMovies(movies.results);
};

// Search button function   
const searchBtn= document.querySelector('#searchBtn');
const searchInput= document.querySelector('#searchInput');
searchBtn.onclick=async function(e){
  e.preventDefault();
  let userInput= searchInput.value
  const searchMovieResult= await searchMovie(userInput);
  const searchActorResult= await searchActor(userInput);
  renderMovies(searchMovieResult.results,false)
  renderActorsPage(searchActorResult.results,false)
  searchInput.value=""
}
async function searchMovie(movieName){
  const url = constructUrl(`search/movie`)+`&language=en-US&query=${movieName}&page=1&include_adult=false`;
  const res = await fetch(url);
  return res.json();
}
async function searchActor(actorName){
  const url = constructUrl(`search/person`)+`&language=en-US&query=${actorName}&page=1&include_adult=false`;
  const res = await fetch(url);
  return res.json();
}



document.addEventListener("DOMContentLoaded", autorun);