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
    .constant('poolId', 'us-east-1_OcY7z3Eqp')
    .constant('appClientId', '36q063b85d368q5g6g285lqdrb')
    .constant('dynamoDBRestaurantTableName', 'Restaurant-fxmenu')
    .constant('dynamoDBOrderTableName', 'Order-fxmenu');
})();
