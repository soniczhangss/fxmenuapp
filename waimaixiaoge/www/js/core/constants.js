/* global toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('app.core')
    .constant('dbRegion', 'us-east-1')
    .constant('dbAccessKeyId', 'AKIAIGF2QNIBZOJ7DZXA')
    .constant('dbSecretAccessKey', '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')
    .constant('cognitoAccessKeyId', 'AKIAIXRFVA7APRADRNMQ')
    .constant('cognitoSecretAccessKey', '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')
    .constant('imgRepository', 'https://s3.amazonaws.com/fxmenu-admin-restaurant-img/')
    .constant('poolId', 'us-east-1_S7YIiOyqI')
    .constant('appClientId', 'l6n2n1j23qofohf9m2kqfcabo');
})();
