export default class {
    constructor(id, name, class_id, levels, teacher, parent) {
        this._id = id;
        this._name = name;
        this._class_id = class_id;
        this._levels = levels;
        this._teacher = teacher;
        this._parent = parent;
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
    get class_id() {
        return this._class_id;
    }
    set class_id(value) {
        this._class_id = value;
    }
    get levels() {
        return this._levels;
    }
    set levels(value) {
        this._levels = value;
    }
    get teacher() {
        return this._teacher;
    }
    set teacher(value) {
        this._teacher = value;
    }
    get parent() {
        return this._parent;
    }
    set parent(value) {
        this._parent = value;
    }
}
//# sourceMappingURL=Student.js.map