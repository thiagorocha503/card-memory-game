
class Timer {
    private interval: number;
    private time: number;
    private display: HTMLSpanElement;
    private beforeTime: number;

    constructor(display: HTMLSpanElement) {
        this.interval = NaN;
        this.time = 0;
        this.beforeTime = 0;
        this.display = display;
    }

    setTime(time: number) {
        this.time = time;
    }

    getTime(): number {
        return this.time;
    }

    start() {
        if (isNaN(this.interval)) {
            this.beforeTime = Date.now();
            let self: Timer = this;
            this.interval = setInterval(() => {
                let now = Date.now();
                let difference = now - self.beforeTime;
                let new_time = self.getTime() + difference;
                self.setTime(new_time);
                self.beforeTime = now;
                self.clock();

            }, 1000);
        }
    }

    clock() {
        this.display.innerHTML = timeFormat(this.time);
    }

    pause() {
        clearInterval(this.interval);
        this.interval = NaN;
    }

    reset() {
        clearInterval(this.interval);
        this.interval = NaN;
        this.time = 0;
        this.display.innerHTML = "00:00";
    }
}