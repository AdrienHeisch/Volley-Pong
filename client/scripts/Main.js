import {KeyboardManager} from './KeyboardManager.js';
import {TouchManager} from './TouchManager.js';
import * as Drawers from './Drawers.js';

const gameCanvas = $('#gameCanvas')[0];
const ctx = gameCanvas.getContext('2d');

const MARGIN = 0.02;
let gameRatio;
let getInput;
let mousePosition;
let helpImg = $("#helpImg")[0];
let keysImg = $("#keysImg")[0];

if (window.matchMedia("(pointer: fine)").matches) {
    KeyboardManager.init()
    mousePosition = { x: 0, y: 0 };
    window.onmousemove = e => mousePosition = { x: e.clientX - $(gameCanvas).offset().left, y: e.clientY - $(gameCanvas).offset().top };
    getInput = () => ({
        up: KeyboardManager.checkKey(32) || KeyboardManager.checkKey(38) || KeyboardManager.checkKey(KeyboardManager.isAzerty ? 90 : 87),
        left: KeyboardManager.checkKey(KeyboardManager.isAzerty ? 81 : 65) || KeyboardManager.checkKey(37),
        right: KeyboardManager.checkKey(68) || KeyboardManager.checkKey(39)
    });
} else if (window.matchMedia("(pointer: coarse)").matches) {
    TouchManager.init(gameCanvas);
    getInput = () => ({
        up: TouchManager.up,
        left: TouchManager.left,
        right: TouchManager.right
    });
} else getInput = () => {};

const socket = io.connect(window.location.href);

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

    if (KeyboardManager.isOn) {
        if (Math.sqrt((mousePosition.x - 17.5) * (mousePosition.x - 17.5) + (mousePosition.y - 17.5) * (mousePosition.y - 17.5)) < 12.5) {
            ctx.drawImage(keysImg, 5, 5);
            ctx.lineWidth = 1;
            ctx.strokeText("You are in " + (KeyboardManager.isAzerty ? "azerty" : "qwerty") + " mode", 5, 15 + $(keysImg).height());
        }
        else ctx.drawImage(helpImg, 5, 5);
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