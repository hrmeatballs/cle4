export class scoreMenu {
    constructor() {
        this.status = 'started';
        this.timeLeft = 0;
        this.seconds = 0;
        this.minutes = 0;
        this.init();
    }
    init() {
        this.hit = 0;
        this.missed = 0;
        this.createdTargets = 0;
        this.status = 'starting';
        this.HTML = document.createElement('score');
        let score = document.createElement('div');
        score.id = 'hit';
        this.time = document.createElement('div');
        this.time.id = 'time';
        this.HTML.appendChild(score);
        this.HTML.appendChild(this.time);
        score.innerHTML = `${this.hit}`;
        document.body.appendChild(this.HTML);
    }
    getElement() {
        return this.HTML;
    }
    updateScore() {
        this.hit++;
        let element = document.getElementById('hit');
        element.innerHTML = `${this.hit}`;
        if (this.hit == 4) {
            this.status = 'finished';
        }
    }
    updateTime() {
        let element = document.getElementById('time');
        this.timeLeft = this.timeLeft + 1;
        this.miliSeconds++;
        if (this.seconds >= 60) {
            this.seconds = 0;
            this.minutes = this.minutes + 1;
            this.seconds = this.seconds + 1;
            element.innerText = `Tijd: 0${this.minutes}:${this.seconds}`;
        }
        if (this.timeLeft >= 60) {
            this.timeLeft = 0;
            this.seconds = this.seconds + 1;
        }
        if (this.seconds >= 10) {
            element.innerText = `Tijd: 0${this.minutes}:${this.seconds}`;
        }
        else {
            element.innerText = `Tijd: 0${this.minutes}:0${this.seconds}`;
        }
        this.endTime = `0${this.minutes}:0${this.seconds}`;
    }
    updateTargets() {
        this.createdTargets++;
    }
    stopTime() {
        let element = document.getElementById('time');
        element.innerText = `Tijd: 0${this.minutes}:0${this.seconds}`;
    }
    getResults() {
        return this.endTime;
    }
}
//# sourceMappingURL=scoreMenu.js.map