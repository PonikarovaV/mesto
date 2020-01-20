'use strict';

class CardList {
    constructor(container, cardTemplate) {

        this.container = container;
        this.cardTemplate = cardTemplate;

    }

    // добавление карточки в разметку
    addCard(card, id) {
        
        this.cardElement = this.cardTemplate.create(card, id);
        
        this.container.insertAdjacentHTML(
            'beforeend',
            this.cardElement
        ); 

    }

    // галерея карточек при загрузке страницы
    render(array, id) {

        array.forEach( el => this.addCard(el, id) );
        
    }

}