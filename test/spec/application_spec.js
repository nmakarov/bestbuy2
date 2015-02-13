define(['framework', 'dataservices'], function(app, dataServices) {
  describe("Application", function() {
    describe("CategoriesService", function () {

      // keep the reference handy
      var categories = dataServices.categories;

      it("is defined", function () {
        expect(categories).toBeDefined();
      });

      it("can request data", function (done) {
        $.when(categories.load()).then(function () {
          expect(categories.models.length).toBeGreaterThan(10);
          done();
        });
      });
    });
  });

});
