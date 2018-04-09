const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const Game = require('./game/Game');
const port = process.env.PORT || 8080;
// const address = "2a01:cb00:b1a:ec00:8d6d:a998:e016:f534";

app.use(express.static('client'));

const games = [];
const playersPerGame = 999999999;

io.sockets.on('connection', function (socket) {
    let game = (function() {
        let getNewGame = function() {
            let newGame = new Game();
            games.push(newGame);
            newGame.init();
            return newGame;
        };

        if (games[games.length - 1] === undefined) return getNewGame();
        if (games[games.length - 1].sockets.length >= playersPerGame) return getNewGame();
        return games[games.length - 1];
    })();

    game.addPlayer(socket);

    socket.emit('initClient', Game.getInitInfo());

    socket.on('userInput', input => game.setInput(socket, input));

    socket.on('disconnect', function() {
        game.removePlayer(socket);
        if (game.sockets.length <= 0) {
            games.splice(games.indexOf(game), 1);
        }
    });
});

function sendStates() {
    let game;
    for (let i in games) {
        game = games[i];
        game.refresh();
        for (let j in game.sockets) {
            game.sockets[j].emit('stateRefresh', game.getState())
        }
    }
}
setInterval(sendStates, 16);

server.listen(port);