(function() {
  'use strict';

  angular
    .module('app.restaurant')
    .controller('RestaurantDishListController', RestaurantDishListController);

  RestaurantDishListController.$inject = ['$scope', '$stateParams', 'shoppingcartservice'];
  function RestaurantDishListController($scope, $stateParams, shoppingcartservice) {
    $scope.restaurant = $stateParams.restaurant;
    $scope.dishType = $stateParams.type;

    $scope.addToCart = function(item) {
  		shoppingcartservice.addAnItem(item);
  	};
  }
})();