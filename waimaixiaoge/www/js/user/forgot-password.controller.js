(function() {
  'use strict';

  angular
    .module('app.user')
    .controller('forgotPasswordController', forgotPasswordController);

  forgotPasswordController.$inject = ['$scope', 'popupsservice', '$state', '$ionicLoading', 'userservice', '$stateParams'];
  /* @ngInject */
  function forgotPasswordController($scope, popupsservice, $state, $ionicLoading, userservice, $stateParams) {
  	$scope.proceedToResetPassword = function (username) {
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-energized" icon="lines"></ion-spinner>'
		});
		userservice.forgotPassword(username).then(
  			function (result) {
  				$state.go("app.reset-password", {username: username});
	        },
	        function (error) {
	        	popupsservice.showAlert('不好意思', '用户名不正确或者用户名不存在');
	        }
	    ).finally(function () {
	    	$ionicLoading.hide();
	    });
	};
  }
})();