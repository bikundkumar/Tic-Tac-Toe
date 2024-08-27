let boxes=document.querySelectorAll(".box");
let reset=document.querySelector("#reset-btn");
let msg_container=document.querySelector(".msg-container");
let newbtn=document.querySelector(".new-btn");
let msg=document.querySelector(".msg");

let turnX=true;  //player x player o false
const winptrn=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];
const resetbtn = () =>{
    turnX=true;
    Enable();
    msg_container.classList.add("hide");
}

boxes.forEach((box) =>{
    box.addEventListener("click", () => {
        if(turnX)
        {
            box.innerText="X";
            box.style.color="#000000"
            turnX=false;
        }
        else{
            box.innerText="O";
            box.style.color="#ff6b6b"
            turnX=true;
        }
        box.disabled=true;
        checkWinner();
    });
});

const checkWinner = () =>{
    let isDraw=true;
    for(let patterns of winptrn)
    {
        let pos0val=boxes[patterns[0]].innerText;
        let pos1val=boxes[patterns[1]].innerText;
        let pos2val=boxes[patterns[2]].innerText;

        if(pos0val !="" && pos1val !="" && pos2val !="")
        {
            if(pos0val === pos1val && pos1val === pos2val)
            {
                // console.log("winner",pos0val);
                showWinner(pos0val);
                return;
            }
        }
        else{
            isDraw=false;
        }
    }
    if(isDraw)
    {
        let allBoxesFailed=true;
        for(i=0;i<boxes.length;i++)
        {
            if(boxes[i].innerText === "")
            {
                allBoxesFailed=false;
                break;
            }
        }
        if(allBoxesFailed)
        {
            Draw();
        }
    }
}

const showWinner = (winner) =>{
    msg.innerText=`CONGRATULATION WINNER IS ${winner}`;
    msg_container.classList.remove("hide");
    Disabled();
}

const Disabled = () =>{
    for(let box of boxes)
    {
        box.disabled=true;
    }
}
const Enable = () =>{
    for(let box of boxes)
    {
        box.disabled=false;
        box.innerText="";
    }
}

newbtn.addEventListener("click",resetbtn);
reset.addEventListener("click",resetbtn);

const Draw = () =>{
    msg.innerText="It's A Draw";
    msg_container.classList.remove("hide");
    Disabled();
}