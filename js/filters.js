'use strict';

(function () {
  var ANY = 'any';
  var PRICES = {
    low: 10000,
    high: 50000
  };
  var FILTER_OPTIONS = {
    low: 'low',
    middle: 'middle',
    high: 'high'
  };

  var houseTypefilter = document.querySelector('#housing-type');
  var roomsFilter = document.querySelector('#housing-rooms');
  var guestFilter = document.querySelector('#housing-guests');
  var priceFilter = document.querySelector('#housing-price');
  var featureBoxes = document.querySelector('#housing-features');
  var notifications = [];

  var filteredPrice = function (price) {
    var wantedPrice = price;
    if (priceFilter.value === FILTER_OPTIONS.low) {
      wantedPrice = (wantedPrice < PRICES.low);
    } else if (priceFilter.value === FILTER_OPTIONS.middle) {
      wantedPrice = (wantedPrice >= PRICES.low && wantedPrice <= PRICES.high);
    } else if (priceFilter.value === FILTER_OPTIONS.high) {
      wantedPrice = (wantedPrice > PRICES.high);
    }
    return wantedPrice;
  };

  var filteredFeatures = function (currentFilters, checkedFeatures) {
    return checkedFeatures.every(function (item) {
      return currentFilters.offer.features.indexOf(item.value) !== -1;
    });
  };

  var updatePins = function () {
    var checkedFeatures = Array.from(featureBoxes.querySelectorAll('input:checked'));
    var filteredTypes = notifications.slice().filter(function (it) {
      return (it.offer.type === houseTypefilter.value || houseTypefilter.value === ANY)
      && (it.offer.rooms === Number(roomsFilter.value) || roomsFilter.value === ANY)
      && (it.offer.guests === Number(guestFilter.value) || guestFilter.value === ANY)
      && filteredPrice(it.offer.price)
      && filteredFeatures(it, checkedFeatures);
    });

    window.pins.removePin();
    window.pins.renderPins(filteredTypes);
  };

  var handlerInserter = function (arr, action, handler) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].addEventListener(action, handler);
    }
  };

  var handlerRemover = function (arr, action, handler) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].removeEventListener(action, handler);
    }
  };

  var filtersChangeHandler = function () {
    window.debounce(updatePins);
    if (document.querySelector('article')) {
      window.card.cardRemover();
    }
  };

  var loadDataHandler = function (data) {
    notifications = data;
    window.map.mapFilters.classList.remove('map__filters--disabled');
    window.pins.renderPins(notifications);

    window.map.showFeilds(window.map.filtersFields);
    window.map.showFeilds(window.map.filtersBoxes);
    handlerInserter(window.map.filtersBoxes, 'change', filtersChangeHandler);
    houseTypefilter.addEventListener('change', filtersChangeHandler);
    roomsFilter.addEventListener('change', filtersChangeHandler);
    guestFilter.addEventListener('change', filtersChangeHandler);
    priceFilter.addEventListener('change', filtersChangeHandler);
  };

  var hideBoxes = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].checked = false;
    }
    return arr;
  };

  var resetFilters = function () {
    houseTypefilter.value = ANY;
    roomsFilter.value = ANY;
    guestFilter.value = ANY;
    priceFilter.value = ANY;
    hideBoxes(featureBoxes.querySelectorAll('input:checked'));
  };

  window.filters = {
    handlerRemover: handlerRemover,

    loadDataHandler: loadDataHandler,

    filtersChangeHandler: filtersChangeHandler,

    houseTypefilter: houseTypefilter,

    roomsFilter: roomsFilter,

    guestFilter: guestFilter,

    priceFilter: priceFilter,

    resetFilters: resetFilters
  };
})();
