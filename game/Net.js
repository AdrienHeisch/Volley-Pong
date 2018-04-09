const Point = require('./Point');
const Collisions = require('./Collisions');
const World = require('./World')
const PhysicObject = require('./PhysicObject');
const Ball = require('./Ball')
const inherits = require('inherits');

inherits(Net, PhysicObject);

function Net(specs) {
    if (specs === undefined) specs = {};

    let width = (specs.width !== undefined ? specs.width : Net.normalWidth);
    let height = (specs.height !== undefined ? specs.height : Net.normalHeight);
    let x = (specs.x !== undefined ? specs.x : 0);
    let y = (specs.y !== undefined ? specs.y : World.size.height - Net.normalHeight / 2);

    Net.super_.call(this, x, y, width, height);

    this.ballsList = (specs.ballsList !== undefined ? specs.ballsList : []);
}

Net.prototype.doAction = function() {
    let ball;
    for (let i in this.ballsList) {
        ball = this.ballsList[i];
        if (ball.hitTimer > 0) continue;
        if (Collisions.outCircleRectangle(ball.x, ball.y, ball.radius, this.x, this.y, this.width, this.height)) {
            ball.velocity.x *= -Net.resitution;
            ball.setNoHit();
        }
    }
}

Net.prototype.getDrawInstructions = function() {
    let obj = Net.super_.prototype.getDrawInstructions.apply(this);
    obj.type = 'rectangle';
    return obj;
}

Net.normalHeight = 75;
Net.normalWidth = 1;
Net.resitution = 0.9;

module.exports = Net;