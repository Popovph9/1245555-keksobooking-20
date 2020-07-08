'use strict';

(function () {
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
    window.pins.renderPins(filteredFlats);
  };

  var houseTypeChengeHandler = function () {
    updatePins();
    if (document.querySelector('article')) {
      window.card.cardRemover();
    }
  };

  var loadDataHandler = function (data) {
    notifications = data;
    window.pins.renderPins(notifications);

    window.map.showFeilds(window.map.filtersFields);
    window.map.showFeilds(window.map.filtersBoxes);

    houseTypefilter.addEventListener('change', houseTypeChengeHandler);
  };

  window.filters = {
    loadDataHandler: loadDataHandler,

    houseTypeChengeHandler: houseTypeChengeHandler,

    houseTypefilter: houseTypefilter
  };
})();
