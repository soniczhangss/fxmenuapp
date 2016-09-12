(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('shoppingcartservice', shoppingcartservice);

  shoppingcartservice.$inject = [];
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
      var index = this.shoppingcart.indexOf(item);
      this.shoppingcart.splice(index, 1);
    }
  }
})();