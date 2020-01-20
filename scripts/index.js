'use strict';

// переменные
const placesList = document.querySelector('.places-list');
const popupEdit = document.querySelector('.popup__edit-form');
const popupAdd = document.querySelector('.popup__add-form');
const popupImg = document.querySelector('.popup__img');
const popupAvatar = document.querySelector('.popup__edit-avatar-form');
const closeButton = document.querySelectorAll('.popup__close');
const addButton = document.querySelector('.popup__button_add');
const editButton = document.querySelector('.popup__button_save');
const avatarButton = document.querySelector('.popup__button_avatar');
const popupInputsAddForm = document.querySelectorAll('.popup__input_add-card');
const popupInputsEditForm = document.querySelectorAll('.popup__input_edit-profile');
const userPhoto = document.querySelector('.user-info__photo');
const userName = document.querySelector('.user-info__name');
const userAbout = document.querySelector('.user-info__job');


// получение форм
const formNew = document.forms.new;
const formEdit = document.forms.editProfile;
const formAvatar = document.forms.editAvatar;

// инстансы классов
const api = new Api({
    baseUrl: 'http://95.216.175.5/cohort6',
    headers: {
        authorization: 'fb601636-bec8-45e8-8de7-0be5453f9835',
        'Content-Type': 'application/json'
    }
});
const validation = new Validation(errorMessages);
const card = new Card(api);
const cardsGallery = new CardList(placesList, card);
const popup = new Popup(validation);
const gallery = new Gallery(validation, api, cardsGallery);
const profile = new Profile(validation, api);
const avatar = new Avatar(validation, api);



// обращение к методам классов/загрузка страницы
function loaderPage() {
    document.querySelector('.loader').style.display = 'block';
    api.getPage()
        .then(([user, cards]) => {
            profile.fullfillForm(user.name, user.about);
            avatar.changeAvatar(user.avatar);
            cardsGallery.render(cards, user._id);
        })
        .then(() => {document.querySelector('.loader').style.display = 'none'})
        .catch(error => alert(error));
}

loaderPage();


// слушатели лайк/удаление
placesList.addEventListener('click', function (event) {

    if (event.target.matches('.place-card__delete-icon')) {
        
        if (window.confirm('Разрушать не строить... Всё равно удалим? :(')) {
            card.remove(event);
        } else {
            alert('Ну слава богу ;)');
        }

    }

    if (event.target.matches('.place-card__like-icon')) {
        card.like(event);
    }

});

// слушатели открытие/закрытие попапов
document.addEventListener('click', function (event) {
    popup.open(event);
});

document.addEventListener('click', function (event) {
    popup.close(event);
});

// popup добавление карточек
formNew.addEventListener('submit', function (event) {

    event.preventDefault();

    document.querySelector('.loader').style.display = 'block';

    gallery.listenForm(event.target);

    addButton.setAttribute('disabled', true);
    addButton.classList.add('popup__button_disabled');

});

// popup редактирование профиля
formEdit.addEventListener('submit', function (event) {

    event.preventDefault();

    document.querySelector('.loader').style.display = 'block';

    profile.listenForm(event.target);

});

// popup смена аватара
formAvatar.addEventListener('submit', function (event) {

    event.preventDefault();

    document.querySelector('.loader').style.display = 'block';

    avatar.listenForm(event.target);

    avatarButton.setAttribute('disabled', true);
    avatarButton.classList.add('popup__button_disabled');
});

// // слушатели на все инпуты формы Add
// popupInputsAddForm.forEach((input) => {

//     input.addEventListener('input', () => {

//         console.log(input.setCustomValidity(''));
//         // validation.inputValidate(input);
//         // validation.checkFildsAddForm(addButton);

//     });

// });

// // слушатели на все инпуты формы Edit
// popupInputsEditForm.forEach((input) => {

//     input.addEventListener('input', () => {

//         validation.inputValidate(input);
//         validation.checkFildsEditForm(editButton);

//     });

// });

// // слушатель на инпуты формы Avatar
// document.querySelector('.popup__input_avatar').addEventListener('input', () => {
//     validation.inputValidate(event.target);
//     validation.checkFildsAvatarForm(avatarButton);
// });

function setInputsListeners() {
    let inputs = Array.from(document.getElementsByClassName('popup__input'));
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validation.inputValidate(input);
        });
    });
}
setInputsListeners();

