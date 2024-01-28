const canvas = document.getElementById('audiovisualizer');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let audiovisualizerdirection = 1;
let audiovisualizerypos = 95;
let soundsensitivity = 100;
let color = "#000000";

window.wallpaperRegisterAudioListener((audioArray) => {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = color;
    let halfCount = audioArray.length / 2;
    let barWidth = Math.round(window.innerWidth / 128);
    let barHeightMax = 700;

    const sensitivity = soundsensitivity / 100;

    for (let i = 0; i < halfCount; i++) {
        let height = barHeightMax * Math.min(audioArray[i], 1) * sensitivity;
        if (height >= barHeightMax) height = 500;
        let offset = 0;
        if (audiovisualizerdirection == 1) {
            offset = 0;
        } else if (audiovisualizerdirection == 2) {
            offset = height;
        } else if (audiovisualizerdirection == 3) {
            offset = height / 2;
        }
        context.fillRect(barWidth * i + Math.round(barWidth * 0.3), (audiovisualizerypos / 100) * window.innerHeight - height + offset, barWidth - Math.round(barWidth * 0.6), height);
    }
    let j = audioArray.length;
    for (let i = halfCount; i < audioArray.length; i++) {
        let height = barHeightMax * Math.min(audioArray[i], 1) * sensitivity;
        if (height >= barHeightMax) height = 500;
        let offset = 0;
        if (audiovisualizerdirection == 1) {
            offset = 0;
        } else if (audiovisualizerdirection == 2) {
            offset = height;
        } else if (audiovisualizerdirection == 3) {
            offset = height / 2;
        }
        context.fillRect((barWidth * j) - barWidth + Math.round(barWidth * 0.3), (audiovisualizerypos / 100) * window.innerHeight - height + offset, barWidth - Math.round(barWidth * 0.6), height);
        j--;
    }
});