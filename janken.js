let janken = ["グー","チョキ","パー"];
let message;
let win = 0;
let lose = 0;

function init(){
    win = 0;
    lose = 0;
    message ="";
    document.getElementById("result").innerHTML = message;
}

function judge(){
    let comp = Math.floor(Math.random() * 3);
    let elements = document.getElementsByName('jk');
    for (let i = 0; i < janken.length; i++){
        if (elements.item(i).checked){
            message = "あなたの手：" + janken[i]+ "<br>";
            message += "コンピューターの手：" + janken[comp] + "<br>";
            if (i == comp){
                message += "あいこです" + "<br>";
            } else if (i - comp == -1 || i - comp == 2){
                message += "あなたの勝ちです" + "<br>";
                win += 1;
            } else {
                message += "あなたの負けです" + "<br>";
                lose += 1;
            }
            message += win + "勝" + lose + "敗です" + "<br>";
        }
    }
    document.getElementById("result").innerHTML = message;
    if (win - lose >= 2) {
        document.getElementById("result").innerHTML 
        += "<img src='win.png'>";
    } else if (win - lose <= -2) {
        document.getElementById("result").innerHTML 
        += "<img src='lose.png'>";
    }
}