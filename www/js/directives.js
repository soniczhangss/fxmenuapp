angular.module('starter.directives', [])
.directive('restaurantMenu', function() {
	return {
		restrict: 'E',
		templateUrl: 'templates/restaurant-menu.html'
	};
});