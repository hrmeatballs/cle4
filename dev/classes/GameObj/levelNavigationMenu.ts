export class levelNavigationsMenu {
    private navigation: HTMLElement;
    private homeBtn: HTMLElement;
    private replayBtn: HTMLElement;
    private nextBtn: HTMLElement;
    private buttons: HTMLElement[] = [];

    constructor() {
        this.createNav()
    }
    createNav()
    {
        this.navigation = document.createElement('nav')
        this.navigation.classList.add('pop-up-navigation-container')

        this.homeBtn = document.createElement('div')
        this.replayBtn = document.createElement('div')
        this.nextBtn = document.createElement('div')

        this.homeBtn.dataset.btn = 'homeBtn'
        this.replayBtn.dataset.btn = 'replayBtn'
        this.nextBtn.dataset.btn = 'nextBtn'

        let homeIcon = document.createElement('img')
        let replayIcon = document.createElement('img')
        let nextIcon = document.createElement('img')

        homeIcon.src = 'img/arrow-left.png'
        replayIcon.src = 'img/list.png'
        nextIcon.src = 'img/redo.png'

        homeIcon.classList.add('nav-icon')
        replayIcon.classList.add('nav-icon')
        nextIcon.classList.add('nav-icon')

        this.homeBtn.append(homeIcon)
        this.replayBtn.append(replayIcon)
        this.nextBtn.append(nextIcon)

        this.homeBtn.classList.add('btn')
        this.replayBtn.classList.add('btn')
        this.nextBtn.classList.add('btn')

        let navigation_wrapper = document.createElement('div')
        navigation_wrapper.classList.add('pu-nav-btn-wrapper')

        this.buttons.push(this.homeBtn)
        this.buttons.push(this.replayBtn)
        this.buttons.push(this.nextBtn)


        for(let btn of this.buttons)
        {
            navigation_wrapper.append(btn)
        }
        this.navigation.append(navigation_wrapper)

    }
    getElement()
    {
        return this.navigation
    }
}