/*! avidlife-weather-js - v1.0.0 - 2014-09-10
* https://github.com/robertohori/avidlife-weather
* Copyright (c) 2014 Roberto Hori; Licensed  */
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
})(this, function (root) {
    'use strict';

    var parse = function (req) {
        var result;
        try {
            result = JSON.parse(req.responseText);
        } catch (e) {
            result = req.responseText;
        }
        return [result, req];
    };

    var xhr = function (type, url, apiKey, data) {
        var methods = {
            success: function () {},
            error: function () {}
        };
        var XHR = root.XMLHttpRequest || ActiveXObject;
        var request = new XHR('MSXML2.XMLHTTP.3.0');
        request.open(type, url + "&APPID=" + apiKey, true);
        //request.open(type, url, true);
        //request.setRequestHeader('X-ApiKey', apiKey);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 300) {
                    methods.success.apply(methods, parse(request));
                } else {
                    methods.error.apply(methods, parse(request));
                }
            }
        };
        request.send(data);

        return {
            then: function (successCallback, errorCallback) {
                methods.success = successCallback || function () {};
                methods.error = errorCallback || function () {};
            }
        };
    };

    var get = function (src, apiKey) {
        return xhr('GET', src, apiKey, null);
    };

    var exports = {};

    // settings property
    exports.settings = {
        url: "http://api.openweathermap.org/data/",
        apiKey: "c2dc6abf2957262e518e66e401d51461"
    };

    exports.getToday = function (location) {

        var that = this;
        var url = that.settings.url;
        var apikey = that.settings.apiKey;

        return {
            then: function (successCallback, errorCallback) {

                // set callbacks
                var callbacks = {
                    success: successCallback || function () {},
                    error: errorCallback || function () {}
                };

                // validations
                if (location === null) {
                    return callbacks.error(null);
                }

                get(url + "2.5/weather?q=" + location, apikey).then(function (data) {
                    var newData = {
                        name: data.name
                    };
                    console.log(data);
                    callbacks.success(newData);
                }, callbacks.error);
            }
        };

    };

    // Return a value to define the module export.
    // This example returns a functions, but the module
    // can return an object as the exported value.
    return exports;
});