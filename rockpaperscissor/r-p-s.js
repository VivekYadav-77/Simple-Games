let bt1 = document.querySelector(".rock");
let bt2 = document.querySelector(".paper");
let bt3 = document.querySelector(".scissors");
let tellwinnerbox = document.querySelector("#telling-the-winner");
let winner = document.querySelector(".user-count");
let winner1 = document.querySelector(".computer-count");

let restartBtn = document.getElementById("restartBtn");
let newGameBtn = document.getElementById("newGameBtn");

let vun;
let comnum = Math;
let wincount = 0;
let wincount1 = 0;
let attempts = 0; 
let maxAttempts = 10;

let arr = ["rock", "paper", "scissor"];

function comnumgenerator() {
    comnum = Math.floor(Math.random() * 3);
}

function disableGame(disable) {
    bt1.style.pointerEvents = disable ? "none" : "auto";
    bt2.style.pointerEvents = disable ? "none" : "auto";
    bt3.style.pointerEvents = disable ? "none" : "auto";
}

bt1.addEventListener("click", () => {
    vun = 0;
    bt1.style.border = "10px solid black";
    bt2.style.border = "none";
    bt3.style.border = "none";
    callinginput();
});
bt2.addEventListener("click", () => {
    vun = 1;
    bt2.style.border = "10px solid black";
    bt1.style.border = "none";
    bt3.style.border = "none";
    callinginput();
});
bt3.addEventListener("click", () => {
    vun = 2;
    bt3.style.border = "10px solid black";
    bt2.style.border = "none";
    bt1.style.border = "none";
    callinginput();
});

function callinginput() {
    if (attempts >= maxAttempts) return;

    comnumgenerator();
    if (comnum !== vun) {
        if (comnum === 0 && vun === 2) {
            wincount++;
            tellwinnerbox.innerText = `you lose! ${arr[0]} wins against ${arr[2]}`;
            winner1.innerText = `${wincount}\nCOMPUTER\nSCORE`;
            tellwinnerbox.style.backgroundColor = "red";
        }
        if (comnum === 2 && vun === 0) {
            wincount1++;
            tellwinnerbox.innerText = `you win! ${arr[0]}  wins against ${arr[2]}`;
            winner.innerText = `${wincount1}\nYOUR\nSCORE`;
            tellwinnerbox.style.backgroundColor = "green";
        }
        else if (comnum > vun) {
            wincount++;
            tellwinnerbox.innerText = `you lose ! ${arr[comnum]} wins against ${arr[vun]} `;
            winner1.innerText = `${wincount}\nCOMPUTER\nSCORE`;
            tellwinnerbox.style.backgroundColor = "red";
        }
        else if (comnum < vun) {
            wincount1++;
            tellwinnerbox.innerText = `you win! ${arr[vun]} wins against ${arr[comnum]}`;
            winner.innerText = `${wincount1}\nYOUR\nSCORE`;
            tellwinnerbox.style.backgroundColor = "green";
        }
    } else {
        tellwinnerbox.innerText = "match draw";
        tellwinnerbox.style.backgroundColor = "purple";
    }

    attempts++;
    if (attempts >= maxAttempts) {
        tellwinnerbox.innerText = "Game Over! Out of attempts.";
        disableGame(true);
        restartBtn.style.display = "none";
        newGameBtn.style.display = "inline-block";
    }
}

restartBtn.addEventListener("click", () => {
    wincount = 0;
    wincount1 = 0;
    attempts = 0;
    winner.innerText = `0\nYOUR\nSCORE`;
    winner1.innerText = `0\nCOMPUTER\nSCORE`;
    tellwinnerbox.innerText = "Pick Your Move";
    tellwinnerbox.style.backgroundColor = "black";
    disableGame(false);
});

newGameBtn.addEventListener("click", () => {
    wincount = 0;
    wincount1 = 0;
    attempts = 0;
    winner.innerText = `0\nYOUR\nSCORE`;
    winner1.innerText = `0\nCOMPUTER\nSCORE`;
    tellwinnerbox.innerText = "Pick Your Move";
    tellwinnerbox.style.backgroundColor = "black";
    disableGame(false);
    restartBtn.style.display = "inline-block";
    newGameBtn.style.display = "none";
});
