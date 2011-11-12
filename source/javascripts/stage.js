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
        return this.setStageDimensions();
      }, this));
    }
    Stage.prototype.setStageDimensions = function() {
      this.height = $(window).height();
      return this.width = $(window).width();
    };
    return Stage;
  })();
}).call(this);
