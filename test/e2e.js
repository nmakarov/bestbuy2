// var casper = require('casper').create();
var url = "http://localhost:8080"

// casper.start(url, function() {
//     this.echo(this.getTitle());
// });


// casper.run();


casper.test.begin("Page renders", 1, function(test) {

  casper.start(url, function () {
    test.assertSelectorHasText('ul#categories', 'Loading...');

    casper.waitFor(function check() {
        return this.evaluate(function() {
          var l = document.querySelectorAll('ul#categories li').length;
          console.log('>> waiting...', l);
          return l > 2;
        });
    }, function then() {    // step to execute when check() is ok
      var l = document.querySelectorAll('ul#categories li').length;
      throw "aaaaaa " + l;
      test.assert(l > 10);
    });

  }).run(function () {
    test.done();
  });

});



/*
casper.waitFor(function check() {
    return this.evaluate(function() {
        return document.querySelectorAll('ul.your-list li').length > 2;
    });
}, function then() {    // step to execute when check() is ok
    this.captureSelector('yoursitelist.png', 'ul.your-list');
}, function timeout() { // step to execute if check has failed
    this.echo("I can't haz my screenshot.").exit();
});
*/
