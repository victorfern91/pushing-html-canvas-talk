import React, { Component } from "react";
import { render } from "react-dom";
import Passepartout from "common/js/passepartout"
import { getRandomInt, getRandomColor } from "common/js/utils";
import colors from "common/enums/colors";
import faker from "faker";
import uuidv4 from "uuid/v4"

const RADIUS = 1;
const hashTable = new Map();

class HitboxExample extends Component {
    state = {
        elements: [],
        width: 0,
        height: 0,
        detectionTime: 0,
        maxDetectionTime: 0,
        personName: "N.A."
    };

    componentDidMount() {
        const { width, height } = this.canvasRef;
        this.canvasContext = this.canvasRef.getContext("2d");
        this.passepartout = new Passepartout(this.canvasContext);

        this.setState({ width, height });

        this.updateValues();
    }

    onMouseMove = (evt) => {
        const x = evt.clientX - evt.currentTarget.offsetLeft;
        const y = evt.clientY - evt.currentTarget.offsetTop;

        const t0 = window.performance.now();

        const pixel = this.canvasContext.getImageData(x, y, 1, 1).data;
        const color = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;


        const person = hashTable.get(color);

        const detectionTime = Math.ceil(performance.now() - t0);

        if (typeof person === "object") {
            this.setState((prevState) => ({
                detectionTime,
                personName: person.name,
                maxDetectionTime: Math.max(detectionTime, prevState.maxDetectionTime)
            }));
        }
    };

    updateValues() {
        const elements = [];

        for (let i = 0; i < 480000; ++i) {
            const column = (i%800);
            const line = Math.floor(i/800);

            let colorKey;
            const element = {
                id: uuidv4(),
                x: column * RADIUS,
                y: line * RADIUS,
                name: faker.name.findName()
            }

            while(true) {
                colorKey = getRandomColor();

                if(!hashTable.has(colorKey)) {
                    element.color = colorKey;
                    hashTable.set(colorKey, element);
                    break;
                }
            }

            elements.push(element);
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
                <canvas onMouseMove={this.onMouseMove} className="example--canvas" ref={ref => this.canvasRef = ref } width="800" height="600" />
                <div className="statistics">
                    <div className="statistics--item">
                        <b>Elements count:</b> <span>{this.state.elements.length}</span>
                    </div>
                    <div className="statistics--item">
                        <code>Detecting box time:</code> <span>{this.state.detectionTime}</span>
                    </div>
                    <div className="statistics--item">
                        <code>[Max] Detecting box time:</code> <span>{this.state.maxDetectionTime}</span>
                    </div>
                    <div className="statistics--item">
                        <code>{this.state.personName}</code>
                    </div>
                </div>
            </div>
        );
    }
}

render(
    <HitboxExample />,
    document.getElementById("app")
);
