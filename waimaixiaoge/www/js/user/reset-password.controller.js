(function() {
  'use strict';

  angular
    .module('app.user')
    .controller('resetPasswordController', resetPasswordController);

  resetPasswordController.$inject = ['$scope', 'popupsservice', '$stateParams', '$state', '$ionicLoading', 'userservice'];
  /* @ngInject */
  function resetPasswordController($scope, popupsservice, $stateParams, $state, $ionicLoading, userservice) {
  	$scope.setNewPassword = function (verificationCode, newPassword) {
  		$ionicLoading.show({
			template: '<ion-spinner class="spinner-energized" icon="lines"></ion-spinner>'
		});
		userservice.resetPassword($stateParams.username, verificationCode, newPassword).then(
  			function (result) {
  				popupsservice.showAlert('恭喜您', '密码重置成功');
  				$state.go("app.restaurant-list");
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