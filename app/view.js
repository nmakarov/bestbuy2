(function(exports) {
  "use strict";

  function View(options) {
    this._options = options || {};
  }
  exports.View = View;

  View.prototype = {
    greets: function(target) {
      if (!target)
        throw new Error("missing target");
      return this.name + " greets " + target;
    }
  };
})(this);