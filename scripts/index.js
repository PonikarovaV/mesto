'use strict';

// получение форм
const formNew = document.forms.new;
const formProfile = document.forms.profile;
const formAvatar = document.forms.avatar;

// переменные
const loader = document.querySelector('.loader');
const placesList = document.querySelector('.places-list');
const popupPicture = document.querySelector('.popup__picture');
const image = document.querySelector('.popup__image');
const popupProfile = document.forms.profile.parentNode;
const popupAddCard = document.forms.new.parentNode;
const popupAvatar = document.forms.avatar.parentNode;

// кнопки
const editButton = document.querySelector('.user-info__edit-button');
const addCardButton = document.querySelector('.user-info__button');
const avatarButton = document.querySelector('.user-info__photo');
const closeProfile = popupProfile.querySelector('.popup__close');
const closeNew = popupAddCard.querySelector('.popup__close');
const closeAvatar = popupAvatar.querySelector('.popup__close');
const closePicture = popupPicture.querySelector('.popup__close');


// экземпляры классов
const api = new Api({
    baseUrl: 'http://95.216.175.5/cohort6',
    headers: {
        authorization: '...',
        'Content-Type': 'application/json'
    }
});

const profileValidity = new Validation(formProfile, errorMessages);
const newValidity = new Validation(formNew, errorMessages);
const avatarValidity = new Validation(formAvatar, errorMessages);
const card = new Card(api);
const cardsGallery = new CardList(placesList, card);
const profile = new Profile({
    domElement: formProfile,
    request: api
});
const gallery = new Gallery({
    domElement: formNew,
    request: api,
    addCards: cardsGallery
});
const avatar = new Avatar({
    domElement: formAvatar,
    request: api
});
const preview = new Preview({
    domElement: popupPicture
});

// обращение к методам классов/загрузка страницы
function loaderPage() {
    loader.style.display = 'block';
    api.getPage()
        .then(([user, cards]) => {
            profile.fullfillForm(user.name, user.about);
            avatar.changeAvatar(user.avatar);
            cardsGallery.render(cards, user._id);
        })
        .then(() => {loader.style.display = 'none'})
        .catch(error => alert(error));
}

loaderPage();

// открытие попапов
editButton.addEventListener('click', function() {
    profile.open();
    profileValidity.setEventListeners();
});

addCardButton.addEventListener('click', function() {
    gallery.open();
    newValidity.setEventListeners();
});

avatarButton.addEventListener('click', function() {
    avatar.open();
    avatarValidity.setEventListeners();
});

placesList.addEventListener('click', (event) => {
    if (event.target.matches('.place-card__image')) {
        preview.open();
        image.src = event.target.dataset.src;
    }
});

// закрытие попапов
closeProfile.addEventListener('click', function() {
    profile.close();
});

closeNew.addEventListener('click', function() {
    gallery.close();
});

closeAvatar.addEventListener('click', function() {
    avatar.close();
});

closePicture.addEventListener('click', function() {
    preview.close();
});

// слушатели форм
formProfile.addEventListener('submit', (event) => {
    event.preventDefault();
    loader.style.display = 'block';
    profile.listenForm();
});

formNew.addEventListener('submit', () => {
    event.preventDefault();
    loader.style.display = 'block';
    gallery.listenForm();
});

formAvatar.addEventListener('submit', () => {
    event.preventDefault();
    loader.style.display = 'block';
    avatar.listenForm();
});

// слушатели лайк/удаление
placesList.addEventListener('click', function (event) {
    if (event.target.matches('.place-card__delete-icon')) { 
        if (window.confirm('Разрушать не строить... Всё равно удалим? :(')) {
            card.remove(event);
        } else {
            alert('Отлично! ;)');
        }
    }

    if (event.target.matches('.place-card__like-icon')) {
        card.like(event);
    }
});
