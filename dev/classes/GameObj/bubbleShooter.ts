export class bubbleShooter {

    mouse : HTMLElement
    body : HTMLElement

    constructor() {
        console.log('Created bubble shooter')
        document.addEventListener('mousemove', (e : any) => this.mouseMoveHandler(e))
        document.addEventListener('mousedown', (e : any) => this.mouseDown(e))
        document.addEventListener('mouseup', (e : any) => this.mouseUp(e))

        this.body = document.body

        this.mouse = document.createElement('div')
        this.mouse.style.height = '20px'
        this.mouse.style.width = '500px'
        this.mouse.style.position = 'relative'
        this.mouse.innerHTML = '< here is your mouse'
        document.body.appendChild(this.mouse)

    }

    private mouseMoveHandler(e : any) {
        e.preventDefault()
        
        if (e.clientX < this.body.clientWidth && e.clientX > 0 && e.clientY > this.body.clientHeight && e.clientY > 0) {
            this.mouse.style.transform = `translate(${e.clientX + 5}px,${e.clientY - 10}px)`
        }
    }

    private mouseDown(e : any) {
        this.mouse.innerHTML = 'NOOOO DONT CLICK IT IS GOING TO EXPLOODE'
        this.body.style.color = 'white'
        this.body.style.backgroundColor = 'red'
    }

    private mouseUp(e : any) {
        this.mouse.innerHTML = '< here is your mouse'
        this.body.style.color = 'gray'
        this.body.style.backgroundColor = 'white'
    }


}

//https://github.com/ourcade/coronavirus-pop-phaser/blob/master/src/game/Shooter.ts