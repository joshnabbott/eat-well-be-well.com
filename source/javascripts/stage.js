(function() {
  var Stage;

  window.Stage = Stage = (function() {

    function Stage() {
      var self,
        _this = this;
      self = this;
      this.currentPage;
      this.initialized = false;
      this.pages = [];
      this.setStageDimensions();
      $(window).bind('resize', function() {
        var page, _i, _len, _ref, _results;
        _this.setStageDimensions();
        _ref = _this.pages;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          page = _ref[_i];
          _results.push(page.setBgDimensions());
        }
        return _results;
      });
    }

    Stage.prototype.setStageDimensions = function() {
      this.height = $(window).height();
      return this.width = $(window).width();
    };

    return Stage;

  })();

}).call(this);
