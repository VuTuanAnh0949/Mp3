const song = document.getElementById("song");
const playBtn = document.querySelector(".player-inner");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");
const durationTime = document.querySelector(".duration")
const remainingTime = document.querySelector(".remaining")
const rangeBar = document.querySelector(".range");
const musicName = document.querySelector(".music-name");
const musicThumbnail = document.querySelector(".music-thumb");
const musicImage = document.querySelector(".music-thumb img");
const playRepeat = document.querySelector(".play-repeat");

let isPlaying = true;
let indexSong = 0;
let isRepeat = false;
/* const musics = ["thenight.mp3","nhabangiau.mp3","outout.mp3","moveyour.mp3"]; */
const musics =[
  {
    id: 1,
    title: "Happy Birthday",
    file: "ha.mp3",
    image: "https://c4.wallpaperflare.com/wallpaper/545/756/905/anime-anime-girls-mask-simple-background-hd-wallpaper-thumb.jpg"
},
      {
          id: 2,
          title: "Nhà Bạn Giàu",
          file: "nhabangiau.mp3",
          image: "https://images.unsplash.com/photo-1495430288918-03be19c7c485?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
      },
      {
        id: 3,
        title: "The Night",
        file: "thenight.mp3",
        image: "https://images.unsplash.com/photo-1532767153582-b1a0e5145009?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
    }

]
let timer;
let repeatCount = 0;
playRepeat.addEventListener("click", function () {
  if (isRepeat) {
    isRepeat = false;
    playRepeat.removeAttribute("style");
  } else {
    isRepeat = true;
    playRepeat.style.color = "#ffb86c";
  }
});
nextBtn.addEventListener("click", function () {
  changeSong(1);
});
prevBtn.addEventListener("click", function () {
  changeSong(-1);
});
song.addEventListener("ended", handleEndedSong);
function handleEndedSong() {
  repeatCount++;
  if (isRepeat && repeatCount === 1) {
    // handle repeat song
    isPlaying = true;
    playPause();
  } else {
    changeSong(1);
  }
}
function changeSong(dir) {
    if (dir === 1) {
      // next song
      indexSong++;
      if (indexSong >= musics.length) {
        indexSong = 0;
      }
      isPlaying = true;
    } else if (dir === -1) {
      // prev song
      indexSong--;
      if (indexSong < 0) {
        indexSong = musics.length - 1;
      }
      isPlaying = true;
    }
    init(indexSong);
    // song.setAttribute("src", `./music/${musics[indexSong].file}`);
    playPause();
  }

  playBtn.addEventListener("click", playPause);
  function playPause() {
    if (isPlaying) {
      musicThumbnail.classList.add("is-playing");
      song.play();
      playBtn.innerHTML = `<ion-icon name="pause-circle"></ion-icon>`;
      isPlaying = false;
      timer = setInterval(displayTimer, 500);
    } else {
      musicThumbnail.classList.remove("is-playing");
      song.pause();
      playBtn.innerHTML = `<ion-icon name="play"></ion-icon>`;
      isPlaying = true;
      clearInterval(timer);
    }
  }
  function displayTimer() {
    const { duration, currentTime } = song;
    rangeBar.max = duration;
    rangeBar.value = currentTime;
    remainingTime.textContent = formatTimer(currentTime);
    if (!duration) {
      durationTime.textContent = "00:00";
    } else {
      durationTime.textContent = formatTimer(duration);
    }
  }
  function formatTimer(number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  }
  rangeBar.addEventListener("change", handleChangeBar);
  function handleChangeBar() {
    song.currentTime = rangeBar.value;
  }
  function init(indexSong) {
    song.setAttribute("src", `./music/${musics[indexSong].file}`);
    musicImage.setAttribute("src", musics[indexSong].image);
    musicName.textContent = musics[indexSong].title;
  }
  displayTimer();
  init(indexSong);
