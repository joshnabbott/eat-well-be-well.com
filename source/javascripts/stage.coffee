window.Stage = class Stage
  constructor: ->
    @currentPage
    @initialized = false
    @pages = []

    @setStageDimensions()

    $(window).bind 'resize', =>
      @setStageDimensions()

  setStageDimensions: ->
    @height = $(window).height()
    @width = $(window).width()

