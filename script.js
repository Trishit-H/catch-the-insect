const start_btn = document.getElementById('start_btn');
const screens = document.querySelectorAll('.screen');
const choose_insect_btns = document.querySelectorAll('.choose_insect_btn');
const game_container = document.querySelector('.game_container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
let score = 0;
let seconds = 0;
let selected_insects = {};

start_btn.addEventListener('click', () => {
    screens[0].classList.add('up')
})

choose_insect_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img');
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        selected_insects = {
            src, alt
        }
        screens[1].classList.add('up');
        setTimeout(createInsect, 1000);
        startGame()
    })
});

function increaseTime() {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    timeEl.innerHTML = `Time: ${m}:${s}`

    seconds++;
}

function increaseScore() {
    score++;
    scoreEl.innerHTML = `Score: ${score}`
}

function startGame() {
    setInterval(increaseTime, 1000);
}

function createInsect() {
    const insect = document.createElement('div');
    const { x, y } = getRandomLocation();

    insect.classList.add('insect');
    insect.style.left = `${x}px`;
    insect.style.top = `${y}px`;
    insect.innerHTML = `<img src = "${selected_insects.src}" alt="${selected_insects.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`
    insect.addEventListener('click', catchInsect);

    game_container.appendChild(insect)
}

function addInsects() {
    setTimeout(createInsect, 1000);
    setTimeout(createInsect, 1500);
}

function catchInsect() {
    increaseScore();
    this.classList.add('catched');
    setTimeout(() => {
        this.remove()
    }, 2000);
    addInsects()
}

function getRandomLocation() {
    const width = window.innerWidth;
    const height = window.innerHeight - scoreEl.offsetHeight;

    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;

    return { x, y }
}

// function getRandomLocation() {
//     const insectSize = 100; // Size of the insect in pixels
//     const width = window.innerWidth;
//     const height = window.innerHeight;
//     const exclusionHeight = 50; // Height of the exclusion zone at the top of the screen

//     // Ensure the insect appears fully within the screen and not in the exclusion zone
//     const x = Math.random() * (width - insectSize);
//     const y = Math.random() * (height - exclusionHeight - insectSize) + exclusionHeight;

//     return { x, y };
// }
