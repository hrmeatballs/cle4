export default class {
    constructor(id, name, last_name, username, email, student_id) {
        this._id = id;
        this._name = name;
        this._last_name = last_name;
        this._username = username;
        this._email = email;
        this._student_id = student_id;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get last_name() {
        return this._last_name;
    }
    set last_name(value) {
        this._last_name = value;
    }
    get username() {
        return this._username;
    }
    set username(value) {
        this._username = value;
    }
    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }
    get student_id() {
        return this._student_id;
    }
    set student_id(value) {
        this._student_id = value;
    }
}
//# sourceMappingURL=Parent.js.map