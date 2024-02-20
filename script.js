const songsList = document.querySelector('.songs-list');
const btnPrevious = document.querySelector('#previous');
const btnPlay = document.querySelector('#play');
const btnPause = document.querySelector('#pause');
const btnNext = document.querySelector('#next');

const allSongs = [
  {
    id: 0,
    title: "Scratching The Surface",
    artist: "Quincy Larson",
    duration: "4:25",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/scratching-the-surface.mp3",
  },
  {
    id: 1,
    title: "Can't Stay Down",
    artist: "Quincy Larson",
    duration: "4:15",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stay-down.mp3",
  },
  {
    id: 2,
    title: "Still Learning",
    artist: "Quincy Larson",
    duration: "3:51",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/still-learning.mp3",
  },
  {
    id: 3,
    title: "Cruising for a Musing",
    artist: "Quincy Larson",
    duration: "3:34",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cruising-for-a-musing.mp3",
  },
  {
    id: 4,
    title: "Never Not Favored",
    artist: "Quincy Larson",
    duration: "3:35",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/never-not-favored.mp3",
  },
  {
    id: 5,
    title: "From the Ground Up",
    artist: "Quincy Larson",
    duration: "3:12",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/from-the-ground-up.mp3",
  },
  {
    id: 6,
    title: "Walking on Air",
    artist: "Quincy Larson",
    duration: "3:25",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/walking-on-air.mp3",
  },
  {
    id: 7,
    title: "Can't Stop Me. Can't Even Slow Me Down.",
    artist: "Quincy Larson",
    duration: "3:52",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stop-me-cant-even-slow-me-down.mp3",
  },
  {
    id: 8,
    title: "The Surest Way Out is Through",
    artist: "Quincy Larson",
    duration: "3:10",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/the-surest-way-out-is-through.mp3",
  },
  {
    id: 9,
    title: "Chasing That Feeling",
    artist: "Quincy Larson",
    duration: "2:43",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/chasing-that-feeling.mp3",
  },
];

const userData = {
  currentSong : null,
  currentTime : 0
}
const audio = new Audio();

const playSong = (id) => {
  const song = allSongs.find((item) => item.id === id);
  audio.src = song.src;
  audio.title = song.title;

  if(userData?.currentSong === null || userData?.currentSong.id !== id){
    userData.currentTime = 0;
  } else {
    audio.currentTime = userData.currentTime;
  }
  userData.currentSong = song;

  const arrayAllSongs = document.querySelectorAll('.btnSong');
  arrayAllSongs.forEach((item) => {
    item.classList.remove('current-song');
  });
  const btnCurrentSong = document.querySelector(`#btnSong-${id}`);
  btnCurrentSong.classList.add('current-song');
  
  audio.play();
};

const getCurrentSongIndex = () => allSongs.indexOf(userData.currentSong);

btnPlay.addEventListener('click', () => {
  if(userData.currentSong === null){
    userData.currentSong = allSongs[0];
    playSong(userData.currentSong.id);
  } else {
    playSong(userData.currentSong.id);
  }
})

btnPause.addEventListener('click', () =>{
  userData.currentTime = audio.currentTime;
  audio.pause();
});

btnNext.addEventListener('click', () => {
  const currentSongIndex = getCurrentSongIndex();
  if( currentSongIndex + 1 < allSongs.length){
    userData.currentSong = allSongs[currentSongIndex + 1];
    playSong(userData.currentSong.id); 
  } 
});

btnPrevious.addEventListener('click', () => {
  const currentSongIndex = getCurrentSongIndex();
  if( currentSongIndex !== 0){
    userData.currentSong = allSongs[currentSongIndex - 1];
    playSong(userData.currentSong.id); 
  } 
});

const renderSongs = (array) => {
  const playList = allSongs.map((song) => `
    <li><button class='btnSong' id='btnSong-${song.id}' onclick="playSong(${song.id})">
      <span class="song-title"><strong>${song.title}</strong></span>
      <span>${song.artist}</span>
      <span>${song.duration}</span>
      </button>
    </li>`)
    .join('');
  songsList.innerHTML = playList;
};

renderSongs();

