require.config({
  paths: {
    "text" : "bower_components/requirejs-text/text",
    framework: 'Framework',
    app: 'app',
    jquery: 'bower_components/jquery/dist/jquery',
    handlebars: 'bower_components/handlebars/handlebars',
    bootstrap: 'bower_components/bootstrap/dist/js/bootstrap'
  },

  shim: {
    bootstrap: {deps: ['jquery']},
  }
});

require(['app'], function (app, $) {
  console.info('>> application is loaded.');
});

