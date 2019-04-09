import React, { Component } from "react";
import { hot } from "react-hot-loader";
import Passepartout from "common/js/passepartout"
import { getRandomInt } from "common/js/utils";
import colors, { polar_night_4 } from "common/enums/colors";

const RADIUS = 2;

class ShapesExample extends Component {
    state = {
        elements: [],
        width: 0,
        height: 0
    };

    constructor(props){
        super(props);

        this.step = this.step.bind(this);
    }

    componentDidMount() {
        const { width, height } = this.canvasRef;
        this.canvasContext = this.canvasRef.getContext("2d");
        this.passepartout = new Passepartout(this.canvasContext);

        this.stats = this.passepartout.startStats(this.canvasRef, this.canvasContainerRef);

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

        this.state.elements.forEach(element =>
            this.passepartout.drawCircle(element.x, element.y, RADIUS, element.color)
            //this.passepartout.drawSquare(element.x, element.y, RADIUS, element.color)
        );

        this.canvasContext.closePath();
    }

    step() {
        this.stats.begin();

        this.updateValues();
        this.draw();

        this.stats.end();

        window.requestAnimationFrame(this.step);
    }

    render() {
        return (
            <div className="container">
                <h1>Shapes matters!</h1>
                <div className="canvas--container" ref={ref => this.canvasContainerRef = ref }>
                    <canvas className="example--canvas" ref={ref => this.canvasRef = ref } width="800" height="600" />
                </div>
                <div className="statistics">
                    <div className="statistics--item">
                        <b>Elements count:</b> <span>{this.state.elements.length}</span>
                    </div>
                </div>
                <h2>Controls:</h2>
                <div className="controls">
                    <button onClick={() => this.onClickAddElements(1)}>+1</button>
                    <button onClick={() => this.onClickAddElements(10)}>+10</button>
                    <button onClick={() => this.onClickAddElements(100)}>+100</button>
                    <button onClick={() => this.onClickAddElements(1000)}>+1000</button>
                    <button className="button-emoji" onClick={() => this.onClickRemoveElements(-1)}>🗑️</button>
                </div>
            </div>
        );
    }
}

export default hot(module)(ShapesExample);
