window.Stage = class Stage
  constructor: ->
    self = @
    @currentPage
    @grabbing = false
    @gesturesY = 0
    @scrollStartPosition = 0
    @t
    @initialized = false
    @pages = []

    @setStageDimensions()

    $(window).bind 'resize', =>
      @setStageDimensions()

      for page in @pages
        page.setBgDimensions()

  setStageDimensions: ->
    @height = $(window).height()
    @width = $(window).width()

  scrollToCurrentPage: ->
    $('body').scrollTo(@currentPage.target, 250)
