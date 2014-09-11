require.config({
  baseUrl: '.',
  paths: {
    'mocha': '../bower_components/mocha/mocha',
    'chai': '../bower_components/chai/chai',
    'weather-client': '../lib/weather-client'
  }
});

require(['require', 'chai', 'mocha', 'weather-client'], function (require, chai) {

  // chai
  var assert = chai.assert;

  /*globals mocha */
  mocha.setup('bdd');
  mocha.ui('bdd');
  mocha.reporter('html');
  
  require([
    'spec.js',
  ], function (require) {

    if (window.mochaPhantomJS) {
      mochaPhantomJS.run();
    } else {
      mocha.run();
    }

  });

});