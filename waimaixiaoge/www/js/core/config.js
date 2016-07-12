(function() {
  'use strict';

  var core = angular.module('app.core');

  core.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  core.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'js/layout/menu.html',
      controller: 'MenuController'
    })
    .state('app.restaurant-list', {
      url: '/restaurant-list',
      views: {
        'menuContent': {
          templateUrl: 'js/restaurant/restaurant-list.html',
          controller: 'RestaurantListController'
        }
      }
    })
    .state('app.restaurant', {
      url: '/restaurant-list/:restaurantId',
      views: {
        'menuContent': {
          templateUrl: 'js/restaurant/restaurant.html',
          controller: 'RestaurantController'
        }
      }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/restaurant-list');
  });

})();