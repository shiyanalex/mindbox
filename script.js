const films = [
  { title: "Inception", cover: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg", imdb: "https://www.imdb.com/title/tt1375666/" },
  { title: "The Matrix", cover: "https://m.media-amazon.com/images/M/MV5BNzQzZjYzMjAtMjE5My00ZjM0LWE3MzUtN2E3YzM0ZDM0NzA1XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX200_CR0,0,200,300_AL_.jpg", imdb: "https://www.imdb.com/title/tt0133093/" },
  { title: "The Godfather", cover: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmYtYTAwZC00ZjQwLTg4MjEtNWZjNGQxYjBhYzI3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX200_CR0,0,200,300_AL_.jpg", imdb: "https://www.imdb.com/title/tt0068646/" },
  { title: "Pulp Fiction", cover: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzNjEtZmNhMC00ZTRkLWFmN2QtN2E5YTY3NzNlM2E4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX200_CR0,0,200,300_AL_.jpg", imdb: "https://www.imdb.com/title/tt0110912/" },
  { title: "The Shawshank Redemption", cover: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmRhMC00ZWI1LWJmNzItODk2ZjI4ZDI5NzRkXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX200_CR0,0,200,300_AL_.jpg", imdb: "https://www.imdb.com/title/tt0111161/" },
  { title: "Forrest Gump", cover: "https://m.media-amazon.com/images/M/MV5BNWIwODZiYjUtMzE4MS00ZTMwLWEzNWMtNjRmZTcxMzk5Mzg0XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX200_CR0,0,200,300_AL_.jpg", imdb: "https://www.imdb.com/title/tt0109830/" },
  { title: "The Dark Knight", cover: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0Nl5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UX200_CR0,0,200,300_AL_.jpg", imdb: "https://www.imdb.com/title/tt0468569/" },
  { title: "Fight Club", cover: "https://m.media-amazon.com/images/M/MV5BMmEzYzM5YzktYmM0Mi00ZDE1LWFmYzQtZTM4MzZmZGI0NTAzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX200_CR0,0,200,300_AL_.jpg", imdb: "https://www.imdb.com/title/tt0137523/" },
];

let currentRound = [...films];
let nextRound = [];
let roundNumber = 1;

function displayMatchup() {
  if (currentRound.length === 1) {
    document.querySelector(".film-container").style.display = "none";
    document.querySelector("#winner").style.display = "block";
    document.querySelector("#winnerTitle").textContent = currentRound[0].title;
    document.querySelector("#winnerCover").src = currentRound[0].cover;
    document.querySelector("#imdbLink").href = currentRound[0].imdb;
    return;
  }

  document.querySelector("#round-info").textContent = `${roundNumber}/${Math.log2(films.length)}`;
  const [film1, film2] = currentRound.splice(0, 2);
  document.querySelector("#title1").textContent = film1.title;
  document.querySelector("#cover1").src = film1.cover;
  document.querySelector("#title2").textContent = film2.title;
  document.querySelector("#cover2").src = film2.cover;

  nextRound = [film1, film2];
}

function selectFilm(choice) {
  nextRound.push(nextRound[choice - 1]);
  if (currentRound.length === 0) {
    currentRound = [...nextRound];
    nextRound = [];
    roundNumber++;
  }
  displayMatchup();
}

window.onload = () => {
  currentRound = currentRound.sort(() => Math.random() - 0.5);
  displayMatchup();
};
