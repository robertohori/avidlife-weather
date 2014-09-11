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
                .getToday('sao paulo','metric')
                .then(function (data) {

                    assert.isNotNull(data);
                    assert.equal(data.name, 'Sao Paulo');

                    done();
                }, null);
        });

        it('should get total days of temperature equal 8', function (done) {
            weather_client
                .getWeek('sao paulo','metric')
                .then(function (data) {
                    assert.isNotNull(data);
                    assert.equal(data.totaldays, 8);
                    assert.lengthOf(data.list,8);    
                    done();
                }, null);
        });

    });

});