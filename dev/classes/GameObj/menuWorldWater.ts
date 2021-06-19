export class menuWorldWater {

    private grid : HTMLElement
    private item : HTMLElement

    constructor(data : any) {
        console.log('created menuWorldWater')

        document.body.style.backgroundImage = "url(img/sea.png)"

        this.createGrid();

        for (const level of data) {
            console.log(level)
            let island = document.createElement('island')
            island.innerText = level.letters
            island.setAttribute('id', `${level.id}`)
            document.body.appendChild(island)
        }

    }

    private createGrid() {
        this.grid = document.createElement('div')
        this.grid.classList.add('grid-container')
        document.body.appendChild(this.grid)
    }

}