'use strict';

class Gallery extends Popup {
    constructor(options) {
        super(options.domElement);

        this.api = options.request;
        this.addCards = options.addCards;
        this.form = options.domElement;
        this.name = options.domElement.name;
        this.link = options.domElement.link;
        this.button = options.domElement.addButton;
    }

    listenForm() {
        this.api.addCardGallery({ name: this.name.value, link: this.link.value })
            .then((res) => {
                this.addCards.addCard(res, res.owner._id);
            })
            .then(loader.style.display = 'none')
            .then(this.close())
            .catch(error => alert(error));

        this.form.reset();
        this.button.setAttribute('disabled', true);
        this.button.classList.add('popup__button_disabled');
    }
}