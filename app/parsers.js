define([], function () {
  var parsers = {};

  parsers.categoryParser = function (data) {
    var arr = [];

    if (data.subCategories) {
      arr = data.subCategories;
    }

    return arr;
  };

  parsers.listingsParser = function (data) {
    var arr = [];

    if (data.products) {
      arr = data.products;
    }

    return arr;
  };

  return parsers;
});