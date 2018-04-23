import {KeyboardManager} from './KeyboardManager.js';
import {TouchManager} from './TouchManager.js';
import * as Drawers from './Drawers.js';

var getInput;

if (window.matchMedia("(hover: hover)").matches) {
    KeyboardManager.init();
    getInput = () => ({
        up: KeyboardManager.checkKey(90),
        left: KeyboardManager.checkKey(81),
        right: KeyboardManager.checkKey(68)
    });
} else if (window.matchMedia("(hover: none)").matches) {
    TouchManager.init();
    getInput = () => ({
        up: TouchManager.up,
        left: TouchManager.left,
        right: TouchManager.right
    });
} else getInput = () => {};

const socket = io.connect(window.location.href);
const gameCanvas = $('#gameCanvas')[0];
const ctx = gameCanvas.getContext('2d');

socket.on('initClient', params => {
    if (params.canvasSize !== undefined) {
        gameCanvas.width = params.canvasSize.width;
        gameCanvas.height = params.canvasSize.height;
        $(gameCanvas)
            .height(window.innerHeight)
            .width(window.innerHeight * gameCanvas.width / gameCanvas.height)
            .offset({
                left: window.innerWidth / 2 - $(gameCanvas).width() / 2
            });
    }
});

setInterval(function() {
    socket.emit('userInput', getInput());
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

// function toggleFullScreen(element) {
//     if (!document.mozFullScreen && !document.webkitFullScreen) {
//         if (element.mozRequestFullScreen) {
//             element.mozRequestFullScreen();
//         } else {
//             element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
//         }
//     } else {
//         if (document.mozCancelFullScreen) {
//             document.mozCancelFullScreen();
//         } else {
//             document.webkitCancelFullScreen();
//         }
//     }
// }