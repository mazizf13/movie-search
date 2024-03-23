$(".search-button").on("click", function () {
  $.ajax({
    url:
      "https://www.omdbapi.com/?&apikey=53f1d949&s=" +
      $(".input-keyword").val(),
    success: (results) => {
      const movies = results.Search;
      let cards = "";
      movies.forEach((movie) => {
        cards += showCard(movie);
      });
      $(".movie-container").html(cards);

      // ketika tombol detail di-klik
      $(".modal-detail-button").on("click", function () {
        $.ajax({
          url:
            "https://www.omdbapi.com/?&apikey=53f1d949&i=" +
            $(this).data("imdbid"),
          success: (film) => {
            const filmDetail = showFilmDetail(film);
            $(".modal-body").html(filmDetail);
            $(".modal-title").text(film.Title);
          },
          error: (e) => {
            console.log(e.responseText);
          },
        });
      });
    },
    error: (e) => {
      console.log(e.responseText);
    },
  });
});

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

function showFilmDetail(film) {
  return `<div class="container-fluid">
            <div class="row">
                <div class="col-md-3">
                    <img src="${film.Poster}" alt="" class="img-fluid" />
                </div>
                <div class="col-md">
                    <ul class="list-group">
                        <li class="list-group-item"><h4>${film.Title} </h4></li>
                        <li class="list-group-item">
                            <strong>Director : </strong> ${film.Director}
                        </li>
                        <li class="list-group-item">
                            <strong>Actors : </strong> ${film.Actors}
                        </li>
                        <li class="list-group-item">
                            <strong>Writer : </strong> ${film.Writer}
                        </li>
                        <li class="list-group-item">
                            <strong>Plot : </strong> <br />
                            ${film.Plot}
                        </li>
                    </ul>
                </div>
            </div>
        </div>`;
}
