let timerId = NaN;
let count = 1;
let imglink = new Array();
for (i = 1; i < 11; i++) {
    imglink[i] = "<img src='kuji" + i + ".png' id = kuji>";
}
function startTimer() {
    timerId = setInterval(tick, 500);
}
function stopTimer() {
    clearInterval(timerId);
}
function tick() {
    document.getElementById("counter").innerHTML = imglink[count];
    count++;
    if (count == 11) {
        count = 1;
    }
}