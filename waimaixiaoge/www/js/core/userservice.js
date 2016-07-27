(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('userservice', userservice);

  userservice.$inject = ['$q', '$filter', 'dbRegion', 'cognitoAccessKeyId', 'cognitoSecretAccessKey', 'dbAccessKeyId', 'dbSecretAccessKey', 'poolId', 'appClientId'];
  function userservice($q, $filter, dbRegion, cognitoAccessKeyId, cognitoSecretAccessKey, dbAccessKeyId, dbSecretAccessKey, poolId, appClientId) {

    var service = {
      getCurrentUser: getCurrentUser,
      signupAnUser: signupAnUser,
      signinAnUser: signinAnUser,
      signOutAnUser: signOutAnUser,
      confirmRegistration: confirmRegistration,
      resendValidationCode: resendValidationCode,
      forgotPassword: forgotPassword,
      resetPassword: resetPassword
    };

    return service;

    function resetPassword(username, verificationCode, newPassword) {
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
      cognitoUser.confirmPassword(verificationCode, newPassword, {
          onSuccess: function (result) {
            deferred.resolve(result);
          },
          onFailure: function(err) {
            deferred.reject(err);
          }
      });
      return deferred.promise;
    }

    function forgotPassword(username) {
      AWSCognito.config.region = dbRegion;
      AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: poolId
      });
      AWSCognito.config.update({accessKeyId: cognitoAccessKeyId, secretAccessKey: cognitoSecretAccessKey});
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
      cognitoUser.forgotPassword({
          onFailure: function(err) {
            deferred.reject(err);
          },
          inputVerificationCode() {
            deferred.resolve(this);
          }
      });
      return deferred.promise;
    }

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

    function signupAnUser(phoneNum, username, password) {
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
      
      var dataPhoneNum = {
          Name : 'phone_number',
          Value : phoneNum
      };
      var attributePhoneNum = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataPhoneNum);

      attributeList.push(attributePhoneNum);

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