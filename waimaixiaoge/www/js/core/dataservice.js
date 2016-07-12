(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$q', '$filter', 'dbRegion', 'dbAccessKeyId', 'dbSecretAccessKey'];
  /* @ngInject */
  function dataservice($q, $filter, dbRegion, dbAccessKeyId, dbSecretAccessKey) {
    AWS.config.update({region: dbRegion, accessKeyId: dbAccessKeyId, secretAccessKey: dbSecretAccessKey});

    var service = {
      getRestaurants: getRestaurants
    };

    return service;

    function getRestaurants() {
      var docClient = new AWS.DynamoDB();

      var params = {
        TableName : 'Restaurant-fxmenu'
      };
      var deferred = $q.defer();

      docClient.scan(params, function(err, data) {
        if (err) {
          deferred.reject(err);
        } 
        else {
          deferred.resolve(data);
        }
      });

      return deferred.promise;
    }
  }
})();