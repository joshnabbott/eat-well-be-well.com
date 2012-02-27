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
      this.setElementVisibility();
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
        onlyOnScroll: true
      });
    };

    Page.prototype.loadBackgroundImage = function() {
      var $image, self;
      self = this;
      $image = $("<div class=\"background-image\"><img src=\"" + (this.target.attr('data-background-image')) + "\" alt=\"Change this alt description\" /></div>");
      this.setBgDimensions();
      this.target.prepend($image);
      return $image.fadeIn('slow');
    };

    Page.prototype.setBgDimensions = function() {
      return $('.background-image > img').css({
        'height': this.stage.height,
        'width': this.stage.width
      });
    };

    Page.prototype.prev = function() {
      return this.stage.pages[this.id - 1];
    };

    Page.prototype.next = function() {
      return this.stage.pages[this.id + 1];
    };

    Page.prototype.trackPageView = function() {
      return false;
    };

    Page.prototype.setElementVisibility = function() {
      return this.target.find('[data-invisible]').each(function() {
        return $(this).addClass('invisible');
      });
    };

    Page.prototype.showContent = function() {
      if (this.stage.initialized) {
        return this.target.find('.invisible').each(function(index, element) {
          return setTimeout(function() {
            $(element).removeClass('invisible');
            return $(element).addClass('visible');
          }, 250 * index);
        });
      }
    };

    Page.prototype.hideContent = function() {
      return this.target.find('.invisible').each(function(index, element) {
        return setTimeout(function() {
          $(element).removeClass('visible');
          return $(element).addClass('invisible');
        }, 250 * index);
      });
    };

    return Page;

  })();

}).call(this);
