
const SHIP_WIDTH = 20;
const SHIP_HEIGHT = 10;
const BULLET_WIDTH = 5;
const BULLET_HEIGHT = 5;


function Ship(x, y, direction, ctx) {
    this.x = x;
    this.y = y;
    this.width = SHIP_WIDTH;
    this.height = SHIP_HEIGHT;
    this.color = "#0095DD";
    this.direction = direction;
    this.ctx = ctx;
    this.bullets = [];
}

Ship.prototype.moveUp = function (yDisp) {
    this.y += yDisp;
}

Ship.prototype.draw = function () {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, SHIP_WIDTH, SHIP_HEIGHT);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();

    if (this.bullets && this.bullets.length > 0) {
        this.bullets.forEach((bullet) => {
            bullet.moveX(10 * this.direction);
            bullet.draw();
        });
    }
}

Ship.prototype.shoot = function () {
    let bullet = new Bullet(this.x + SHIP_WIDTH, this.y + SHIP_HEIGHT / 2 - BULLET_HEIGHT / 2, this.ctx);
    this.bullets.push(bullet);
}

function Bullet(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.color = "#0095DD";
    this.ctx = ctx;
    this.width = BULLET_WIDTH;
    this.height = BULLET_HEIGHT;
}

Bullet.prototype.moveX = function (xDisp) {
    this.x += xDisp;
}

Bullet.prototype.draw = function () {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, BULLET_WIDTH, BULLET_HEIGHT);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
}


Bullet.prototype.collisionX = function (boundaryX) {
    return (this.x + BULLET_WIDTH >= boundaryX);
}

Bullet.prototype.collisionY = function (shape){
    return (this.y + BULLET_HEIGHT <= shape.y + shape.height) && (this.y >= shape.y);
}
