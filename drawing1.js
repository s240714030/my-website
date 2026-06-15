let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let old_x = 0;
let old_y = 0;
let count_color = 0;
let color = "green";
let keepcolor = "green";
let count = 0;
let thick = 1;

function init() {
    canvas.addEventListener("touchstart", touchStart, false);
    canvas.addEventListener("touchmove", touchMove, false);
}

function touchStart(event){
    old_x = event.touches[0].pageX;
    old_y = event.touches[0].pageY;
    drawCcl(old_x, old_y, thick, color);
}

function drawCcl(x, y, r, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}

function touchMove(event) {
    let c_x;
    let c_y;
    event.preventDefault();
    c_x = event.touches[0].pageX;
    c_y = event.touches[0].pageY;
    drawCcl(old_x, old_y, thick, color);
    old_x = c_x;
    old_y = c_y;
}

function colorChoice() {
    if(flag = true){
        document.getElementById("eraser").innerText = "消しゴム：OFF";
        flag = false;
    }
    count_color++;
    if (count_color == 4 || count_color == 0){
        count_color = 0;
        document.getElementById("color").innerText = "ペンの色：緑";
        color = "green";
    } else if(count_color == 1) {
        document.getElementById("color").innerText = "ペンの色：赤";
        color = "red";
    } else if(count_color == 2) {
        document.getElementById("color").innerText = "ペンの色：青";
        color = "blue";
    } else if(count_color == 3) {
        document.getElementById("color").innerText = "ペンの色：黒";
        color = "black";
    }
}

function thickness(){
    count++;
    if(count == 3 || count == 0){
        count = 0;
        document.getElementById("thickness").innerText = "ペンの太さ：細";
        thick = 1;
    } else if(count == 1) {
        document.getElementById("thickness").innerText = "ペンの太さ：中";
        thick = 4;
    } else if(count == 2) {
        document.getElementById("thickness").innerText = "ペンの太さ：太";
        thick = 7;
    }
}

let flag = false;
function eraser(){
    if (flag == false){
        document.getElementById("eraser").innerText = "消しゴム：ON";
        keepcolor = color;
        color = "white";
        flag = true;
    } else if(flag == true){
        document.getElementById("eraser").innerText = "消しゴム：OFF";
        color = keepcolor;
        flag = false;
    }
}

function reset(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}