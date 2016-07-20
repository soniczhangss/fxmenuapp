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
      getCurrentUser: getCurrentUser,
      signupAnUser: signupAnUser,
      signinAnUser: signinAnUser,
      signOutAnUser: signOutAnUser,
      confirmRegistration: confirmRegistration,
      resendValidationCode: resendValidationCode,
      syncAnUser: syncAnUser // Not yet implemented
    };

    return service;

    function signOutAnUser(user) {
      user.signOut();
    }

    function resendValidationCode(username) {
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

      var deferred = $q.defer();
      cognitoUser.resendConfirmationCode(function(err, result) {
          if (err) {
            deferred.reject(err);
          } 
          else {
            deferred.resolve(result);
          }
      });
      return deferred.promise;
    }

    function confirmRegistration(username, validationCode) {
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
      var deferred = $q.defer();
      cognitoUser.confirmRegistration(validationCode, true, function(err, result) {
          if (err) {
            deferred.reject(err);
          } 
          else {
            deferred.resolve(result);
          }
      });
      return deferred.promise;
    }

    function syncAnUser() {
      var syncManager = new AWS.CognitoSyncManager();
      syncManager.openOrCreateDataset('waimaixiaogeUserProfile', function(err, dataset) {
        dataset.put('waimaixiaogeUserProfileImg', waimaixiaogeUserProfileImgURL, function(err, record) {
          console.log(record);
        });
      });
      syncManager.openOrCreateDataset('waimaixiaogeUserOrder', function(err, dataset) {
        dataset.get('waimaixiaogeUserOrderHistory', function(err, value) {
          dataset.put('waimaixiaogeUserOrderHistory', value.push(newOrders), function(err, record) {
            console.log(record);
          });
        });
        dataset.synchronize();
      });
    }

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
      var deferred = $q.defer();
      cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
            deferred.resolve(result);
            console.log('access token + ' + result.getAccessToken().getJwtToken());
          },

          onFailure: function(err) {
            deferred.reject(err);
          },

      });
      return deferred.promise;
    }

    function getCurrentUser() {
      var currentUser = null;
      var data = {
        UserPoolId : poolId,
        ClientId : appClientId
      };
      var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(data);
      var cognitoUser = userPool.getCurrentUser();

      if (cognitoUser != null) {
        cognitoUser.getSession(function(err, session) {
          if (session != null)
            if(session.isValid()) {
              currentUser = cognitoUser;
            }
        });
      }

      return currentUser;
    }

    function signupAnUser(email, username, password) {
      AWS.config.region = dbRegion;
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: poolId
      });

      AWSCognito.config.region = dbRegion;
      AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: poolId
      });

      AWSCognito.config.update({accessKeyId: cognitoAccessKeyId, secretAccessKey: cognitoSecretAccessKey});
          
      var poolData = { UserPoolId : poolId,
          ClientId : appClientId
      };
      var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

      var attributeList = [];
      
      var dataEmail = {
          Name : 'email',
          Value : email
      };
      var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);

      attributeList.push(attributeEmail);

      var deferred = $q.defer();
      userPool.signUp(username, password, attributeList, null, function(err, result){
          if (err) {
            deferred.reject(err);
          } 
          else {
            deferred.resolve(result.user.getUsername());
          }
      });
      return deferred.promise;
    }
  }
})();