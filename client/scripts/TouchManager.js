export const TouchManager = {
    init() {
        var hammer = new Hammer.Manager(window);
        hammer.add(new Hammer.Pan({direction: Hammer.DIRECTION_ALL, threshold: 0}));
        hammer.add(new Hammer.Tap({}));
        hammer.on('pan', panHandler);
        hammer.on('tap', tapHandler);
        $(window).on('touchend', mouseUpHandler);
    },

    left: false,
    right: false,
    up: false
}

function panHandler(e) {
    switch (e.additionalEvent) {
        case 'panleft':
            TouchManager.right = false;
            TouchManager.left = true;
            break;
        case 'panright':
            TouchManager.left = false;
            TouchManager.right = true;
            break;
    }
}

function tapHandler(e) {
    TouchManager.up = true;
    setTimeout(() => TouchManager.up = false, 50);
}

function mouseUpHandler(e) {
    TouchManager.left = false;
    TouchManager.right = false;
}