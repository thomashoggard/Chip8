
class Gamepad {
    constructor() {
        this.waiting = false;

        this.keymap = {
            Digit1: 0x1, // 1
            Digit2: 0x2, // 2
            Digit3: 0x3, // 3
            Digit4: 0xC, // 4
            KeyQ: 0x4,   // Q
            KeyW: 0x5,   // W
            KeyE: 0x6,   // E
            KeyR: 0xD,   // R
            KeyA: 0x7,   // A
            KeyS: 0x8,   // S
            KeyD: 0x9,   // D
            KeyF: 0xE,   // F
            KeyZ: 0xA,   // Z
            KeyX: 0x0,   // X
            KeyC: 0xB,   // C
            KeyV: 0xF    // V            
        };        
    }

    start(callback) {
        global.window.addEventListener('keydown', (key) => {
            const hexKey = this.keymap[key.code];

            if (hexKey) {
                callback(hexKey, true);
            }
        }, false);

        global.window.addEventListener('keyup', (key) => {
            const hexKey = this.keymap[key.code];

            if (hexKey) {
                callback(hexKey, false);
            } 
        }, false); 
    }    

    getKey(callback) {
        this.waiting = true;
        global.window.addEventListener('keypress', (key) => {
            const hexKey = this.keymap[key.code];

            if (hexKey) {
                callback(hexKey);
                this.waiting = false;    
            } else {
                // Invalid key, try again
                this.getKey(callback);
            }
        }, {once: true});        
    }
}

export default Gamepad;