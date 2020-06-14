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
var PHOTO_SIZE = {
  'width': 45,
  'height': 40
};

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);

  return Math.round(rand);
};

var getRandomArray = function (array) {
  var anotherArray = [];

  array.forEach(function (item) {
    if (getRandomInteger(0, 1) === 1) {
      anotherArray.push(item);
    }
  });

  return anotherArray;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var createNotification = function (avatarImg, position, flatType, arrive, depart, perks) {
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
      photos: getRandomArray(PHOTOS)
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

  var cardFeatures = cardFragment.querySelector('.popup__features');

  renderFeature(cardFeatures, arr[0].offer.feature);

  cardFragment.querySelector('.popup__description').textContent = arr[0].offer.description;

  var cardPhotos = cardFragment.querySelector('.popup__photos');

  renderPhoto(cardPhotos, arr[0].offer.photos);

  cardsOnMap.before(cardFragment);
};

renderCard(notifications);
