export class letterPlaceholder {
    constructor(letters) {
        this.letters = letters;
        this.init();
        console.log(letters);
    }
    init() {
        this.placeholder = document.createElement('div');
        this.placeholder.classList.add('letters-placeholder');
        console.log(this.placeholder);
        this.createLetters(this.letters);
    }
    createLetters(letters) {
        let createdLetters = [];
        for (let letter of letters) {
            let element = document.createElement('h1');
            let content = document.createTextNode(letter);
            element.appendChild(content);
            element.classList.add('letter');
            element.dataset.letter = letter;
            createdLetters.push(element);
        }
        this.setLetters(createdLetters);
    }
    setLetters(letters) {
        let wrapper = document.createElement('div');
        wrapper.classList.add('letters-wrapper');
        for (let element of letters) {
            wrapper.append(element);
        }
        this.placeholder.append(wrapper);
    }
    getElement() {
        return this.placeholder;
    }
}
//# sourceMappingURL=letterPlaceholder.js.map