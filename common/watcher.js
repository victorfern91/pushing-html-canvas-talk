class FpsWatcher {
    constructor() {
        this.startInterval = window.performance.now();
        this.frameCount = 0;
    }

    start() {
        this.frameCount++;
    }

    end() {

        this.t1 = window.performance.now();

        const delta = this.t1 - this.startInterval;

        if (delta >= 1000) {
            console.log(this.frameCount);

            this.frameCount = 0;
            this.startInterval = window.performance.now();
        }
    }
}

export default new FpsWatcher();
