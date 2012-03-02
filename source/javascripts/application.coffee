$ ->
  initialDelay = 2000 # milliseconds to wait before fading in background images

  # Wrap Google Analytics with our own little object
  window.analytics = new Analytics(_gaq)

  window.stage = new Stage()

  $('.page').each (index, page) ->
    link = $("ul > li:eq(#{index}) > a")
    window.stage.pages.push(new Page(index, $(page), $(link), window.stage))

    # animate the loading of elements.
    $(page).find('.content').addClass 'loading'

  setTimeout ->
    for page in window.stage.pages
      page.target.find('.content').removeClass 'loading'
      page.loadBackgroundImage()

      setTimeout ->
        window.stage.initialized = true
        window.stage.currentPage.showContent()
      , initialDelay / 2
  , initialDelay

  # Pass in the form to observe
  contactForm = new ContactForm($('#contact-form'), {
    updateOnSuccess: $('#page-seven .content')
    updateOnFailure: $('#contact-form')
    requiredFields: $('#contact-name, #contact-email, #contact-message')
  })

