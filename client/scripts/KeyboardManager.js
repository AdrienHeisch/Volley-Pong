export const KeyboardManager = {
    init() {
        window.addEventListener("keydown", KeyboardManager.registerKey, false);
        window.addEventListener("keyup", KeyboardManager.unregisterKey, false);
    },

    registerKey() {
        if (KeyboardManager.keys.indexOf(event.keyCode) == -1) KeyboardManager.keys.push(event.keyCode);
    },

    unregisterKey() {
        if (KeyboardManager.keys.indexOf(event.keyCode) > -1) KeyboardManager.keys.splice(KeyboardManager.keys.indexOf(event.keyCode), 1);
    },

    checkKey(key) {
        return KeyboardManager.keys.indexOf(key) > -1;
    }
}

KeyboardManager.keys = [];