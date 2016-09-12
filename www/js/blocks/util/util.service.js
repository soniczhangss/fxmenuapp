(function() {
  'use strict';

  angular
    .module('blocks.popups')
    .factory('utilservice', utilservice);

  utilservice.$inject = ['$ionicPopup', 'cloudFrontDomainName4RestaurantImg'];
  function utilservice($ionicPopup, cloudFrontDomainName4RestaurantImg) {
    var service = {
      getCDNImageUrl: getCDNImageUrl
    };

    return service;

    function getCDNImageUrl(url) {
      return cloudFrontDomainName4RestaurantImg + getFilenameFromURL(url);
    }

    function getFilenameFromURL(url) {
      return url.substring(url.lastIndexOf('/')+1);
    }
  }
})();