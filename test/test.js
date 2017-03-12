import {should} from 'chai';
should();
import Chip8 from '../app/Chip8';

describe('Chip8', function() {
    describe('Set_LD_Vx_byte', function() {
        // 6xkk
        var opcodes = [0x6001, 0x6199, 0x62FF];
        
        opcodes.forEach(function(opcode) {
            const x =  (opcode & 0x0F00) >> 8;
            const kk = opcode & 0x00FF;

            it(`The interpreter puts the value ${kk.toString(16)} into register V${x.toString(16)}`, function(done) {
                var chip8 = new Chip8();
                chip8.Set_LD_Vx_byte(x, kk)
                chip8.V[x].should.equal(kk);
                done();
            });
        });
    });

    describe('Add_Vx_byte', function() {
        // 7xkk
        const chip8 = new Chip8();

        it(`Adds the value 1 to the value of register V[1], then stores the result in V[1].`, function(done) {
            chip8.Add_Vx_byte(1, 0x01)
            chip8.V[1].should.equal(0x01);
            done();
        });

        it(`Adds the value 1 to the value of register V[1], then stores the result in V[1].`, function(done) {
            chip8.Add_Vx_byte(1, 0x01)
            chip8.V[1].should.equal(0x02);
            done();
        });   

        it(`Adds the value 0xFD to the value of register V[1], then stores the result in V[1].`, function(done) {
            chip8.Add_Vx_byte(1, 0xFD)
            chip8.V[1].should.equal(0xFF);
            done();
        });         

        it(`Adds the value 0x01 to the value of register V[1], then stores the result in V[1].`, function(done) {
            chip8.Add_Vx_byte(1, 0x01)
            chip8.V[1].should.equal(0);
            done();
        });          
    });    


    describe('Set_LD_Vx_Vy', function() {
        it (`Stores the value of register Vy in register Vx.`, function(done) {
            var chip8 = new Chip8();
            chip8.Set_LD_Vx_byte(1, 0xFF);

            chip8.Set_LD_Vx_Vy(0, 1);

            chip8.V[0].should.equal(0xFF);
            done();
        });
    });

    describe('Set_OR_Vx_Vy', function() {
        it (`Performs a bitwise OR on the values of Vx and Vy, then stores the result in Vx. `, function(done) {
            var chip8 = new Chip8();
            chip8.Set_LD_Vx_byte(0, 0xF0);
            chip8.Set_LD_Vx_byte(1, 0x0F);

            chip8.Set_OR_Vx_Vy(0, 1);

            chip8.V[0].should.equal(0xFF);
            done();
        });
    });  

    describe('Set_AND_Vx_Vy', function() {
        it (`Performs a bitwise AND on the values of Vx and Vy, then stores the result in Vx.`, function(done) {
            var chip8 = new Chip8();
            chip8.Set_LD_Vx_byte(0, 0xF0);
            chip8.Set_LD_Vx_byte(1, 0x0F);

            chip8.Set_AND_Vx_Vy(0, 1);

            chip8.V[0].should.equal(0);
            done();
        });

        it (`Performs a bitwise AND on the values of Vx and Vy, then stores the result in Vx.`, function(done) {
            var chip8 = new Chip8();
            chip8.Set_LD_Vx_byte(0, 0xF0);
            chip8.Set_LD_Vx_byte(1, 0xA0);

            chip8.Set_AND_Vx_Vy(0, 1);

            chip8.V[0].should.equal(0xA0);
            done();
        });
    });  
      
    describe('Set_XOR_Vx_Vy', function() {
        it (`Performs a bitwise XOR on the values of Vx and Vy, then stores the result in Vx.`, function(done) {
            var chip8 = new Chip8();
            chip8.Set_LD_Vx_byte(0, 0x0F);
            chip8.Set_LD_Vx_byte(1, 0x0F);

            chip8.Set_XOR_Vx_Vy(0, 1);

            chip8.V[0].should.equal(0);
            done();
        });

        it (`Performs a bitwise XOR on the values of Vx and Vy, then stores the result in Vx.`, function(done) {
            var chip8 = new Chip8();
            chip8.Set_LD_Vx_byte(0, 0xF0);
            chip8.Set_LD_Vx_byte(1, 0x0F);

            chip8.Set_XOR_Vx_Vy(0, 1);

            chip8.V[0].should.equal(0xFF);
            done();
        });
    }); 

    describe('Set_ADD_Vx_Vy', function() {
        it (`The values of Vx and Vy are added together. If the result is greater than 0xFF, VF is set to 1, otherwise 0.`, function(done) {
            var chip8 = new Chip8();
            chip8.Set_LD_Vx_byte(0, 0xFF);
            chip8.Set_LD_Vx_byte(1, 0x01);

            chip8.Set_ADD_Vx_Vy(0, 1);

            chip8.V[0].should.equal(0);
            chip8.V[0xF].should.equal(1);
            done();
        });

        it (`The values of Vx and Vy are added together. If the result is greater than 0xFF, VF is set to 1, otherwise 0.`, function(done) {
            var chip8 = new Chip8();
            chip8.Set_LD_Vx_byte(0, 0x0F);
            chip8.Set_LD_Vx_byte(1, 0xF0);

            chip8.Set_ADD_Vx_Vy(0, 1);

            chip8.V[0].should.equal(0xFF);
            chip8.V[0xF].should.equal(0);
            done();
        });        
    }); 

    describe('Set_SUB_Vx_Vy', function() {
        it (`If Vx > Vy, then VF is set to 1, otherwise 0. Then Vy is subtracted from Vx, and the results stored in Vx.`, function(done) {
            var chip8 = new Chip8();
            chip8.Set_LD_Vx_byte(0, 0xFF);
            chip8.Set_LD_Vx_byte(1, 0x01);

            chip8.Set_SUB_Vx_Vy(0, 1);

            chip8.V[0].should.equal(0xFE);
            chip8.V[0xF].should.equal(1);
            done();
        });  

        it (`If Vx > Vy, then VF is set to 1, otherwise 0. Then Vy is subtracted from Vx, and the results stored in Vx.`, function(done) {
            var chip8 = new Chip8();
            chip8.Set_LD_Vx_byte(0, 0x01);
            chip8.Set_LD_Vx_byte(1, 0xFF);

            chip8.Set_SUB_Vx_Vy(0, 1);

            chip8.V[0].should.equal(2);
            chip8.V[0xF].should.equal(0);
            done();
        });          
    }); 

    describe('Set_SHR_Vx', function() {
        it (`Shifts Vx right by one. VF is set to the value of the least significant bit of VX before the shift`, function(done) {
            var chip8 = new Chip8();
            chip8.Set_LD_Vx_byte(0, 0xFF);

            chip8.Set_SHR_Vx(0);

            chip8.V[0].should.equal(0x7F);
            chip8.V[0xF].should.equal(1);
            done();
        });    

        it (`Shifts Vx right by one. VF is set to the value of the least significant bit of VX before the shift.`, function(done) {
            var chip8 = new Chip8();
            chip8.Set_LD_Vx_byte(0, 0xF0);

            chip8.Set_SHR_Vx(0);

            chip8.V[0].should.equal(0x78);
            chip8.V[0xF].should.equal(0);
            done();
        });                
    }); 

    describe('Set_SUBN_Vx_Vy', function() {
        it (`If Vy > Vx, then VF is set to 1, otherwise 0. Then Vx is subtracted from Vy, and the results stored in Vx.`, function(done) {
            var chip8 = new Chip8();
            chip8.Set_LD_Vx_byte(0, 0x01);
            chip8.Set_LD_Vx_byte(1, 0xFF);

            chip8.Set_SUBN_Vx_Vy(0, 1);

            chip8.V[0].should.equal(0xFE);
            chip8.V[0xF].should.equal(1);
            done();
        });       

        it (`If Vy > Vx, then VF is set to 1, otherwise 0. Then Vx is subtracted from Vy, and the results stored in Vx.`, function(done) {
            var chip8 = new Chip8();
            chip8.Set_LD_Vx_byte(0, 0xFF);
            chip8.Set_LD_Vx_byte(1, 0x01);

            chip8.Set_SUBN_Vx_Vy(0, 1);

            chip8.V[0].should.equal(0x02);
            chip8.V[0xF].should.equal(0);
            done();
        });                     
    }); 
    

    describe('Set_SHL_Vx', function() {
        it (`Shifts VX left by one. VF is set to the value of the most significant bit of VX before the shift.`, function(done) {
            var chip8 = new Chip8();
            chip8.Set_LD_Vx_byte(0, 0xF0);

            chip8.Set_SHL_Vx(0, 1);

            chip8.V[0].should.equal(0xE0);
            chip8.V[0xF].should.equal(0x80);
            done();
        });       

        it (`Shifts VX left by one. VF is set to the value of the most significant bit of VX before the shift.`, function(done) {
            var chip8 = new Chip8();
            chip8.Set_LD_Vx_byte(0, 0x0F);

            chip8.Set_SHL_Vx(0, 1);

            chip8.V[0].should.equal(0x1E);
            chip8.V[0xF].should.equal(0);
            done();
        });                             
    }); 

    describe('clearDisplay', function() {
        it (`Clear the display.`, function(done) {
            var chip8 = new Chip8();
            chip8.display[0] = 1;

            chip8.clearDisplay();

            chip8.display[0].should.equal(0);
            done();
        });                                  
    }); 

    describe('jumpAddress', function() {
        it (`The interpreter sets the program counter to nnn.`, function(done) {
            var chip8 = new Chip8();

            chip8.jumpAddress(0xFFF);

            chip8.pc.should.equal(0xFFF);
            done();
        });                                  
    }); 

    describe('callAddress', function() {
        it (`The interpreter increments the stack pointer, then puts the current PC on the top of the stack. The PC is then set to nnn.`, function(done) {
            var chip8 = new Chip8();

            chip8.callAddress(0x300);

            chip8.pc.should.equal(0x300);
            chip8.stack[0].should.equal(0x200);
            chip8.sp.should.equal(1);

            chip8.callAddress(0x400);

            chip8.pc.should.equal(0x400);
            chip8.stack[1].should.equal(0x300);
            chip8.sp.should.equal(2);            
            done();
        });                                  
    }); 

    describe('return', function() {
        it (`The interpreter increments the stack pointer, then puts the current PC on the top of the stack. The PC is then set to nnn.`, function(done) {
            var chip8 = new Chip8();

            chip8.callAddress(0x300);

            chip8.pc.should.equal(0x300);
            chip8.stack[0].should.equal(0x200);
            chip8.sp.should.equal(1);

            chip8.return();
          
            chip8.pc.should.equal(0x200);
            chip8.sp.should.equal(0);

            done();
        });                                  
    }); 

    describe('skipNextInstruction_Vx_Equals_kk', function() {
        it (`The interpreter compares register Vx to kk, and if they are equal, increments the program counter by 2.`, function(done) {
            var chip8 = new Chip8();
            chip8.Set_LD_Vx_byte(0, 0x01);

            chip8.skipNextInstruction_Vx_Equals_kk(0, 0x01);

            chip8.pc.should.equal(0x202);

            done();
        });     

        it (`The interpreter compares register Vx to kk, and if they are equal, increments the program counter by 2.`, function(done) {
            var chip8 = new Chip8();
            chip8.Set_LD_Vx_byte(0, 0x01);

            chip8.skipNextInstruction_Vx_Equals_kk(0, 0x02);

            chip8.pc.should.equal(0x200);

            done();
        });                                         
    }); 

    describe('skipNextInstruction_Vx_NotEquals_kk', function() {
        it (`The interpreter compares register Vx to kk, and if they are not equal, increments the program counter by 2.`, function(done) {
            var chip8 = new Chip8();
            chip8.Set_LD_Vx_byte(0, 0x01);

            chip8.skipNextInstruction_Vx_NotEquals_kk(0, 0x01);

            chip8.pc.should.equal(0x200);

            done();
        });     

        it (`The interpreter compares register Vx to kk, and if they are not equal, increments the program counter by 2.`, function(done) {
            var chip8 = new Chip8();
            chip8.Set_LD_Vx_byte(0, 0x01);

            chip8.skipNextInstruction_Vx_NotEquals_kk(0, 0x02);

            chip8.pc.should.equal(0x202);

            done();
        });                                         
    });     

    describe('skipNextInstruction_Vx_Equals_Vy', function() {
        it (`The interpreter compares register Vx to register Vy, and if they are equal, increments the program counter by 2.`, function(done) {
            var chip8 = new Chip8();
            chip8.Set_LD_Vx_byte(0, 0x01);
            chip8.Set_LD_Vx_byte(1, 0x01);

            chip8.skipNextInstruction_Vx_Equals_Vy(0, 1);

            chip8.pc.should.equal(0x202);

            done();
        });     

        it (`The interpreter compares register Vx to register Vy, and if they are equal, increments the program counter by 2.`, function(done) {
            var chip8 = new Chip8();
            chip8.Set_LD_Vx_byte(0, 0x01);
            chip8.Set_LD_Vx_byte(1, 0x02);

            chip8.skipNextInstruction_Vx_Equals_Vy(0, 1);

            chip8.pc.should.equal(0x200);

            done();
        });                                         
    });     

    describe('skipNextInstruction_Vx_NotEquals_Vy', function() {
        it (`The values of Vx and Vy are compared, and if they are not equal, the program counter is increased by 2.`, function(done) {
            var chip8 = new Chip8();
            chip8.Set_LD_Vx_byte(0, 0x01);
            chip8.Set_LD_Vx_byte(1, 0x01);

            chip8.skipNextInstruction_Vx_NotEquals_Vy(0, 1);

            chip8.pc.should.equal(0x200);

            done();
        });     

        it (`The values of Vx and Vy are compared, and if they are not equal, the program counter is increased by 2.`, function(done) {
            var chip8 = new Chip8();
            chip8.Set_LD_Vx_byte(0, 0x01);
            chip8.Set_LD_Vx_byte(1, 0x02);

            chip8.skipNextInstruction_Vx_NotEquals_Vy(0, 1);

            chip8.pc.should.equal(0x202);

            done();
        });                                         
    });             

    describe('loadRegisterI', function() {
        it (`The value of register I is set to nnn.`, function(done) {
            var chip8 = new Chip8();

            chip8.loadRegisterI(0xFFF);

            chip8.I.should.equal(0xFFF);

            done();
        });                                            
    });    

    describe('jumpAddressV0', function() {
        it (`The program counter is set to nnn plus the value of V0. `, function(done) {
            var chip8 = new Chip8();
            chip8.Set_LD_Vx_byte(0, 0x01);

            chip8.jumpAddressV0(0x300);

            chip8.pc.should.equal(0x301);
            done();
        });                                  
    }); 

    describe('executeOpcode', function() {
        it(`The function executeOpCode(0x00E0) will clear the display`, function() {
            var chip8 = new Chip8();
            chip8.display[0] = 1;
            chip8.executeOpcode(0x00E0);
            chip8.display[0].should.equal(0);
        });  

        it(`The function executeOpCode(0x6F01) puts the value 0x01 into the register V[0xF]`, function() {
            var chip8 = new Chip8();
            chip8.executeOpcode(0x6F01);
            chip8.V[0xF].should.equal(0x01);
        });

        it(`The function executeOpCode(0x7001) executed twice adds the value 0x01 into the register V[0x0] each time`, function() {
            var chip8 = new Chip8();
            chip8.executeOpcode(0x7001);
            chip8.executeOpcode(0x7001);
            chip8.V[0x0].should.equal(0x02);
        });      
    });
});