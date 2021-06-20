import { bubbleShooter } from "../BubbleShooter/bubbleShooter.js";
export class menuWorldWater {
    constructor(data) {
        console.log('created menuWorldWater');
        this.data = data;
        document.body.innerHTML = "";
        document.body.style.backgroundImage = "url(img/sea.png)";
        this.createGrid();
        for (const island of data) {
            console.log(island);
            this.createItem(island.id);
        }
        document.body.addEventListener('click', (e) => this.clickHandler(e));
    }
    createGrid() {
        this.grid = document.createElement('grid');
        this.grid.classList.add('grid-container-island');
        this.grid.classList.add('menu-worlds');
        document.body.appendChild(this.grid);
    }
    createItem(id) {
        let item = document.createElement('island');
        item.classList.add('grid-item');
        item.style.backgroundImage = `url(img/eiland-${id}.png)`;
        if (id != 3) {
            item.classList.add('locked');
            item.setAttribute('id', `locked`);
        }
        else {
            item.setAttribute('id', `${id}`);
        }
        this.grid.appendChild(item);
    }
    clickHandler(e) {
        if (e.target.nodeName == 'ISLAND' && e.target.id != 'locked') {
            document.body.removeEventListener('click', (e) => this.clickHandler(e));
            this.bubbleShooter = new bubbleShooter(this.data[e.target.id - 1].letters, 'Goed gedaan!');
            this.bubbleShooter.gameLoop();
        }
    }
}
//# sourceMappingURL=menuWorldWater.js.map