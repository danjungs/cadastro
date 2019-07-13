'use strict';

module.exports = function(Asset) {
    Asset.listAssets = function(cb) {
        Asset.find({
          fields: {
            balance: false
          }
        }, cb);
    };
     Asset.remoteMethod('listAssets', {
        returns: {arg: 'assets', type: 'array'},
        http: {path:'/list-assets', verb: 'get'}
    });
};
