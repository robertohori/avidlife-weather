// Uses AMD or browser globals to create a module.

// Grabbed from https://github.com/umdjs/umd/blob/master/amdWeb.js.
// Check out https://github.com/umdjs/umd for more patterns.

// Defines a module "weather-client".
(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define('weather-client', factory(root));
    } else if (typeof exports === 'object') {
        module.exports = factory(root);
    } else {
        root.weather_client = factory(root);
    }
})(this, function () {
    'use strict';

    var exports = {};

    // settings properties
    // exports.config = {};

    exports.getToday = function () {

        //var that = this;

        return {
            then: function (successCallback, errorCallback) {

                // set callbacks
                var callbacks = {
                    success: successCallback || function () {},
                    error: errorCallback || function () {}
                };

                //callbacks.success(null);
                callbacks.error(null);
            }
        };
    };

    // Return a value to define the module export.
    // This example returns a functions, but the module
    // can return an object as the exported value.
    return exports;
});