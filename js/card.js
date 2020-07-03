'use strict';

window.card = (function () {
  var PHOTO_SIZE = {
    'width': 45,
    'height': 40
  };
  var ESCAPE_NUM = 'Escape';

  var cardsOnMap = document.querySelector('.map__filters-container');
  var similarCard = document.querySelector('#card').content.querySelector('.map__card');
  var cardFragment = similarCard.cloneNode(true);

  var removeChildren = function (parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };

  var renderPhoto = function (parentNode, photos) {
    removeChildren(parentNode);

    for (var i = 0; i < photos.length; i++) {
      var photoElement = document.createElement('img');

      photoElement.src = photos[i];
      photoElement.classList.add('popup__photo');
      photoElement.width = PHOTO_SIZE.width;
      photoElement.height = PHOTO_SIZE.height;

      parentNode.appendChild(photoElement);
    }
  };

  var renderFeature = function (parentNode, features) {
    removeChildren(parentNode);

    for (var i = 0; i < features.length; i++) {
      var featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature', 'popup__feature--' + features[i]);

      parentNode.appendChild(featureItem);
    }
  };

  return {
    renderCard: function (obj) {

      var closeButton = cardFragment.querySelector('.popup__close');
      var removeCard = function () {
        var card = document.querySelector('article');
        if (~card) {
          card.remove(card);
        }
      };

      var closeButtonKeyHandler = function (evt) {
        if (evt.key === ESCAPE_NUM) {
          removeCard();
          closeButton.removeEventListener('click', closeButtonClickhandler);
          window.removeEventListener('keydown', closeButtonKeyHandler);
        }
      };

      var closeButtonClickhandler = function () {
        removeCard();
        closeButton.removeEventListener('click', closeButtonClickhandler);
        window.removeEventListener('keydown', closeButtonKeyHandler);
      };

      window.addEventListener('keydown', closeButtonKeyHandler);
      closeButton.addEventListener('click', closeButtonClickhandler);
      window.addEventListener('keydown', closeButtonKeyHandler);

      cardFragment.querySelector('.popup__avatar').src = obj.author.avatar;
      cardFragment.querySelector('.popup__title').textContent = obj.offer.title;
      cardFragment.querySelector('.popup__text--address').textContent = obj.offer.address;
      cardFragment.querySelector('.popup__text--price').textContent = obj.offer.price + '₽/ночь';

      var placeType = obj.offer.type;
      if (obj.offer.type === 'palace') {
        placeType = 'Дворец';
      } else if (obj.offer.type === 'flat') {
        placeType = 'Квартира';
      } else if (obj.offer.type === 'house') {
        placeType = 'Дом';
      } else if (obj.offer.type === 'bungalo') {
        placeType = 'Бунгало';
      }

      cardFragment.querySelector('.popup__type').textContent = placeType;
      cardFragment.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
      cardFragment.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ',' + ' выезд до ' + obj.offer.checkout;

      var cardFeatures = cardFragment.querySelector('.popup__features');

      renderFeature(cardFeatures, obj.offer.feature);

      cardFragment.querySelector('.popup__description').textContent = obj.offer.description;

      var cardPhotos = cardFragment.querySelector('.popup__photos');

      renderPhoto(cardPhotos, obj.offer.photos);

      cardsOnMap.before(cardFragment);
    },

    cardRemover: function () {
      var card = document.querySelector('article');
      card.remove(card);
    }
  };
})();
