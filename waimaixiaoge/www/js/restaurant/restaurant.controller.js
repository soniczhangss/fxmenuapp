(function() {
  'use strict';

  angular
    .module('app.restaurant')
    .controller('RestaurantController', RestaurantController);

  RestaurantController.$inject = ['$scope', '$stateParams'];
  /* @ngInject */
  function RestaurantController($scope, $stateParams) {
    $scope.restaurantId = $stateParams
  }
})();