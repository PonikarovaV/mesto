'use strict';

import './pages/index.css';
import {errorMessages} from './scripts/enums/error_messages.js';
import {Api} from './scripts/modules/Api.js';
import {Card} from './scripts/modules/Card.js';
import {CardList} from './scripts/modules/CardList.js';
import {Gallery} from './scripts/modules/Gallery.js';
import {Profile} from './scripts/modules/Profile';
import {Avatar} from './scripts/modules/Avatar.js';
import {Preview} from './scripts/modules/Preview';
import {Validation} from './scripts/modules/Validation';

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

// const serverUrl = NODE_ENV === 'development' ? 'http://95.216.175.5/cohort6' : 'https://95.216.175.5/cohort6';
const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort6' : 'https://praktikum.tk/cohort6';
// экземпляры классов
const api = new Api({
    baseUrl: serverUrl,
    headers: {
        authorization: 'fb601636-bec8-45e8-8de7-0be5453f9835',
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
    request: api,
    loading: loader
});
const gallery = new Gallery({
    domElement: formNew,
    request: api,
    addCards: cardsGallery,
    loading: loader
});
const avatar = new Avatar({
    domElement: formAvatar,
    request: api,
    loading: loader
});
const preview = new Preview({
    domElement: popupPicture,
    loading: loader
});

// обращение к методам классов/загрузка страницы
function loaderPage() {
    loader.classList.add('loader_active');
    api.getPage()
        .then(([user, cards]) => {
            profile.fullfillForm(user.name, user.about);
            avatar.changeAvatar(user.avatar);
            cardsGallery.render(cards, user._id);
        })
        .then(() => {
            loader.classList.remove('loader_active');
        })
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
    loader.classList.add('loader_active');
    profile.listenForm();
});

formNew.addEventListener('submit', () => {
    event.preventDefault();
    loader.classList.add('loader_active');
    gallery.listenForm();
});

formAvatar.addEventListener('submit', () => {
    event.preventDefault();
    loader.classList.add('loader_active');
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
