const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const startBtn = document.getElementById('startBtn');
const captureBtn = document.getElementById('captureBtn');
const restartBtn = document.getElementById('restartBtn');
const countdown = document.getElementById('countdown');
const strip = document.getElementById('strip');

const screens = {
  welcome: document.getElementById('welcome'),
  camera: document.getElementById('camera'),
  result: document.getElementById('result')
};

let photos = [];

function showScreen(name) {
  Object.values(screens).forEach(screen => screen.classList.remove('active'));
  screens[name].classList.add('active');
}

startBtn.onclick = async () => {
  showScreen('camera');
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
};

captureBtn.onclick = async () => {
  photos = [];
  for (let i = 3; i >= 1; i--) {
    countdown.innerText = i;
    await delay(1000);
  }
  countdown.innerText = '';

  for (let i = 0; i < 3; i++) {
    await delay(500);
    takePhoto();
  }

  showResults();
};

function takePhoto() {
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imgUrl = canvas.toDataURL('image/png');
  photos.push(imgUrl);
}

function showResults() {
  showScreen('result');
  strip.innerHTML = '';
  photos.forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    strip.appendChild(img);
  });
}

restartBtn.onclick = () => {
  photos = [];
  showScreen('welcome');
};

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
