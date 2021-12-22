const canvas= document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

canvas.width= 800;
canvas.height = 700;

ctx.strokeStyle = "#333";
ctx.lineWidth = 2.5;

let painting = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(e){ 
    const x = e.offsetX;
    const y = e.offsetY;

    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function onmouseDown(e){
    painting = true;
}
function onMouseUp(e){
    stopPainting();
}
function onMouseLeave(e){
    painting = false;
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}