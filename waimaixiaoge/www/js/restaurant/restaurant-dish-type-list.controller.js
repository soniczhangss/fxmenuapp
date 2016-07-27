(function() {
  'use strict';

  angular
    .module('app.restaurant')
    .controller('RestaurantDishTypeListController', RestaurantDishTypeListController);

  RestaurantDishTypeListController.$inject = ['$scope', '$state', '$stateParams'];
  function RestaurantDishTypeListController($scope, $state, $stateParams) {
    $scope.restaurant = $stateParams.restaurant;

    $scope.dishList = function (type) {
      $state.go("app.restaurant-dish-list", {restaurant: $scope.restaurant, type: type});
    };
  }
})();