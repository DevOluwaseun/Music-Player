import songs from "./songlist.js";

const cover = document.getElementById("cover");
const title = document.getElementById("title");
const author = document.getElementById("author");
const previous = document.getElementById("previous");
const next = document.getElementById("next");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const pausePlayBtn = document.querySelector(".pause_play");
const totalDuration = document.querySelector(".total_duration");
const currentDuration = document.querySelector(".current_duration");
const song = document.getElementById("song");
const progress = document.getElementById("progress");

let now = 0;
let playing = new Audio(songs[now].src);

// Display UI
const display = function (song) {
  cover.src = song.cover;
  title.textContent = song.title;
  author.textContent = song.author;
  playing.src = song.src;
  playing.load();
};

// Update Current play time and SHow total duration
const updateDuration = function () {
  totalDuration.textContent = `${Math.floor(
    playing.duration / 60
  )}:${Math.floor(playing.duration % 60)
    .toString()
    .padStart(2, "0")}`;

  currentDuration.textContent = `${Math.floor(
    playing.currentTime / 60
  )}:${Math.floor(playing.currentTime % 60)
    .toString()
    .padStart(2, "0")}`;

  progress.max = playing.duration;
  progress.value = playing.currentTime;

  //   Show slider progress
  progress.style.setProperty(
    "--progress-level",
    `${(playing.currentTime / playing.duration) * 100}%`
  );
};

// Load song duration
playing.addEventListener("loadedmetadata", updateDuration);

// Update current song time
playing.addEventListener("timeupdate", updateDuration);

display(songs[now]);

// Next button event
next.addEventListener("click", function (e) {
  now = (now + 1) % songs.length;
  display(songs[now]);
  playing.play();
});

// Previous button event
previous.addEventListener("click", function (e) {
  now = (now - 1 + songs.length) % songs.length;
  display(songs[now]);
  playing.play();
});

// Update Pause and play button UI on click
pausePlayBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const svgIcon = pausePlayBtn.querySelector("svg");

  if (svgIcon.classList.contains("play")) {
    playing.play();
    svgIcon.classList.remove("play");
    svgIcon.classList.add("pause");
    playBtn.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
  } else if (svgIcon.classList.contains("pause")) {
    playing.pause();
    svgIcon.classList.remove("pause");
    svgIcon.classList.add("play");
    pauseBtn.classList.add("hidden");
    playBtn.classList.remove("hidden");
  }
});

// Update progress slider
progress.addEventListener("input", function () {
  playing.currentTime = progress.value;
  updateDuration(); // Update the duration display
});
