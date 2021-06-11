import { GameObject } from "./gameObject.js";

export class Player extends GameObject {

    private angle : number = 90
    private speed : number = 0
    private target : string

    constructor(target : string) {
        super('player')

        console.log('Created player')
        this.create(target)
    }

    public create(target : string) {
        this.target = target
        super.createPlayer(target)
    }

    public shoot() {
        this.speed = 10
    }

    public setSpeed(speed : number) {
        this.speed = speed
    }

    public getX() : number {
        return this.x
    }

    public getY() : number {
        return this.y
    }

    public getTarget() {
        return this.target
    }

    public setAngle(angle : number) : void {
        this.angle = angle
    }

    //calculate radius to degrees
    public radToDeg(angle : number) : number {
        return angle * (180 / Math.PI)
    }

    //calculate degrees to radius
    public degToRad(angle : number) : number {
        return angle * (Math.PI / 180);
    }

    public update(gameState : string) : void {

        if (gameState == 'aiming') {
            //rotating the tile facing to the mouse
            this.div.style.transform = `rotate(${this.degToRad(this.angle)}rad)`
        }

        //calculating the movement of the tile
        this.x += this.speed * -1*Math.cos(this.degToRad(this.angle))
        this.y += this.speed * -1*Math.sin(this.degToRad(this.angle))

        //updating the tile position
        this.div.style.left = `${this.x}px`
        this.div.style.top = `${this.y}px`

    }

}