(function() {
  'use strict';

  angular
    .module('app.restaurant')
    .controller('RestaurantController', RestaurantController);

  RestaurantController.$inject = ['$scope', '$stateParams', 'shoppingcartservice'];
  /* @ngInject */
  function RestaurantController($scope, $stateParams, shoppingcartservice) {
    $scope.restaurant = $stateParams.restaurant;

    $scope.addToCart = function(item) {
		shoppingcartservice.addAnItem(item);
	};
  }
})();