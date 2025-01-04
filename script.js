const films = [
  { title: "Inception", cover: "https://via.placeholder.com/200x300?text=Inception" },
  { title: "The Matrix", cover: "https://via.placeholder.com/200x300?text=The+Matrix" },
  { title: "The Godfather", cover: "https://via.placeholder.com/200x300?text=The+Godfather" },
  { title: "Pulp Fiction", cover: "https://via.placeholder.com/200x300?text=Pulp+Fiction" },
  { title: "The Shawshank Redemption", cover: "https://via.placeholder.com/200x300?text=The+Shawshank+Redemption" },
  { title: "Forrest Gump", cover: "https://via.placeholder.com/200x300?text=Forrest+Gump" },
  { title: "The Dark Knight", cover: "https://via.placeholder.com/200x300?text=The+Dark+Knight" },
  { title: "Fight Club", cover: "https://via.placeholder.com/200x300?text=Fight+Club" },
];

let currentRound = [...films];
let nextRound = [];

function displayMatchup() {
  if (currentRound.length === 1) {
    document.querySelector(".film-container").style.display = "none";
    document.querySelector("#winner").style.display = "block";
    document.querySelector("#winnerTitle").textContent = currentRound[0].title;
    return;
  }

  const [film1, film2] = currentRound.splice(0, 2);
  document.querySelector("#title1").textContent = film1.title;
  document.querySelector("#cover1").src = film1.cover;

  document.querySelector("#title2").textContent = film2.title;
  document.querySelector("#cover2").src = film2.cover;

  nextRound = [];
  nextRound.push(film1, film2);
}

function selectFilm(choice) {
  nextRound.push(nextRound[choice - 1]);
  if (currentRound.length === 0) {
    currentRound = [...nextRound];
    nextRound = [];
  }
  displayMatchup();
}

window.onload = () => {
  currentRound = currentRound.sort(() => Math.random() - 0.5);
  displayMatchup();
};
