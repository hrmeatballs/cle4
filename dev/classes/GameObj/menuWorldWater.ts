export class menuWorldWater {

    private levelOneIsland : HTMLElement
    private levelOne: string[] = ['a', 'b', 'c']

    private grid : HTMLElement
    private item : HTMLElement

    constructor() {
        console.log('created menuWorldWater')

        document.body.style.backgroundImage = "url(img/sea.png)"

        this.createGrid();

        for (let i = 0; i < 9; i++) {
            this.item = document.createElement('div')
            this.item.classList.add('grid-item')

            if (i==4) {
                this.item.classList.add('island')
            }

            this.grid.appendChild(this.item)
        }

    }

    private createGrid() {
        this.grid = document.createElement('div')
        this.grid.classList.add('grid-container')
        document.body.appendChild(this.grid)
    }

}