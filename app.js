const canvas= document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const jsmode = document.getElementById("jsMode");
const jssave = document.getElementById("jsSave");
const jsagain = document.getElementById("jsagain");

const INITIAL_COLOR = "#333"
const CANVAS_SIZE_WIDTH = 800;
const CANVAS_SIZE_HEIHGT = 700;

canvas.width= CANVAS_SIZE_WIDTH;
canvas.height = CANVAS_SIZE_HEIHGT;


ctx.fillStyle = "#fff"; 
ctx.fillRect(0,0,CANVAS_SIZE_WIDTH,CANVAS_SIZE_HEIHGT); //기본 배경. 적용안할 경우 투명한 배경이 됨.
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

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

function onmouseDown(){
    painting = true;
}
function onMouseUp(){
    stopPainting();
}
function onMouseLeave(){
    painting = false;
}

function handleColorClick(e){
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(e){
    const size = e.target.value;
    ctx.lineWidth = size;
}

function jsModeClick(){
    if(filling ===true){
        filling=false;
        jsmode.innerText ="Fill";
    }else{
    filling = true;
    jsmode.innerText = "paint";
    
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE_WIDTH,CANVAS_SIZE_HEIHGT);
    }
}

function handleCM(e){
    e.preventDefault();
}

function jsSaveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

function jsAgainClick(e){
    console.log(e);
    ctx.fillStyle = "#fff"; 
    ctx.fillRect(0,0,CANVAS_SIZE_WIDTH,CANVAS_SIZE_HEIHGT);
    ctx.strokeStyle = INITIAL_COLOR;
    
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM);
    
}

Array.from(colors).forEach(color =>
    color.addEventListener("click",handleColorClick)
    );

    if(range){
        range.addEventListener("input",handleRangeChange);
    }

    if(jsmode){
        jsmode.addEventListener("click",jsModeClick);
    }

    if(jssave){
        jssave.addEventListener("click",jsSaveClick);
    }

    if(jsagain){
        jsagain.addEventListener("click",jsAgainClick);
    }