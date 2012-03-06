(function() {
  var Analytics,
    __slice = Array.prototype.slice;

  window.Analytics = Analytics = (function() {

    function Analytics(queue) {
      this.queue = queue;
    }

    Analytics.prototype.track = function() {
      var action, args;
      action = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      args.unshift(action);
      return this.queue.push(args);
    };

    Analytics.prototype.trackPageView = function() {
      return this.track('_trackPageView');
    };

    Analytics.prototype.trackEvent = function(category, action, label, value) {
      return this.track('_trackEvent', category, action, label, value);
    };

    return Analytics;

  })();

}).call(this);
