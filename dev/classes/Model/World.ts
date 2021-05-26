export default class
{
    id:number;
    name:string;
    levels:Array<object>;


    constructor(id: number, name: string, levels: Array<object>) {
        this.id = id;
        this.name = name;
        this.levels = levels;
    }
}