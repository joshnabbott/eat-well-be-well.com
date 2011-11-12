(function() {
  var Page;
  window.Page = Page = (function() {
    function Page(id, target, link, stage) {
      this.id = id;
      this.target = target;
      this.stage = stage;
      this.link = new NavLink(this, link);
      this.initialize();
    }
    Page.prototype.initialize = function() {
      var self;
      self = this;
      return this.target.waypoint((function(event, direction) {
        var currentPage;
        if (direction === 'up') {
          currentPage = self.prev();
        } else {
          currentPage = self;
        }
        self.stage.currentPage = currentPage;
        $('ul > li > a').removeClass('current');
        currentPage.showContent();
        currentPage.link.makeCurrent();
        return currentPage.trackPageView();
      }), {
        offset: '50%',
        onlyOnScrol: true
      });
    };
    Page.prototype.loadBackgroundImage = function() {
      var $image, self;
      self = this;
      $image = $("<div class=\"background-image\"><img src=\"" + (this.target.attr('data-background-image')) + "\" alt=\"Change this alt description\" /></div>");
      this.target.prepend($image);
      return $image.fadeIn('slow');
    };
    Page.prototype.prev = function() {
      return this.stage.pages[this.id - 1];
    };
    Page.prototype.next = function() {
      return this.stage.pages[this.id + 1];
    };
    Page.prototype.trackPageView = function() {
      return console.log("Analytics tracking goes here");
    };
    Page.prototype.showContent = function() {
      if (window.stage.initialized) {
        return this.target.find('p').each(function(index, element) {
          return setTimeout(function() {
            return $(element).addClass('visible');
          }, 250 * index);
        });
      }
    };
    Page.prototype.hideContent = function() {
      return this.target.find('p').each(function(index, element) {
        return setTimeout(function() {
          return $(element).removeClass('visible');
        }, 250 * index);
      });
    };
    return Page;
  })();
}).call(this);
