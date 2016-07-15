(function() {
  'use strict';

  var core = angular.module('app.core');

  core.run(function($ionicPlatform, $rootScope, $ionicSideMenuDelegate) {
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

      $rootScope.$watch(
        function () {
          return $ionicSideMenuDelegate.isOpenLeft();
        },
        function (isOpen) {
          if (isOpen){
            $rootScope.$broadcast("side-menu open");
          }
        }
      );
    });
  })

  core.config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
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
      url: '/restaurant',
      views: {
        'menuContent': {
          templateUrl: 'js/restaurant/restaurant.html',
          controller: 'RestaurantController'
        }
      },
      params: { restaurant: null}
    })
    .state('app.checkout', {
      url: '/checkout',
      views: {
        'menuContent': {
          templateUrl: 'js/layout/checkout.html'
        }
      }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/restaurant-list');

    localStorageServiceProvider
      .setPrefix('waimaixiaoge');
  });

})();