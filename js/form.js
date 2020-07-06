'use strict';

window.form = (function () {
  var MAINPIN_WIDTH = 65;
  var MAINPIN_HEIGHT = 82;
  var MAP_WIDTH = 1200;
  var MAP_HEIGHT = 750;
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
  var mainContent = document.querySelector('main');

  var mainForm = document.querySelector('.ad-form');
  var roomFeild = mainForm.querySelector('#room_number');
  var guestField = mainForm.querySelector('#capacity');
  var guestFieldOptions = guestField.querySelectorAll('option');
  var addresField = mainForm.querySelector('#address');

  var mainPinCenterX = Math.round(MAP_WIDTH / 2);
  var mainPinCenterY = Math.round(MAP_HEIGHT / 2 + MAINPIN_WIDTH / 2);

  addresField.value = mainPinCenterX + ',' + mainPinCenterY;

  addresField.setAttribute('readonly', 'readonly');

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

  return {
    MAINPIN_WIDTH: 62,
    MAP_WIDTH: 1200,
    MAINPIN_HEIGHT: 84,

    mainForm: document.querySelector('.ad-form'),

    mainPinCenterX: Math.round(MAP_WIDTH / 2),

    mainPinCenterY: Math.round(MAP_HEIGHT / 2 + MAINPIN_WIDTH / 2),

    roomFeild: mainForm.querySelector('#room_number'),

    guestField: mainForm.querySelector('#capacity'),

    typeField: mainForm.querySelector('#type'),

    priceField: mainForm.querySelector('#price'),

    arriveField: mainForm.querySelector('#timein'),

    departField: mainForm.querySelector('#timeout'),

    getAddres: function (x, y) {
      var coordX = Math.round(x + MAINPIN_WIDTH / 2);
      var coordY = Math.round(y + MAINPIN_HEIGHT);
      addresField.value = coordX + ',' + coordY;
    },

    inFieldsChangeHandler: function () {
      setIn();
    },

    outFieldsChangeHandler: function () {
      setOut();
    },

    typeFiledChangeHandler: function () {
      setPrice();
    },

    guestFieldChangeHandler: function () {
      setGuests();
    },

    createErrorMessage: function () {
      var errorform = document.querySelector('#error').content.querySelector('.error');
      var errorMessage = errorform.cloneNode(true);
      var errorButton = errorMessage.querySelector('.error__button');

      var messageRemover = function () {
        errorMessage.remove();

        errorButton.removeEventListener('click', messageRemover);
        window.removeEventListener('click', messageRemover);
        window.removeEventListener('keydown', closeButtonKeyHandler);
      };

      var closeButtonKeyHandler = function (evt) {
        if (evt.key === window.card.ESCAPE_NUM) {
          errorMessage.remove();

          errorButton.removeEventListener('click', messageRemover);
          window.removeEventListener('click', messageRemover);
          window.removeEventListener('keydown', closeButtonKeyHandler);
        }
      };

      errorButton.addEventListener('click', messageRemover);
      window.addEventListener('click', messageRemover);
      window.addEventListener('keydown', closeButtonKeyHandler);

      mainContent.appendChild(errorMessage);
    },

    createSuccessMessage: function () {
      var successForm = document.querySelector('#success').content.querySelector('.success');
      var successMessage = successForm.cloneNode(true);

      var messageRemover = function () {
        successMessage.remove();

        window.removeEventListener('click', messageRemover);
        window.removeEventListener('keydown', closeButtonKeyHandler);
      };

      var closeButtonKeyHandler = function (evt) {
        if (evt.key === window.card.ESCAPE_NUM) {
          successMessage.remove();

          window.removeEventListener('click', messageRemover);
          window.removeEventListener('keydown', closeButtonKeyHandler);
        }
      };

      window.addEventListener('click', messageRemover);
      window.addEventListener('keydown', closeButtonKeyHandler);

      mainContent.appendChild(successMessage);
    }
  };
})();
