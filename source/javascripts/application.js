#= require "jquery"
#= require "waypoints"

(function($){
  $('.page').waypoint({ offset: '50%' });

  $('.page > .content').hide();

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

