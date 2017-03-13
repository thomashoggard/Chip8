
class HexKeyboard {
    constructor() {
        this.listeners = [];
    }

    registerListener(cb) {
        this.listeners.push(cb);
    }

    invokeListeners() {
        this.listeners.forEach(listener => listener.keyPress(0x0));
    }
}

export default HexKeyboard;