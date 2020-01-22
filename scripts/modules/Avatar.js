'use strict';

class Avatar extends Popup {
    constructor(options) {
        super(options.domElement);
        this.api = options.request;
        this.form = options.domElement;
        this.link = options.domElement.link;
        this.userPhoto = document.querySelector('.user-info__photo');
    }

    listenForm(form) {
        this.api.changeAvatar(this.link.value)
            .then((res) => {
                this.changeAvatar(res.avatar);
            })
            .then(loader.style.display = 'none')
            .then(this.close())
            .catch(error => alert(error));

        form.reset();
    }

    changeAvatar(avatar) {
        this.userPhoto.style.backgroundImage = `url('${avatar}')`;
    }
}