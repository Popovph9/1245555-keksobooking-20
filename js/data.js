'use strict';

window.data = (function () {
  var PINS = 8;
  var AVATAR = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
  var ADDRESS = '600, 350';
  var FLAT_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAP_RANGEX_MIN = 50;
  var MAP_RANGEX_MAX = 1110;
  var MAP_RANGEY_MIN = 130;
  var MAP_RANGEY_MAX = 630;

  var createNotification = function (avatarImg, position, flatType, arrive, depart, perks) {
    return {
      author: {
        avatar: avatarImg,
      },
      offer: {
        title: 'заголовок предложения',
        address: position,
        price: window.rand.getRandomInRange(1000, 10000),
        type: flatType[window.rand.getRandomInRange(0, flatType.length - 1)],
        rooms: window.rand.getRandomInRange(1, 3),
        guests: window.rand.getRandomInRange(1, 3),
        checkin: arrive[window.rand.getRandomInRange(0, arrive.length - 1)],
        checkout: depart[window.rand.getRandomInRange(0, depart.length - 1)],
        feature: window.rand.getRandomArray(perks),
        description: 'описание предложения',
        photos: window.rand.getRandomArray(PHOTOS)
      },
      location: {
        x: window.rand.getRandomInRange(MAP_RANGEX_MIN, MAP_RANGEX_MAX) + PIN_WIDTH / 2,
        y: window.rand.getRandomInRange(MAP_RANGEY_MIN, MAP_RANGEY_MAX - PIN_HEIGHT) + PIN_HEIGHT
      }
    };
  };

  var createNotifications = function (avatarImg, position, flatType, arrive, depart, perks, photo) {
    var notificationArray = [];
    for (var i = 0; i < PINS; i++) {
      var notification = createNotification(avatarImg[i], position, flatType, arrive, depart, perks, photo);
      notificationArray.push(notification);
    }
    return notificationArray;
  };

  return {
    PINS: 8,
    notifications: createNotifications(AVATAR, ADDRESS, FLAT_TYPE, CHECKIN, CHECKOUT, FEATURES, PHOTOS)
  };
})();
