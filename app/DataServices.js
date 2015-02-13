define(['framework', 'parsers',
  ], function (BestBuy, parsers) {

  // Data services (collections and a model):
  // =======================================
  var categories = new BestBuy.DataService({
    url: 'http://www.bestbuy.ca/api/v2/json/category/Departments',
    parse: parsers.categoryParser,
  });

  var listings = new BestBuy.DataService({
    url: 'http://www.bestbuy.ca/api/v2/json/search?categoryid=:id',
    parse: parsers.listingsParser,
  });

  var detail = new BestBuy.DataService({
    url: 'http://www.bestbuy.ca/api/v2/json/product/:id',
  });

  return {
    categories: categories,
    listings: listings,
    detail: detail
  };
});
