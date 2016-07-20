(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('MenuController', MenuController);

  MenuController.$inject = ['$scope', '$interval', '$ionicLoading', '$cordovaCamera', '$ionicPopup', 'dataservice', 'shoppingcartservice', '$ionicModal', 'userservice', '$state'];
  /* @ngInject */
  function MenuController($scope, $interval, $ionicLoading, $cordovaCamera, $ionicPopup, dataservice, shoppingcartservice, $ionicModal, userservice, $state) {
  	$scope.shoppingcart = shoppingcartservice.shoppingcart;

  	$scope.user = {
  		username: '登录',
  		portrait: 'img/user-profile/' + (Math.floor(Math.random() * 66) + 1) + ".png"
  	};

  	loadUser();

  	function loadUser() {
  		var currentUser = userservice.getCurrentUser();
  		if (currentUser)
  			$scope.user = currentUser;
  	}

  	$scope.takePhoto = function () {
		var options = {
			quality: 75,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: Camera.PictureSourceType.CAMERA,
			allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 300,
			targetHeight: 300,
			popoverOptions: CameraPopoverOptions,
			saveToPhotoAlbum: false
		};

		$cordovaCamera.getPicture(options).then(function (imageData) {
			$scope.imgURI = "data:image/jpeg;base64," + imageData;
		}, function (err) {
			console.log(err);
		});
    };

  	$scope.$on("side-menu open", function () {
  		loadUser();
  	});

  	$scope.$on("signin successfully", function () {
  		loadUser();
  	});

  	$scope.checkout = function (address, contactNum, selectedPaymentMethod) {
  		$ionicLoading.show({
			template: '<ion-spinner class="spinner-energized" icon="lines"></ion-spinner>'
		});
  		dataservice.checkout(address, contactNum, selectedPaymentMethod, shoppingcartservice.shoppingcart).then(
  			function (result) {
	          showAlert('恭喜', '订单成功');
	          $state.go("app.restaurant-list");
	        },
	        function (error) {
	        	console.log(error);
	          showAlert('不好意思', '订单失败');
	        }
	    ).finally(function () {
	    	$ionicLoading.hide();
	    });
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
	          showAlert('不好意思', '用户名密码不匹配或者用户名不存在');
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
  			  $scope.openValidationCodeModal();
	        },
	        function (error) {
	          showAlert('不好意思', '信息不符合要求');
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
  			showAlert('不好意思', '请您先登录');
  		}
  		$scope.closeShoppingCart();
  	};

	var showAlert = function(title, template) {
		var alertPopup = $ionicPopup.alert({
			title: title,
			template: template
		});

		alertPopup.then(function(res) {
			console.log(res);
		});
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

	$ionicModal.fromTemplateUrl('js/user/validationCode.html', {
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
  				showAlert('您好', '验证码已发送');
	        },
	        function (error) {
	          	showAlert('不好意思', '验证码发送失败');
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
  				showAlert('恭喜您', '注册成功');
  				$scope.closeValidationCodeModal();
	        },
	        function (error) {
	          showAlert('不好意思', '验证码错误,请选择重新发送');
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