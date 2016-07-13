(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('MenuController', MenuController);

  MenuController.$inject = ['$scope', 'shoppingcartservice', '$ionicModal', 'userservice', '$state'];
  /* @ngInject */
  function MenuController($scope, shoppingcartservice, $ionicModal, userservice, $state) {
  	$scope.shoppingcart = shoppingcartservice.shoppingcart;

  	$scope.signinAnUser = function (username, password) {
  		userservice.signinAnUser(username, password);
  	};

  	$scope.proceedToCheckout = function () {
  		if (userservice.validateAnUser()) {
  			$state.go("app.checkout");
  		} else {
  			$scope.openSigninModal();
  		}
  		$scope.closeShoppingCart();
  	};

  	$ionicModal.fromTemplateUrl('js/user/signin.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.signinModal = modal;
	});

	$scope.openSigninModal = function() {
		$scope.signinModal.show();
	};
	$scope.closeSigninModal = function() {
		$scope.signinModal.hide();
	};

	$ionicModal.fromTemplateUrl('js/shoppingcart/shoppingcart.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.shoppingcartModal = modal;
	});

	$scope.openShoppingCart = function() {
		$scope.shoppingcartModal.show();
	};
	$scope.closeShoppingCart = function() {
		$scope.shoppingcartModal.hide();
	};

	// Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.shoppingcartModal.remove();
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