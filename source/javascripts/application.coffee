$ ->
  initialDelay = 2000 # milliseconds to wait before fading in background images

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

