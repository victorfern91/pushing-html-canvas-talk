class FpsWatcher {
    constructor(onChangeCallback) {
        this.lastFPSValue = 60;
        this.startInterval = window.performance.now();
        this.frameCount = 0;
        this.onChangeCallback = onChangeCallback;
    }

    begin() {
        this.frameCount++;
    }

    end() {
        this.t1 = window.performance.now();

        const delta = this.t1 - this.startInterval;

        if (delta >= 1000) {
            if (this.frameCount !== this.lastFPSValue) {
                this.onChangeCallback(this.frameCount);
                this.lastFPSValue = this.frameCount;
            }

            this.frameCount = 0;
            this.startInterval = window.performance.now();
        }
    }
}

export default FpsWatcher;
