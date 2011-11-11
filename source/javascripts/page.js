(function() {
  var Page;
  window.Page = Page = (function() {
    function Page(id, target, link, collection) {
      this.id = id;
      this.target = target;
      this.collection = collection;
      this.link = new NavLink(this, link);
      this.backgroundLoaded = false;
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
        window.currentPage = currentPage;
        $('ul > li > a').removeClass('current');
        currentPage.showContent();
        currentPage.link.makeCurrent();
        currentPage.trackPageView();
        return false;
      }), {
        offset: '50%',
        onlyOnScrol: true
      });
    };
    Page.prototype.loadBackgroundImage = function() {
      var $image;
      $image = $("<div class=\"background-image\"><img src=\"" + (this.target.attr('data-background-image')) + "\" alt=\"Change this alt description\" /></div>");
      this.target.prepend($image);
      return $image.fadeIn('slow');
    };
    Page.prototype.prev = function() {
      return this.collection[this.id - 1];
    };
    Page.prototype.next = function() {
      return this.collection[this.id + 1];
    };
    Page.prototype.trackPageView = function() {
      return console.log("Analytics tracking goes here");
    };
    Page.prototype.showContent = function() {
      if (window.initialized) {
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
