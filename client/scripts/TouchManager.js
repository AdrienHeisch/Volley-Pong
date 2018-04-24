export const TouchManager = {
    init(htmlElement) {
        target = htmlElement;
        $(target).on('touchstart', touchStartHandler);
        $(target).on('touchend', touchEndHandler);
    },

    get left() { return joystickDelta.x < 0; },
    get right() { return joystickDelta.x > 0; },
    up: false
}

let target;

let leftTouchId;
let rightTouchId;

let joystickCenter;
let joystickDelta;

resetJoystick();

function touchStartHandler(e) {
    let newTouch = e.changedTouches[0];
    if (newTouch.clientX < window.innerWidth / 2) {
        if (leftTouchId !== undefined && e.touches.length > 0) return;
        leftTouchId = newTouch.identifier;
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
    console.log(e.touches)
    let leftTouch = e.touches[leftTouchId];
    joystickDelta.x = leftTouch.clientX - joystickCenter.x;
    joystickDelta.y =  leftTouch.clientY - joystickCenter.y;
}

function touchEndHandler(e) {
    if (e.changedTouches[0].identifier === leftTouchId) {
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

/*function findLeftTouch(event) {
    for (let touch in event.touches) {
        if (touch.identifier === leftTouchId) return touch;
    }
    console.log("No touch was find for id", leftTouchId, ".")
    return undefined;
}*/

function mouseUpHandler(e) {
    TouchManager.left = false;
    TouchManager.right = false;
}