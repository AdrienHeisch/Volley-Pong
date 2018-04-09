const Point = require('./Point');
const World = require('./World');
const Collisions = require('./Collisions');
const Ball = require('./Ball');
const PhysicObject = require('./PhysicObject');
const inherits = require('inherits');

inherits(Player, PhysicObject);

function Player(specs) {
    if (specs === undefined) specs = {};

    let width = (specs.width !== undefined ? specs.width : Player.normalWidth);
    let height = (specs.height !== undefined ? specs.height : Player.normalHeight);
    let x = (specs.x !== undefined ? specs.x : 0);
    let y = (specs.y !== undefined ? specs.y : World.size.height - Player.normalHeight / 2);

    Player.super_.call(this, x, y, width, height);

    this.color = (function () {
        let str = '#';
        let chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C'];
        let charsLength = chars.length;
        for (let i = 0; i < 6; i++) {
            str += chars[Math.floor(Math.random() * charsLength)];
        }
        return str;
    })();
    this.input = {
        up: false,
        left: false,
        right: false
    }
    this.isRightSide = this.x > World.size.width / 2;
    this.ballsList = (specs.ballsList !== undefined ? specs.ballsList : []);
}

Player.prototype.beforePositionChange = function() {
    Player.super_.prototype.beforePositionChange.apply(this);

    if (this.y >= World.size.height - this.height / 2) {
        if (this.input.up) this.velocity.y = -Player.jumpSpeed;
        else this.velocity.y = 0;
    }
    this.velocity.x = (this.input.left ? -Player.hSpeed : 0) + (this.input.right ? Player.hSpeed : 0);
    if (!this.isRightSide && (this.x + this.width / 2 >= World.size.width / 2 - 10 && this.velocity.x > 0) || (this.x - this.width / 2 <= 0 && this.velocity.x < 0)
      || this.isRightSide && (this.x - this.width / 2 <= World.size.width / 2 + 10 && this.velocity.x < 0) || (this.x + this.width / 2 >= World.size.width && this.velocity.x > 0)) this.velocity.x = 0;
}

Player.prototype.doAction = function() {
    this.move();
    
    let ball;
    for (let i in this.ballsList) {
        ball = this.ballsList[i];
        if (Collisions.outCircleRectangle(ball.x, ball.y, ball.radius, this.x, this.y, this.width, this.height)) {
            var lRad = Math.PI/180 * -Player.maxAngle * (this.y + this.height / 2 - ball.y) / this.height;
            ball.velocity.angle = (this.x - ball.x) / Math.abs(this.x - ball.x) > 0 ? Math.PI - lRad : lRad;
            ball.velocity.add(this.velocity.lerp(Player.restitution));
        }
    }
}

Player.prototype.setInput = function(input) {
    this.input.up = input.up;
    this.input.left = input.left;
    this.input.right = input.right;
}

Player.prototype.getDrawInstructions = function() {
    let obj = Player.super_.prototype.getDrawInstructions.apply(this);
    obj.type = 'rectangle';
    obj.color = this.color;
    return obj;
}

Player.xDistanceFromBorder = 50;
Player.jumpSpeed = 10;
Player.hSpeed = 10;
Player.maxAngle = 60;
Player.restitution = 0.5;
Player.normalHeight = 50;
Player.normalWidth = 20;

module.exports = Player;