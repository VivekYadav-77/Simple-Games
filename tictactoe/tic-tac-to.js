let boxs = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#resetbtn");
let newGamebtn = document.querySelector("#new-btn");
let messageContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let count = 0;
let drawcondition = true;
let turnO = true;

const winPatterns = [
    [0,3,6],[1,4,7],[2,5,8],
    [0,1,2],[3,4,5],[6,7,8],
    [0,4,8],[2,4,6],
];

const resetGame = ()=>{
    turnO = true;
    enableBoxes();
    messageContainer.classList.add("hide");
    count = 0;
    drawcondition = true;
    resetbtn.style.display = "none";  
}

boxs.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerText="O";
            box.style.color = "blue";
            turnO = false;
        }else{
            box.innerText = "X";
            box.style.color = "red";
            turnO = true;
        }
        box.disabled = true;
        count++;

        resetbtn.style.display = "inline-block"; 

        checkWinner();
        drawfor(count,drawcondition);
    })
})

const disabledBoxes=()=>{
    for(let box of boxs){
        box.disabled = true;
    }
}
const enableBoxes=()=>{
    for(let box of boxs){
        box.disabled = false;
        box.innerText = "";
    }
}
const showWinner=(winner)=>{
    msg.innerText = `Winner is ${winner}`;
    messageContainer.classList.remove("hide");
    disabledBoxes();
}
const gameDraw =()=>{
    msg.innerText = "Game is Draw";
    messageContainer.classList.remove("hide");
    disabledBoxes();
}
const checkWinner = ()=>{
    for(let pattern of winPatterns){
        let pos1val = boxs[pattern[0]].innerText;
        let pos2val = boxs[pattern[1]].innerText;
        let pos3val = boxs[pattern[2]].innerText;
        if(pos1val!=""&&pos2val!=""&&pos3val!=""){
            if(pos1val === pos2val&& pos2val ===pos3val){
                drawcondition = false;
                showWinner(pos1val);
            }
        }
    }
}
newGamebtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);

const drawfor=(count,drawcondition)=>{
    if(count===9 && drawcondition===true){
        gameDraw();
    }
}
