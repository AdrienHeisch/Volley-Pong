export const TouchManager = {
    init() {
        var hammer = new Hammer.Manager(window);
        hammer.add(new Hammer.Pan({direction: Hammer.DIRECTION_ALL, threshold: 0}));
        hammer.on('pan', panHandler);
        $(window).on('touchend', mouseUpHandler);
    },

    left: false,
    right: false,
    up: false
}

function panHandler(e) {
    console.log(e.velocityX, e.velocityY)
    if (e.velocityX > 0.05) {
        TouchManager.left = false;
        TouchManager.right = true;
    } else if (e.velocityX < -0.05) {
        TouchManager.right = false;
        TouchManager.left = true;
    } else {
        TouchManager.right = false;
        TouchManager.left = false; 
    }

    if (e.velocityY < -0.05) {
        TouchManager.up = true;
        setTimeout(() => TouchManager.up = false, 50);
    }
}

function tapHandler() {}

function mouseUpHandler(e) {
    TouchManager.left = false;
    TouchManager.right = false;
}