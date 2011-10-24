#= require "jquery"
#= require "waypoints"

(function($){
  // Set waypoints
  $('.page').waypoint(function(event, direction) {
    var $currentPage = $(this);

    if(direction === 'up') {
      $currentPage = $currentPage.prev();
    }
    document.location.hash = '/' + $currentPage.attr('data-slug');
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

