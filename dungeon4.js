"use strict";
let img = new Image();
let img1 = new Image();
let img2 = new Image();
img.src = "chipC.png";
img1.src = "chipB.png";
img2.src = "goal.png";
const W = 25;
const H = 25;
const S = 20;
const player = new Player(1, 1);
const aliens = [new Alien(W - 2, 1), new Alien(1, H - 2), new Alien(W - 4, H - 4)];
let keyCode = 0;
let timer = NaN;
let status = 0;
const GAMEOVER = 1;
const GAMECLEAR = 2;

const maze = [];

let ctx;

function init(){
    let maze = document.getElementById("maze");
    ctx = maze.getContext("2d");

    createMaze(W, H);
    repaint();

    go();
}

function createMaze(w, h){
    for (let y = 0; y < H; y++){
        maze[y] = [];
        for (let x = 0; x < W; x++){
            maze[y][x] = x == 0 || x == w-1 || y == 0 || y == h-1 ? 1 : 0;
        }
    }
    for (let y = 2; y < h - 2; y += 2){
        for (let x = 2; x < w - 2; x += 2){
            maze[y][x] = 1;
            let dir = random(y == 2 ? 4 : 3);
            let px = x;
            let py = y;
            switch (dir){
                case 0:
                    py++;
                    break;
                case 1:
                    px--;
                    break;
                case 2:
                    px++;
                    break;
                case 3:
                    py--;
                    break;
            }
            maze[py][px] = 1;
        }
    }
}

function repaint(){
    for (let x = 0; x < W; x++){
        for (let y = 0; y < H; y++){
            ctx.drawImage(img, x * S, y * S, S, S);
        }
    }

    ctx.translate(0, 0);
    for (let x = 0; x < W; x++) {
        for(let y = 0; y < H; y++){
            if(maze[y][x] == 1){
                ctx.drawImage(img1, x * S, y * S, S, S);
            }
        }
    }
    ctx.translate(0, 0);

    ctx.drawImage(img2 ,(W - 2) * S,(H - 2) * S, S, S);

    aliens.forEach((a) => a.paint(ctx, S, S));

    player.paint(ctx, S, S, S, S);
    ctx.restore();
    if (status == GAMEOVER) {
        document.getElementById("result").innerHTML = "<img src='lose.png'>";
    } else if(status == GAMECLEAR) {
        document.getElementById("result").innerHTML = "<img src='win.png'>";
    }
}

function Player(x, y){
    this.x = x;
    this.y = y;
    this.dir = 1;

    this.update = function () {
        if (this.x == W - 2 && this.y == H - 2) {
            clearInterval(timer);
            status = GAMECLEAR;
            repaint();
        }

        let nx = 0;
        let ny = 0;
        switch (keyCode){
            case 37:
                nx = -1;
                this.dir = 2;
                break;
            case 38:
                ny = -1;
                this.dir = 0;
                break;
            case 39:
                nx = +1;
                this.dir = 3;
                break;
            case 40:
                ny = +1;
                this.dir = 1;
                break;
        }
        if (maze[this.y + ny][this.x + nx] == 0 && (nx != 0 || ny != 0)) {
            this.x = this.x + nx;
            this.y = this.y + ny;
        }
    };


    this.paint = function(gc, x, y, w, h){
        let img = document.getElementById("hero" + this.dir);
        gc.drawImage(img, this.x * S, this.y * S, w, h);
    };
}

function Alien(x, y){
    this.x = x;
    this.y = y;
    this.dir = 2;

    this.update = function () {
        this.dx = 0;
        this.dy = 0;
        if (player.x == this.x && player.y == this.y){
            clearInterval(timer);
            status = GAMEOVER;
            repaint();
        }

        let gapx = player.x - this.x;
        let gapy = player.y - this.y;
        switch (random(4)) {
            case 0:
                this.dx = gapx > 0 ? 1 : -1;
                this.dir = this.dx == -1 ? 2 : 3;
                break;
            case 1:
                this.dy = gapy > 0 ? 1: -1;
                this.dir = this.dy == -1 ? 0 : 1;
                break;
            default:
                this.dx = 0;
                this.dy = 0;
                break; 
        }
        if (this.x + this.dx >= 1 && this.x + this.dx <= W - 1 && this.y + this.dy >= 1 && this.y + this.dy <= H - 1) {
            this.x += this.dx;
            this.y += this.dy;
        }
    };

    this.paint = function (gc, w, h) {
        let img = document.getElementById("alien" + this.dir);
        gc.drawImage(img, this.x * S, this.y * S, w, h);
    };
}

function go() {
    console.log("go start");
    window.onkeydown = mykeydown;
    window.onkeyup = mykeyup;

    let maze = document.getElementById("maze");

    maze.oncontextmenu = function(e) {
        e.preventDefault();
    };

    timer = setInterval(tick, 300);
}

function tick() {
    console.log("tick");
    player.update();
    aliens.forEach((a) => a.update());
    repaint();
}

function mykeydown (e) {
    if (e.keyCode >= 37 && e.keyCode <= 40){
        e.preventDefault();
    }
    keyCode = e.keyCode;
}

function mykeyup (e) {
    keyCode = 0;
}

function random(v){
    return Math.floor(Math.random() * v);
}