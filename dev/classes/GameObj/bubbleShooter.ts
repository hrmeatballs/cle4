export class bubbleShooter {

    private canvas : any
    private player : any
    private playerDiv : HTMLElement
    private speed : number = 0
    private gameState : string = 'init'

    constructor() {
        console.log('Created bubble shooter')
        //add event listener on mouse
        document.addEventListener('mousemove', (e : MouseEvent) => this.onMouseMove(e))
        document.addEventListener('mousedown', (e : MouseEvent) => this.onMouseMove(e))
        document.addEventListener('click', (e : MouseEvent) => this.onMouseClick(e))

        //add event listeners on touch
        document.addEventListener('touchmove', (e : TouchEvent) => this.onTouchMove(e))
        document.addEventListener('touchstart', (e : TouchEvent) => this.onTouchMove(e))
        document.addEventListener('touchend', (e : TouchEvent) => this.onTouchEnd(e))

        //creating canvas with width and height same as window width and height (fullscreen)
        this.canvas = document.createElement('canvas')
        this.canvas.style.height = '100vh'
        this.canvas.style.width = '100vw'
        this.canvas.style.position = 'fixed'
        document.body.appendChild(this.canvas)

        this.createTile()
    }

    private createTile() {
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

        this.gameState = 'aiming'
    }

    //return position of the place where the ball is going to shoot from
    private getPlayerPos() {
        return {
            x: window.innerWidth/2 - 50,
            y: window.innerHeight - 100,
            angle: 90
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

    //function activated by touchmove eventlistener
    private onTouchMove(e : TouchEvent) {
        if(this.gameState == 'aiming') {
        
            //get array with x,y (mouse position)
            let pos = this.getTouchPos(this.canvas, e);
            
            //get the angle from a certain point to the mouse in degrees
            let mouseangle = this.radToDeg(Math.atan2(this.player.y - pos.y + 50, this.player.x - pos.x + 50))

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

    //function activated by mousemove eventlistener
    private onMouseMove(e : MouseEvent) {
        if(this.gameState == 'aiming') {
        
            //get array with x,y (mouse position)
            let pos = this.getMousePos(this.canvas, e);
            
            //get the angle from a certain point to the mouse in degrees
            let mouseangle = this.radToDeg(Math.atan2(this.player.y - pos.y + 50, this.player.x - pos.x + 50))

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

    // Get the touch position
    private getTouchPos(canvas : HTMLElement, e : TouchEvent) {
        let rect = canvas.getBoundingClientRect();
        return {
            x: Math.round((e.touches[0].clientX - rect.left)/(rect.right - rect.left)*canvas.clientWidth),
            y: Math.round((e.touches[0].clientY - rect.top)/(rect.bottom - rect.top)*canvas.clientHeight)
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

    //SHOOTINGG!!
    private onTouchEnd(e : TouchEvent) {
        //making sure tile only moves when clicked
        this.speed = 10

        //when clicked change gamestate so tile moves lineair
        this.gameState = 'shoot'
    }

    //SHOOTINGG!!
    private onMouseClick(e : MouseEvent) {
        //making sure tile only moves when clicked
        this.speed = 10

        //when clicked change gamestate so tile moves lineair
        this.gameState = 'shoot'
    }

public update() {

        if (this.gameState == 'aiming') {
            //rotating the tile facing to the mouse
            this.playerDiv.style.transform = `rotate(${this.degToRad(this.player.angle)}rad)`
        }

        //calculating the movement of the tile
        this.player.x += this.speed * -1*Math.cos(this.degToRad(this.player.angle))
        this.player.y += this.speed * -1*Math.sin(this.degToRad(this.player.angle))

        //updating the tile position
        this.playerDiv.style.left = `${this.player.x}px`
        this.playerDiv.style.top = `${this.player.y}px`

        if (this.player.x < -100|| this.player.x > window.innerWidth || this.player.y < -100 || this.player.y > window.innerHeight) {
            this.playerDiv.remove()
            this.createTile()
            this.speed = 0
        }
    }

}

//https://github.com/ourcade/coronavirus-pop-phaser/blob/master/src/game/Shooter.ts