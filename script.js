// $(".search-button").on("click", function () {
//   $.ajax({
//     url:
//       "https://www.omdbapi.com/?&apikey=53f1d949&s=" +
//       $(".input-keyword").val(),
//     success: (results) => {
//       const movies = results.Search;
//       let cards = "";
//       movies.forEach((movie) => {
//         cards += showCard(movie);
//       });
//       $(".movie-container").html(cards);

//       // ketika tombol detail di-klik
//       $(".modal-detail-button").on("click", function () {
//         $.ajax({
//           url:
//             "https://www.omdbapi.com/?&apikey=53f1d949&i=" +
//             $(this).data("imdbid"),
//           success: (film) => {
//             const filmDetail = showFilmDetail(film);
//             $(".modal-body").html(filmDetail);
//             $(".modal-title").text(film.Title);
//           },
//           error: (e) => {
//             console.log(e.responseText);
//           },
//         });
//       });
//     },
//     error: (e) => {
//       console.log(e.responseText);
//     },
//   });
// });

// fetch
// const searchButton = document.querySelector(".search-button");
// searchButton.addEventListener("click", function () {
//   const inputKeyword = document.querySelector(".input-keyword");
//   fetch("https://www.omdbapi.com/?&apikey=53f1d949&s=" + inputKeyword.value)
//     .then((response) => response.json())
//     .then((response) => {
//       const movies = response.Search;
//       let cards = "";
//       movies.forEach((movie) => (cards += showCard(movie)));
//       const movieContainer = document.querySelector(".movie-container");
//       movieContainer.innerHTML = cards;

//       // ketika tombol detail di-klik
//       const modalDetailButton = document.querySelectorAll(
//         ".modal-detail-button"
//       );
//       modalDetailButton.forEach((button) => {
//         button.addEventListener("click", function () {
//           const imdbid = this.dataset.imdbid;
//           fetch("https://www.omdbapi.com/?&apikey=53f1d949&i=" + imdbid)
//             .then((response) => response.json())
//             .then((film) => {
//               const filmDetail = showFilmDetail(film);
//               const modalBody = document.querySelector(".modal-body");
//               modalBody.innerHTML = filmDetail;
//             });
//         });
//       });
//     })
//     .catch();
// });

// fetch refactor (async await)
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function () {
  try {
    const inputKeyword = document.querySelector(".input-keyword");
    const movies = await getMovies(inputKeyword.value);
    updateUI(movies);
  } catch (error) {
    alert(error);
  }
});

function getMovies(keyword) {
  return fetch("https://www.omdbapi.com/?&apikey=53f1d949&s=" + keyword)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      if (response.Response === "False") {
        throw new Error(response.Error);
      }
      return response.Search;
    });
}

function updateUI(movies) {
  let cards = "";
  movies.forEach((movie) => (cards += showCard(movie)));
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
}

// event binding
document.addEventListener("click", async function (element) {
  if (element.target.classList.contains("modal-detail-button")) {
    const imdbid = element.target.dataset.imdbid;
    const movieDetail = await getMovieDetail(imdbid);
    updateUIDetail(movieDetail);
  }
});

function getMovieDetail(imdbid) {
  return fetch("https://www.omdbapi.com/?&apikey=53f1d949&i=" + imdbid)
    .then((response) => response.json())
    .then((movie) => movie);
}

async function updateUIDetail(movie) {
  try {
    const movieDetail = showMovieDetail(movie);
    const modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = movieDetail;
  } catch {
    console.error("Error fetching movie detail:", error);
  }
}

function showCard(movie) {
  return `<div class="col-md-4 my-3">
                <div class="card">
                    <img src="${movie.Poster}" class="card-img-top"/>
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">${movie.Year}</h6>
                        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal"
                        data-bs-target="#movieDetailModal" data-imdbid="${movie.imdbID}">Show Detail</a>
                    </div>
                </div>
            </div>`;
}

function showMovieDetail(movie) {
  return `<div class="container-fluid">
            <div class="row">
                <div class="col-md-3">
                    <img src="${movie.Poster}" alt="" class="img-fluid" />
                </div>
                <div class="col-md">
                    <ul class="list-group">
                        <li class="list-group-item"><h4>${movie.Title} </h4></li>
                        <li class="list-group-item">
                            <strong>Director : </strong> ${movie.Director}
                        </li>
                        <li class="list-group-item">
                            <strong>Actors : </strong> ${movie.Actors}
                        </li>
                        <li class="list-group-item">
                            <strong>Writer : </strong> ${movie.Writer}
                        </li>
                        <li class="list-group-item">
                            <strong>Plot : </strong> <br />
                            ${movie.Plot}
                        </li>
                    </ul>
                </div>
            </div>
        </div>`;
}
