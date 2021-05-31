export class menuWorlds {

    private worlds : Array<{name: string, locked: boolean}> = [
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

    private div : HTMLElement

    constructor() {
        document.body.style.backgroundImage = "url('img/stars.png')"

        this.createGrid();

        this.createItem()

        for (let i = 0; i < 3; i++) {
                this.createWorld(this.worlds[i].name, this.worlds[i].locked)
        }

    }

    private createGrid() {
        this.div = document.createElement('div')
        this.div.classList.add('grid-container')
        document.body.appendChild(this.div)
    }

    private createItem() {
        for (let i = 0; i < 3; i++) {
            let item = document.createElement('div')
            item.classList.add('grid-item','empty')
            this.div.appendChild(item)
        }
    }
    
    private createWorld(world_name : string, locked : boolean) {
        let item = document.createElement('div')
        let img = document.createElement('img')
        item.classList.add('grid-item')
        img.src = `./img/world_${world_name}.png`
        img.alt = `${world_name}`
        
        let lock = document.createElement('img')
        
        lock.classList.add('locked-img')
        lock.src = './img/lock.png'
        lock.alt = 'lock'

        if(!locked) {
            lock.classList.add('invisible')
        } else {
            img.classList.add('locked')
        }

        item.appendChild(lock)
        item.appendChild(img)
        this.div.appendChild(item)
        
        console.log(`Created ${world_name} world`)
    }

}