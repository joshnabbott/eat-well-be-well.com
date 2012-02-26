(function() {

  $(function() {
    var contactForm, initialDelay;
    initialDelay = 2000;
    window.stage = new Stage();
    $('.page').each(function(index, page) {
      var link;
      link = $("ul > li:eq(" + index + ") > a");
      window.stage.pages.push(new Page(index, $(page), $(link), window.stage));
      return $(page).find('.content').addClass('loading');
    });
    setTimeout(function() {
      var page, _i, _len, _ref, _results;
      _ref = window.stage.pages;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        page = _ref[_i];
        page.target.find('.content').removeClass('loading');
        page.loadBackgroundImage();
        _results.push(setTimeout(function() {
          window.stage.initialized = true;
          return window.stage.currentPage.showContent();
        }, initialDelay / 2));
      }
      return _results;
    }, initialDelay);
    return contactForm = new ContactForm($('#contact-form'), {
      updateOnSuccess: $('#page-seven .content'),
      updateOnFailure: $('#contact-form'),
      requiredFields: $('#contact-name, #contact-email, #contact-message')
    });
  });

}).call(this);
