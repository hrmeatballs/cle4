export default class  {

    private _id:number;
    private _name:string;
    private _class_id:number;
    private _levels:Array<[object]>;
    private _teacher:string;
    private _parent:number;

    constructor(id: number, name: string, class_id: number, levels: Array<[object]>, teacher: string, parent: number) {
        this._id = id;
        this._name = name;
        this._class_id = class_id;
        this._levels = levels;
        this._teacher = teacher;
        this._parent = parent;
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get class_id(): number {
        return this._class_id;
    }

    set class_id(value: number) {
        this._class_id = value;
    }

    get levels(): Array<[object]> {
        return this._levels;
    }

    set levels(value: Array<[object]>) {
        this._levels = value;
    }

    get teacher(): string {
        return this._teacher;
    }

    set teacher(value: string) {
        this._teacher = value;
    }

    get parent(): number {
        return this._parent;
    }

    set parent(value: number) {
        this._parent = value;
    }
}