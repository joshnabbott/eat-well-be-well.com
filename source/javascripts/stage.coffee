window.Stage = class Stage
  constructor: ->
    self = @
    @currentPage
    @grabbing = false
    @gesturesY = 0
    @startPosition = 0
    @initialized = false
    @pages = []

    @setStageDimensions()

    $(window).bind 'resize', =>
      @setStageDimensions()

      for page in @pages
        page.setBgDimensions()

    $('body').bind 'scroll', ->
      console.log 'scrolling'

    $('body').bind 'mouseover', ->
      $('body').addClass 'grab'

    $('body').bind 'mouseleave', ->
      $('body').removeClass 'grab', 'grabbing'

    $('body').bind 'mousedown', (event) ->
      event.preventDefault()
      self.startPosition = self.gesturesY
      self.grabbing = true

      $('body').removeClass 'grab'
      $('body').addClass 'grabbing'

    $('body').bind 'mouseup', (event) ->
      event.preventDefault()
      self.grabbing = false
      $('body').addClass 'grab'
      $('body').removeClass 'grabbing'

    $('body').bind 'mousemove', (event) ->
      self.gesturesY = parseInt(event.pageY, 10)

      if self.grabbing
        window.scrollBy(0, self.startPosition - self.gesturesY)

        if event.pageY > self.startPosition + 50
          $('body').scrollTo($(self.pages[self.currentPage.id - 1].target), 500)
          event.stopPropagation()
        else if event.pageY < self.startPosition - 50
          $('body').scrollTo($(self.pages[self.currentPage.id + 1].target), 500)
          event.stopPropagation()

  setStageDimensions: ->
    @height = $(window).height()
    @width = $(window).width()

