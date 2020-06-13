'use strict';

var PINS = 8;
var AVATAR = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var ADDRESS = '600, 350';
var FLAT_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAP_RANGEX_MIN = 50;
var MAP_RANGEX_MAX = 1110;
var MAP_RANGEY_MIN = 130;
var MAP_RANGEY_MAX = 630;
var PIN_WIDTH = 50;

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArray = function (arr) {
  arr.length = getRandomInRange(1, arr.length);
  return arr;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var createNotification = function (avatarImg, position, flatType, arrive, depart, perks, photo) {
  var customNotification = {
    author: {
      avatar: avatarImg,
    },
    offer: {
      title: 'заголовок предложения',
      address: position,
      price: getRandomInRange(1000, 10000),
      type: flatType[getRandomInRange(0, flatType.length - 1)],
      rooms: getRandomInRange(1, 4),
      guests: getRandomInRange(1, 4),
      checkin: arrive[getRandomInRange(0, arrive.length - 1)],
      checkout: depart[getRandomInRange(0, depart.length - 1)],
      feature: getRandomArray(perks),
      description: 'описание предложения',
      photos: getRandomArray(photo)
    },
    location: {
      x: getRandomInRange(MAP_RANGEX_MIN, MAP_RANGEX_MAX) + PIN_WIDTH / 2,
      y: getRandomInRange(MAP_RANGEY_MIN, MAP_RANGEY_MAX)
    }
  };
  return customNotification;
};

var createNotifications = function (avatarImg, position, flatType, arrive, depart, perks, photo) {
  var notificationArray = [];
  for (var i = 0; i < PINS; i++) {
    var notification = createNotification(avatarImg[i], position, flatType, arrive, depart, perks, photo);
    notificationArray.push(notification);
  }
  return notificationArray;
};

var notifications = createNotifications(AVATAR, ADDRESS, FLAT_TYPE, CHECKIN, CHECKOUT, FEATURES, PHOTOS);

var pinsOnMap = document.querySelector('.map__pins');
var similarPin = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPins = function (arr) {
  for (var i = 0; i < PINS; i++) {
    var pinFragment = similarPin.cloneNode(true);
    pinFragment.style.left = arr[i].location.x + 'px';
    pinFragment.style.top = arr[i].location.y + 'px';
    pinFragment.querySelector('img').src = arr[i].author.avatar;
    pinFragment.querySelector('img').alt = arr[i].offer.title;
    pinsOnMap.appendChild(pinFragment);
  }
  return pinsOnMap;
};

renderPins(notifications);

var cardsOnMap = document.querySelector('.map__filters-container');
var similarCard = document.querySelector('#card').content.querySelector('.map__card');
var cardFragment = similarCard.cloneNode(true);

var createPhoto = function (className, alt, width, height, src) {
  var customPhoto = document.createElement('img');
  customPhoto.classList.add(className);
  cardFragment.querySelector('.popup__photo').src = src;
  customPhoto.alt = alt;
  customPhoto.style.width = width;
  customPhoto.style.height = height;
  return customPhoto;
};


var renderCard = function (arr) {
  cardFragment.querySelector('.popup__avatar').src = arr[0].author.avatar;
  cardFragment.querySelector('.popup__title').textContent = arr[0].offer.title;
  cardFragment.querySelector('.popup__text--address').textContent = arr[0].offer.address;
  cardFragment.querySelector('.popup__text--price').textContent = arr[0].offer.price + '₽/ночь';

  var placeType = arr[0].offer.type;
  if (arr[0].offer.type === 'palace') {
    placeType = 'Дворец';
  } else if (arr[0].offer.type === 'flat') {
    placeType = 'Квартира';
  } else if (arr[0].offer.type === 'house') {
    placeType = 'Дом';
  } else if (arr[0].offer.type === 'bungalo') {
    placeType = 'Бунгало';
  }

  cardFragment.querySelector('.popup__type').textContent = placeType;
  cardFragment.querySelector('.popup__text--capacity').textContent = arr[0].offer.rooms + ' комнаты для ' + arr[0].offer.guests + ' гостей';
  cardFragment.querySelector('.popup__text--time').textContent = 'Заезд после ' + arr[0].offer.checkin + ',' + ' выезд до ' + arr[0].offer.checkout;

  var featureBlock = cardFragment.querySelector('.popup__features');
  var featuresList = featureBlock.children;
  var selectedFeatures = arr[0].offer.feature;


  if (featuresList.length !== selectedFeatures.length) {
    for (var j = 0; j < featuresList.length; j++) {
      if (featuresList[j].className === 'popup__feature popup__feature--' + selectedFeatures[j]) {
        featuresList[j].style.backgroundColor = 'white';
      } else {
        featuresList[j].remove();
      }
    }
  }

  cardFragment.querySelector('.popup__description').textContent = arr[0].offer.description;

  if (arr[0].offer.photos.length > 1) {
    for (var i = 0; i < arr[0].offer.photos.length - 1; i++) {
      var photosList = cardFragment.querySelector('.popup__photos');
      var customPhoto = createPhoto('popup__photo', 'Фотография жилья', '45', '40', arr[0].offer.photos[i]);
      photosList.appendChild(customPhoto);
    }
  } else {
    cardFragment.querySelector('.popup__photo').src = arr[0].offer.photos[0];
  }

  cardsOnMap.before(cardFragment);
};

renderCard(notifications);
