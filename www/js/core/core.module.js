(function() {
  'use strict';

  angular
    .module('app.core', ['ionic',
    					 'jett.ionic.filter.bar',
    					 'LocalStorageModule',
    					 'angular-uuid',
    					 'blocks.popups',
    					 'blocks.util',
    					 'angular.filter',
    					 'intlpnIonic',
               'ngMessages',
               'validation.match']);
})();