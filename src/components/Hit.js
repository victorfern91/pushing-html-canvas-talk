import React, { Component } from "react";
import { hot } from "react-hot-loader";
import Passepartout from "common/js/passepartout"
import { getRandomInt } from "common/js/utils";
import colors from "common/enums/colors";
import faker from "faker";
import uuidv4 from "uuid/v4"

const RADIUS = 4;

class HitboxExample extends Component {
    state = {
        elements: [],
        width: 0,
        height: 0,
        drawTime: 0,
    };

    componentDidMount() {
        const { width, height } = this.canvasRef;
        this.canvasContext = this.canvasRef.getContext("2d");
        this.passepartout = new Passepartout(this.canvasContext);

        this.setState({ width, height });

        this.updateValues();
    }

    updateValues() {
        const elements = [];

        for (let i = 0; i < 120000; ++i) {
            const column = (i%200);
            const line = Math.floor(i/200);

            elements.push({
                id: uuidv4(),
                x: column * RADIUS,
                y: line * RADIUS,
                color: colors[getRandomInt(0, 5)],
                name: faker.name.findName()
        });
        }

        this.setState({ elements }, this.draw);
    }

    draw() {
        this.passepartout.clearCanvas(this.state.width, this.state.height);

        this.state.elements.forEach(element =>
            this.passepartout.drawSquare(element.x, element.y, RADIUS, element.color)
        );
    }

    render() {
        return (
            <div className="container">
                <h1>Catch me, if you can!</h1>
                <div className="canvas--container" ref={ref => this.canvasContainerRef = ref }>
                    <canvas className="example--canvas" ref={ref => this.canvasRef = ref } width="800" height="600" />
                </div>
                <div className="statistics">
                    <div className="statistics--item">
                        <b>Elements count:</b> <span>{this.state.elements.length}</span>
                    </div>
                </div>
                <div className="statistics">
                    <div className="statistics--item">
                        <code>drawTime:</code> <span>{Math.ceil(this.state.drawTime)}</span>
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

export default hot(module)(HitboxExample);
