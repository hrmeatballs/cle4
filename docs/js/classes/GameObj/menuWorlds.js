export class menuWorlds {
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
        document.body.style.backgroundImage = "url('img/stars.png')";
        this.createGrid();
        this.createItem();
        for (let i = 0; i < 3; i++) {
            this.createWorld(this.worlds[i].name, this.worlds[i].locked);
        }
        this.createItem();
    }
    gridRemover() {
        this.grid.remove();
    }
    createGrid() {
        this.grid = document.createElement('grid');
        this.grid.classList.add('grid-container');
        document.body.appendChild(this.grid);
    }
    createItem() {
        for (let i = 0; i < 3; i++) {
            let item = document.createElement('div');
            item.classList.add('grid-item', 'empty');
            this.grid.appendChild(item);
        }
    }
    createWorld(world_name, locked) {
        let item = document.createElement('div');
        item.style.backgroundImage = `url(img/world_${world_name}.png)`;
        item.classList.add('grid-item');
        let lock = document.createElement('img');
        lock.classList.add('locked-img');
        lock.src = './img/lock.png';
        lock.alt = 'lock';
        if (!locked) {
            lock.classList.add('invisible');
            lock.setAttribute('id', `${world_name}`);
            item.setAttribute('id', `${world_name}`);
        }
        else {
            item.classList.add('locked');
            lock.setAttribute('id', 'locked');
            item.setAttribute('id', 'locked');
        }
        item.appendChild(lock);
        this.grid.appendChild(item);
        console.log(`Created ${world_name} world`);
    }
}
//# sourceMappingURL=menuWorlds.js.map