(function() {
  'use strict';

  angular
    .module('app.core')
    .run(appRun);

  appRun.$inject = ['$ionicPlatform'];

  /* @ngInject */
  function appRun($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  }
})();
