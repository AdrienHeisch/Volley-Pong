const Point = require('./Point');
const World = require('./World');

function PhysicObject(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocity = new Point(0, 0);
    this.acceleration = new Point(0, World.gravity);
}

PhysicObject.prototype.move = function() {
    this.velocity.add(this.acceleration);

    this.beforePositionChange();

    this.x += this.velocity.x;
    this.y += this.velocity.y;
}

PhysicObject.prototype.beforePositionChange = function() {}

PhysicObject.prototype.getDrawInstructions = function() {
    return {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        type: ''
    }
}

module.exports = PhysicObject;