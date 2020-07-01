'use strict';

(function () {
  var ENTER_NUM = 'Enter';

  var filds = document.querySelectorAll('fieldset');
  var mainPin = document.querySelector('.map__pin--main');
  var resetButton = document.querySelector('.ad-form__reset');

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

  var getStarted = function () {
    window.map.map.classList.remove('map--faded');
    window.map.mapFilters.classList.remove('map__filters--disabled');
    window.form.mainForm.classList.remove('ad-form--disabled');
    showFeilds(filds);
    window.form.getAddres(window.form.mainPinCenterX - window.form.MAINPIN_WIDTH / 2, window.form.mainPinCenterY - window.form.MAINPIN_WIDTH / 2);
    window.form.roomFeild.addEventListener('change', window.form.guestFieldChangeHandler);
    window.form.guestField.addEventListener('click', window.form.guestFieldChangeHandler);
    window.form.typeField.addEventListener('change', window.form.typeFiledChangeHandler);
    window.form.priceField.addEventListener('click', window.form.typeFiledChangeHandler);
    window.form.arriveField.addEventListener('change', window.form.inFieldsChangeHandler);
    window.form.departField.addEventListener('change', window.form.outFieldsChangeHandler);
    resetButton.addEventListener('click', resetButtonClickHandler);
    mainPin.removeEventListener('mousedown', mainPinDragHandler);
    mainPin.removeEventListener('keydown', mainPinKeyHandler);
  };

  var resetPage = function () {
    window.map.map.classList.add('map--faded');
    window.map.mapFilters.classList.add('map__filters--disabled');
    window.form.mainForm.classList.add('ad-form--disabled');
    hideFields(filds);
    window.form.roomFeild.removeEventListener('change', window.form.guestFieldChangeHandler);
    window.form.guestField.removeEventListener('click', window.form.guestFieldChangeHandler);
    window.form.typeField.removeEventListener('change', window.form.typeFiledChangeHandler);
    window.form.priceField.removeEventListener('click', window.form.typeFiledChangeHandler);
    window.form.arriveField.removeEventListener('change', window.form.inFieldsChangeHandler);
    window.form.departField.removeEventListener('change', window.form.outFieldsChangeHandler);
    resetButton.removeEventListener('click', resetButtonClickHandler);
    mainPin.addEventListener('mousedown', mainPinDragHandler);
    mainPin.addEventListener('keydown', mainPinKeyHandler);
    window.card.cardRemover();
  };

  var mainPinDragHandler = function (evt) {
    if (evt.which === 1) {
      getStarted();
      window.pins.renderPins(window.data.notifications);
    }
  };

  var mainPinKeyHandler = function (evt) {
    if (evt.key === ENTER_NUM) {
      getStarted();
      window.pins.renderPins(window.data.notifications);
    }
  };

  var resetButtonClickHandler = function () {
    resetPage();
  };

  mainPin.addEventListener('mousedown', mainPinDragHandler);
  mainPin.addEventListener('keydown', mainPinKeyHandler);
})();
