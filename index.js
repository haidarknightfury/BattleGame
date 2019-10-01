var canvas = document.getElementById("game-area");
var ctx = canvas.getContext("2d");


let ship1 = new Ship(0, canvas.height / 2, 1, ctx, "1");
let ship2 = new Ship(canvas.width - SHIP_WIDTH, canvas.height / 2, -1, ctx, "2");

var ship1Info = document.getElementById("ship1");
var ship2Info = document.getElementById("ship2");


document.addEventListener("keydown", keydownHandler, false);

function keydownHandler(e) {
    switch (e.key) {
        case "ArrowUp": ship2.moveUp(-10); break;
        case "ArrowDown": ship2.moveUp(10); break;
        case " ": ship2.shoot(); break;

        case "w": ship1.moveUp(-10); break;
        case "s": ship1.moveUp(10); break;
        case "Enter": ship1.shoot(); break;
        default: break;
    }
}

let init = () => {
    ship1.draw(ctx);
    ship2.draw(ctx);
    setInterval(gameLoop, 200);
}


let gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ship1.draw();
    ship2.draw();
    ship1.collisionDection(ship2, canvas.width, () => console.log("HIT SHIP 2"));
    ship2.collisionDection(ship1, 0, () => console.log("HIT SHIP 1"));

    ship1Info.innerHTML = ship1.getHealthStatus();
    ship2Info.innerHTML = ship2.getHealthStatus();
}

init();