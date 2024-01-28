let scrollPercent = 0.5;
let lastPercent = 0.5;
let background = document.getElementById('backgroundScroller');
let timeDisplay = document.getElementById('timeDisplay');
let time = document.getElementById('time');
let dateDisplay = document.getElementById('date');
let time1 = document.getElementById('time1');
let dateDisplay1 = document.getElementById('date1');
let timeDisplayBigger = document.getElementById('timeDisplayBigger');
let calendar = document.getElementById('calendar-wrapper')
let media = document.getElementById('media-wrapper')
let left = document.getElementById('left');
let right = document.getElementById('right');

let currentPercent = 0.5;

let isScrolling = false;

let draggingEnabled = true;

let mouse = {
    x: undefined, 
    y: undefined, 
    firstX: undefined, 
    firstY: undefined
}

let scrollPositions = [0, 0.5, 1]
let scrollIndex = 0;

left.addEventListener("click", () => {
    scrollIndex--;
    if (scrollIndex < 0) scrollIndex = 0;
    scrollPercent = scrollPositions[scrollIndex];
    lastPercent = scrollPercent;
});

right.addEventListener("click", () => {
    scrollIndex++;
    if (scrollIndex > 2) scrollIndex = 2;
    scrollPercent = scrollPositions[scrollIndex];
    lastPercent = scrollPercent;
});

document.addEventListener("mousedown", (event) => {
    mouse.firstX = event.clientX;
    mouse.firstY = event.clientY;
    isScrolling = true;
});

document.addEventListener("mouseup", () => {
    isScrolling = false;
    mouse = {
        x: undefined, 
        y: undefined, 
        firstX: undefined, 
        firstY: undefined
    }
    lastPercent = scrollPercent;
});

document.addEventListener("mousemove", (event) => {
    if (draggingEnabled) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
        if (mouse.firstX && mouse.firstY) {
            let mouseMove = mouse.firstX - mouse.x;
            let newPercent = mouseMove / (window.innerWidth / 1);
    
            scrollPercent = newPercent + lastPercent;
    
            if (scrollPercent > 1) scrollPercent = 1;
            if (scrollPercent < 0) scrollPercent = 0;
            
        }
    }
});

update();

function update() {
    if (scrollPercent <= 0.55 && scrollPercent >= 0.45) {
        scrollPercent = 0.5;
        timeDisplay.classList.add("down")
        timeDisplayBigger.classList.remove("down")
        scrollIndex = 1;
    } else {
        timeDisplay.classList.remove("down")
        timeDisplayBigger.classList.add("down")
    }
    if (scrollPercent == 0) scrollIndex = 0;
    if (scrollPercent == 1) scrollIndex = 2;

    currentPercent = lerp(currentPercent, scrollPercent, 0.05)
    background.style.backgroundPositionX = (currentPercent * 100) + "%"
    
    timeDisplayBigger.style.transform = "translateX(calc(" + (((background.getBoundingClientRect().width) * -currentPercent) + background.getBoundingClientRect().width / 2) + "px - 50%)"
    calendar.style.transform = "translate(calc(" + (((background.getBoundingClientRect().width + 1500) * -currentPercent) + (background.getBoundingClientRect().width + 1500)) + "px - 50%), -50%"
    media.style.transform = "translate(calc(" + (((background.getBoundingClientRect().width + 1500) * -currentPercent)) + "px - 50%), -50%"
    requestAnimationFrame(update);
}

function lerp(current, target, smoothness) { 
    return current + (target - current) * smoothness;
}