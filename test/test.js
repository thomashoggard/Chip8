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
        it (`The values of Vx and Vy are added together. If the result is greater than 255, VF is set to 1, otherwise 0.`, function(done) {
            var chip8 = new Chip8();
            chip8.Set_LD_Vx_byte(0, 0xFF);
            chip8.Set_LD_Vx_byte(1, 0x01);

            chip8.Set_ADD_Vx_Vy(0, 1);

            chip8.V[0].should.equal(0);
            chip8.V[0xF].should.equal(1);
            done();
        });

        it (`The values of Vx and Vy are added together. If the result is greater than 255, VF is set to 1, otherwise 0.`, function(done) {
            var chip8 = new Chip8();
            chip8.Set_LD_Vx_byte(0, 0x0F);
            chip8.Set_LD_Vx_byte(1, 0xF0);

            chip8.Set_ADD_Vx_Vy(0, 1);

            chip8.V[0].should.equal(0xFF);
            chip8.V[0xF].should.equal(0);
            done();
        });        
    }); 

    describe('executeOpcode', function() {
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