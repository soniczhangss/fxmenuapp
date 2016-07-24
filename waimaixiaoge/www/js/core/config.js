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
    .state('app.restaurant-dish-type-list', {
      url: '/restaurant-dish-type-list',
      views: {
        'menuContent': {
          templateUrl: 'js/restaurant/restaurant-dish-type-list.html',
          controller: 'RestaurantDishTypeListController'
        }
      },
      params: { restaurant: null}
    })
    .state('app.restaurant-dish-list', {
      url: '/restaurant-dish-list',
      views: {
        'menuContent': {
          templateUrl: 'js/restaurant/restaurant-dish-list.html',
          controller: 'RestaurantDishListController'
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
    })
    .state('app.forgot-password', {
      url: '/forgot-password',
      views: {
        'menuContent': {
          templateUrl: 'js/user/forgot-password.html',
          controller: 'forgotPasswordController'
        }
      }
    })
    .state('app.reset-password', {
      url: '/reset-password',
      views: {
        'menuContent': {
          templateUrl: 'js/user/reset-password.html',
          controller: 'resetPasswordController'
        }
      },
      params: { username: null}
    });

    $urlRouterProvider.otherwise('/app/restaurant-list');

    localStorageServiceProvider
      .setPrefix('waimaixiaoge');
  });

})();