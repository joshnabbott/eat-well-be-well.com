window.Stage = class Stage
  constructor: ->
    self = @
    @currentPage
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

