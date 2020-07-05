'use strict';

window.rand = (function () {
  return {
    getRandomInRange: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getRandomArray: function (array) {
      var getRandomInteger = function (min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1);

        return Math.round(rand);
      };

      var anotherArray = [];

      array.forEach(function (item) {
        if (getRandomInteger(0, 1) === 1) {
          anotherArray.push(item);
        }
      });
      return anotherArray;
    },

    shuffle: function (array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = array[i]; array[i] = array[j]; array[j] = t
        ;
      }
    }
  };
})();
