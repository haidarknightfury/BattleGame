function Ship(xPosition, yPosition, direction) {
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.width = 20;
    this.height = 10;
    this.color = "#0095DD";
    this.direction = direction;
}

Ship.prototype.moveUp = function (yCoordinate) {
    this.yPosition += yCoordinate;
}

Ship.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.rect(this.xPosition, this.yPosition, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
}

Ship.prototype.shoot = function (anotherShip) {
    let bullet = new Bullet(this.xPosition, this.yPosition);
}

Ship.prototype.collision = function (anotherShip, bullet){

}


function Bullet(xPosition, yPosition) {
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.width = 5;
    this.height = 5;
    this.color = "#0095DD";
}

Bullet.prototype.shoot = function (xCoordinate) {
    this.xPosition += xCoordinate;
}

Bullet.prototype.draw = function(ctx){
    ctx.beginPath();
    ctx.rect(this.xPosition, this.yPosition, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
}