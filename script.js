const startBtn = document.getElementById('startBtn');
const takePhotoBtn = document.getElementById('takePhotoBtn');
const restartBtn = document.getElementById('restartBtn');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const cameraContainer = document.getElementById('cameraContainer');
const photoContainer = document.getElementById('photoContainer');

let stream;

startBtn.addEventListener('click', async () => {
  cameraContainer.classList.remove('hidden');
  startBtn.classList.add('hidden');

  stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
});

takePhotoBtn.addEventListener('click', () => {
  const context = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  cameraContainer.classList.add('hidden');
  photoContainer.classList.remove('hidden');

  video.srcObject.getTracks().forEach(track => track.stop());
});

restartBtn.addEventListener('click', () => {
  window.location.reload();
});
