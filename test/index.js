require.config({
  urlArgs: 'cb=' + Math.random(),
  baseUrl: '/app',
  paths: {
    "text" : "bower_components/requirejs-text/text",
    framework: 'Framework',
    dataservices: 'DataServices',
    app: 'app',
    jquery: 'bower_components/jquery/dist/jquery',
    handlebars: 'bower_components/handlebars/handlebars',
    bootstrap: 'bower_components/bootstrap/dist/js/bootstrap',
  },

  shim: {
    bootstrap: {deps: ['jquery']},
  }
});

define([
  '../test/spec/framework_spec', 
  '../test/spec/application_spec'
], function () {
  console.info('loaded.');
});
