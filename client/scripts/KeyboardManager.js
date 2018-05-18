export const KeyboardManager = {
    init() {
        window.addEventListener("keydown", KeyboardManager.registerKey, false);
        window.addEventListener("keyup", KeyboardManager.unregisterKey, false);
        KeyboardManager.isOn = true;
    },

    stop() {
        window.removeEventListener("keydown", KeyboardManager.registerKey, false);
        window.removeEventListener("keyup", KeyboardManager.unregisterKey, false);
        KeyboardManager.isOn = true;
    },

    switchMode() {
        KeyboardManager.isAzerty = !KeyboardManager.isAzerty;
    },

    registerKey() {
        if (event.keyCode === 80) KeyboardManager.switchMode();
        if (KeyboardManager.keys.indexOf(event.keyCode) == -1) KeyboardManager.keys.push(event.keyCode);
    },

    unregisterKey() {
        if (KeyboardManager.keys.indexOf(event.keyCode) > -1) KeyboardManager.keys.splice(KeyboardManager.keys.indexOf(event.keyCode), 1);
    },

    checkKey(key) {
        return KeyboardManager.keys.indexOf(key) > -1;
    },

    isOn: false,
    isAzerty: true,
    keys: []
}