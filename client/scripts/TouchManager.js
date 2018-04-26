export const TouchManager = {
    init(htmlElement) {
        target = htmlElement;
        $(target).on('touchstart', touchStartHandler);
        $(target).on('touchend', touchEndHandler);
    },

    get left() { return joystickDelta.x < -joystickRadius; },
    get right() { return joystickDelta.x > joystickRadius; },
    up: false
}

let target;

let leftTouchId;
let rightTouchId;

let joystickRadius = 75;
let joystickCenter;
let joystickDelta;

let iosBugfix = 0;

resetJoystick();

function touchStartHandler(e) {
    let newTouch = e.changedTouches[0];
    if (newTouch.clientX < window.innerWidth / 2) {
        if (leftTouchId !== undefined && e.touches.length > 0) return;
        leftTouchId = newTouch.identifier;
        if (leftTouchId < 0) iosBugfix = -leftTouchId;
        leftTouchId += iosBugfix;
        joystickCenter.x = newTouch.clientX;
        joystickCenter.y = newTouch.clientY;
        $(target).on('touchmove', touchMoveHandler);
    } else {
        if (rightTouchId !== undefined && e.touches.length > 0) return;
        rightTouchId = newTouch.identifier;
        TouchManager.up = true;
    }
}

function touchMoveHandler(e) {
    let leftTouch = e.touches[leftTouchId];
    joystickDelta.x = leftTouch.clientX - joystickCenter.x;
    joystickDelta.y =  leftTouch.clientY - joystickCenter.y;
}

function touchEndHandler(e) {
    if (e.changedTouches[0].identifier === leftTouchId - iosBugfix) {
        leftTouchId = undefined;
        resetJoystick();
        $(target).off('touchmove', touchMoveHandler);
    } else if (e.changedTouches[0].identifier === rightTouchId) {
        rightTouchId = undefined;
        TouchManager.up = false;
    }
}

function resetJoystick() {
    joystickDelta = { x: 0, y: 0 };
    joystickCenter = { x: undefined, y: undefined };
}

function mouseUpHandler(e) {
    TouchManager.left = false;
    TouchManager.right = false;
}