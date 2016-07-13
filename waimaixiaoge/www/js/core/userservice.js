(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('userservice', userservice);

  userservice.$inject = ['$q', '$filter', 'dbRegion', 'cognitoAccessKeyId', 'cognitoSecretAccessKey', 'dbAccessKeyId', 'dbSecretAccessKey', 'poolId', 'appClientId'];
  /* @ngInject */
  function userservice($q, $filter, dbRegion, cognitoAccessKeyId, cognitoSecretAccessKey, dbAccessKeyId, dbSecretAccessKey, poolId, appClientId) {
    //AWS.config.update({region: dbRegion, accessKeyId: dbAccessKeyId, secretAccessKey: dbSecretAccessKey});

    var service = {
      validateAnUser: validateAnUser,
      registerAnUser: registerAnUser,
      signinAnUser: signinAnUser
    };

    return service;

    function signinAnUser(username, password) {
      AWS.config.region = dbRegion;
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: poolId
      });
      AWSCognito.config.region = dbRegion;
      AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: poolId
      });
      AWSCognito.config.update({accessKeyId: cognitoAccessKeyId, secretAccessKey: cognitoSecretAccessKey});
      var authenticationData = {
        Username : username,
        Password : password
      };
      var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
      var poolData = {
        UserPoolId : poolId,
        ClientId : appClientId
      };
      var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
      var userData = {
        Username : username,
        Pool : userPool
      };
      var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
      cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());
          },

          onFailure: function(err) {
            console.log(err);
          },

      });
    }

    function validateAnUser() {
      var isValidUser = false;
      var data = {
        UserPoolId : poolId,
        ClientId : appClientId
      };
      var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(data);
      var cognitoUser = userPool.getCurrentUser();

      if (cognitoUser != null) {
        cognitoUser.getSession(function(err, session) {
          isValidUser = session.isValid();
        });
      }

      return isValidUser;
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