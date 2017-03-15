import Chip8 from './Chip8';

let chip8 = new Chip8();

var oReq = new XMLHttpRequest();
oReq.open("GET", "/app/ROMS/INVADERS.c8", true);
oReq.responseType = "arraybuffer";

oReq.onload = function (oEvent) {
  var arrayBuffer = oReq.response; // Note: not oReq.responseText
  if (arrayBuffer) {
    var byteArray = new Uint8Array(arrayBuffer);
    chip8.loadRom(byteArray);
    chip8.start();
  }
};
oReq.send(null);