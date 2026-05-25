function init() {
    let b = document.getElementById("board");
    let r = Math.floor(Math.random() * 6) + 5;
    for (let i = 0; i < r; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < r; j++) {
            let td = document.createElement("td");
            tr.appendChild(td);
            let img = document.createElement("img");
            img.src="./chipB.png";
            img.className="cell";
            img.id ="kabe";
            img.onclick= clicked;
            td.appendChild(img);
        }
        b.appendChild(tr);
    }
}

function clicked(e) {
    if (e.target.id == "kabe") {
        this.id = "miti";
        this.src = "./chipC.png";
    } else if (e.target.id == "miti") {
        this.id = "kabe";
        this.src = "./chipB.png";
    }
}