/**
 * weather-client
 *
 *    Library test
 */
define(function(require) {
  
  'use strict'

  var chai            = require('chai'),
      assert          = chai.assert,
      weather_client  = require('weather-client');

  describe('tests ok', function () {

    this.timeout(10000);

    it('should be ok', function (done) {

        assert.equal(weather_client.calc(), 1);
        done();
        
    });

  });

});