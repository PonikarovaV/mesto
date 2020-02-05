class Card {
    constructor(api) {

        this.api = api;

    }
    // лайки
    like(event) {

        if (event.target.matches('.place-card__like-icon') && 
          !(event.target.matches('.place-card__like-icon_liked'))) {
            this.api.likeCard(event.target.closest('.place-card'), 'PUT')
            .then(res => {
                event.target.classList.add('place-card__like-icon_liked');
                event.target.nextElementSibling.textContent = `${res.likes.length}`;
            })
            .catch(error => alert(error));
        } else if (event.target.matches('.place-card__like-icon_liked')) {
            this.api.likeCard(event.target.closest('.place-card'), 'DELETE')
            .then(res => {
                event.target.classList.remove('place-card__like-icon_liked');
                event.target.nextElementSibling.textContent = `${res.likes.length}`;
            })
            .catch(error => alert(error));
        }

    }
    // удаление карточек
    remove(event) {

        this.api.deleteCard(event.target.closest('.place-card'))
        .then(event.target.parentNode.closest('.places-list').removeChild(event.target.closest('.place-card')))
        .catch(error => alert(error));

    }

    // проверка активного лайка юзера
    checkLikes(likes, id) {

        let like = likes.some( el => el._id === id );

        if (like) {
            return 'place-card__like-icon_liked';
        }

    }

    // проверка кнопки удаления
    checkDeleteBox(card, id) {
        
        if (!(card.owner._id === id)) {
            return 'display: none';
        }

    }

    //шаблон карточки
    create(card, id) {
        
            return `<div class="place-card" data-id="${card._id}">
                  <div class="place-card__image" data-src="${card.link}" style="background-image: url(${card.link})">
                      <button class="place-card__delete-icon" style="${this.checkDeleteBox(card, id)}"></button>
                  </div>
                  <div class="place-card__description">
                      <h3 class="place-card__name">${card.name}</h3>
                      <div class="place-card__like-group">
                        <button class="place-card__like-icon ${this.checkLikes(card.likes, id)}"></button>
                        <p class="place-card__like-counter">${card.likes.length}</p>
                      </div>
                  </div>
              </div>`;

    }
}

export {Card};