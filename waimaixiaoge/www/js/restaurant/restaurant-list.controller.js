(function() {
  'use strict';

  angular
    .module('app.restaurant')
    .controller('RestaurantListController', RestaurantListController);

  RestaurantListController.$inject = ['dataservice', '$scope', '$ionicFilterBar', '$timeout'];
  /* @ngInject */
  function RestaurantListController(dataservice, $scope, $ionicFilterBar, $timeout) {
    var filterBarInstance;

    $scope.doRefresh = function () {
      if (filterBarInstance) {
        filterBarInstance();
        filterBarInstance = null;
      }

      $timeout(function () {
        loadRestaurants();
        $scope.$broadcast('scroll.refreshComplete');
      }, 1000);
    };

    $scope.showFilterBar = function () {
      filterBarInstance = $ionicFilterBar.show({
        items: $scope.restaurants,
        update: function (filteredItems, filterText) {
          $scope.restaurants = filteredItems;
          if (filterText) {
            console.log(filterText);
          }
        }
      });
    };

    $scope.$on('$ionicView.afterEnter', function() {
      loadRestaurants();
    });

    var loadRestaurants = function() {
      dataservice.getRestaurants().then(
        function (result) {
          $scope.restaurants = result.Items;
        },
        function (error) {
          console.log(error.statusText);
        }
      );
    };
  }
})();