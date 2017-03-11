class Chip8 {
    constructor() {
        this.lastRender = 0;
        this.loop = this.loop.bind(this);

        this.reset();
    }

    start() {
        window.requestAnimationFrame(this.loop)    
    }

    reset() {
        this.memory = new Array(4096);
        this.stack = new Array(16);
        this.sp = 0;
        
        // Registers
        this.V = new Uint8Array(16);
        this.I = 0;
        this.delayTimer = 0;
        this.soundTimer = 0;

        // Graphics
        this.displayWidth = 64;
        this.displayHeight = 32;
        this.display = new Array(this.displayWidth * this.displayHeight);
    }

    executeOpcode(opcode) {
        // 4-bit register identifier
        const x = (opcode & 0x0F00) >> 8;
        const y = (opcode & 0x00F0) >> 4;

        // 8-bit constant
        const kk = opcode & 0x00FF;

        switch (opcode & 0xF000) {
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

    update(progress) {
        // Update the state of the world for the elapsed time since last render
    }

    draw() {
        // Draw the state of the world
    }

    loop(timestamp) {
        var progress = timestamp - this.lastRender;

        this.update(progress);
        this.draw();

        this.lastRender = timestamp
        window.requestAnimationFrame(this.loop)
    }
}

export default Chip8;