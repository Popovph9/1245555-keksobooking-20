'use strict';

window.map = (function () {
  var map = document.querySelector('.map');
  var mapFilters = map.querySelector('.map__filters');

  mapFilters.classList.add('map__filters--disabled');

  return {
    map: document.querySelector('.map'),
    mapFilters: map.querySelector('.map__filters')
  };
})();
