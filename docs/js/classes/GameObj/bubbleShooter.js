export class bubbleShooter {
    constructor() {
        console.log('Created bubble shooter');
        document.addEventListener('mousemove', (e) => this.mouseMoveHandler(e));
        document.addEventListener('mousedown', (e) => this.mouseDown(e));
        document.addEventListener('mouseup', (e) => this.mouseUp(e));
        this.body = document.body;
        this.mouse = document.createElement('div');
        this.mouse.style.height = '20px';
        this.mouse.style.width = '500px';
        this.mouse.style.position = 'relative';
        this.mouse.innerHTML = '< here is your mouse';
        document.body.appendChild(this.mouse);
        this.line = document.createElement('div');
        this.body.appendChild(this.line);
    }
    mouseMoveHandler(e) {
        e.preventDefault();
        if (e.clientX < this.body.clientWidth && e.clientX > 0 && e.clientY > this.body.clientHeight && e.clientY > 0) {
            this.mouse.style.transform = `translate(${e.clientX + 5}px,${e.clientY - 10}px)`;
        }
    }
    mouseDown(e) {
        this.mouse.innerHTML = 'NOOOO DONT CLICK IT IS GOING TO EXPLOODE';
        this.body.style.color = 'white';
        this.body.style.backgroundColor = 'red';
    }
    mouseUp(e) {
        this.mouse.innerHTML = '< here is your mouse';
        this.body.style.color = 'gray';
        this.body.style.backgroundColor = 'white';
    }
}
//# sourceMappingURL=bubbleShooter.js.map