(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('MenuController', MenuController);

  MenuController.$inject = ['$scope', 'popupsservice', '$ionicSideMenuDelegate', '$interval', '$ionicLoading', '$cordovaCamera', '$ionicPopup', 'dataservice', 'shoppingcartservice', '$ionicModal', 'userservice', '$state'];
  /* @ngInject */
  function MenuController($scope, popupsservice, $ionicSideMenuDelegate, $interval, $ionicLoading, $cordovaCamera, $ionicPopup, dataservice, shoppingcartservice, $ionicModal, userservice, $state) {
  	$scope.shoppingcart = shoppingcartservice.shoppingcart;

  	loadUser();

  	function loadUser() {
  		var currentUser = userservice.getCurrentUser();
  		if (currentUser)
  			$scope.user = currentUser;
  		else {
  			$scope.user = {
		  		username: '登录',
		  		portrait: 'img/user-profile/' + (Math.floor(Math.random() * 66) + 1) + ".png"
		  	};
  		}
  	}

  	$scope.$on("side-menu open", function () {
  		loadUser();
  	});

  	$scope.$on("signin successfully", function () {
  		loadUser();
  	});

  	$scope.$on("signout successfully", function () {
  		loadUser();
  	});

  	$scope.$on("signup successfully", function () {
  		userservice.signinAnUser($scope.tmpUsername, $scope.tmpPassword).then(
  			function (result) {
	          $scope.$broadcast("signin successfully");
	        },
	        function (error) {
	          popupsservice.showAlert('不好意思', '用户名密码不匹配或者用户名不存在');
	        }
	    );
  	});

  	$scope.checkout = function (address, contactNum, selectedPaymentMethod) {
  		$ionicLoading.show({
			template: '<ion-spinner class="spinner-energized" icon="lines"></ion-spinner>'
		});
  		dataservice.checkout(address, contactNum, selectedPaymentMethod, shoppingcartservice.shoppingcart).then(
  			function (result) {
	          popupsservice.showAlert('恭喜', '订单成功');
	          $state.go("app.restaurant-list");
	        },
	        function (error) {
	        	console.log(error);
	          popupsservice.showAlert('不好意思', '订单失败');
	        }
	    ).finally(function () {
	    	$ionicLoading.hide();
	    });
  	};

  	$scope.signOutAnUser = function () {
  		userservice.signOutAnUser($scope.user);
  		$scope.$broadcast("signout successfully");
  	};
  	
  	$scope.signinAnUser = function (username, password) {
  		$ionicLoading.show({
			template: '<ion-spinner class="spinner-energized" icon="lines"></ion-spinner>'
		});
  		userservice.signinAnUser(username, password).then(
  			function (result) {
	          $scope.$broadcast("signin successfully");
	          $scope.closeSigninModal();
	        },
	        function (error) {
	          popupsservice.showAlert('不好意思', '用户名密码不匹配或者用户名不存在');
	        }
	    ).finally(function () {
	    	$ionicLoading.hide();
	    });
  	};

  	$scope.signupAnUser = function (email, username, password) {
  		$ionicLoading.show({
			template: '<ion-spinner class="spinner-energized" icon="lines"></ion-spinner>'
		});
  		userservice.signupAnUser(email, username, password).then(
  			function (result) {
  			  $scope.tmpUsername = result;
  			  $scope.tmpPassword = password;
  			  $scope.openValidationCodeModal();
	        },
	        function (error) {
	          popupsservice.showAlert('不好意思', '信息不符合要求');
	        }
	    ).finally(function () {
	    	$scope.closeSignupModal();
	    	$ionicLoading.hide();
	    });
  	};

  	$scope.proceedToCheckout = function () {
  		if (userservice.getCurrentUser()) {
  			$state.go("app.checkout");
  		} else {
  			popupsservice.showAlert('不好意思', '请您先登录');
  		}
  		$scope.closeShoppingCart();
  	};

	$ionicModal.fromTemplateUrl('js/user/signup.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.signupModal = modal;
	});

	$scope.openSignupModal = function() {
		$scope.signupModal.show();
		$scope.closeSigninModal();
	};
	$scope.closeSignupModal = function() {
		$scope.signupModal.hide();
	};

	$scope.forgotPassword = function () {
		$state.go("app.forgot-password");
		$ionicSideMenuDelegate.toggleLeft();
		$scope.closeSigninModal();
	};

	$ionicModal.fromTemplateUrl('js/user/validation-code.html', {
		scope: $scope,
		animation: 'slide-in-up',
		focusFirstInput: true
	}).then(function(modal) {
		$scope.validationCodeModal = modal;
	});

	$scope.openValidationCodeModal = function() {
		$scope.validationCodeModal.show();
	};
	$scope.closeValidationCodeModal = function() {
		$scope.validationCodeModal.hide();
	};

	$scope.resendValidationCode = function() {
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-energized" icon="lines"></ion-spinner>'
		});
		userservice.resendValidationCode($scope.tmpUsername).then(
  			function (result) {
  				popupsservice.showAlert('您好', '验证码已发送');
	        },
	        function (error) {
	          	popupsservice.showAlert('不好意思', '验证码发送失败');
	        }
	    ).finally(function () {
	    	$ionicLoading.hide();
	    });
	};

	$scope.validateRegistration = function(validationCode) {
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-energized" icon="lines"></ion-spinner>'
		});
		userservice.confirmRegistration($scope.tmpUsername, validationCode).then(
  			function (result) {
  				popupsservice.showAlert('恭喜您', '注册成功');
  				$scope.closeValidationCodeModal();
  				$scope.$broadcast("signup successfully");
	        },
	        function (error) {
	          popupsservice.showAlert('不好意思', '验证码错误,请选择重新发送');
	        }
	    ).finally(function () {
	    	$ionicLoading.hide();
	    });
	};

	$scope.timer = function(seconds) {
		$scope.timeRemaining4Resending = seconds;
		$interval(function() {
			$scope.timeRemaining4Resending--;
		}, 1000, seconds);
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
		$scope.signinModal.remove();
		$scope.signupModal.remove();
	});
  }
})();