class Api {
    constructor(options) {

        this.baseUrl = options.baseUrl;
        this.headers = options.headers;

    }

    // запрос карточек и профиля
    getPage() {
        return Promise.all([this.getUserInfo(), this.getCards()]);
    }

    // запрос профиля
    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Что-то пошло не так... ${res.status}`);
            });
    }

    // запрос галереи карточек
    getCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Что-то пошло не так... ${res.status}`);
            });
    }

    // редактирование профиля
    editUserProfile(user) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: user.name,
                about: user.about,
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Что-то пошло не так... ${res.status}`);
            });
    }

    // добавление карточки через форму
    addCardGallery(card) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: card.name,
                link: card.link
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Что-то пошло не так... ${res.status}`);
            });
    }

    // удаление карточки
    deleteCard(cardElement) {
        return fetch(`${this.baseUrl}/cards/${cardElement.dataset.id}`, {
            method: 'DELETE',
            headers: this.headers,
            body: JSON.stringify({
                _id: cardElement.dataset.id,
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Что-то пошло не так... ${res.status}`);
            });
    }

    // добавление/удаление лайка
    likeCard(cardElement, method) {
        return fetch(`${this.baseUrl}/cards/like/${cardElement.dataset.id}`, {
            method: `${method}`,
            headers: this.headers,
            body: JSON.stringify({
                likes: cardElement.likes,
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Что-то пошло не так... ${res.status}`);
            });
    }

    // смена аватара
    changeAvatar(avatar) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: avatar,
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Что-то пошло не так... ${res.status}`);
            });
    }
}

export {Api};