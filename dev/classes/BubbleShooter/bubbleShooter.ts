import { Player } from "./player.js"
import { Target } from "./target.js"
import { Guideline } from "./guideline.js"

export class bubbleShooter {

    //classes
    private player : Player
    private targets : Target[] = []
    private guideline: Guideline;

    //game variables
    private userAngle: number;
    private level: string;
    private gameState : string = 'init';
    private letters : Array<string>

    //HTML elements
    private canvas : any;

    constructor(letters: Array<string> = [], level:string) {
        console.log('Created bubble shooter')

        document.body.innerHTML = '';

        // Getting values 
        this.letters = letters;
        this.level = level;

        // Creating all HTML elements
        this.canvas = document.createElement('canvas')
        document.body.appendChild(this.canvas)
        document.body.style.backgroundImage = 'url(img/shooter/background.png)';

        this.player = new Player(this.getTarget())

        this.gameState = 'aiming'

        this.guideline = new Guideline()

        this.createTargets()

        // Creating music
        var audio = new Audio('audio/theme.mp3');
        audio.play();

        // Creating event listeners
        document.addEventListener('mousemove', (e : MouseEvent) => this.onUserMove(e))
        document.addEventListener('mousedown', (e : MouseEvent) => this.onUserMove(e))
        document.addEventListener('mouseup', () => {
            this.gameState = 'shooting'
            this.player.shoot() 
        })

        document.addEventListener('touchmove', (e : TouchEvent) => this.onUserMove(e))
        document.addEventListener('touchstart', (e : TouchEvent) => this.onUserMove(e))
        document.addEventListener('touchend', () => {
            this.gameState = 'shooting'
            this.player.shoot() 
        })
    }

    //generate a target
    private getTarget() : string {
        return this.letters[0]
    }

    //create a target for each letter
    private createTargets() {
        //adding targets
        for (let i = 0; i < this.letters.length; i++) {
            this.targets.push(new Target(this.letters[i]))
        }
    }

    //calculates angle between player and user, activated by eventListeners
    private onUserMove(e : any) : void {
        if(this.gameState == 'aiming') {
        
            //get x,y of user
            let userPos = this.getUserPos(this.canvas, e)

            //get the angle from the line between user and player
            let mouseAngle = this.player.radToDeg(Math.atan2(this.player.getY() - userPos.y + 50, this.player.getX() - userPos.x + 50))

            //making sure you can't shoot down
            if (mouseAngle < 0) {
                mouseAngle = 180 + (180 + mouseAngle);
            }

            //making sure the angle can't be 0 or 180 and only shooting UP
            var lbound = 8;
            var ubound = 172;
            if (mouseAngle > 90 && mouseAngle < 270) {
                // angle won't be lower than 8
                if (mouseAngle > ubound) {
                    mouseAngle = ubound;
                }
            } else {
                // angle won't be higher than 172
                if (mouseAngle < lbound || mouseAngle >= 270) {
                    mouseAngle = lbound;
                }
            }

            //adding mouseAngle to player angle
            this.player.setAngle(mouseAngle) 
            this.userAngle = mouseAngle
        }
    }

    // Get the mouse position and return x,y
    private getUserPos(canvas : HTMLElement, e : any) {
        let rect = canvas.getBoundingClientRect();

        //checking what kind of movement and return the pos of user
        if (e.type == 'mousemove' || e.type == 'mousedown') {
            return {
                //return coords if mouse is used
                x: Math.round((e.clientX - rect.left)/(rect.right - rect.left)*canvas.clientWidth),
                y: Math.round((e.clientY - rect.top)/(rect.bottom - rect.top)*canvas.clientHeight)
            }
        } else if (e.type == 'touchmove' || e.type == 'touchstart') {
            return {
                //return coords if touch is used
                x: Math.round((e.touches[0].clientX - rect.left)/(rect.right - rect.left)*canvas.clientWidth),
                y: Math.round((e.touches[0].clientY - rect.top)/(rect.bottom - rect.top)*canvas.clientHeight)
            }
        } else {
            console.error("Method of movement is undefined")
            return {
                //return 0,0 if can't get method of movement and throw error
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
            if(distance < 100) {

                //checking if hitted target is the same as the one the player needed to hit
                if (this.player.getTarget() == target.getLetter()) {

                    //removing the hitted target
                    target.hitTarget()
                    if (this.targets.length > -1) {
                        this.targets.splice(0 , 1);
                    }

                    //play sound of hitted letter
                    var klank = new Audio(`audio/${target.getLetter()}.mp3`);
                    klank.play();

                    //removing the the letter of the hitted target from letters[]
                    const index = this.letters.indexOf(target.getLetter());
                    if (index > -1) {
                        this.letters.splice(index, 1);
                    }

                    //if all targets are hitted, create new targets
                    if (this.letters.length == 0) {
                        this.letters = ['m', 'a', 'k']
                        //add new letters
                        this.createTargets()
                    }

                    //resetting player
                    this.player.create(this.getTarget())
                    this.player.setSpeed(0)
                    this.gameState = 'aiming'

                }else{
                    //resetting player
                    this.player.create(this.getTarget())
                    this.player.setSpeed(0)
                    this.gameState = 'aiming'
                }

                
            }
        }

        //updating player
        this.player.update(this.gameState)
        this.guideline.update(this.gameState, this.userAngle)

        // Making sure player won't leave screen
        if (this.player.getX() < 0) {
            //bounce off left wall
            this.player.setAngle(180 - this.player.getAngle())
        } else if (this.player.getX() > (window.innerWidth - 100)) {
            //bounce off right wall
            this.player.setAngle(180 - this.player.getAngle())
        } else if (this.player.getY() < 0) {
            //reset player if touched the top
            this.player.create(this.getTarget())
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