const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.getElementById('currTime');
const durTime = document.getElementById('durTime');

const prevName = document.getElementById('prevSong');
const nextName = document.getElementById('nextSong');

let prevSongIdx = '';
let nextSongIdx = '';

let coverIdx = 0;

var songSelect = '';
var select = document.getElementById('music-select');

// Covers
const covers = ['clip', 'rose'];

// Song titles
const songs = ['Bach Invention No.1','Combo Surroundings','Let Everything Happen Piano'] ;

/*const folder = './music/';
const fs = require(['fs']);

fs.readdir(folder, (err, files) => {
	files.forEach(file => {
		console.log(file);
	});
});
*/

// Keep track of song
let songIndex = Math.floor(Math.random() * (songs.length));

// Initially load song details into DOM
loadSong(songIndex);

// Update song details
function loadSong(songIdx) {
	title.innerText = songs[songIdx];
	audio.src = `music/${songs[songIdx]}.mp3`;
	//audio.src = 'music_a/${song}.mp3';
	cover.src = `images/${covers[coverIdx]}.jpg`;

	if (songIdx < 1) {
		prevSongIdx = songs.length - 1;
	} else {
		prevSongIdx = songIdx - 1;
	};
	prevName.innerHTML = "Prev: " + songs[prevSongIdx];

	if (songIdx > songs.length - 2) {
		nextSongIdx = 0;
	} else {
		nextSongIdx = songIdx + 1;
	};
	nextName.innerHTML = "Next: " + songs[nextSongIdx];
}

// Play song
function playSong() {
	musicContainer.classList.add('play');
	playBtn.querySelector('i.fas').classList.remove('fa-play');
	playBtn.querySelector('i.fas').classList.add('fa-pause');

	audio.play();
}

// Pause song
function pauseSong() {
	musicContainer.classList.remove('play');
	playBtn.querySelector('i.fas').classList.add('fa-play');
	playBtn.querySelector('i.fas').classList.remove('fa-pause');

	audio.pause();
}

// Previous song
function prevSong() {
	loadSong(prevSongIdx);

	playSong();
}

// Next song
function nextSong() {
	loadSong(nextSongIdx);

	playSong();
}

// Update progress bar
function updateProgress(e) {
	const { duration, currentTime } = e.srcElement;
	const progressPercent = (currentTime / duration) * 100;
	progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = audio.duration;

	audio.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function DurTime(e) {
	const { duration, currentTime } = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime == null) ? 0 : Math.floor(currentTime / 60);
	min = min < 10 ? '0' + min : min;

	// define seconds currentTime
	function get_sec(x) {
		if (Math.floor(x) >= 60) {

			for (var i = 1; i <= 60; i++) {
				if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
					sec = Math.floor(x) - (60 * i);
					sec = sec < 10 ? '0' + sec : sec;
				}
			}
		} else {
			sec = Math.floor(x);
			sec = sec < 10 ? '0' + sec : sec;
		}
	}

	get_sec(currentTime, sec);

	// change currentTime DOM
	currTime.innerHTML = min + ':' + sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true) ? '0' :
		Math.floor(duration / 60);
	min_d = min_d < 10 ? '0' + min_d : min_d;


	function get_sec_d(x) {
		if (Math.floor(x) >= 60) {

			for (var i = 1; i <= 60; i++) {
				if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
					sec_d = Math.floor(x) - (60 * i);
					sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
				}
			}
		} else {
			sec_d = (isNaN(duration) === true) ? '0' :
				Math.floor(x);
			sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
		}
	}

	// define seconds duration

	get_sec_d(duration);

	// change duration DOM
	durTime.innerHTML = min_d + ':' + sec_d;

};

// Change cover
function changeCover() {
	if (coverIdx > covers.length - 2) {
		coverIdx = 0;
	} else {
		coverIdx++;
	};
	cover.src = `images/${covers[coverIdx]}.jpg`;
	//cover.src = `${covers[coverIdx]}.jpg`;
}

// Event listeners
playBtn.addEventListener('click', () => {
	const isPlaying = musicContainer.classList.contains('play');

	if (isPlaying) {
		pauseSong();
	} else {
		playSong();
	}
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Time of song
audio.addEventListener('timeupdate', DurTime);

// Change CD cover
cover.addEventListener('click', changeCover);

// Generate select song dropdown list
function generateList() {
	for (let i = 0; i < songs.length; i++) {
		var opt = document.createElement('option');
		opt.value = i;
		opt.innerHTML = songs[i];
		opt.style.backgroundColor = '#ebbcbc';
		select.appendChild(opt);
		//select += '<option value="' + song + '" class="songs">' + song + '</option>';
	}
}

// Play music after selecting a music
function playMusic(tid) {
	var songIdx = parseInt(document.getElementById("music-select").value);
	loadSong(songIdx);
	playSong();
}

generateList();