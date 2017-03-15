import Chip8 from './Chip8';

let chip8 = new Chip8();


document.getElementById('romList').onchange = (e) => {
  const romName = e.target.value;
  loadRom(romName);
};

function loadRom(romName) {
  var oReq = new XMLHttpRequest();
  oReq.open("GET", `/app/ROMS/${romName}`, true);
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