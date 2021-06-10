import { Player } from "./player.js"
import { Target } from "./target.js"

export class bubbleShooter {

    private player : Player
    private target : Target[]

    private canvas : any
    private gameState : string = 'init'

    private letters : Array<string> = ['a', 'k', 'm']
    private h : number = 0

    constructor() {
        console.log('Created bubble shooter')

        //creating canvas to get user position
        this.canvas = document.createElement('canvas')
        document.body.appendChild(this.canvas)

        this.player = new Player(this.targetRandomiser())
        this.gameState = 'aiming'

        //TODO create target

        //add event listener on mouse
        document.addEventListener('mousemove', (e : MouseEvent) => this.onUserMove(e))
        document.addEventListener('click', () => {
            this.gameState = 'shooting'
            this.player.shoot() 
        })

        // //add event listeners on touch
        document.addEventListener('touchmove', (e : TouchEvent) => this.onUserMove(e))
        document.addEventListener('touchstart', (e : TouchEvent) => this.onUserMove(e))
        document.addEventListener('touchend', () => {
            this.gameState = 'shooting'
            this.player.shoot() 
        })
    }

    private targetRandomiser() : string {
        return this.letters[Math.floor(Math.random() * this.letters.length)]
    }

    //function activated by mousemove eventlistener
    private onUserMove(e : any) : void {
        if(this.gameState == 'aiming') {
        
            //get array with x,y (mouse position)
            let userPos = this.getUserPos(this.canvas, e)
            
            //get the angle from a certain point to the mouse in degrees
            let mouseAngle = this.player.radToDeg(Math.atan2(this.player.getY() - userPos.y + 50, this.player.getX() - userPos.x + 50))

            //making sure you can't shoot down
            if (mouseAngle < 0) {
                mouseAngle = 180 + (180 + mouseAngle);
            }

            //making sure you can only shoot UP
            var lbound = 8;
            var ubound = 172;
            if (mouseAngle > 90 && mouseAngle < 270) {
                // Left
                if (mouseAngle > ubound) {
                    mouseAngle = ubound;
                }
            } else {
                // Right
                if (mouseAngle < lbound || mouseAngle >= 270) {
                    mouseAngle = lbound;
                }
            }

            //adding mouse angle to player angle
            this.player.setAngle(mouseAngle) 
        }
    }

    // Get the mouse position
    private getUserPos(canvas : HTMLElement, e : any) {
        let rect = canvas.getBoundingClientRect();
        if (e.type == 'mousemove') {
            return {
                x: Math.round((e.clientX - rect.left)/(rect.right - rect.left)*canvas.clientWidth),
                y: Math.round((e.clientY - rect.top)/(rect.bottom - rect.top)*canvas.clientHeight)
            }
        } else if (e.type == 'touchmove') {
            return {
                x: Math.round((e.touches[0].clientX - rect.left)/(rect.right - rect.left)*canvas.clientWidth),
                y: Math.round((e.touches[0].clientY - rect.top)/(rect.bottom - rect.top)*canvas.clientHeight)
            }
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }

    public update() : void {
        // let movingTargets = document.getElementsByTagName('target')

        // for (let i = 0; i < movingTargets.length; i++) {
        //     this.h += 0.01
        //     movingTargets[i].style.top = `${(parseFloat(movingTargets[i].style.top) + Math.cos(this.h) *2)}px`
        //     movingTargets[i].style.left = `${(parseFloat(movingTargets[i].style.left) + Math.sin(this.h) *2)}px`
        // }

        this.player.update(this.gameState)

        if (this.player.getX() < -100|| this.player.getX() > window.innerWidth || this.player.getY() < -100 || this.player.getY() > window.innerHeight) {
            this.player.create(this.targetRandomiser())
            this.player.setSpeed(0)
            this.gameState = 'aiming'
        }

    }

    private checkCollision(a: ClientRect, b: ClientRect) : boolean {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }

}

//https://github.com/ourcade/coronavirus-pop-phaser/blob/master/src/game/Shooter.ts