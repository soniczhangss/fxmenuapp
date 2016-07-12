(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('MenuController', MenuController);

  MenuController.$inject = ['$scope', 'shoppingcartservice', '$ionicModal'];
  /* @ngInject */
  function MenuController($scope, shoppingcartservice, $ionicModal) {
  	$scope.shoppingcart = shoppingcartservice.shoppingcart;

  	$scope.proceedToCheckout = function () {
  		// login
  	};

	$ionicModal.fromTemplateUrl('js/shoppingcart/shoppingcart.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.openShoppingCart = function() {
		$scope.modal.show();
	};
	$scope.closeShoppingCart = function() {
		$scope.modal.hide();
	};
	// Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.modal.remove();
	});
	// Execute action on hide modal
		$scope.$on('modal.hidden', function() {
	// Execute action
	});
	// Execute action on remove modal
		$scope.$on('modal.removed', function() {
	// Execute action
	});
  }
})();