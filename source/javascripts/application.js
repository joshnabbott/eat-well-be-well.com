#= require "jquery"
#= require "waypoints"
#= require "jquery.scrollto"

(function($){
  // navigation
  $('ul > li > a').click(function(e) {
    e.preventDefault();
    handleHash($(this).attr('href'));
    // $('body').scrollTo("#" + $(this).attr('href'), 250);
  });

  // Set waypoints
  $('.page').waypoint(function(event, direction) {
    var $currentPage = $(this);

    if(direction === 'up') {
      $currentPage = $currentPage.prev();
    }
    document.location.hash = '/' + $currentPage.attr('data-slug');
    // $currentPage.css({'position': 'fixed'})
  }, {
    // offset: '50%'
  });

  $('.page > .content').hide();

  // How the site loads
  $('.page').each(function () {
    var $page = $(this)
    var $image = $('<img src="' + $page.attr('data-background-image') +'" alt="Change this alt description" />');

    $page.addClass('loading');
    $page.prepend($image);

    setTimeout(function() {
      $page.removeClass('loading');
      $image.fadeIn('slow', function() {
        $('.page > .content').fadeIn();
      });
    }, 2000);

  });
})(jQuery);

function handleHash(hashTag) {
  var hashTag = hashTag.split('#')[1];
  $('body').scrollTo('#' + hashTag, 300);
}
