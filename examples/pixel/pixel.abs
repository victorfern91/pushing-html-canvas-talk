import { html, render, Component } from "/libs/htm/preact/standalone.mjs";
import Passepartout from "/common/js/passepartout.js";
import { polar_night_4 } from "/common/enums/colors.js"

class Example extends Component {
    componentDidMount() {
        const { width, height } = this.canvasRef;
        this.canvasContext = this.canvasRef.getContext("2d", { alpha: false });
        this.passepartout = new Passepartout(this.canvasContext);

        this.draw();
    }

    draw() {
        this.passepartout.clearCanvas(this.canvasRef.width, this.canvasRef.height, polar_night_4);

        this.canvasContext.beginPath();

        this.passepartout.drawImage("./unicorn.png", 300, 100.5);

        this.canvasContext.closePath();
    }

    render() {
        return html`
            <div class="container">
                <h1>Shapes matters!</h1>
                <div classs="canvas--container" ref="${ref => this.canvasContainerRef = ref }">
                    <canvas class="example--canvas" ref="${ref => this.canvasRef = ref }" width="800" height="600" />
                </div>
            </div>
        `;
    }
}

render(html
    `<${Example} />`,
    document.getElementById("app")
);
