export default class  {

    private _id:number;
    private _name:string;
    private _last_name:string;
    private _username:string;
    private _email:string;
    private _student_id:number;


    constructor(id: number, name: string, last_name: string, username: string, email: string, student_id: number) {
        this._id = id;
        this._name = name;
        this._last_name = last_name;
        this._username = username;
        this._email = email;
        this._student_id = student_id;
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

    get last_name(): string {
        return this._last_name;
    }

    set last_name(value: string) {
        this._last_name = value;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get student_id(): number {
        return this._student_id;
    }

    set student_id(value: number) {
        this._student_id = value;
    }
}