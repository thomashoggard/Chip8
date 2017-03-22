class Display {
    constructor(canvas, width, height) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.height = height;
        this.width = width;

        this.showFpsCounter = false;
    }

    showFps(flag) {
        this.showFpsCounter = flag;

        if (flag) {
            this.fps = 0;
            this.frameCounter = 0;
            this.fpsInterval = setInterval(() => {
                this.fps = this.frameCounter;
                this.frameCounter = 0;
            }, 1000);  
        } else {
            clearInterval(this.fpsInterval);
        }
    }

    draw(graphics) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let displayPointer = 0;
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (graphics[displayPointer]) {
                    this.context.fillStyle="#FFFFFF";
                    this.context.fillRect(x * 10, y * 10, 10, 10);    
                } else {
                    this.context.fillStyle="#000000";
                    this.context.fillRect(x * 10, y * 10, 10, 10);    
                }
                displayPointer++;
            }
        }

        if (this.showFpsCounter) {
            this.frameCounter++;
            this.context.fillStyle="#FFFFFF";
            this.context.font = "15px Arial";
            this.context.fillText(`FPS: ${this.fps}`,0,20);  
        }
    }
}

export default Display;