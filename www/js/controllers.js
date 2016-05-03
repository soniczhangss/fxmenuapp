angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  $scope.myOrders = [
    { title: 'Reggae', id: 1, img: 'img/1.jpg', price: '19.9' },
    { title: 'Chill', id: 2, img: 'img/2.jpg', price: '9.9' },
    { title: 'Dubstep', id: 3, img: 'img/3.jpg', price: '12.9' },
    { title: 'Indie', id: 4, img: 'img/4.jpg', price: '29.9' },
    { title: 'Rap', id: 5, img: 'img/5.jpg', price: '19.9' },
    { title: 'Cowbell', id: 6, img: 'img/6.jpg', price: '19.9' }
  ];

  // Create the shopping cart modal that we will use later
  $ionicModal.fromTemplateUrl('templates/shoppingcart.html', {
    scope: $scope
  }).then(function(shoppingcartModal) {
    $scope.shoppingcartModal = shoppingcartModal;
  });

  $scope.openShoppingCart = function() {
    $scope.shoppingcartModal.show();
  };

  // Triggered in the shopping cart modal to close it
  $scope.closeShoppingCart = function() {
    $scope.shoppingcartModal.hide();
  };

  $scope.removefromdCart = function(item) {
    var index = $scope.myOrders.indexOf(item);
    $scope.myOrders.splice(index, 1);
  }

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.addToCart = function(o) {
    this.myOrders.push(o);
    console.log('ShoppingCart', $scope.myOrders);
  };
})

.controller('RestaurantsCtrl', function($scope) {
  $scope.restaurants = [
    { title: 'Reggae', id: 1, img: 'img/1.jpg' },
    { title: 'Chill', id: 2, img: 'img/2.jpg' },
    { title: 'Dubstep', id: 3, img: 'img/3.jpg' },
    { title: 'Indie', id: 4, img: 'img/4.jpg' },
    { title: 'Rap', id: 5, img: 'img/5.jpg' },
    { title: 'Cowbell', id: 6, img: 'img/6.jpg' }
  ];
})
.controller('RestaurantCtrl', function($scope, $stateParams) {
  $scope.id = $stateParams.restaurantId;
  $scope.restaurantMenu = [
    { title: 'Reggae', id: 1, img: 'img/1.jpg', price: '19.9' },
    { title: 'Chill', id: 2, img: 'img/2.jpg', price: '9.9' },
    { title: 'Dubstep', id: 3, img: 'img/3.jpg', price: '12.9' },
    { title: 'Indie', id: 4, img: 'img/4.jpg', price: '29.9' },
    { title: 'Rap', id: 5, img: 'img/5.jpg', price: '19.9' },
    { title: 'Cowbell', id: 6, img: 'img/6.jpg', price: '19.9' }
  ];
});
