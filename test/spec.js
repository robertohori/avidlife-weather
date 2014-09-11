/**
 * weather-client
 *
 *    Library test
 */
define(function (require) {

    'use strict'

    var chai = require('chai'),
        assert = chai.assert,
        weather_client = require('weather-client');

    describe('get weather by location', function () {

        this.timeout(10000);

        it('should return null when location is null', function (done) {

            weather_client
                .getToday(null)
                .then(null, function (data) {
                    assert.isNull(data);
                    done();
                });

        });

        it('should get name equal sao paulo', function (done) {
            weather_client
                .getToday('sao paulo')
                .then(function (data) {

                    assert.isNotNull(data);
                    assert.equal(data.name, 'Sao Paulo');

                    done();
                }, null);
        });

        it('should get total days of temperature equal 7', function (done) {
            weather_client
                .getForecast('sao paulo')
                .then(function (data) {

                    assert.isNotNull(data);
                    assert.equal(data.totaldays, 7);
                    assert.lengthOf(data.list,7);    
                    done();
                }, null);
        });

    });

});