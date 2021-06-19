import { Player } from "./player.js"
import { Target } from "./target.js"
import { Guideline } from "./Guideline.js"

export class bubbleShooter {

    //classes
    private player : Player
    private targets : Target[] = []
    private guideline: Guideline;

    //game variables
    private userAngle: number;
    private level: string;
    private canvas : any;
    private gameState : string = 'init';
    private shots: number;
    private hitTarget: number;
    

    private letters : Array<string>

    constructor(letters: Array<string> = [], level:string) {
        console.log('Created bubble shooter')

        // Getting values 
        this.letters = letters;
        this.level = level
        var audio = new Audio('audio/theme.mp3');
        // audio.play();

        //creating canvas to get user position
        this.canvas = document.createElement('canvas')
        document.body.appendChild(this.canvas)

        //creating player
        this.player = new Player(this.targetRandomiser())
        this.gameState = 'aiming'
        // Creating guideline
        this.guideline = new Guideline()
        this.createTargets()

        //add event listener on mouse
        document.addEventListener('mousemove', (e : MouseEvent) => this.onUserMove(e))
        document.addEventListener('mousedown', (e : MouseEvent) => this.onUserMove(e))
        document.addEventListener('mouseup', () => {
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

    //get random letter for player
    private targetRandomiser() : string {
        return this.letters[0]
        //return this.letters[Math.floor(Math.random() * this.letters.length)]
    }

    private createTargets() {
        //adding targets
        for (let i = 0; i < this.letters.length; i++) {
            this.targets.push(new Target(this.letters[i]))
        }
    }

    //function activated by mousemove eventlistener
    private onUserMove(e : any) : void {
        if(this.gameState == 'aiming') {
        
            //get array with x,y (mouse position)
            let userPos = this.getUserPos(this.canvas, e)

            //get the angle from a certain point to the mouse in degrees
            let mouseAngle = this.player.radToDeg(Math.atan2(this.player.getY() - userPos.y + this.player.getWidth(), this.player.getX() - userPos.x + this.player.getWidth()))

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
            this.userAngle = mouseAngle
        }
    }

    // Get the mouse position
    private getUserPos(canvas : HTMLElement, e : any) {
        let rect = canvas.getBoundingClientRect();

        //checking what kind of movement and return the pos of user
        if (e.type == 'mousemove' || e.type == 'mousedown') {
            return {
                x: Math.round((e.clientX - rect.left)/(rect.right - rect.left)*canvas.clientWidth),
                y: Math.round((e.clientY - rect.top)/(rect.bottom - rect.top)*canvas.clientHeight)
            }
        } else if (e.type == 'touchmove' || e.type == 'touchstart') {
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
        for (const target of this.targets) {

            //getting circle of player and target
            let dx = this.player.getX() - target.getX()
            let dy = this.player.getY() - target.getY()
            let distance = Math.sqrt(dx * dx + dy * dy)

            //checking if there is a collision
            if(distance < this.player.getWidth()) {

                //checking if hitted target is the same as the one the player needed to hit
                if (this.player.getTarget() == target.getLetter()) {

                    //removing the hitted target
                    target.hitTarget()
                    var klank = new Audio(`audio/${target.getLetter()}.mp3`);
                    klank.play();

                    //removing the the letter of the hitted target from letters[]
                    const index = this.letters.indexOf(target.getLetter());
                    if (index > -1) {
                        this.letters.splice(index, 1);
                    }

                    //if array is empty fill array
                    if (this.letters.length == 0) {
                        this.letters = ['m', 'a', 'k']
                        //add new word to array
                        this.createTargets()
                    }

                    //resetting player
                    this.player.create(this.targetRandomiser())
                    this.player.setSpeed(0)
                    this.gameState = 'aiming'

                }else{
                    //resetting player
                    this.player.create(this.targetRandomiser())
                    this.player.setSpeed(0)
                    this.gameState = 'aiming'
                }

                
            }
        }

        //updating player
        this.player.update(this.gameState)
        this.guideline.update(this.gameState, this.userAngle)

        //reset player if out of screen
        if (this.player.getX() < -100|| this.player.getX() > window.innerWidth || this.player.getY() < -100 || this.player.getY() > window.innerHeight) {
            this.player.create(this.targetRandomiser())
            this.player.setSpeed(0)
            this.gameState = 'aiming'
        }

    }

    public gameLoop() {
        this.update()
        requestAnimationFrame(() => this.gameLoop())
    }

}

//https://github.com/ourcade/coronavirus-pop-phaser/blob/master/src/game/Shooter.ts