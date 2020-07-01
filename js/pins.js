'use strict';

window.pins = (function () {
  var pinsOnMap = document.querySelector('.map__pins');
  var similarPin = document.querySelector('#pin').content.querySelector('.map__pin');

  return {
    renderPins: function (arr) {
      for (var i = 0; i < window.data.PINS; i++) {
        var pinFragment = similarPin.cloneNode(true);
        pinFragment.style.left = arr[i].location.x + 'px';
        pinFragment.style.top = arr[i].location.y + 'px';
        pinFragment.querySelector('img').src = arr[i].author.avatar;
        pinFragment.querySelector('img').alt = arr[i].offer.title;
        pinFragment.querySelector('img').classList.add('pin' + i);
        pinFragment.classList.add('pin' + i);
        pinsOnMap.appendChild(pinFragment);
      }

      var currentPins = document.querySelectorAll('.map__pin');

      var elc = function (element, datanmbr) {
        element.addEventListener('click', function () {
          window.card.renderCard(window.data.notifications[datanmbr]);
        });
      };

      for (var z = 1; z < currentPins.length; z++) {
        elc(currentPins[z], z - 1);
      }
    }
  };

})();