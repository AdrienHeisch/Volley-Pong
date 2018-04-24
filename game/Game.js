const Point = require('./Point');
const Ball = require('./Ball');
const Player = require('./Player');
const Net = require('./Net');
const World = require('./World');

function Game() {
    this.balls = [];
    this.nets = [];
    this.players = [];
    this.sockets = [];
}

Game.getInitInfo = function() {
    return {
        canvasSize: World.size
    }
}

Game.prototype.init = function() {
    let ball = new Ball({
        x: World.size.width / 2,
        y: World.size.height / 2
    });

    ball.velocity.setTo(4, -1);

    this.balls.push(ball);

    this.nets.push(new Net({
        x: World.size.width / 2,
        ballsList: this.balls
    }));
}

Game.prototype.refresh = function() {
    for (let i in this.balls) {
        this.balls[i].doAction();
    }
    for (let i in this.players) {
        this.players[i].doAction();
    }
    for (let i in this.nets) {
        this.nets[i].doAction();
    }
}

Game.prototype.addPlayer = function(socket) {
    let player = new Player({
        x: (function() {
            if (this.players[this.players.length - 1] === undefined) return Player.xDistanceFromBorder;
            return (this.players[this.players.length - 1].isRightSide ? Player.xDistanceFromBorder : World.size.width - Player.xDistanceFromBorder);
        }).call(this),
        ballsList: this.balls
    });
    socket.player = player;

    this.sockets.push(socket);
    this.players.push(player);
}

Game.prototype.removePlayer = function(socket) {
    this.players.splice(this.players.indexOf(socket.player), 1);
    this.sockets.splice(this.sockets.indexOf(socket), 1);
}

Game.prototype.getState = function() {
    return {
        drawInstructions: (function() {
            let array = [];
            for (let i in this.balls) {
                array.push(this.balls[i].getDrawInstructions());
            }
            for (let i in this.players) {
                array.push(this.players[i].getDrawInstructions());
            }
            for (let i in this.nets) {
                array.push(this.nets[i].getDrawInstructions());
            }
            return array;
        }).apply(this)
    }
}

Game.prototype.setInput = function(socket, input) {
    socket.player.setInput(input);
}

module.exports = Game;