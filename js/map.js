'use strict';

window.map = (function () {
  var PIN_LIMIT_TOP = 130;
  var MAP_LIMIT_TOP = PIN_LIMIT_TOP - window.form.MAINPIN_HEIGHT;
  var PIN_LIMIT_BOT = 630;
  var PIN_LIMIT_LEFT = 0;
  var MAP_LIMIT_LEFT = PIN_LIMIT_LEFT - window.form.MAINPIN_WIDTH / 2;
  var PIN_LIMIT_RIGTH = window.form.MAP_WIDTH - window.form.MAINPIN_WIDTH / 2;
  var PIN_STARRT_COORDX = 570;
  var PIN_STARRT_COORDY = 375;

  var map = document.querySelector('.map');
  var mapFilters = map.querySelector('.map__filters');
  var mainPin = document.querySelector('.map__pin--main');

  mapFilters.classList.add('map__filters--disabled');

  return {
    map: document.querySelector('.map'),
    mapFilters: map.querySelector('.map__filters'),

    mainPinDragHandler: function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };


      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

        window.form.getAddres((mainPin.offsetLeft - shift.x), (mainPin.offsetTop - shift.y));

        if (mainPin.offsetTop < MAP_LIMIT_TOP) {
          mainPin.style.top = MAP_LIMIT_TOP + 'px';
          mainPin.removeEventListener('mousemove', onMouseMove);
        } else if (mainPin.offsetTop > PIN_LIMIT_BOT) {
          mainPin.style.top = PIN_LIMIT_BOT + 'px';
          mainPin.removeEventListener('mousemove', onMouseMove);
        } else if (mainPin.offsetLeft < MAP_LIMIT_LEFT) {
          mainPin.style.left = MAP_LIMIT_LEFT + 'px';
          mainPin.removeEventListener('mousemove', onMouseMove);
        } else if (mainPin.offsetLeft > PIN_LIMIT_RIGTH) {
          mainPin.style.left = PIN_LIMIT_RIGTH + 'px';
          mainPin.removeEventListener('mousemove', onMouseMove);
        } else {
          mainPin.addEventListener('mousemove', onMouseMove);
        }
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        mainPin.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      mainPin.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },

    mainPinReset: function () {
      mainPin.style.top = PIN_STARRT_COORDY + 'px';
      mainPin.style.left = PIN_STARRT_COORDX + 'px';
    }
  };
})();
