(function() {
  $(function() {
    window.initialized = false;
    window.currentPage;
    window.pages = [];
    return $('.page').each(function(index, page) {
      var $image, $link, $page;
      $page = $(page);
      $link = $("ul > li:eq(" + index + ") > a");
      page = new Page(index, $page, $link, window.pages);
      window.pages.push(page);
      $image = $("<div class=\"background-image\"><img src=\"" + ($page.attr('data-background-image')) + "\" alt=\"Change this alt description\" /></div>");
      $page.addClass('loading');
      $page.prepend($image);
      return setTimeout(function() {
        $page.removeClass('loading');
        return $image.fadeIn('slow', function() {
          window.initialized = true;
          return window.currentPage.showContent();
        });
      }, 2000);
    });
  });
}).call(this);
