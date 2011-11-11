$ ->
  window.initialized = false
  window.currentPage
  window.pages = []

  # window.stage = new Stage()

  $('.page').each (index, page) ->
    $page = $(page)
    $link = $("ul > li:eq(#{index}) > a")

    page = new Page(index, $page, $link, window.pages)
    window.pages.push(page)

    $image = $("<div class=\"background-image\"><img src=\"#{$page.attr('data-background-image')}\" alt=\"Change this alt description\" /></div>")

    $page.addClass('loading')
    $page.prepend($image)

    setTimeout ->
      $page.removeClass 'loading'
      $image.fadeIn 'slow', ->
        window.initialized = true
        window.currentPage.showContent()
    , 2000

# window.Stage = class Stage
#   constructor: ->
#     @currentPage
#     @initialized = false
#     @pages = []

#     @setStageDimensions()
#     @setupPages()

#     $(window).bind 'resize', =>
#       @setStageDimensions()

#   setupPages: ->
#     self = @

#     $('.page').each (index, page) ->
#       link = $("ul > li:eq(#{index}) > a")
#       page = new Page(index, $(page), link)
#       page.target.addClass 'loading'
#       setTimeout ->
#         page.target.removeClass 'loading'
#         page.loadBackgroundImage()
#       , 2000

#       self.pages.push(new Page(index, $(page), link))

#   setStageDimensions: ->
#     @height = $(window).height()
#     @width = $(window).width()

