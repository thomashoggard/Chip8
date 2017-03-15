class Chip8 {
    constructor() {
        this.lastRender = 0;
        this.loop = this.loop.bind(this);

        // Audio
        this.sound = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU="); 
        
        // Video
        this.canvas = document.getElementById('myCanvas');
        this.context = this.canvas.getContext('2d');

        // FPS Counter
        this.fps = 0;
        this.frameCounter = 0;
        setInterval(() => {
            this.fps = this.frameCounter;
            this.frameCounter = 0;
        }, 1000);

        this.reset();
    }

    start() {
        global.window.addEventListener('keydown', (key) => {
            const hexKey = this.keymap[key.code];

            if (hexKey) {
                this.keys[hexKey] = 1;
            }
        }, false);

        global.window.addEventListener('keyup', (key) => {
            const hexKey = this.keymap[key.code];

            if (hexKey) {
                this.keys[hexKey] = 0;
            } 
        }, false); 

        requestAnimationFrame(this.loop.bind(this));   
    }

    reset() {
        // Stop program execution while waiting for user input.
        this.blockExecution = false;

        this.initKeys();

        this.memory = new Uint8Array(4096);
        this.resetMemory();
        this.pc = 0x200; // Program Counter
        
        this.stack = new Uint16Array(16);
        this.sp = 0; // Stack Pointer
        
        // Registers
        this.V = new Uint8Array(16);
        this.I = 0;
        this.delayTimer = 0;
        this.soundTimer = 0;

        // Graphics
        this.displayWidth = 64;
        this.displayHeight = 32;
        // Only uses the least significant bit
        this.display = new Uint8Array(this.displayWidth * this.displayHeight);
        this.clearDisplay();

        this.loadSprites();
    }

    initKeys() {
        this.keys = [];

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

    resetMemory() {
        for (let i = 0; i < this.memory.length; i++) {
            this.memory[i] = 0;
        }
    }

    loadRom(rom) {
        this.reset

        for (let i = 0; i < rom.length; i++) {
            this.memory[this.pc + i] = rom[i];
        }
    }

    loadSprites() {
        var sprites = [
            0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
            0x20, 0x60, 0x20, 0x20, 0x70, // 1
            0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2
            0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
            0x90, 0x90, 0xF0, 0x10, 0x10, // 4
            0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
            0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
            0xF0, 0x10, 0x20, 0x40, 0x40, // 7
            0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
            0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
            0xF0, 0x90, 0xF0, 0x90, 0x90, // A
            0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
            0xF0, 0x80, 0x80, 0x80, 0xF0, // C
            0xE0, 0x90, 0x90, 0x90, 0xE0, // D
            0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
            0xF0, 0x80, 0xF0, 0x80, 0x80  // F
        ];        

        // Store sprites into memory 0x000 to 0x1FF
        for (let i = 0; i < sprites.length; i++) {
            this.memory[i] = sprites[i];
        }
    }

    executeOpcode(opcode) {
        // 4-bit register identifier
        const x = (opcode & 0x0F00) >> 8;
        const y = (opcode & 0x00F0) >> 4;

        // 8-bit constant
        const kk = opcode & 0x00FF;

        // nibble
        const n = opcode & 0x000F;

        // memory address
        const nnn = opcode & 0x0FFF;

        switch (opcode & 0xF000) {
            case 0x0000:
                switch (opcode & 0x00FF) {
                    case 0x00E0:
                        this.clearDisplay();
                    break;
                    case 0x00EE:
                        this.return();
                    break;
                }
            break;
            case 0x1000:
                this.jumpAddress(nnn);
            break;
            case 0x2000:
                this.callAddress(nnn);
            break;
            case 0x3000:
                this.skipNextInstruction_Vx_Equals_kk(x, kk);
            break;
            case 0x4000:
                this.skipNextInstruction_Vx_NotEquals_kk(x, kk);
            break;
            case 0x5000:
                this.skipNextInstruction_Vx_Equals_Vy(x, kk);
            break;                        
            case 0x6000: 
                this.Set_LD_Vx_byte(x, kk);
            break;
            case 0x7000:
                this.Add_Vx_byte(x, kk);
            break;
            case 0X8000:
                switch (opcode & 0x000F)
                {
                    case 0x0000: 
                        this.Set_LD_Vx_Vy(x, y);
                    break;
                    case 0x0001: 
                        this.Set_OR_Vx_Vy(x, y);
                    break;
                    case 0x0002:
                        this.Set_AND_Vx_Vy(x, y);
                    break;
                    case 0x0003:
                        this.Set_XOR_Vx_Vy(x, y);
                    break;
                    case 0x0004:
                        this.Set_ADD_Vx_Vy(x, y);
                    break;
                    case 0x0005:
                        this.Set_SUB_Vx_Vy(x, y);
                    break;
                    case 0x0006:
                        this.Set_SHR_Vx(x);
                    break;
                    case 0x0007:
                        this.Set_SUBN_Vx_Vy(x, y);
                    break;                                                                                                    
                    case 0x000E:
                        this.Set_SHL_Vx(x);
                    break;                        
                }
            break;
            case 0x9000:
                this.skipNextInstruction_Vx_NotEquals_Vy(x, y);
            break;
            case 0xA000:
                this.loadRegisterI(nnn);
            break;
            case 0xB000:
                this.jumpAddressV0(nnn);
            break;
            case 0xC000:
                this.randomByte_Vx(x, kk);
            break;
            case 0xD000:
                this.draw_Vx_Vy_Nibble(x, y, n);
            break;
            case 0xE000:
                switch (opcode & 0x00FF) {
                    case 0x009E:
                        this.skipNextInstructionKeyPressed(x);
                    break;
                    case 0x00A1:
                        this.skipNextInstructionKeyNotPressed(x);
                    break;                    
                }
            break;
            case 0xF000:
                switch (opcode & 0x00FF) {
                    case 0x0007:
                        this.loadDelayTimerIntoVx(x);
                    break;
                    case 0x000A:
                        this.loadKeyPressIntoVx(x);
                    break;
                    case 0x0015:
                        this.loadVxIntoDelayTimer(x);
                    break;
                    case 0x0018:
                        this.loadVxIntoSoundTimer(x);
                    break;
                    case 0x001E:
                        this.addIAndVxIntoI(x);
                    break;
                    case 0x0029:
                        this.set_LD_F_VX(x);
                    break;
                    case 0x0033:
                        this.load_B_Vx(x);
                    break;
                    case 0x0055:
                        this.load_I_Vx(x);
                    break;
                    case 0x0065:
                        this.load_Vx_I(x);
                    break;
                }
            break;
        }
    }

    // 00E0 - CLS
    // Clear the display.
    clearDisplay() {
        for (var i =0; i < this.display.length; i++) {
            this.display[i] = 0;
        }
    }

    // 00EE - RET
    // Return from a subroutine.
    // The interpreter sets the program counter to the address at the top of the stack, then subtracts 1 from the stack pointer.    
    return() {
        this.sp--;       
        this.pc = this.stack[this.sp];
    }

    // 1nnn - JP addr
    // Jump to location nnn.
    // The interpreter sets the program counter to nnn.
    jumpAddress(nnn) {
        this.pc = nnn;
    }

    // 2nnn - CALL addr
    // Call subroutine at nnn.
    // The interpreter increments the stack pointer, then puts the current PC on the top of the stack. The PC is then set to nnn.
    callAddress(nnn) {
        this.stack[this.sp] = this.pc;
        this.sp++;
        this.pc = nnn;
    }

    // 3xkk - SE Vx, byte
    // Skip next instruction if Vx = kk.
    // The interpreter compares register Vx to kk, and if they are equal, increments the program counter by 2.
    skipNextInstruction_Vx_Equals_kk(x, kk) {
        if (this.V[x] == kk) {
            this.pc += 2;
        }
    }

    // 4xkk - SNE Vx, byte
    // Skip next instruction if Vx != kk.
    // The interpreter compares register Vx to kk, and if they are not equal, increments the program counter by 2.
    skipNextInstruction_Vx_NotEquals_kk(x, kk) {
        if (this.V[x] != kk) {
            this.pc += 2;
        }
    }

    // 5xy0 - SE Vx, Vy
    // Skip next instruction if Vx = Vy.
    // The interpreter compares register Vx to register Vy, and if they are equal, increments the program counter by 2.
    skipNextInstruction_Vx_Equals_Vy(x, y) {
        if (this.V[x] == this.V[y]) {
            this.pc += 2;
        }
    }

    // 6xkk
    // Set Vx = kk
    // The interpreter puts the value kk into register Vx.
    Set_LD_Vx_byte(x, kk) {
        this.V[x] = kk;
    }

    // 7xkk
    // ADD Vx, byte
    // Adds the value kk to the value of register Vx, then stores the result in Vx. 
    Add_Vx_byte(x, kk) {
        this.V[x] += kk;
    }

    // 8xy0 - LD Vx, Vy
    // Set Vx = Vy.
    // Stores the value of register Vy in register Vx.
    Set_LD_Vx_Vy(x, y) {
        this.V[x] = this.V[y];
    }

    // 8xy1
    // Set Vx = Vx OR Vy.
    // Performs a bitwise OR on the values of Vx and Vy, then stores the result in Vx. 
    Set_OR_Vx_Vy(x, y) {
        this.V[x] |= this.V[y];
    }

    // 8xy2 - AND Vx, Vy
    // Set Vx = Vx AND Vy.
    // Performs a bitwise AND on the values of Vx and Vy, then stores the result in Vx.
    Set_AND_Vx_Vy(x, y) {
        this.V[x] &= this.V[y];
    }

    // 8xy3 - XOR Vx, Vy
    // Set Vx = Vx XOR Vy.
    // Performs a bitwise exclusive OR on the values of Vx and Vy, then stores the result in Vx.    
    Set_XOR_Vx_Vy(x, y) {
        this.V[x] ^= this.V[y];
    }

    // 8xy4 - ADD Vx, Vy
    // Set Vx = Vx + Vy, set VF = carry.
    /* The values of Vx and Vy are added together. If the result is greater than 255 VF is set to 1, 
    otherwise 0. Only the lowest 8 bits of the result are kept, and stored in Vx. */   
    Set_ADD_Vx_Vy(x, y) {
         const total = (this.V[x] + this.V[y]);
         this.V[x] = total;
         this.V[0xF] = +(total > 0xFF);
    }

    // 8xy5 - SUB Vx, Vy
    // Set Vx = Vx - Vy, set VF = NOT borrow.
    // If Vx > Vy, then VF is set to 1, otherwise 0. Then Vy is subtracted from Vx, and the results stored in Vx.    
    Set_SUB_Vx_Vy(x, y) {
        this.V[0xF] = +(this.V[x] > this.V[y]);
        this.V[x] -= this.V[y];
    }

    // 8xy6 - SHR Vx {, Vy}
    // Set Vx = Vx SHR 1.
    // Shifts Vx right by one. VF is set to the value of the least significant bit of VX before the shift    
    Set_SHR_Vx(x) {
        this.V[0xF] = this.V[x] & 0x1;
        this.V[x] >>= 1;
    }

    // 8xy7 - SUBN Vx, Vy
    // Set Vx = Vy - Vx, set VF = NOT borrow.
    // If Vy > Vx, then VF is set to 1, otherwise 0. Then Vx is subtracted from Vy, and the results stored in Vx.
    Set_SUBN_Vx_Vy(x, y) {
        this.V[0xF] = +(this.V[y] > this.V[x]);
        this.V[x] = this.V[y] - this.V[x];
    }

    // 8xyE - SHL Vx {, Vy}
    // Set Vx = Vx SHL 1.
    // Shifts VX left by one. VF is set to the value of the most significant bit of VX before the shift
    Set_SHL_Vx(x) {
        this.V[0xF] = +(this.V[x] & 0x80);
        this.V[x] <<= 1;
    }

    // 9xy0 - SNE Vx, Vy
    // Skip next instruction if Vx != Vy.
    // The values of Vx and Vy are compared, and if they are not equal, the program counter is increased by 2.    
    skipNextInstruction_Vx_NotEquals_Vy(x, y) {
        if (this.V[x] != this.V[y]) {
            this.pc += 2;
        }
    }    

    // Annn - LD I, addr
    // Set I = nnn.
    // The value of register I is set to nnn.    
    loadRegisterI(nnn) {
        this.I = nnn;
    }

    // Bnnn - JP V0, addr
    // Jump to location nnn + V0.
    // The program counter is set to nnn plus the value of V0.    
    jumpAddressV0(nnn) {
        this.pc = nnn + this.V[0];
    }

    // Cxkk - RND Vx, byte
    // Set Vx = random byte AND kk.
    // The interpreter generates a random number from 0 to 255, which is then ANDed with the value kk. The results are stored in Vx.
    randomByte_Vx(x, kk) {
        const rand = Math.floor(Math.random() * 256);
        this.V[x] = rand & kk;
    }

    // Dxyn - DRW Vx, Vy, nibble
    // Display n-byte sprite starting at memory location I at (Vx, Vy), set VF = collision.
    /* The interpreter reads n bytes from memory, starting at the address stored in I. 
        These bytes are then displayed as sprites on screen at coordinates (Vx, Vy). 
        Sprites are XORed onto the existing screen. If this causes any pixels to be erased, 
        VF is set to 1, otherwise it is set to 0. If the sprite is positioned so part of it is 
        outside the coordinates of the display, it wraps around to the opposite side of the screen. 
        See instruction 8xy3 for more information on XOR, and section 2.4, 
        Display, for more information on the Chip-8 screen and sprites.*/
    draw_Vx_Vy_Nibble(x, y, n) {
        this.V[0xF] = 0;
        for (let yline = 0; yline < n; yline++) {
            let pixel = this.memory[this.I + yline];

            for (let xline = 0; xline < 8; xline++) {
                let xLocation = this.V[x] + xline;
                if (xLocation >= this.displayWidth) {
                    xLocation -= this.displayWidth;
                } 

                if((pixel & (0x80 >> xline)) != 0) {
                    let yLocation = ((this.V[y] + yline) * this.displayWidth);
                    if (yLocation >= this.displayHeight * this.displayWidth) {
                         yLocation -= this.displayHeight * this.displayWidth;
                     }

                    if (this.display[xLocation + yLocation] == 1)
                    {
                        this.V[0xF] = 1;
                    }
                    this.display[xLocation + yLocation] ^= 1;
                }
            }
        }
    }

    // Ex9E - SKP Vx
    // Skip next instruction if key with the value of Vx is pressed.
    // Checks the keyboard, and if the key corresponding to the value of Vx is currently in the down position, PC is increased by 2.
    skipNextInstructionKeyPressed(x) {
        if (this.keys[this.V[x]]) {
            this.pc += 2;
        }
    }

    // ExA1 - SKNP Vx
    // Skip next instruction if key with the value of Vx is not pressed.
    // Checks the keyboard, and if the key corresponding to the value of Vx is currently in the up position, PC is increased by 2.
    skipNextInstructionKeyNotPressed(x) {
        if (!this.keys[this.V[x]]) {
            this.pc += 2;
        }
    }

    // Fx07 - LD Vx, DT
    // Set Vx = delay timer value.
    // The value of DT is placed into Vx.
    loadDelayTimerIntoVx(x) {
        this.V[x] = this.delayTimer;
    }

    // Fx0A - LD Vx, K
    // Wait for a key press, store the value of the key in Vx.
    // All execution stops until a key is pressed, then the value of that key is stored in Vx.
    loadKeyPressIntoVx(x) {
        this.blockExecution = true;
        global.window.addEventListener('keypress', (key) => {
            const hexKey = this.keymap[key.code];

            if (hexKey) {
                this.V[x] = hexKey;
                this.blockExecution = false;    
            } else {
                // Invalid key, try again
                this.loadKeyPressIntoVx(x);
            }
        }, {once: true});
    }

    // Fx15 - LD DT, Vx
    // Set delay timer = Vx.
    // DT is set equal to the value of Vx.
    loadVxIntoDelayTimer(x) {
        this.delayTimer = this.V[x];
    }

    // Fx18 - LD ST, Vx
    // Set sound timer = Vx.
    // ST is set equal to the value of Vx.
    loadVxIntoSoundTimer(x) {
        this.soundTimer = this.V[x];
    }

    // Fx1E - ADD I, Vx
    // Set I = I + Vx.
    // The values of I and Vx are added, and the results are stored in I.
    addIAndVxIntoI(x) {
        this.I += this.V[x];
    }

    // Fx29 - LD F, Vx
    // Sets I to the location of the sprite for the character in VX. Characters 0-F (in hexadecimal) are represented by a 4x5 font.
    set_LD_F_VX(x) {
        this.I = this.V[x] * 5;
    }

    // Fx33 - LD B, Vx
    // Store BCD representation of Vx in memory locations I, I+1, and I+2.
    // The interpreter takes the decimal value of Vx, and places the hundreds digit in memory at location in I, the tens digit at location I+1, and the ones digit at location I+2.
    load_B_Vx(x) {
        let number = this.V[x];

        for (let i = 3; i > 0; i--) {
            this.memory[this.I + i - 1] = parseInt(number % 10);
            number /= 10;
        }
    }

    // Fx55 - LD [I], Vx
    // Store registers V0 through Vx in memory starting at location I.
    // The interpreter copies the values of registers V0 through Vx into memory, starting at the address in I.
    load_I_Vx(x) {
        for (let i = 0; i <= x; i++) {
            this.memory[this.I + i] = this.V[i];
        }
    }

    // Fx65 - LD Vx, [I]
    // Read registers V0 through Vx from memory starting at location I.
    // The interpreter reads values from memory starting at location I into registers V0 through Vx.
    load_Vx_I(x) {
        for (let i = 0; i <= x; i++) {
            this.V[i] = this.memory[this.I + i];
        }
    }

    updateTimers() {
        if (this.delayTimer > 0) {
            this.delayTimer--;
        }

        if (this.soundTimer > 0) {
            this.sound.play();
            this.soundTimer--;
        }  
    }

    emulateCycle() {
        var opcode = this.memory[this.pc] << 8 | this.memory[this.pc + 1];
        this.pc += 2;
        this.executeOpcode(opcode);
    }

    update(progress) {
        if (!this.blockExecution) {    
            const fps = 1000 / progress;

            const clock60Hz = Math.round(60 / fps);
            for (let i = 0; i < clock60Hz; i++) {
                this.updateTimers();
            }

            const clock540Hz = Math.round(540 / fps);
            for (let i = 0; i < clock540Hz; i++) {
                this.emulateCycle();
            }
        }
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let displayPointer = 0;
        for (let y = 0; y < this.displayHeight; y++) {
            for (let x = 0; x < this.displayWidth; x++) {
                if (this.display[displayPointer]) {
                    this.context.fillStyle="#FFFFFF";
                    this.context.fillRect(x * 10, y * 10, 10, 10);    
                } else {
                    this.context.fillStyle="#000000";
                    this.context.fillRect(x * 10, y * 10, 10, 10);    
                }
                displayPointer++;
            }
        }

        this.context.fillStyle="#FFFFFF";
        this.context.font = "15px Arial";
        this.context.fillText(`FPS: ${this.fps}`,0,20);  
    }

    loop(timestamp) {
        var progress = timestamp - this.lastRender;

        this.frameCounter++;

        this.update(progress);
        this.draw();

        this.lastRender = timestamp;

        requestAnimationFrame(this.loop);
    }
}

export default Chip8;