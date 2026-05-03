let r = 0;
function eventAlert() {
    r = Math.floor(Math.random() * 100) + 1
    window.alert("ゲーム開始！");
}

function judge() {
    let a = Number(document.getElementById("num").value);
    let n = 2
    if (a < r) {
        document.getElementById("result2").innerHTML
        = "もっと大きいです。";
    } else if (a > r) {
        document.getElementById("result2").innerHTML
        = "もっと小さいです。";
    }
    if (a == r) {
        document.getElementById("result").innerHTML 
        = "<img src='atari.png'>";
        document.getElementById("result2").innerHTML 
        = "";
    } else if (a == 1 || r == 1){
	    document.getElementById("result").innerHTML
        = "互いに素です。";
    } else {
	    while (n <= Math.min(a,r)) {
		    if (r % n == 0 && a % n == 0){
			    document.getElementById("result").innerHTML
                = "互いに素ではありません。";
			    return;
		    } else if (n == Math.min(a,r)){
			    document.getElementById("result").innerHTML
                = "互いに素です。";
                return;
            }
        n += 1;
	    }
    }
}
