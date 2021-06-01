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

    private grid : HTMLElement

    public gridRemover() {
        this.grid.remove()
    }

    constructor() {
        document.body.style.backgroundImage = "url('img/stars.png')"

        this.createGrid();

        this.createItem()

        for (let i = 0; i < 3; i++) {
                this.createWorld(this.worlds[i].name, this.worlds[i].locked)
        }

        this.createItem()

    }

    private createGrid() {
        this.grid = document.createElement('grid')
        this.grid.classList.add('grid-container')
        document.body.appendChild(this.grid)
    }

    private createItem() {
        for (let i = 0; i < 3; i++) {
            let item = document.createElement('div')
            item.classList.add('grid-item','empty')
            this.grid.appendChild(item)
        }
    }
    
    private createWorld(world_name : string, locked : boolean) {
        let item = document.createElement('div')
        item.style.backgroundImage = `url(img/world_${world_name}.png)`
        item.classList.add('grid-item')
        //let img = document.createElement('img')
        //img.src = `./img/world_${world_name}.png`
        //img.alt = `${world_name}`
        
        let lock = document.createElement('img')
        
        lock.classList.add('locked-img')
        lock.src = './img/lock.png'
        lock.alt = 'lock'

        if(!locked) {
            lock.classList.add('invisible')
            lock.setAttribute('id', `${world_name}`)
            item.setAttribute('id', `${world_name}`)
        } else {
            item.classList.add('locked')
            lock.setAttribute('id', 'locked')
            item.setAttribute('id', 'locked')
        }

        item.appendChild(lock)
        //item.appendChild(img)
        this.grid.appendChild(item)
        
        console.log(`Created ${world_name} world`)
    }

}