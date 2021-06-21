import { Player } from "./player.js"
import { Target } from "./target.js"
import { Guideline } from "./guideline.js"
import { popUpMenu } from "../GameObj/popUpMenu.js"
import { scoreMenu } from "./scoreMenu.js"

export class bubbleShooter {

    //classes
    private player : Player
    private targets : Target[] = []
    private guideline: Guideline;
    private popUpMenu : popUpMenu;
    private scoreMenu : scoreMenu;

    //game variables
    private userAngle: number;
    private level: Array<string>
    private gameState : string = 'init';
    private letters : Array<string>
    private shots : number = 0

    //HTML elements
    private canvas : any;

    constructor(letters: string, level:string) {
        console.log('Created bubble shooter')
        this.scoreMenu = new scoreMenu()
        this.scoreMenu.updateTime()
        document.body.innerHTML = '';

        // Getting values
        this.letters = letters.split("")
        this.level = letters.split("")

        // Creating all HTML elements
        this.canvas = document.createElement('canvas')
        document.body.appendChild(this.canvas)
        document.body.appendChild(this.scoreMenu.getElement())
        document.body.style.backgroundImage = 'url(img/shooter/background.png)';

        if (this.gameState != 'gameover') {
            this.player = new Player(this.getTarget())
        }

        this.gameState = 'aiming'

        this.guideline = new Guideline()

        this.createTargets()

        // Creating event listeners
        document.addEventListener('mousemove', (e : MouseEvent) => this.onUserMove(e))
        document.addEventListener('mousedown', (e : MouseEvent) => this.onUserMove(e))
        document.addEventListener('mouseup', () => {
            if (this.gameState != 'gameover') {
                this.gameState = 'shooting'
                this.player.shoot() 
                this.shots += 1
            }
        })

        document.addEventListener('touchmove', (e : TouchEvent) => this.onUserMove(e))
        document.addEventListener('touchstart', (e : TouchEvent) => this.onUserMove(e))
        document.addEventListener('touchend', () => {
            if (this.gameState != 'gameover') {
                this.gameState = 'shooting'
                this.player.shoot() 
            }
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
        if (this.gameState != 'gameover'){
            this.scoreMenu.updateTime()
        }else{
            this.scoreMenu.stopTime()
        }
        
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
                    if (this.targets.length > -1) {
                        this.targets.splice(0 , 1);
                    }

                    //play sound of hitted letter
                    var klank = new Audio(`audio/${target.getLetter()}.mp3`);
                    klank.play();

                    //removing the the letter of the hitted target from letters[]
                    this.letters.splice(0, 1);


                    //if all targets are hitted, create new targets
                    if (this.letters.length == 0) {
                        this.gameState = 'gameover'

                        setTimeout(() => {
                            var klank = new Audio(`audio/${this.level.join('')}.mp3`)
                            klank.play()
                        }, 700)

                        let messages = [':)', 'Goedzo!', 'Topper!', 'Goed bezig :)', 'Goed bezig!', 'Topper :)', 'Ga zo door!', 'Ga zo door :)', ':D']       
                        let message = messages[Math.floor(Math.random() * messages.length)]
                        let scorePercent = this.level.length/this.shots
                        let score = 0
                        if (scorePercent == 1) {
                            score = 3
                        } else if (scorePercent <= 0.6 && scorePercent >= 0.3) {
                            score = 2
                        } else {
                            score = 1
                        }
                        console.log(score)
                        console.log(scorePercent)
                        this.popUpMenu = new popUpMenu(this.level , `${message}`, score)
                    }

                    //resetting player
                    if (this.gameState != 'gameover') {
                        this.player.create(this.getTarget())
                        this.player.setSpeed(0)
                        this.gameState = 'aiming'
                    }

                }else{
                    //resetting player
                    if (this.gameState != 'gameover') {
                        this.player.create(this.getTarget())
                        this.player.setSpeed(0)
                        this.gameState = 'aiming'
                    }
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
            if (this.gameState != 'gameover') {
                this.gameState = 'aiming'
            }
        }

    }

    public gameLoop() {
        this.update()
        requestAnimationFrame(() => this.gameLoop())
    }

}

//https://github.com/ourcade/coronavirus-pop-phaser/blob/master/src/game/Shooter.ts