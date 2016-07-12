(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('userservice', userservice);

  userservice.$inject = ['$q', '$filter', 'dbRegion', 'dbAccessKeyId', 'dbSecretAccessKey', 'poolId', 'appClientId'];
  /* @ngInject */
  function userservice($q, $filter, dbRegion, dbAccessKeyId, dbSecretAccessKey, poolId, appClientId) {
    AWS.config.update({region: dbRegion, accessKeyId: dbAccessKeyId, secretAccessKey: dbSecretAccessKey});

    var service = {
      validateAnUser: validateAnUser,
      registerAnUser: registerAnUser
    };

    return service;

    function validateAnUser(user) {
      var deferred = $q.defer();



      return promise
    }

    /*
     * require email, username, password
     */
    function registerAnUser(user) {
      AWS.config.region = dbRegion;
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: poolId
      });

      AWSCognito.config.region = dbRegion;
      AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: poolId
      });
          
      var poolData = { UserPoolId : poolId,
          ClientId : appClientId
      };
      var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

      var attributeList = [];
      
      var dataEmail = {
          Name : 'email',
          Value : user.email
      };
      var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);

      attributeList.push(attributeEmail);

      var deferred = $q.defer();
      userPool.signUp(user.username, user.password, attributeList, null, function(err, result){
          if (err) {
            deferred.reject(err);
          } 
          else {
            deferred.resolve(result.user);
          }
      });
      return promise;
    }
  }
})();