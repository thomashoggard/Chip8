import Chip8 from './Chip8';
import Gamepad from './Gamepad';
import Display from './Display';
import Speakers from './Speakers';

var canvas = document.getElementById('myCanvas');

// Initialize Systems
let display = new Display(canvas, 64, 32);
display.showFps(true);

let gamepad = new Gamepad();
let speakers = new Speakers();

let chip8 = new Chip8(gamepad, display, speakers);


// Load ROM & Start
loadRom('INVADERS.c8')

document.getElementById('romList').onchange = (e) => {
  const romName = e.target.value;
  loadRom(romName);
};

function loadRom(romName) {
  var oReq = new XMLHttpRequest();
  oReq.open("GET", `roms/${romName}`, true);
  oReq.responseType = "arraybuffer";

  oReq.onload = function (oEvent) {
    var arrayBuffer = oReq.response;
    if (arrayBuffer) {
      var byteArray = new Uint8Array(arrayBuffer);
      chip8.loadRom(byteArray);
      chip8.start();
    }
  };
  oReq.send(null);
}