export class bubbleShooter {

    private canvas : any
    private player : any
    private tile : HTMLElement
    private speed : number = 0
    private x : number = 1
    private y : number = 1

    constructor() {
        console.log('Created bubble shooter')
        //add event listener on mousemove
        document.addEventListener('mousemove', (e : MouseEvent) => this.onMouseMove(e))
        document.addEventListener('click', (e : MouseEvent) => this.onMouseClick(e))

        //creating canvas with width and height same as window width and height (fullscreen)
        this.canvas = document.createElement('canvas')
        this.canvas.style.height = '99vh'
        this.canvas.style.width = '99vw'
        document.body.appendChild(this.canvas)

        this.x = (this.canvas.clientWidth/2) - 50
        this.y = this.canvas.clientHeight - 100

        //creating tile at the bottom of the screen, aka player
        this.tile = document.createElement('div')
        this.tile.style.backgroundColor = 'red'
        this.tile.style.position = 'absolute'
        this.tile.style.height = '100px'
        this.tile.style.width = '100px'
        this.tile.style.left = `${this.x}px`
        this.tile.style.top = `${this.y}px`
        this.tile.innerText = '<<<<<<<<<'
        this.tile.style.color = 'white'
        document.body.appendChild(this.tile)

        //adding coords to player
        this.player = this.getPlayerPos()
    }

    //return position of the place where the ball is going to shoot from
    private getPlayerPos() {
        return {
            x: window.innerWidth/2,
            y: window.innerHeight
        }
    }

    //calculate radius to degrees
    private radToDeg(angle : number) {
        return angle * (180 / Math.PI)
    }

    //calculate degrees to radius
    private degToRad(angle : number) {
        return angle * (Math.PI / 180);
    }

    //function activated by mousemove eventlistener
    private onMouseMove(e : MouseEvent) {
        //get array with x,y (mouse position)
        let pos = this.getMousePos(this.canvas, e);
        
        //get the angle from a certain point to the mouse in degrees
        let mouseangle = this.radToDeg(Math.atan2(this.player.y - pos.y, this.player.x - pos.x))

        //making sure you can't shoot down
        if (mouseangle < 0) {
            mouseangle = 180 + (180 + mouseangle);
        }

        //making sure you can only shoot UP
        var lbound = 8;
        var ubound = 172;
        if (mouseangle > 90 && mouseangle < 270) {
            // Left
            if (mouseangle > ubound) {
                mouseangle = ubound;
            }
        } else {
            // Right
            if (mouseangle < lbound || mouseangle >= 270) {
                mouseangle = lbound;
            }
        }

        //adding mouse angle to player angle
        this.player.angle = mouseangle

        //rotating the tile facing to the mouse
        this.tile.style.transform = `rotate(${this.degToRad(this.player.angle)}rad)`
    }

    // Get the mouse position
    private getMousePos(canvas : HTMLElement, e : MouseEvent) {
        let rect = canvas.getBoundingClientRect();
        return {
            x: Math.round((e.clientX - rect.left)/(rect.right - rect.left)*canvas.clientWidth),
            y: Math.round((e.clientY - rect.top)/(rect.bottom - rect.top)*canvas.clientHeight)
        }
    }

    private onMouseClick(e : MouseEvent) {
        //making sure tile only moves when clicked
        this.speed = 1
    }

    public update() {

        //deze 2 regels zouden voor het veranderen van x en y moeten zorgen (formule)
        this.x = this.speed * Math.cos(this.degToRad(this.player.angle))
        this.y = this.speed * -1*Math.sin(this.degToRad(this.player.angle))

        //deze 2 regels moeten de tile/bubble die geschoten moet worden updaten. Dat doet hij alleen niet want x en y zijn NaN door de formule
        this.tile.style.left = `${this.x}px`
        this.tile.style.top = `${this.y}px`
    }
 

}

//https://github.com/ourcade/coronavirus-pop-phaser/blob/master/src/game/Shooter.ts