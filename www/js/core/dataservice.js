(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$q', '$filter', 'uuid', 'dynamoDBOrderTableName', 'dynamoDBRestaurantTableName', 'dbRegion', 'dbAccessKeyId', 'dbSecretAccessKey'];
  function dataservice($q, $filter, uuid, dynamoDBOrderTableName, dynamoDBRestaurantTableName, dbRegion, dbAccessKeyId, dbSecretAccessKey) {

    var service = {
      getRestaurants: getRestaurants,
      checkout: checkout
    };

    return service;

    function checkout(address, contactNum, selectedPaymentMethod, shoppingcart) {
      AWS.config.update({region: dbRegion, accessKeyId: dbAccessKeyId, secretAccessKey: dbSecretAccessKey});
      var id = uuid.v4();

      var d = new Date();
      var n = d.getTime();
      var dateTime = $filter('date')(n, 'dd-MM-yyyy HH:mm:ss Z');

      angular.forEach(shoppingcart, function (value, key) {
        value = '{M:' + value  + '}';
      });
      var orderItemsJSON = angular.fromJson(angular.toJson(shoppingcart));

      var params = {
        TableName: dynamoDBOrderTableName,
        Item: {
          orderId: {
            S: id
          },
          customerContactNumber: {
            S: contactNum
          },
          deliveryAddress: {
            S: address
          },
          orderDateTime: {
            S: dateTime
          },
          paymentMethod: {
            S: selectedPaymentMethod
          },
          orderItems: {
            L: orderItemsJSON
          }
        }
      };
      var deferred = $q.defer();
      var docClient = new AWS.DynamoDB();
      docClient.putItem(params, function(err, data) {
        if (err) {
          deferred.reject(err);
        } 
        else {
          deferred.resolve(data);
        }
      });
      return deferred.promise;
    }

    function getRestaurants() {
      AWS.config.update({region: dbRegion, accessKeyId: dbAccessKeyId, secretAccessKey: dbSecretAccessKey});
      var params = {
        TableName : dynamoDBRestaurantTableName
      };
      var deferred = $q.defer();
      var docClient = new AWS.DynamoDB();
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