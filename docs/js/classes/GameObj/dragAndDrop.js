export class dragAndDrop {
    constructor() {
        this.div = document.createElement('div');
        this.div.innerText = 'click to move';
        this.div.style.height = '200px';
        this.div.style.width = '200px';
        this.div.style.backgroundColor = 'red';
        document.body.appendChild(this.div);
        this.moveBind = (e) => this.updatePosition(e);
        this.div.addEventListener("mousedown", (e) => this.initDrag(e));
        this.div.addEventListener("mouseup", (e) => this.stopDrag(e));
    }
    initDrag(e) {
        e.preventDefault();
        console.log(e);
        document.body.appendChild(this.div);
        this.offSetX = e.clientX - this.x;
        this.offSetY = e.clientY - this.y;
        window.addEventListener("mousemove", this.moveBind);
    }
    updatePosition(e) {
        e.preventDefault();
        this.x = e.clientX - this.offSetX;
        this.y = e.clientY - this.offSetY;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }
    stopDrag(e) {
        window.removeEventListener("mousemove", this.moveBind);
        e.preventDefault();
    }
}
//# sourceMappingURL=dragAndDrop.js.map