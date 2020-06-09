'use strict';

var PINS = 8;
var AVATAR = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var FLAT_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00',  '14:00'];
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
  arr.length = getRandomInRange(1, arr.length - 1);
  return arr;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var createNotification = function (avatarImg, flatType, arrive, depart, perks, photo) {
  var notificationArray = [];
  for (var i = 0; i < PINS; i++) {
    var customNotification = {
      author: {
        avatar: avatarImg[i],
      },
      offer: {
        title: 'заголовок предложения',
        address: "600, 350",
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
    }
    notificationArray.push(customNotification);
  }
  return notificationArray;
};

var notifications = createNotification(AVATAR, FLAT_TYPE, CHECKIN, CHECKOUT, FEATURES, PHOTOS);

var pinsOnMap = document.querySelector('.map__pins');
var similarPin = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPins = function (arr) {
  for (var i = 0; i < PINS; i++) {
    var fragment = similarPin.cloneNode(true);
    fragment.style.left = arr[i].location.x  + 'px';
    fragment.style.top = arr[i].location.y  + 'px';
    fragment.querySelector('img').src = arr[i].author.avatar;
    fragment.querySelector('img').alt = arr[i].offer.title;
    pinsOnMap.appendChild(fragment);
  }
  return pinsOnMap;
};

renderPins(notifications);
