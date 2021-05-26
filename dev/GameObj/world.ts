export class World {

    worlds : Array<{name: string, locked: boolean}> = [
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
    ]

    div : HTMLElement

    constructor() {
        this.createGrid();
        for (let i = 0; i < 3; i++) {
            this.createWorld(this.worlds[i].name, this.worlds[i].locked)
        }
    }

    createGrid() {
        this.div = document.createElement('div');
        this.div.classList.add('grid-container');
        document.body.appendChild(this.div);
    }

    createWorld(world_name : string, locked : boolean) {
        let item = document.createElement('div');
        let img = document.createElement('img');
        item.classList.add('grid-item');
        img.src = `./img/world_${world_name}.png`;
        img.alt = 'world';
        
        let lock = document.createElement('img');
        
        if(locked) {
            img.classList.add('locked');

            lock.src = './img/lock.png';
            lock.alt = 'lock';
            lock.classList.add('locked-img');
        } else {
            lock.src = '';
        }
        item.appendChild(lock);
        item.appendChild(img);
        this.div.appendChild(item);
        
        console.log('world created');
    }

}