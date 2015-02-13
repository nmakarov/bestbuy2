define(['framework'], function(app) {
  describe("Framework", function() {
    describe("DataService", function () {
      it("is defined", function () {
        expect(app.DataService).toBeDefined();
      });

      it("can make local requests (async)", function (done) {
        var service = new app.DataService({
          url: 'test.json',
          // parse: parsers.categoryParser,
        });
        $.when(service.load()).then(function () {
          expect(service.models.key1).toBe('value1');
          done();
        });
      });

      it("can convert responce using injected parser", function (done) {
        var customParser = function (input) {
          return input.subsection;
        };
        var service = new app.DataService({
          url: 'test.json',
          parse: customParser,
        });
        $.when(service.load()).then(function () {
          expect(service.models.key3).toBe('value3');
          done();
        });
      });

    });

    describe("View", function () {

      it("is defined", function() {
        expect(app.View).toBeDefined();
      });


    });

  });
});