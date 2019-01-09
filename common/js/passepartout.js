const stats = new Stats();
stats.showPanel(0);

export default class Passepartout {
    constructor(context) {
        this.context = context;
    }

    clearCanvas(width, height, color) {
        if (typeof color !== "string") {
            this.context.clearRect(0,0, width, height);
        } else {
            this.context.fillStyle = color;
            this.context.fillRect(0,0, width, height);
        }
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

    drawImage(src, x, y) {
        const image = new Image();
        image.onload = () => {
            this.context.drawImage(image, x, y);
        }
        image.src = src;
    }

    startStats(canvas, appendToElement) {
        stats.dom.style.top = `${canvas.offsetTop + 1}px`;
        stats.dom.style.left = `${canvas.offsetLeft + 1}px`;

        appendToElement.appendChild(stats.dom);

        return stats;
    }
};
