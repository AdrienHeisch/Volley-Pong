import {KeyboardManager} from './KeyboardManager.js';
import {TouchManager} from './TouchManager.js';
import * as Drawers from './Drawers.js';

const MARGIN = 0.02;
let gameRatio;
let getInput;

if (window.matchMedia("(pointer: fine)").matches) {
    KeyboardManager.init();
    getInput = () => ({
        up: KeyboardManager.checkKey(90),
        left: KeyboardManager.checkKey(81),
        right: KeyboardManager.checkKey(68)
    });
} else if (window.matchMedia("(pointer: coarse)").matches) {
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
        gameRatio = gameCanvas.width / gameCanvas.height;
        onResize();
    }
});

setInterval(() => socket.emit('userInput', getInput()), 50);

let gameState = { drawInstructions: [] };
socket.on('stateRefresh', state => gameState = state);

function draw() {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    let drawInstruction;
    for (let i in gameState.drawInstructions) {
        drawInstruction = gameState.drawInstructions[i];
        Drawers[drawInstruction.type](ctx, drawInstruction);
    }

    requestAnimationFrame(draw);
}
draw();

function onResize() {
    if (gameRatio === undefined) {
        $(gameCanvas).width(0).height(0);
        return;
    }
    let windowRatio = window.innerWidth / window.innerHeight;
    if (windowRatio > gameRatio) {
        let margin = window.innerHeight * MARGIN;
        $(gameCanvas)
        .height(window.innerHeight - 2 * margin)
        .width(window.innerHeight * gameRatio)
        .offset({
            left: window.innerWidth / 2 - $(gameCanvas).width() / 2,
            top: margin
        });
    } else {
        let margin = window.innerWidth * MARGIN;
        $(gameCanvas)
        .width(window.innerWidth - 2 * margin)
        .height(window.innerWidth / gameRatio)
        .offset({
            left: margin,
            top: window.innerHeight / 2 - $(gameCanvas).height() / 2
        });
    }
}
$(window).resize(onResize).resize();

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