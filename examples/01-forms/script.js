import { html, render, Component } from "/htm/preact/standalone.mjs";
import Passepartout from "/common/js/passepartout.js";
import { getRandomInt } from "/common/js/utils.js";
import fpsWatcher from "/common/js/watcher.js";
import colors, { polar_night_4 } from "/common/enums/colors.js"

const RADIUS = 2;

class Example extends Component {
    constructor(props){
        super(props);

        this.state = {
            elements: [],
            width: 0,
            height: 0,
            fps: 60,
            isRenderingMethodCircle: true
        };

        this.step = this.step.bind(this);
        this.onFPSChange = this.onFPSChange.bind(this);

        this.watcher = new fpsWatcher(this.onFPSChange);
    }

    componentDidMount() {
        const { width, height } = this.canvasRef;
        this.canvasContext = this.canvasRef.getContext("2d", { alpha: false });
        this.passepartout = new Passepartout(this.canvasContext);

        this.setState({ width, height }, () => this.step());
    }

    onClickAddElements(numberOfElementsToAdd) {
        let i = 0;
        const newElements = [];

        while(i < numberOfElementsToAdd) {
            const color = colors[getRandomInt(0, 5)];

            newElements.push({
                x: getRandomInt(RADIUS, this.state.width - RADIUS),
                y: getRandomInt(RADIUS, this.state.height - RADIUS),
                vx: getRandomInt(1, 10),
                vy: getRandomInt(1, 10),
                color: color
            });

            ++i;
        }

        this.setState(prevState => ({
            elements: [ ...prevState.elements, ...newElements ]
        }));
    }

    onClickRemoveElements() {
        this.setState({ elements: [] });
    }

    onChangeRenderMethod() {
        this.setState(prevState => ({
            isRenderingMethodCircle: !prevState.isRenderingMethodCircle
        }));
    }

    onFPSChange(fps) {
        this.setState({ fps });
    }

    updateValues() {
        const updatedElements = this.state.elements.map(elem => {
            if (elem.y >= this.state.height - RADIUS || elem.y <= 0) {
                elem.vy = -elem.vy;
            }

            if (elem.x >= this.state.width - RADIUS || elem.x <= 0)  {
                elem.vx = -elem.vx
            }

            elem.x += elem.vx;
            elem.y += elem.vy;

            return {
                ...elem
            }
        });

        this.setState({ elements: updatedElements });
    }

    draw() {
        this.passepartout.clearCanvas(this.state.width, this.state.height, polar_night_4);

        this.canvasContext.beginPath();

        if (this.state.isRenderingMethodCircle) {
            this.state.elements.forEach(elem => this.passepartout.drawCircle(elem.x, elem.y, RADIUS, elem.color));
        } else {
            this.state.elements.forEach(elem => this.passepartout.drawSquare(elem.x, elem.y, RADIUS, elem.color));
        }

        this.canvasContext.closePath();
    }

    step() {
        this.watcher.begin();

        this.updateValues();
        this.draw();

        this.watcher.end();

        window.requestAnimationFrame(this.step);
    }

    renderChangeButtonText(isRenderingMethodCircle) {
        return isRenderingMethodCircle ? "⚪" : "⬜";
    }

    render() {
        return html`
            <div class="container">
                <h1>Shapes matters!</h1>
                <canvas ref="${ref => this.canvasRef = ref }" width="800" height="600" />
                <div class="statistics">
                    <div class="statistics--item">
                        <b>FPS:</b> <span>${this.state.fps}</span>
                    </div>
                    <div class="statistics--item">
                        <b>Elements count:</b> <span>${this.state.elements.length}</span>
                    </div>
                </div>
                <h2>Controls:</h2>
                <div class="controls">
                    <button onClick="${() => this.onClickAddElements(1)}">+1</button>
                    <button onClick="${() => this.onClickAddElements(10)}">+10</button>
                    <button onClick="${() => this.onClickAddElements(100)}">+100</button>
                    <button onClick="${() => this.onClickAddElements(1000)}">+1000</button>
                    <button class="button-emoji" onClick="${() => this.onChangeRenderMethod()}">${
                        this.renderChangeButtonText(this.state.isRenderingMethodCircle)
                    }</button>
                    <button class="button-emoji" onClick="${() => this.onClickRemoveElements(-1)}">🗑️</button>
                </div>
            </div>
        `;
    }
}

render(html
    `<${Example} />`,
    document.getElementById("app")
);
