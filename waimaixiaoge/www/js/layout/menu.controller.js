(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('MenuController', MenuController);

  MenuController.$inject = ['$scope', '$cordovaCamera', '$ionicPopup', 'dataservice', 'shoppingcartservice', '$ionicModal', 'userservice', '$state'];
  /* @ngInject */
  function MenuController($scope, $cordovaCamera, $ionicPopup, dataservice, shoppingcartservice, $ionicModal, userservice, $state) {
  	$scope.shoppingcart = shoppingcartservice.shoppingcart;

  	$scope.user = {
  		username: '登录',
  		portrait: 'img/user-profile/' + (Math.floor(Math.random() * 66) + 1) + ".png"
  	};

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
  		$scope.isSignedIn = userservice.validateAnUser();
  		initUser();
  	});

  	$scope.$on("signin successfully", function () {
  		initUser();
  	});

  	function initUser() {
  		
  	}

  	$scope.checkout = function (address, contactNum, selectedPaymentMethod) {
  		dataservice.checkout(address, contactNum, selectedPaymentMethod, shoppingcartservice.shoppingcart).then(
  			function (result) {
	          showAlert('恭喜', '订单成功');
	          $state.go("app.restaurant-list");
	        },
	        function (error) {
	          showAlert('不好意思', '订单失败');
	        }
	    );
  	};
  	
  	$scope.signinAnUser = function (username, password) {
  		userservice.signinAnUser(username, password).then(
  			function (result) {
  				$scope.$broadcast("signin successfully");
	          	$scope.closeSigninModal();
	        },
	        function (error) {
	          	showAlert('不好意思', '用户名密码不匹配或者用户名不存在');
	        }
	    );
  	};

  	$scope.signupAnUser = function (email, username, password) {
  		userservice.signupAnUser(email, username, password).then(
  			function (result) {
	          $scope.proceedToCheckout();
	        },
	        function (error) {
	          showAlert('不好意思', '信息不符合要求');
	        }
	    );
  	};

  	$scope.proceedToCheckout = function () {
  		if (userservice.validateAnUser()) {
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
			//console.log(res);
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