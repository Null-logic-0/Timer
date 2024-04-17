export default class Timer {
    constructor(root) {
        root.innerHTML = Timer.getHTML();

        this.el = {
            minutes: root.querySelector(".timer__part--min"),
            seconds: root.querySelector(".timer__part--sec"),
            control: root.querySelector(".timer__btn--ctrl"),
            reset: root.querySelector(".timer__btn--reset"),
        };

        this.interval = null;
        this.remSec = 0;

        this.audio = new Audio('../ring/bels-37.mp3'); 

        this.el.control.addEventListener("click", () => {
            if (this.interval === null) {
                this.start();
            } else {
                this.stop();
            }
        });

        this.el.reset.addEventListener("click", () => {
            const inputTimer = parseInt(prompt("Set a timer in minutes:"), 10);

            if (!isNaN(inputTimer) && inputTimer > 0) {
                this.stop();
                this.remSec = inputTimer * 60; 
                this.updateInterfaceTime();
            }
        });
    }

    updateInterfaceTime() {
        const minutes = Math.floor(this.remSec / 60);
        const seconds = this.remSec % 60;

        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }

    updateInterfaceControls() {
        if (this.interval === null) {
            this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
            this.el.control.classList.remove("timer__btn--stop");
            this.el.control.classList.add("timer__btn--start");
        } else {
            this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
            this.el.control.classList.remove("timer__btn--start");
            this.el.control.classList.add("timer__btn--stop");
        }
    }

    start() {
        if (this.remSec === 0) return;

        this.interval = setInterval(() => {
            this.remSec--;
            this.updateInterfaceTime();

            if (this.remSec === 0) {
                this.stop();
                this.audio.play();
            }
        }, 1000);

        this.updateInterfaceControls();
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
        this.updateInterfaceControls();
    }

    static getHTML() {
        return `
            <span class="timer__part timer__part--min">00</span>
            <span class="timer__part">:</span>
            <span class="timer__part timer__part--sec">00</span>
            <button class="timer__btn timer__btn--ctrl timer__btn--start" type="button">
                <span class="material-icons">play_arrow</span>
            </button>
            <button class="timer__btn timer__btn--reset" type="button">
                <span class="material-icons">timer</span>
            </button>
        `;
    }
}
