export class menuWorldWater {
    constructor() {
        this.levelOne = ['a', 'b', 'c'];
        console.log('created menuWorldWater');
        document.body.style.backgroundImage = "url(img/sea.png)";
        this.createGrid();
        for (let i = 0; i < 9; i++) {
            this.item = document.createElement('div');
            this.item.classList.add('grid-item');
            if (i == 4) {
                this.item.classList.add('island');
            }
            this.grid.appendChild(this.item);
        }
    }
    createGrid() {
        this.grid = document.createElement('div');
        this.grid.classList.add('grid-container');
        document.body.appendChild(this.grid);
    }
}
//# sourceMappingURL=menuWorldWater.js.map