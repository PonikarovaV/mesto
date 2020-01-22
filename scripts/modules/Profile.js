'use strict';

class Profile extends Popup {
    constructor(options) {
        super(options.domElement);

        this.api = options.request;
        this.form = options.domElement;
        this.name = options.domElement.userName;
        this.about = options.domElement.userAbout;
        this.userInfoName = document.querySelector('.user-info__name');
        this.userInfoJob = document.querySelector('.user-info__job');
    }

    listenForm() {
        this.api.editUserProfile({ name: this.name.value, about: this.about.value })
            .then((res) => {
                this.fullfillForm(res.name, res.about);
            })
            .then(loader.style.display = 'none')
            .then(this.close())
            .catch(error => alert(error));
    }

    fullfillForm(name, about) {
        this.userInfoName.textContent = `${name}`;
        this.userInfoJob.textContent = `${about}`;

        this.name.setAttribute('value', `${name}`);
        this.about.setAttribute('value', `${about}`);
    }
}