export class bubbleShooter {

    private canvas : any
    private player : any
    private playerDiv : HTMLElement
    private speed : number = 0
    private gameState : string = 'init'

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

        this.createTile()
    }

    private createTile() {
        //resetting gamestate
        this.gameState = 'playing'
        //resetting position
        this.player = this.getPlayerPos()

        //creating tile at the bottom of the screen, aka player
        this.playerDiv = document.createElement('div')
        this.playerDiv.style.backgroundColor = 'red'
        this.playerDiv.style.position = 'fixed'
        this.playerDiv.style.height = '100px'
        this.playerDiv.style.width = '100px'
        this.playerDiv.style.left = `${this.player.x}px`
        this.playerDiv.style.top = `${this.player.y}px`
        this.playerDiv.innerText = '<<<<<<<<<'
        this.playerDiv.style.color = 'white'
        document.body.appendChild(this.playerDiv)

        
    }

    //return position of the place where the ball is going to shoot from
    private getPlayerPos() {
        return {
            x: window.innerWidth/2 - 50,
            y: window.innerHeight - 100,
            angle: 0
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

        if(this.gameState == 'playing') {
            //rotating the tile facing to the mouse
            this.playerDiv.style.transform = `rotate(${this.degToRad(this.player.angle)}rad)`
        
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
        }
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
        this.speed = 10

        //when clicked change gamestate so tile moves lineair
        this.gameState = 'shoot'
    }

public update() {
        //calculating the movement of the tile
        this.player.x += this.speed * -1*Math.cos(this.degToRad(this.player.angle))
        this.player.y += this.speed * -1*Math.sin(this.degToRad(this.player.angle))

        //updating the tile position
        this.playerDiv.style.left = `${this.player.x}px`
        this.playerDiv.style.top = `${this.player.y}px`


    }

}

//https://github.com/ourcade/coronavirus-pop-phaser/blob/master/src/game/Shooter.ts