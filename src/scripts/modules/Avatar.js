import {Popup} from './Popup.js';

class Avatar extends Popup {
    constructor(options) {
        super(options.domElement);
        this.api = options.request;
        this.form = options.domElement;
        this.link = options.domElement.link;
        this.button = options.domElement.saveButton;
        this.loader = options.loading;
        this.userPhoto = document.querySelector('.user-info__photo');
    }

    listenForm() {
        this.api.changeAvatar(this.link.value)
            .then((res) => {
                this.changeAvatar(res.avatar);
            })
            .then(() => {
                this.loader.classList.remove('loader_active');
            })
            .then(this.close())
            .catch(error => alert(error));

        this.form.reset();        
        this.button.setAttribute('disabled', true);
        this.button.classList.add('popup__button_disabled');
    }

    changeAvatar(avatar) {
        this.userPhoto.style.backgroundImage = `url('${avatar}')`;
    }
}

export {Avatar};