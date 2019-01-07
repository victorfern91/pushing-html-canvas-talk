export default class PassePartout {
    constructor(context) {
        this.context = context;
    }

    drawSquare(x, y, height = 10, color) {
        this.context.fillStyle = color;
        this.context.fillRect(x, y, height, height);
    }

    drawCircle(x, y, radius = 10, color) {
        this.context.beginPath();
        this.context.fillStyle = color;
        this.context.arc(x, y, radius / 2, 0, 2 * Math.PI, false);
        this.context.fill();
        this.context.closePath();
    }
};
