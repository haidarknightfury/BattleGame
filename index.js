var canvas = document.getElementById("game-area");
var ctx = canvas.getContext("2d");
let ship1 = new Ship(0, canvas.height / 2, 1, ctx);
let ship2 = new Ship(canvas.width - SHIP_WIDTH, canvas.height / 2, -1, ctx);

document.addEventListener("keydown", keydownHandler, false);

function keydownHandler(e) {
    switch(e.key){
        case "ArrowUp": ship1.moveUp(-10); break;
        case "ArrowDown" : ship1.moveUp(10); break;
        case " " : ship1.shoot() ; break;
        default : break;
    }
}

let init = () => {
    ship1.draw(ctx);
    ship2.draw(ctx);
    setInterval(gameLoop, 200);
}


let gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ship1.draw();
    ship2.draw();
    if (ship1.bullets && ship1.bullets.length > 0){
        ship1.bullets.forEach((bullet, index, arr)=>{
            if (bullet.collisionX(ship2.x) && bullet.collisionY(ship2)){
                console.log("HIT SHIP 2");
                arr.splice(index,1);
                return;
            }
            if (bullet.collisionX(canvas.width)){
                    arr.splice(index,1);
            }
        });
    }
}

init();