(function() {
  var NavLink;
  window.NavLink = NavLink = (function() {
    function NavLink(page, target) {
      this.page = page;
      this.target = target;
      this.initialize();
    }
    NavLink.prototype.initialize = function() {
      var self;
      self = this;
      this.setSectionHref();
      this.setSectionName();
      return this.target.bind('click', function(e) {
        e.preventDefault();
        return $('body').scrollTo(self.page.target, 500);
      });
    };
    NavLink.prototype.makeCurrent = function() {
      this.setLocation();
      this.setTitle();
      this.target.addClass('current');
      return false;
    };
    NavLink.prototype.makeNotCurrent = function() {
      this.target.removeClass('current');
      return false;
    };
    NavLink.prototype.setLocation = function() {
      document.location.hash = ['/', this.sectionHref].join('');
      return false;
    };
    NavLink.prototype.setTitle = function() {
      return document.title = "Eat Well, Be Well - " + this.sectionName;
    };
    NavLink.prototype.setSectionHref = function() {
      return this.sectionHref = this.target.attr('href').replace(/#/g, '');
    };
    NavLink.prototype.setSectionName = function() {
      var sectionName;
      sectionName = this.sectionHref || (this.sectionHref = this.setSectionHref());
      return this.sectionName = sectionName.humanize();
    };
    return NavLink;
  })();
}).call(this);
