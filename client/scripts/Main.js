import {KeyboardManager} from './KeyboardManager.js';
import * as Drawers from './Drawers.js';

const socket = io.connect(window.location.href);
const gameCanvas = $('#gameCanvas')[0];
const ctx = gameCanvas.getContext('2d');

socket.on('initClient', function(params) {
    if (params.canvasSize !== undefined) {
        gameCanvas.width = params.canvasSize.width;
        gameCanvas.height = params.canvasSize.height;
    }
});

KeyboardManager.init();
setInterval(function() {
    socket.emit('userInput', {
        up: KeyboardManager.checkKey(90),
        left: KeyboardManager.checkKey(81),
        right: KeyboardManager.checkKey(68)
    });
}, 50);

let gameState = {
    drawInstructions: []
};
socket.on('stateRefresh', state => gameState = state);

let draw = function() {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    let drawInstruction;
    for (let i in gameState.drawInstructions) {
        drawInstruction = gameState.drawInstructions[i];
        Drawers[drawInstruction.type](ctx, drawInstruction);
    }

    requestAnimationFrame(draw);
}
draw();