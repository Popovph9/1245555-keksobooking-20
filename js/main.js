'use strict';

var PINS = 8;
var AVATAR = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var ADDRESS = '600, 350';
var FLAT_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAP_WIDTH = 1200;
var MAP_HEIGHT = 750;
var MAP_RANGEX_MIN = 50;
var MAP_RANGEX_MAX = 1110;
var MAP_RANGEY_MIN = 130;
var MAP_RANGEY_MAX = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAINPIN_WIDTH = 62;
var MAINPIN_HEIGHT = 84;
var PHOTO_SIZE = {
  'width': 45,
  'height': 40
};
var ROOMS = {
  'one': '1',
  'two': '2',
  'three': '3',
  'hundred': '100'
};
var VISITORS = {
  'one': 1,
  'two': 2,
  'three': 3,
  'hundred': 0
};
var ROOM_OPTIONS = {
  'bungalo': 'bungalo',
  'flat': 'flat',
  'house': 'house',
  'palace': 'palace'
};
var NIGHT_PRICES = {
  'bungalo': '0',
  'flat': '1 000',
  'house': '5 000',
  'palace': '10 000'
};
var IN_OUT = {
  'noon': '12:00',
  'one': '13:00',
  'two': '14:00'
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

var mainPin = document.querySelector('.map__pin--main');

var map = document.querySelector('.map');

var mapFilters = document.querySelector('.map__filters');
mapFilters.classList.add('map__filters--disabled');

var mainForm = document.querySelector('.ad-form');

var filds = document.querySelectorAll('fieldset');


var hideFields = function (arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    arr[i].setAttribute('disabled', 'disabled');
  }
  return arr;
};

hideFields(filds);

var showFeilds = function (arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    arr[i].removeAttribute('disabled', 'disabled');
  }
  return arr;
};

var addresField = mainForm.querySelector('#address');

var mainPinCenterX = Math.round(MAP_WIDTH / 2);

var mainPinCenterY = Math.round(MAP_HEIGHT / 2 + MAINPIN_WIDTH / 2);

addresField.value = mainPinCenterX + ',' + mainPinCenterY;

var getAddres = function (x, y) {
  var coordX = x + MAINPIN_WIDTH / 2;
  var coordY = y + MAINPIN_HEIGHT;
  addresField.value = coordX + ',' + coordY;
};

var mainPinDragHandler = function (evt) {
  if (evt.which === 1) {
    getStarted();
    renderPins(notifications);
  }
};

var mainPinKeyHandler = function (evt) {
  if (evt.key === 'Enter') {
    getStarted();
    renderPins(notifications);
  }
};

mainPin.addEventListener('mousedown', mainPinDragHandler);
mainPin.addEventListener('keydown', mainPinKeyHandler);

var getStarted = function () {
  map.classList.remove('map--faded');
  mapFilters.classList.remove('map__filters--disabled');
  mainForm.classList.remove('ad-form--disabled');
  showFeilds(filds);
  getAddres(mainPinCenterX - MAINPIN_WIDTH / 2, mainPinCenterY - MAINPIN_WIDTH / 2);
  roomFeild.addEventListener('change', guestFieldChangeHandler);
  guestField.addEventListener('click', guestFieldChangeHandler);
  typeField.addEventListener('change', typeFiledCgangeHandler);
  priceField.addEventListener('click', typeFiledCgangeHandler);
  arriveField.addEventListener('change', inFieldsChangheHandler);
  departField.addEventListener('change', OutFieldsChangheHandler);
  resetButton.addEventListener('click', resetButtonClickHandler);
  mainPin.removeEventListener('mousedown', mainPinDragHandler);
  mainPin.removeEventListener('keydown', mainPinKeyHandler);
};

var resetPage = function () {
  map.classList.add('map--faded');
  mapFilters.classList.add('map__filters--disabled');
  mainForm.classList.add('ad-form--disabled');
  hideFields(filds);
  mainPin.addEventListener('mousedown', mainPinDragHandler);
  mainPin.addEventListener('keydown', mainPinKeyHandler);
  roomFeild.removeEventListener('change', guestFieldChangeHandler);
  guestField.removeEventListener('click', guestFieldChangeHandler);
  typeField.removeEventListener('change', typeFiledCgangeHandler);
  priceField.removeEventListener('click', typeFiledCgangeHandler);
  arriveField.removeEventListener('change', inFieldsChangheHandler);
  departField.removeEventListener('change', OutFieldsChangheHandler);
  resetButton.removeEventListener('click', resetButtonClickHandler);
  cardRemover();
};

var resetButtonClickHandler = function () {
  resetPage();
};

var resetButton = document.querySelector('.ad-form__reset');

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
      y: getRandomInRange(MAP_RANGEY_MIN, MAP_RANGEY_MAX - PIN_HEIGHT) + PIN_HEIGHT
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
    pinFragment.querySelector('img').classList.add('pin' + i);
    pinFragment.classList.add('pin' + i);
    pinsOnMap.appendChild(pinFragment);
  }

  var currentPins = document.querySelectorAll('.map__pin');
  currentPins.forEach(function (currentPin) {
    currentPin.addEventListener('click', pinClickHandler);
    if (currentPin.classList.contains('map__pin--main')) {
      currentPin.removeEventListener('click', pinClickHandler);
    }
  });

  return pinsOnMap;
};

var pinClickHandler = function (evt) {
  if (evt.target.classList.contains('pin0')) {
    renderCard(notifications[0]);
  } else if (evt.target.classList.contains('pin1')) {
    renderCard(notifications[1]);
  } else if (evt.target.classList.contains('pin2')) {
    renderCard(notifications[2]);
  } else if (evt.target.classList.contains('pin3')) {
    renderCard(notifications[3]);
  } else if (evt.target.classList.contains('pin4')) {
    renderCard(notifications[4]);
  } else if (evt.target.classList.contains('pin5')) {
    renderCard(notifications[5]);
  } else if (evt.target.classList.contains('pin6')) {
    renderCard(notifications[6]);
  } if (evt.target.classList.contains('pin7')) {
    renderCard(notifications[7]);
  }
};

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

var renderCard = function (obj) {

  var closeButton = cardFragment.querySelector('.popup__close');
  var removeCard = function () {
    var card = document.querySelector('article');
    card.remove(card);
  };
  var closeButtonClickhandler = function () {
    removeCard();
    closeButton.removeEventListener('click', closeButtonClickhandler);
    window.removeEventListener('keydown', closeButtonKeyHandler);
  };
  var closeButtonKeyHandler = function (evt) {
    if (evt.key === 'Escape') {
      removeCard();
      closeButton.removeEventListener('click', closeButtonClickhandler);
      window.removeEventListener('keydown', closeButtonKeyHandler);
    }
  };

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
};

var cardRemover = function () {
  var card = document.querySelector('article');
  var removeCard = function () {
    card.remove(card);
  };

  if (~card) {
    removeCard();
  }
};


var roomFeild = mainForm.querySelector('#room_number');
var guestField = mainForm.querySelector('#capacity');
var guestFieldOptions = guestField.querySelectorAll('option');

var setGuests = function () {
  if (roomFeild.value === ROOMS.one) {
    guestField.value = VISITORS.one;
    guestFieldOptions[0].setAttribute('disabled', 'disabled');
    guestFieldOptions[1].setAttribute('disabled', 'disabled');
    guestFieldOptions[2].removeAttribute('disabled', 'disabled');
    guestFieldOptions[3].setAttribute('disabled', 'disabled');
  } else if (roomFeild.value === ROOMS.two) {
    guestField.value = VISITORS.two;
    guestFieldOptions[0].setAttribute('disabled', 'disabled');
    guestFieldOptions[1].removeAttribute('disabled', 'disabled');
    guestFieldOptions[2].removeAttribute('disabled', 'disabled');
    guestFieldOptions[3].setAttribute('disabled', 'disabled');
  } else if (roomFeild.value === ROOMS.three) {
    guestField.value = VISITORS.three;
    guestFieldOptions[0].removeAttribute('disabled', 'disabled');
    guestFieldOptions[1].removeAttribute('disabled', 'disabled');
    guestFieldOptions[2].removeAttribute('disabled', 'disabled');
    guestFieldOptions[3].setAttribute('disabled', 'disabled');
  } else if (roomFeild.value === ROOMS.hundred) {
    guestField.value = VISITORS.hundred;
    guestFieldOptions[0].setAttribute('disabled', 'disabled');
    guestFieldOptions[1].setAttribute('disabled', 'disabled');
    guestFieldOptions[2].setAttribute('disabled', 'disabled');
    guestFieldOptions[3].removeAttribute('disabled', 'disabled');
  }
};

var typeField = mainForm.querySelector('#type');
var priceField = mainForm.querySelector('#price');

var setPrice = function () {
  if (typeField.value === ROOM_OPTIONS.bungalo) {
    priceField.min = NIGHT_PRICES.bungalo;
    priceField.placeholder = NIGHT_PRICES.bungalo;
  } else if (typeField.value === ROOM_OPTIONS.flat) {
    priceField.min = NIGHT_PRICES.flat;
    priceField.placeholder = NIGHT_PRICES.flat;
  } else if (typeField.value === ROOM_OPTIONS.house) {
    priceField.min = NIGHT_PRICES.house;
    priceField.placeholder = NIGHT_PRICES.house;
  } else if (typeField.value === ROOM_OPTIONS.palace) {
    priceField.min = NIGHT_PRICES.palace;
    priceField.placeholder = NIGHT_PRICES.palace;
  }
};

var arriveField = mainForm.querySelector('#timein');
var departField = mainForm.querySelector('#timeout');

var setIn = function () {
  if (arriveField.value === IN_OUT.noon) {
    departField.value = IN_OUT.noon;
  } else if (arriveField.value === IN_OUT.one) {
    departField.value = IN_OUT.one;
  } else if (arriveField.value === IN_OUT.two) {
    departField.value = IN_OUT.two;
  }
};

var setOut = function () {
  if (departField.value === IN_OUT.noon) {
    arriveField.value = IN_OUT.noon;
  } else if (departField.value === IN_OUT.one) {
    arriveField.value = IN_OUT.one;
  } else if (departField.value === IN_OUT.two) {
    arriveField.value = IN_OUT.two;
  }
};


var inFieldsChangheHandler = function () {
  setIn();
};

var OutFieldsChangheHandler = function () {
  setOut();
};

var typeFiledCgangeHandler = function () {
  setPrice();
};

var guestFieldChangeHandler = function () {
  setGuests();
};

addresField.setAttribute('readonly', 'readonly');
