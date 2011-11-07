#= require "jquery"
#= require "waypoints"
#= require "jquery.scrollto"
#= require "shifty"

var initialized = false;
var currentPage;

$(function() {
  var pages = new Array();

  $('.page').each(function(index, page) {
    var $page = $(page);
    var $link = $('ul > li:eq(' + index + ') > a');

    // Setup pages
    page = new Page(index, $page, $link, pages);
    pages.push(page);

    // Load images
    var $image = $('<div class="background-image"><img src="' + $page.attr('data-background-image') +'" alt="Change this alt description" /></div>');

    $page.addClass('loading');
    $page.prepend($image);

    setTimeout(function() {
      $page.removeClass('loading');
      $image.fadeIn('slow', function() {
        initialized = true;
        currentPage.showContent();
      });
    }, 1000);
  });
});

String.prototype.humanize = function() {
  var nonHumanWord = this;

  // Create an array by splitting at any illegal characters
  var humanWord = nonHumanWord.split(/[^a-zA-Z]/);

  // Check for empty elements in the array
  humanWord = humanWord.filter(function(element) {
    return element != '';
  });

  // Uppercase the first letter of each word
  humanWord = humanWord.map(function(word) {
    return word.replace(/([a-zA-Z])/, function($1) {
      return $1.toUpperCase();
    });
  });

  // Join the words with a space between them
  humanWord = humanWord.join(' ');

  return humanWord;
}

var Page = function(id, element, link, collection) {
  this.id = id;
  this.$target = $(element);
  this.link = new NavLink(this, link);
  this.collection = collection;

  this.initialize();
}

Page.prototype = {
  initialize: function() {
    var self = this;

    // Set a waypoint for page changes
    this.$target.waypoint(function(event, direction) {
      if(direction === 'up') {
        currentPage = self.prev();
        self.hideContent();
      } else {
        currentPage = self;
        self.prev().hideContent();
      }
      $("ul > li > a").removeClass('current');
      currentPage.showContent();
      currentPage.link.makeCurrent();
      currentPage.trackPageView();
    }, {
      offset: '50%',
      onlyOnScroll: true
    });
  },
  prev: function() {
    return this.collection[this.id - 1];
  },
  next: function() {
    return this.collection[this.id + 1];
  },
  trackPageView: function() {
    console.log("Analytics tracking goes here");
  },
  showContent: function() {
    if(initialized) {
      this.$target.find('p').each(function(index, el) {
        setTimeout(function() {
          $(el).addClass('visible');
        }, 250 * index);
      });
    }
  },
  hideContent: function() {
    this.$target.find('p').each(function(index, el) {
      setTimeout(function() {
        $(el).removeClass('visible');
      }, 250 * index);
    })
  }

}

var NavLink = function(page, element) {
  this.page = page;
  this.$target = $(element);

  this.initialize();
}

NavLink.prototype = {
  initialize: function() {
    var self = this;

    this.setSectionHref();
    this.setSectionName();
    this.$target.bind('click', function(e) {
      e.preventDefault();
      $('body').scrollTo(self.page.$target, 500);
    });
  },
  makeCurrent: function() {
    this.setLocation();
    this.setTitle();
    this.$target.addClass('current');
  },
  makeNotCurrent: function() {
    this.$target.removeClass('current');
  },
  setLocation: function() {
    document.location.hash = ['/', this.sectionHref].join('');
  },
  setTitle: function() {
    document.title = 'Eat well, Be well - ' + this.sectionName;
  },
  setSectionHref: function() {
    this.sectionHref = this.$target.attr('href').replace(/#/g, '');

    return this.sectionHref;
  },
  setSectionName: function() {
    var sectionName = this.sectionHref || this.setSectionHref();
    this.sectionName = sectionName.humanize();

    return this.sectionName;
  }
}

// var $currentPage;
// var t;

// function alignPageTop() {
//   $('body').scrollTo($currentPage, 800);
// }

// $(function(){
//   $(window.parent.document).scroll(function() {
//     clearTimeout(t);
//     t = setTimeout(alignPageTop, 250);
//   })

//   // Setting up navigation
//   var $navLinks = $('ul > li > a');

//   $navLinks.click(function(e) {
//     e.preventDefault();

//     $('body').scrollTo($(this).attr('href'), 300);
//   });

//   // Setting waypoints
//   $('.page').waypoint(function(event, direction) {
//     $currentPage = $(this);
//     var activeID = $(this).attr('id');

//     if(direction === 'up') {
//       $currentPage = $currentPage.prev();
//     }

//     $navLinks.removeClass('current');
//     document.location.hash = ['/', $currentPage.attr('id')].join('');
//   }, {
//     offset: '50%'
//   });

//   $('.page > .content').hide();

//   // Loading the site
//   $('.page').each(function () {
//     var $page = $(this)
//     var $image = $('<div class="background-image"><img src="' + $page.attr('data-background-image') +'" alt="Change this alt description" /></div>');

//     $page.addClass('loading');
//     $page.prepend($image);

//     setTimeout(function() {
//       $page.removeClass('loading');
//       $image.fadeIn('slow', function() {
//         $('.page > .content').fadeIn();
//       });
//     }, 1000);
//   });
// });

