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

    # $(document).bind 'scroll', (event) ->
    #   clearTimeout(self.t)

    #   self.t = setTimeout ->
    #     self.scrollToCurrentPage()
    #   , 150

    # document.addEventListener ('touchstart'), (e) ->
    #   # e.preventDefault()
    #   console.log "touch started"
    #   self.grabbing = true

    # document.addEventListener ('touchend'), (e) ->
    #   # e.preventDefault()
    #   console.log "touch stopped"
    #   self.grabbing = false

    # document.addEventListener ('touchmove'), (e) ->
    #   console.log "touch move"
    #   # e.preventDefault()
    #   $(document.body).trigger 'mousemove'
    #   # self.gesturesY = parseInt(event.pageY, 10)

    #   if self.grabbing
    #     window.scrollBy(0, self.scrollStartPosition - self.gesturesY)
    #   # self.scrollToCurrentPage()

    $(document.body).bind 'mouseover', ->
      $(document.body).addClass 'grab'

    $(document.body).bind 'mouseleave', ->
      $(document.body).trigger 'mouseup'
      $(document.body).removeClass 'grab', 'grabbing'

    $(document.body).bind 'mousedown', (event) ->
      self.scrollStartPosition = self.gesturesY
      self.grabbing = true

      $(document.body).removeClass 'grab'
      $(document.body).addClass 'grabbing'

    $(document.body).bind 'mouseup', (event) ->
      self.grabbing = false

      $(document.body).addClass 'grab'
      $(document.body).removeClass 'grabbing'

      self.scrollToCurrentPage()

    $(document.body).bind 'mousemove', (event) ->
      self.gesturesY = parseInt(event.pageY, 10)

      if self.grabbing
        window.scrollBy(0, self.scrollStartPosition - self.gesturesY)

  setStageDimensions: ->
    @height = $(window).height()
    @width = $(window).width()

  scrollToCurrentPage: ->
    $('body').scrollTo(@currentPage.target, 250)
