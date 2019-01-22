import React, { Component } from "react";
import { hot } from "react-hot-loader";
import Passepartout from "common/js/passepartout"
import { getRandomInt } from "common/js/utils";
import colors from "common/enums/colors";
import faker from "faker";
import uuidv4 from "uuid/v4"

const RADIUS = 1;

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
        const person = this.findPersonAtPosition(x,y);

        if (typeof person === "object") {
            this.setState({ personName: person.name });
        }
    };

    findPersonAtPosition(x, y) {
        const t0 = window.performance.now();

        for (let i = 0, length = this.state.elements.length; i < length; ++i) {
            if (Math.sqrt((x - this.state.elements[i].x) ** 2 + (y - this.state.elements[i].y) ** 2) < RADIUS) {
                const t1 = window.performance.now();
                const detectionTime = Math.ceil(t1 - t0);

                this.setState((prevState) => ({
                    detectionTime,
                    maxDetectionTime: Math.max(detectionTime, prevState.maxDetectionTime)
                }));

                return this.state.elements[i];
            }
        }

        // Uncomment this in order to show how it's possible response time by using for-loops
        /*this.state.elements.forEach(element => {
            if (Math.sqrt((x - element.x) ** 2 + (y - element.y) ** 2) < RADIUS) {
                const t1 = window.performance.now();
                const detectionTime = Math.ceil(t1 - t0);

                this.setState((prevState) => ({
                    detectionTime,
                    maxDetectionTime: Math.max(detectionTime, prevState.maxDetectionTime)
                }));

                return element;
            }
        });*/
    }

    updateValues() {
        const elements = [];

        for (let i = 0; i < 480000; ++i) {
            const column = (i%800);
            const line = Math.floor(i/800);

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

export default hot(module)(HitboxExample);
