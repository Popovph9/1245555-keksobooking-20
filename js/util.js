'use strict';

(function () {
  var ENTER_NUM = 'Enter';

  var filds = document.querySelectorAll('fieldset');
  var mainPin = document.querySelector('.map__pin--main');
  var resetButton = document.querySelector('.ad-form__reset');
  var submitButton = document.querySelector('.ad-form__submit');

  resetButton.setAttribute('disabled', 'disabled');
  submitButton.setAttribute('disabled', 'disabled');
  window.map.hideFields(window.map.filtersFields);
  window.map.hideFields(window.map.filtersBoxes);

  var getStarted = function () {
    resetButton.removeAttribute('disabled', 'disabled');
    submitButton.removeAttribute('disabled', 'disabled');
    window.map.map.classList.remove('map--faded');
    window.map.mapFilters.classList.remove('map__filters--disabled');
    window.form.mainForm.classList.remove('ad-form--disabled');
    window.map.showFeilds(filds);
    window.form.getAddres(window.form.mainPinCenterX - window.form.MAINPIN_WIDTH / 2, window.form.mainPinCenterY - window.form.MAINPIN_WIDTH / 2);
    window.form.roomFeild.addEventListener('change', window.form.guestFieldChangeHandler);
    window.form.guestField.addEventListener('click', window.form.guestFieldChangeHandler);
    window.form.typeField.addEventListener('change', window.form.typeFiledChangeHandler);
    window.form.priceField.addEventListener('click', window.form.typeFiledChangeHandler);
    window.form.arriveField.addEventListener('change', window.form.inFieldsChangeHandler);
    window.form.departField.addEventListener('change', window.form.outFieldsChangeHandler);
    resetButton.addEventListener('click', resetButtonClickHandler);
    mainPin.removeEventListener('mousedown', mainPinClickHandler);
    mainPin.removeEventListener('keydown', mainPinKeyHandler);
    window.form.mainForm.addEventListener('submit', submitHandler);
    window.backend.load(window.filters.loadDataHandler);
  };

  var resetPage = function () {
    resetButton.setAttribute('disabled', 'disabled');
    submitButton.setAttribute('disabled', 'disabled');
    window.map.map.classList.add('map--faded');
    window.map.mapFilters.classList.add('map__filters--disabled');
    window.map.hideFields(window.map.filtersFields);
    window.map.hideFields(window.map.filtersBoxes);
    window.form.mainForm.classList.add('ad-form--disabled');
    window.map.hideFields(filds);
    window.form.roomFeild.removeEventListener('change', window.form.guestFieldChangeHandler);
    window.form.guestField.removeEventListener('click', window.form.guestFieldChangeHandler);
    window.form.typeField.removeEventListener('change', window.form.typeFiledChangeHandler);
    window.form.priceField.removeEventListener('click', window.form.typeFiledChangeHandler);
    window.form.arriveField.removeEventListener('change', window.form.inFieldsChangeHandler);
    window.form.departField.removeEventListener('change', window.form.outFieldsChangeHandler);
    resetButton.removeEventListener('click', resetButtonClickHandler);
    mainPin.addEventListener('mousedown', mainPinClickHandler);
    mainPin.addEventListener('keydown', mainPinKeyHandler);
    window.map.mainPinReset();
    window.pins.removePin();
    window.filters.handlerRemover(window.map.filtersBoxes, 'change', window.filters.filtersChangeHandler);
    window.filters.houseTypefilter.removeEventListener('change', window.filters.filtersChangeHandler);
    window.filters.roomsFilter.removeEventListener('change', window.filters.filtersChangeHandler);
    window.filters.guestFilter.removeEventListener('change', window.filters.filtersChangeHandler);
    window.filters.priceFilter.removeEventListener('change', window.filters.filtersChangeHandler);
    window.filters.resetFilters();
    window.form.mainForm.removeEventListener('submit', submitHandler);
    if (document.querySelector('article')) {
      window.card.cardRemover();
    }
  };

  var mainPinClickHandler = function (evt) {
    if (evt.which === 1) {
      getStarted();
    }
  };

  var mainPinKeyHandler = function (evt) {
    if (evt.key === ENTER_NUM) {
      getStarted();
    }
  };

  var resetButtonClickHandler = function () {
    resetPage();
  };

  var submitHandler = function (evt) {
    window.backend.save(new FormData(window.form.mainForm), function () {
      resetPage();
      window.form.mainForm.reset();
      window.form.createSuccessMessage();
    }, function () {
      window.form.createErrorMessage();
    });
    evt.preventDefault();
  };

  mainPin.addEventListener('mousedown', mainPinClickHandler);
  mainPin.addEventListener('keydown', mainPinKeyHandler);
  mainPin.addEventListener('mousedown', window.map.mainPinDragHandler);
})();
