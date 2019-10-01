
const SHIP_WIDTH = 50;
const SHIP_HEIGHT = 30;
const BULLET_WIDTH = 5;
const BULLET_HEIGHT = 5;


function Ship(x, y, direction, ctx, name) {
    this.x = x;
    this.y = y;
    this.width = SHIP_WIDTH;
    this.height = SHIP_HEIGHT;
    this.color = "#0095DD";
    this.direction = direction;
    this.ctx = ctx;
    this.bullets = [];
    this.health = 100;
    this.name = name;
}

Ship.prototype.moveUp = function (yDisp) {
    this.y += yDisp;
};

Ship.prototype.decreaseHealth = function (dec){
    this.health -= dec;
}

Ship.prototype.getHealthStatus = function (){
    return `Ship ${this.name} Health is ${this.health}`;
}

Ship.prototype.draw = function () {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, SHIP_WIDTH, SHIP_HEIGHT);
    // this.ctx.fillStyle = this.color;
    // this.ctx.fill();
    const img = new Image(SHIP_WIDTH,SHIP_HEIGHT);
    img.src = './assets/boat.jpg';
    this.ctx.drawImage(img, this.x, this.y, SHIP_WIDTH, SHIP_HEIGHT);
    this.ctx.closePath();


    if (this.bullets && this.bullets.length > 0) {
        this.bullets.forEach((bullet) => {
            bullet.moveX(10 * this.direction);
            bullet.draw();
        });
    }
}

Ship.prototype.shoot = function () {
    let bullet = this.direction == 1 ? new Bullet(this.x + SHIP_WIDTH, this.y + SHIP_HEIGHT / 2 - BULLET_HEIGHT / 2, this.direction, this.ctx) :
        new Bullet(this.x - BULLET_WIDTH, this.y + SHIP_HEIGHT / 2 - BULLET_HEIGHT / 2, this.direction, this.ctx);
    this.bullets.push(bullet);
}

Ship.prototype.collisionDection = function (otherShip, boundaryX, callback) {
    if (this.bullets && this.bullets.length > 0) {
        this.bullets.forEach((bullet, index, arr) => {
            if (bullet.collisionX(this.direction == 1 ? otherShip.x : otherShip.x + SHIP_WIDTH) && bullet.collisionY(otherShip)) {
                otherShip.decreaseHealth(10);
                callback();
                arr.splice(index, 1);
                return;
            }
            if (bullet.collisionX(boundaryX)) {
                arr.splice(index, 1);
            }
        });
    }
}

function Bullet(x, y, direction, ctx) {
    this.x = x;
    this.y = y;
    this.color = "#0095DD";
    this.ctx = ctx;
    this.width = BULLET_WIDTH;
    this.height = BULLET_HEIGHT;
    this.direction = direction;
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
    return this.direction == 1 ?
        (this.x + BULLET_WIDTH >= boundaryX) :
        (this.x - BULLET_WIDTH <= boundaryX);
}

Bullet.prototype.collisionY = function (shape) {
    return (this.y + BULLET_HEIGHT <= shape.y + shape.height) && (this.y >= shape.y);
}
