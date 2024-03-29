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
        this.speed = 20
    }

    public setSpeed(speed : number) : void{
        this.speed = speed
    }

    public getTarget() : string{
        return this.target
    }

    public setAngle(angle : number) : void {
        this.angle = angle
    }

    public getAngle() : number {
        return this.angle
    }

    public update(gameState : string) : void {

        //calculating the movement of the tile
        this.x += this.speed * -1*Math.cos(this.degToRad(this.angle))
        this.y += this.speed * -1*Math.sin(this.degToRad(this.angle))

        //updating the tile position
        this.div.style.left = `${this.x}px`
        this.div.style.top = `${this.y}px`

    }

}