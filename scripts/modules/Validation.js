'use strict';

class Validation {
    constructor(messages) {

        this.messages = messages;

    }
    // проверка на валидность поля
    inputValidate(input) {
        console.log(input);

        if (input.validity.valueMissing) {
            this.setInvalid(input, this.messages.imptyField);
            return false;
        }
        if ((input.type === 'text') && (!input.validity.valid)) {
            this.setInvalid(input, this.messages.wrongLength);
            return false;
        }
        if ((input.type === 'url') && (!input.validity.valid)) {
            this.setInvalid(input, this.messages.notAnUrl);
            return false;
        }
        this.setValid(input);
        return true;

    }
    // если поле невалидно
    setInvalid(input, message) {

        input.classList.add('popup__input_invalid');
        input.nextElementSibling.textContent = message;
        input.nextElementSibling.classList.add('popup__error_active');

    }
    // если поле валидно
    setValid(input) {

        input.classList.remove('popup__input_invalid');
        input.nextElementSibling.textContent = '';

    }
    // включение/отключение кнопки если хотя бы одно поле формы Add невалидно
    checkFildsAddForm(button) {

        this.button = button;

        const formNewName = formNew.elements.name;
        const formNewLink = formNew.elements.link;

        if (this.inputValidate(formNewName) === true && this.inputValidate(formNewLink) === true) {
            this.switchOnButton(this.button);
        } else {
            this.switchOffButton(this.button);
        }
    }
    // включение/отключение кнопки если хотя бы одно поле формы Edit невалидно
    checkFildsEditForm(button) {

        this.button = button;

        const formEditName = formEdit.elements.userName;
        const formEditAbout = formEdit.elements.userAbout;

        if (this.inputValidate(formEditName) === true && this.inputValidate(formEditAbout) === true) {
            this.switchOnButton(this.button);
        } else {
            this.switchOffButton(this.button);
        }

    }
    // включение/выключение кнопки формы Avatar
    checkFildsAvatarForm(button) {

        this.button = button;

        const formAvatarLink = formAvatar.elements.link;

        if (this.inputValidate(formAvatarLink) === true) {
            this.switchOnButton(this.button);
        } else {
            this.switchOffButton(this.button);
        }

    }
    // выключение кнопки
    switchOffButton(button) {

        button.setAttribute('disabled', true);
        button.classList.add('popup__button_disabled');

    }
    // включение кнопки
    switchOnButton(button) {

        button.removeAttribute('disabled', true);
        button.classList.remove('popup__button_disabled');

    }

}