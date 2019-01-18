import React, { PureComponent } from "react";
import { render } from "react-dom";

class Time extends PureComponent  {
    state = {
        setIntervalCounter: 0,
        requestAnimationFrameCounter: 0,
        t0: performance.now(),
        setIntervalFps: 60,
        requestAnimationFrameFps: 60
    };

    componentDidMount() {
        requestAnimationFrame(this.loop);
        requestAnimationFrame(this.checkFps);

        setInterval(() => {
            this.setState((prevState)  => {
                const counter = prevState.setIntervalCounter + 1;

                return {
                    setIntervalCounter: counter
                };
            });
        }, 16);
    }

    loop = () => {
        this.setState((prevState)  => {
            const counter = prevState.setIntervalCounter + 1;

            return {
                requestAnimationFrameCounter: counter
            };
        });

        requestAnimationFrame(this.loop);

    }

    checkFps = () => {
        const t1 = performance.now();

        if (t1 - this.state.t0 >= 1000) {
            console.log("here");
            this.setState((prevState) => ({
                setIntervalCounter: 0,
                requestAnimationFrameCounter: 0,
                t0: t1,
                setIntervalFps: prevState.setIntervalCounter,
                requestAnimationFrameFps: prevState.requestAnimationFrameCounter
            }));
        }

        requestAnimationFrame(this.checkFps);
    }

    render() {
        return (
            <div>
                <h1>setInterval: {this.state.setIntervalFps}</h1>
                <h1>requestAnimationFrame: {this.state.requestAnimationFrameFps}</h1>
            </div>
        );
    }
}

render(
    <Time />,
    document.getElementById("app")
);
