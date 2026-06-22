"use strict";
let img = new Image();
let img1 = new Image();
img.src = "chipC.png";
img1.src = "chipB.png";
const W = 15;
const H = 15;

const maze = [];

let ctx;

function random(v){
    return Math.floor(Math.random() * v);
}

function init(){
    let maze = document.getElementById("maze");
    ctx = maze.getContext("2d");

    createMaze(W, H);
    repaint();
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
            let dir = random(y == 2? 4 : 3);
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
            ctx.drawImage(img, x * 20, y * 20, 20, 20);
        }
    }

    ctx.translate(0, 0);
    for (let x = 0; x < W; x++) {
        for(let y = 0; y < H; y++){
            if(maze[y][x] == 1){
                ctx.drawImage(img1, x * 20, y * 20, 20, 20);
            }
        }
    }
    ctx.restore();
}