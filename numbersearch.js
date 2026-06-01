let qno = 1;
let x = 0;
let stime = new Date();
let gtime = new Date();
let result = "-"
let result1 = "-";
let result2 = "-";
let result3 = "-";

function q() {
    let dgt = [1,2,3,4,5,6,7,8,9];
    let a = Array(8);
    
    x = Math.floor(Math.random() * 9);
    for (let i = 0, j = 0; i < 9; i++) {
        if (i != x) {
            a[j] = dgt[i];
            j++;
        }

    }
    shuffle(a);
}

function start() {
    qno = 1;
    stime = new Date();
    stime.getTime();
    document.getElementById("questions").innerText ="";
    document.getElementById("answer").innerText ="";
    q();
}

document.addEventListener('keydown', myhandler, false);

function myhandler(event) {
    let c = document.getElementById("questions");
    for (let i = '1'; i <= '9'; i++) {
        if (event.key == i) {
        let span= document.createElement("span");
        span.id = "ans" + qno;
        c.appendChild(span);
        document.getElementById("ans"+qno).innerText ='['+i+']';
            if (i == x+1) {
                if (qno >= 10) {
                    gtime = new Date();
                    gtime.getTime();
                    result = Math.floor((gtime - stime)/1000);
                    document.getElementById("answer").innerText = '今回の結果：'+result+'秒';
                    number();
                } else {
                    //span.innerText += "\n";
                    //c.appendChild(span);
                    //document.getElementById("ans"+qno).innerText += "\n";
                    qno++;
                    q();
                }
            }
        }
    }
}

Array.prototype.shuffle = function() {
    let i = this.length;
    while(i){
        let j = Math.floor(Math.random() * i);
        let t = this[--i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
}

function shuffle(cards){
    cards.shuffle();
    let b = document.getElementById("questions");
    let span = document.createElement("span");
    span.id = "question" + qno;
    span.innerText = cards.join(" ");
    b.appendChild(span);
    //document.getElementById("questions").innerText = cards.join(" ");
}

function number(){
    if (result <= result1 || result1 == "-") {
        result3 = result2;
        result2 = result1;
        result1 = result;
    } else if (result <= result2 || result2 == "-") {
        result3 = result2;
        result2 = result;
    } else if (result <= result3 || result3 == "-") {
        result3 = result;
    }
    document.getElementById("results").innerHTML = '☆ランキング☆<br>1位：'+result1+'秒<br>';
    document.getElementById("results").innerHTML += '2位：'+result2+'秒<br>';
    document.getElementById("results").innerText += '3位：'+result3+'秒'; 
}