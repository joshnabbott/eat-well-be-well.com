(function() {
  var Stage;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.Stage = Stage = (function() {
    function Stage() {
      this.currentPage;
      this.initialized = false;
      this.pages = [];
      this.setStageDimensions();
      $(window).bind('resize', __bind(function() {
        var page, _i, _len, _ref, _results;
        this.setStageDimensions();
        _ref = this.pages;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          page = _ref[_i];
          _results.push(page.setBgDimensions());
        }
        return _results;
      }, this));
    }
    Stage.prototype.setStageDimensions = function() {
      this.height = $(window).height();
      return this.width = $(window).width();
    };
    return Stage;
  })();
}).call(this);
