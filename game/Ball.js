const Point = require('./Point');
const World = require('./World');
const PhysicObject = require('./PhysicObject');
const inherits = require('inherits');

inherits(Ball, PhysicObject);

function Ball(specs) {
    if (specs === undefined) specs = {};

    let x = (specs.x !== undefined ? specs.x : 0);
    let y = (specs.y !== undefined ? specs.y : 0);
    let radius = (specs.radius !== undefined ? specs.radius : Ball.normalRadius);
    
    Ball.super_.call(this, x, y, radius, radius);

    this.radius = this.width;

    this.hitTimer = 0;
}

Ball.prototype.doAction = function() {
    this.move();

    if (this.hitTimer > 0) this.hitTimer--;
}

Ball.prototype.beforePositionChange = function() {
    Ball.super_.prototype.beforePositionChange.apply(this);

    if ((this.x <= this.radius && this.velocity.x < 0) || (this.x >= World.size.width - this.radius && this.velocity.x > 0)) this.velocity.x *= -0.9;
    if ((this.y <= this.radius && this.velocity.y < 0) || (this.y >= World.size.height - this.radius && this.velocity.y > 0)) this.velocity.y *= -0.9;
}

Ball.prototype.setNoHit = function() {
    this.hitTimer = Ball.noHitTime;
}

Ball.prototype.getDrawInstructions = function() {
    let obj = Ball.super_.prototype.getDrawInstructions.apply(this);
    obj.type = 'circle';
    return obj;
}

Ball.normalRadius = 10;
Ball.noHitTime = 10;

module.exports = Ball;