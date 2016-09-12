(function() {
  'use strict';

  angular
    .module('blocks.popups')
    .factory('popupsservice', popupsservice);

  popupsservice.$inject = ['$ionicPopup'];
  function popupsservice($ionicPopup) {
    var service = {
      showAlert: showAlert
    };

    return service;

    function showAlert(title, template) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: template
      });
    }
  }
})();