import React, { Component } from "react";
import { render } from "react-dom";
import Passepartout from "common/js/passepartout.js";

class Example extends Component {
    componentDidMount() {
        const { width, height } = this.canvasRef;
        this.canvasContext = this.canvasRef.getContext("2d");
        this.passepartout = new Passepartout(this.canvasContext);

        this.draw();
    }

    draw() {
        this.passepartout.clearCanvas(this.canvasRef.width, this.canvasRef.height);


        const t0 = performance.now();
        this.canvasContext.beginPath();
        this.passepartout.drawImage("pixel/bunny.png", 300, 50);
        this.canvasContext.closePath();

        console.log(performance.now() - t0);

        const t1 = performance.now();
        this.canvasContext.beginPath();
        this.passepartout.drawImage("pixel/bunny.png", 300.5, 100.5);
        this.canvasContext.closePath();

        console.log(performance.now() - t1);

    }

    render() {
        return (
            <div class="container">
                <h1>Shapes matters!</h1>
                <div classs="canvas--container">
                    <canvas
                        class="example--canvas"
                        ref={(ref) => this.canvasRef = ref }
                        style={{
                            transform: `translate(0, 800px) scale(4)` 
                        }}
                        width="800"
                        height="600"
                    />
                </div>
            </div>
        );
    }
}

render(
    <Example />,
    document.getElementById("app")
);
