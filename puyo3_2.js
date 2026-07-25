let ctx;
let timer = NaN;
let px = 0;
let py = 0;
let keyCode = 0;
let g_flag = false;
let score = 0;
let rensa = 0;
let chain = 1;
let hscore = 0+localStorage.getItem("hscore4030");
let next_0 = Math.floor(Math.random()*3)+1;
let next_1 = Math.floor(Math.random()*3)+1;

const FW = 6;
const FH = 13;
const DELETE = 4;

let  field = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
];

let n = 0;

let d_flag = false;
let f_flag = false;

function mykeydown(e) {
    keyCode = e.keyCode;
    e.preventDefault();
}

function mykeyup(e) {
    keyCode = 0;
}

function paint(){
    for (y = 1; y < FH; y++){
        ctx.fillStyle = "brown";
        ctx.fillRect(0, (y + 1) * 44, 42, 42);
        for (x = 0; x < FW; x++) {
            switch (field[x][y]){
                case 0: ctx.fillStyle = "white"; break;
                case 1: ctx.fillStyle = "red"; break;
                case 2: ctx.fillStyle = "green"; break;
                case 3: ctx.fillStyle = "blue"; break;
            }
            ctx.fillRect((x + 1) * 44, (y + 1) * 44, 42, 42);
        }
        ctx.fillStyle = "brown";
        ctx.fillRect((FW + 1) * 44, (y + 1) * 44, 42, 42);
    }
    ctx.fillStyle = "brown";
    ctx.fillRect(0, (FH + 1) * 44, (FW + 2) * 44, 42);

    ctx.clearRect(500, 0, 300, 800);
    ctx.fillStyle = "rgba(220, 133, 30, 50)";
    ctx.font = "bold 50px sans-serif";
    ctx.fillText("スコア", 500, 170);
    ctx.fillText(("0000000" + score).slice(-7), 500, 220);
    ctx.fillText("最高スコア", 500, 320);
    ctx.fillText(("0000000" + hscore).slice(-7), 500, 370);
}

function init(){
    let canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    timer = setInterval(tick, 500);
    paint();

    window.onkeydown = mykeydown;
    window.onkeyup = mykeyup;
}

function count(x, y){

    c = field[x][y];
    field[x][y] = 0;
    n++;
    if (x+1 < FW && field[x+1][y] == c) count(x+1, y);
    if (y+1 < FH && field[x][y+1] == c) count(x, y+1);
    if (x-1 >= 0 && field[x-1][y] == c) count(x-1, y);
    if (y-1 >= 0 && field[x][y-1] == c) count(x, y-1);

}

function vanish(f, x, y) {

    c = f[x][y];

    f[x][y] = 0;

    if (x+1 < FW && f[x+1][y] == c) vanish(f, x+1, y);
    if (y+1 < FH && f[x][y+1] == c) vanish(f, x, y+1);
    if (x-1 >= 0 && f[x-1][y] == c) vanish(f, x-1, y);
    if (y-1 >= 0 && f[x][y-1] == c) vanish(f, x, y-1);
}

function copy_field(to, from){

    for(y = 0; y < FH; y++) {
        for(x = 0; x <FW; x++) {
            to[x][y] = from[x][y];
        }
    }
}

function delete_puyo() {

    let f = Array(FW);
    for(yy = 0; yy < FH; yy++) {
        f[yy] = Array(FH);
    }
    d = 0;

    copy_field(f, field);
    for(y = 0; y < FH; y++) {
        for(x = 0; x <FW; x++) {
            n = field[x][y];
            if (n != 0) {
                n = 0;
                count(x, y);
                if (n >= DELETE) {
                    vanish(f, x, y);
                    d += n;
                }
            }
        }
    }
    copy_field(field, f);
    return d;
}

function fall_puyo() {

    py++;
    input();

    n = 0;
    for (x = 0; x < FW; x++) {
        for (y = FH - 1; y >= 0; y--) {
            if(field[x][y] == 0) {
                for (iy= y-1; iy >= 0 && field[x][iy] == 0; iy--);
                if (iy < 0) break;
                n++;
                for (iy = y; iy >= 0; iy--) {
                        if (iy-1 >= 0)
                            field[x][iy] = field[x][iy-1];
                        else
                            field[x][iy] = 0;
                    }
                    break;
            }
        }
    }
    return n;
}

function new_puyo() {

    px = FW/2;
    py = 0; 
    if (field[px][0] == 0 && field[px][1] == 0){
        field[px][0] = next_0;
        field[px][1] = next_1;
        next_0 = Math.floor(Math.random()*3)+1;
        next_1 = Math.floor(Math.random()*3)+1;
    } else {
        g_flag = true;
    }

    if(next_0 == 1) {
        ctx.fillStyle = "red";
    } else if(next_0 == 2) {
        ctx.fillStyle = "green";
    } else if(next_0 == 3) {
        ctx.fillStyle = "blue";
    }
    ctx.fillRect((FW + 3) * 44, 2 * 44, 42, 42);

    if(next_1 == 1) {
        ctx.fillStyle = "red";
    } else if(next_1 == 2) {
        ctx.fillStyle = "green";
    } else if(next_1 == 3) {
        ctx.fillStyle = "blue";
    }
    ctx.fillRect((FW + 3) * 44, 3 * 44, 42, 42);
}

function next_puyo(){
    let c = Math.floor(Math.random()*3)+1;
    let d = Math.floor(Math.random()*3)+1;
}

function input() {
    switch (keyCode) {
        case 37:
            if(px > 0){
                if(field[px-1][py] == 0 && field[px-1][py-1] == 0) {
                    field[px-1][py] = field[px][py];
                    field[px-1][py-1] = field[px][py-1];
                    field[px][py] = 0;
                    field[px][py-1] = 0;
                    px--;
                }
            }
            break;
        case 39:
            if(px < FW-1){
                if(field[px+1][py] == 0 && field[px+1][py-1] == 0) {
                    field[px+1][py] = field[px][py];
                    field[px+1][py-1] = field[px][py-1];
                    field[px][py] = 0;
                    field[px][py-1] = 0;
                    px++;
                }
            }
            break;
        case 38:
            if (py > 0){
                while(field[px][py+1] == 0) {
                    field[px][py+1] = field[px][py];
                    field[px][py] = field[px][py-1];
                    field[px][py-1] = 0;
                    py++;
                }
            }
            break;
        case 32:
            let box = 0;
            box = field[px][py];
            field[px][py] = field[px][py-1];
            field[px][py-1] = box;
            break;
    }
    keycode = 0;
}

function tick() {

    f_flag = fall_puyo();
    paint();
    if(f_flag == 0) {
        d_flag = delete_puyo();
        if (d_flag > 0) {
            rensa++;
            if(d_flag > 3){
                chain = d_flag - 3;
            }
            if(rensa > 1 ) {
                score += d_flag * chain * 10 * (2** (rensa+1));
            } else {
                score += d_flag * chain * 10;
            }

        } else if(d_flag == 0){
            rensa = 0;
            new_puyo();
            gameover();
        }
    }
        
    hscore = localStorage.getItem("hscore4030");
    if(hscore < score) {
        hscore = score;
        localStorage.setItem("hscore4030", hscore);
    }
}

function gameover() {
    if(g_flag == true){
        clearInterval(timer);
        timer = NaN;
        window.alert("Gameover! Score:" +score);
    }
}