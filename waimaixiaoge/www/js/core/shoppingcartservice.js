(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('shoppingcartservice', shoppingcartservice);

  shoppingcartservice.$inject = [];
  /* @ngInject */
  function shoppingcartservice() {

    var shoppingcart = [];

    var service = {
      shoppingcart: shoppingcart,
      addAnItem: addAnItem,
      removeAnItem: removeAnItem
    };

    return service;

    function shoppingcart() {
      return this.shoppingcart;
    }

    function addAnItem(item) {
      this.shoppingcart.push(item);
    }

    function removeAnItem(item) {
      var index = this.shoppingCart.indexOf(item);
      this.shoppingCart.splice(index, 1);
    }
  }
})();