(function() {
  'use strict';

  angular
    .module('blocks.util')
    .directive('imgUrlFromCdn', imgUrlFromCdn);

  imgUrlFromCdn.$inject = ['utilservice'];
  function imgUrlFromCdn(utilservice) {
    var directive = {
        restrict: 'A',
        link: function(scope, element, attrs) {
          attrs.$observe('imgUrlFromCdn', function(imgUrlFromCdn) {
            var url = utilservice.getCDNImageUrl(imgUrlFromCdn)
            attrs.$set('src', url);
          });
        }
    };

    return directive;
  }
})();
