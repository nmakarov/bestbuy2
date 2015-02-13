// for simplicity, most of the application code is in this single file.

define(['framework', 'parsers', 'DataServices',
  'handlebars',
  'text!templates/category.hbs',
  'text!templates/listing.hbs',
  'text!templates/detail.hbs',
  'bootstrap'
  ], function (framework, parsers, DataServices, Handlebars, categoryTemplate, listingTemplate, detailTemplate) {

  // Application instantiated
  var BestBuyApp = new framework.Application();


  // Data services (collections and a model):
  // =======================================

  var categories = DataServices.categories;
  var listings = DataServices.listings;
  var detail = DataServices.detail;


  // Some helper functions (stolen from underscore):
  // ==============================================
  var nativeBind = Function.prototype.bind;
  var slice = Array.prototype.slice;

  var _isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // actually, this is the one needed:
  var _bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    // if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    args = slice.call(arguments, 2);
    bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      Ctor.prototype = func.prototype;
      var self = new Ctor();
      Ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (_isObject(result)) return result;
      return self;
    };
    return bound;
  };



  // views definitions:
  // =================
  var categoriesView = new framework.View({
    collection: categories,

    render: function () {
      var output = '';
      var tplFn = Handlebars.compile(categoryTemplate);

      this.collection.models.forEach(function (model) {
        output += tplFn(model);
      });

      return output;
    },

    update: function (id) {
      var categoryLIs = document.getElementsByClassName('categories');
      for (var i=categoryLIs.length; i-->0;) {
        categoryLIs[i].classList.remove('active');
      }
      document.getElementById('category-'+id).classList.add('active');

      this.trigger('category:change', id);

      // if (this.notifyWhenCategoryChange) {
      //   this.notifyWhenCategoryChange(id);
      // }
    },
  });


  var listingsView = new framework.View({
    collection: listings,

    afterRender: function () {
      this.node.onclick = _bind(this.onShowMore, this);
    },


    onShowMore: function (ev) {
      var target = ev.target;
      if (target.classList.contains("js-show")) {
        ev.preventDefault();
        var id = ev.target.getAttribute('data-id');

        this.trigger('click:show', id);

        // if (typeof this.onShowClick === 'function') {
        //   this.onShowClick(id);
        // }
      }
    },

    render: function () {
      var output = '';
      var tplFn = Handlebars.compile(listingTemplate);

      this.collection.models.forEach(function (model) {
        output += tplFn(model);
      });

      return output ? output : 'Loading';
    },

  });



  var detailView = new framework.View({

    collection: detail,

    render: function () {
      var output = '';
      var tplFn = Handlebars.compile(detailTemplate);

      output += tplFn(this.collection.models);

      return output ? output : '';
    },

    afterRender: function () {
      $('.js-close').on('click', function () {
        $('#detailsModal').modal('hide');
      });
    },


  });


  // technically, this is an app controller:
  // ======================================


  // connect a route to the handler
  BestBuyApp.addRoute(/#category\/(\d+)$/, categoriesView, categoriesView.update);

  // some event handlers
  BestBuyApp.updateListings = function (id) {
    var that = this;
    $.when(listings.load({id: id})).then(function () {
      that.refreshView('listings', listingsView);
    });
  };

  BestBuyApp.onShowClick = function (id) {
    var that = this;
    $.when(detail.load({id: id})).then(function () {
      that.attachView('popup', detailView);
      $('#detailsModal').modal('show');
    });
  };

  $.when(categories.load()).then(function () {
    // behaviours:
    categoriesView.on('category:change', _bind(BestBuyApp.updateListings, BestBuyApp));
    BestBuyApp.attachView('categories', categoriesView);

    listingsView.on('click:show', _bind(BestBuyApp.onShowClick, BestBuyApp));
    BestBuyApp.attachView('listings', listingsView);

    // if no category selected, make the first one active:
    if ( ! BestBuyApp.hashChanged()) {
      BestBuyApp.navigate('category/'+categoriesView.collection.models[0].id);
    }
  });

  return BestBuyApp;
});

