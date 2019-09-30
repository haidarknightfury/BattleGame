var canvas = document.getElementById("game-area");
var ctx = canvas.getContext("2d");
let ship1 = new Ship(0, canvas.height / 2, 1);
let ship2 = new Ship(canvas.width, canvas.height / 2, -1);
ship2.xPosition = canvas.width - ship2.width;



document.addEventListener("keydown", keydownHandler, false);

function keydownHandler(e) {
    if (e.key == "ArrowUp") {
        ship1.moveUp(-10);
    } else if (e.key == "ArrowDown") {
        ship1.moveUp(10);
    }
}

let init = () => {
    ship1.draw(ctx);
    ship2.draw(ctx);
    setInterval(gameLoop, 50);
}


let gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ship1.draw(ctx);
    ship2.draw(ctx);
}

init();