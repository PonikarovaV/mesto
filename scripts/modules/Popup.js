'use strict';

class Popup {
    constructor(validation) {

        this.validation = validation;

    }

    // открытие попапов
    open(event) {

        if (event.target.closest('.user-info__button')) {
            popupAdd.classList.add('popup_is-opened');
        }
        if (event.target.closest('.user-info__edit-button')) {
            popupEdit.classList.add('popup_is-opened');
        }
        if (event.target.matches('.place-card__image')) {
            const popupPic = document.querySelector('.popup__pic');

            popupImg.classList.add('popup_is-opened');
            popupPic.src = event.target.dataset.src;
        }
        if (event.target.closest('.user-info__photo')) {
            popupAvatar.classList.add('popup_is-opened');
        }

    }
    
    // закрытие попапов
    close(event) {

        if ((event.target.closest('.popup__button')) || (event.target.closest('.popup__close'))) {
            document.querySelectorAll('.popup').forEach(el => el.classList.remove('popup_is-opened'));
        }

    }

    // setInputsListeners() {

    //     let inputs = Array.from(document.getElementsByClassName('popup__input'));
    //     inputs.forEach(input => {
    //         input.addEventListener('input', () => {
    //             this.validation.inputValidate(input);
    //         });
    //     });

    // }

}

class Gallery extends Popup {
    constructor(validation, api, cardsGallery) {
        super(validation);
        this.api = api;
        this.cardsGallery = cardsGallery;
    }

    listenForm(form) {
        
        this.form = form;
        this.name = form.name;
        this.link = form.link;
        this.button = form.addButton;

        // this.checkValidity(this.button);

        this.api.addCardGallery({ name: this.name.value, link: this.link.value })
            .then((res) => {
                this.cardsGallery.addCard(res, res.owner._id);
            })
            .then(document.querySelector('.loader').style.display = 'none')
            .catch(error => alert(error));

        this.form.reset();

    }

    // checkValidity() {
    //     if (this.validation.inputValidate(this.name) && this.validation.inputValidate(this.link)) {
    //         this.validation.switchOnButton(this.button);
    //     } else {
    //         this.switchOffButton(this.button);
    //     }
    // }

}

class Profile extends Popup {
    constructor(validation, api) {
        super(validation);
        this.api = api;
    }

    listenForm(form) {
        
        const name = form.userName;
        const about = form.userAbout;

        this.api.editUserProfile({ name: name.value, about: about.value })
            .then((res) => {
                this.fullfillForm(res.name, res.about);
            })
            .then(document.querySelector('.loader').style.display = 'none')
            .catch(error => alert(error));

    }

    fullfillForm(name, about) {

        this.name = name;
        this.about = about;

        const userInfoName = document.querySelector('.user-info__name');
        const userInfoJob = document.querySelector('.user-info__job');

        userInfoName.textContent = `${this.name}`;
        userInfoJob.textContent = `${this.about}`;

        document.querySelector('.popup__input_type_user-name').setAttribute('value', `${this.name}`);
        document.querySelector('.popup__input_type_user-about').setAttribute('value', `${this.about}`);
        
    }
}

class Avatar extends Popup {
    constructor(validation, api) {
        super(validation);
        this.api = api;
   
    }

    listenForm(form) {
        
        const link = form.link;

        this.api.changeAvatar(link.value)
            .then((res) => {
                this.changeAvatar(res.avatar);
            })
            .then(document.querySelector('.loader').style.display = 'none')
            .catch(error => alert(error));

        form.reset();

    }

    changeAvatar(avatar) {

        userPhoto.style.backgroundImage = `url('${avatar}')`;

    }
}