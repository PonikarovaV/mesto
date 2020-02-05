class Popup {
    constructor(domElement) {
        this.domElement = domElement;
    }

    // открытие попапов
    open() {
        this.domElement.closest('.popup').classList.add('popup_is-opened');
    }
    
    // закрытие попапов
    close() {
        this.domElement.closest('.popup').classList.remove('popup_is-opened');
    }
}

export {Popup};