export class World {
    constructor() {
        this.worlds = [
            {
                name: "water",
                locked: false
            },
            {
                name: "ice",
                locked: true
            },
            {
                name: "desert",
                locked: true
            }
        ];
        this.createGrid();
        for (let i = 0; i < 3; i++) {
            this.createWorld(this.worlds[i].name, this.worlds[i].locked);
        }
    }
    createGrid() {
        this.div = document.createElement('div');
        this.div.classList.add('grid-container');
        document.body.appendChild(this.div);
    }
    createWorld(world_name, locked) {
        let item = document.createElement('div');
        let img = document.createElement('img');
        item.classList.add('grid-item');
        img.src = `./img/world_${world_name}.png`;
        img.alt = 'world';
        let lock = document.createElement('img');
        if (locked) {
            img.classList.add('locked');
            lock.src = './img/lock.png';
            lock.alt = 'lock';
            lock.classList.add('locked-img');
        }
        else {
            lock.src = '';
        }
        item.appendChild(lock);
        item.appendChild(img);
        this.div.appendChild(item);
        console.log('world created');
    }
}
//# sourceMappingURL=world.js.map