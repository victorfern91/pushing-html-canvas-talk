import React, { PureComponent, Fragment } from "react";
import { render } from "react-dom";

class Time extends PureComponent  {
    state = {
        setIntervalCounter: 0,
        requestAnimationFrameCounter: 0,
        setIntervalCounterTime: "loading...",
        requestAnimationFrameCounterTime: "loading...",
        t0: performance.now(),
    };

    componentDidMount() {
        this.timer = setInterval(() => {
            this.delay();
            this.setState((prevState)  => {
                const counter = prevState.setIntervalCounter + 1;

                if (counter >= 300)  {
                    clearInterval(this.timer);

                    return {
                        setIntervalCounter: counter,
                        setIntervalCounterTime: Math.ceil(performance.now() - prevState.t0)
                    };
                }

                return {
                    setIntervalCounter: counter
                };
            });
        }, 16.67);

        requestAnimationFrame(this.loop);
    }

    loop = () => {
        this.delay();
        this.loopRequest = requestAnimationFrame(this.loop);

        this.setState((prevState) => {
            const counter = prevState.requestAnimationFrameCounter + 1;

            if (counter >= 300)  {
                cancelAnimationFrame(this.loopRequest);

                return {
                    requestAnimationFrameCounter: counter,
                    requestAnimationFrameCounterTime: Math.ceil(performance.now() - prevState.t0)
                };
            }

            return {
                requestAnimationFrameCounter: counter
            };
        });
    }

    delay() {
        const initialTime = performance.now();
        while(performance.now() - initialTime < 8) {
            //delay
        }
    }

    render() {
        return (
            <div className="time-container">
                <div className="progress-bar">
                    <div className="bar" style={{ width: `${this.state.setIntervalCounter}px` }} />
                </div>
                <h3>Time to complete setInterval: {this.state.setIntervalCounterTime} ms</h3>
                <div className="progress-bar">
                    <div className="bar" style={{ width: `${this.state.requestAnimationFrameCounter}px` }} />
                </div>
                <h3>Time to complete requestAnimationFrame: {this.state.requestAnimationFrameCounterTime} ms</h3>
            </div>
        );
    }
}

render(
    <Time />,
    document.getElementById("app")
);
