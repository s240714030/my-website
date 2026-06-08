let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let timerId = NaN;
let tamaY = canvas.height;

function startTimer() {
    tama();
    timerId = setInterval(tick, 400);
}
function stopTimer() {
    clearInterval(timerId);
}
function tick() {
    tamaY -= 10;
    if (tamaY > canvas.height/2) {
        tama();
    } else if(tamaY <= canvas.height/2){
        init();
        tamaY = canvas.height;
    }
}

function init() {
    let s = Math.floor((Math.random() * 6 + 7))/10;
    
    
    for (rotDig = 0; rotDig < 360; rotDig += 45){
        ctx.save();
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(rotDig / 180 * Math.PI);
    drawCcl(0*32, 0*32, 32, "yellow");
    drawEll(3*32, 3*32, 60, 30, Math.PI / 4, 0, 2 * Math.PI, "red");
    ctx.scale(s, s);
    ctx.restore();
    }
}

function tama(){
    ctx.fillStyle = "yellow";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(canvas.width/2, tamaY, 10, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}

function drawCcl(x, y, r, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}

function drawEll(x,y,radX,radY,rote,aAng,eAng,color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(x, y, radX, radY, rote, aAng, eAng, true);
    ctx.fill();
}