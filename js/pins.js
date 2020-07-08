'use strict';

window.pins = (function () {
  var PINS = 5;

  var pinsOnMap = document.querySelector('.map__pins');
  var similarPin = document.querySelector('#pin').content.querySelector('.map__pin');

  var houseTypefilter = document.querySelector('#housing-type');


  var notifications = [];

  var updatePins = function () {
    var filteredFlats = notifications.slice().filter(function (it) {
      if (houseTypefilter.value === 'any') {
        return notifications.slice();
      }
      return it.offer.type === houseTypefilter.value;
    });
    window.pins.removePin();
    renderPins(filteredFlats);
  };

  var houseTypeChengeHandler = function () {
    updatePins();
    if (document.querySelector('article')) {
      window.card.cardRemover();
    }
  };

  var renderPins = function (data) {
    var takeNumber = data.length > PINS ? PINS : data.length;
    for (var i = 0; i < takeNumber; i++) {
      var pinFragment = similarPin.cloneNode(true);
      pinFragment.style.left = data[i].location.x + 'px';
      pinFragment.style.top = data[i].location.y + 'px';
      pinFragment.querySelector('img').src = data[i].author.avatar;
      pinFragment.querySelector('img').alt = data[i].offer.title;
      pinsOnMap.appendChild(pinFragment);
    }

    var currentPins = document.querySelectorAll('.map__pin');

    var elc = function (element, datanmbr) {
      element.addEventListener('click', function () {
        window.map.mapFilters.classList.remove('map__filters--disabled');
        window.card.renderCard(data[datanmbr]);
      });
    };

    for (var z = 1; z < currentPins.length; z++) {
      elc(currentPins[z], z - 1);
    }
  };

  return {
    houseTypeChengeHandler: houseTypeChengeHandler,

    houseTypefilter: houseTypefilter,

    loadDataHandler: function (data) {
      notifications = data;
      renderPins(notifications);

      window.map.showFeilds(window.map.filtersFields);
      window.map.showFeilds(window.map.filtersBoxes);

      houseTypefilter.addEventListener('change', houseTypeChengeHandler);
    },


    removePin: function () {
      var renderedPins = pinsOnMap.getElementsByTagName('button');
      for (var i = renderedPins.length - 1; i >= 1; i--) {
        renderedPins[i].remove();
      }

    }
  };
})();
