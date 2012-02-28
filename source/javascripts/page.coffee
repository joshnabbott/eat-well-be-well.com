window.Page = class Page
  constructor: (@id, @target, link, @stage) ->
    @link = new NavLink(@, link)
    @initialize()

  initialize: ->
    self = @

    @setElementVisibility()

    @target.waypoint ((event, direction) ->
      if direction == 'up'
        currentPage = self.prev()
      else
        currentPage = self

      self.stage.currentPage = currentPage

      $('ul > li > a').removeClass 'current'
      currentPage.showContent()
      currentPage.link.makeCurrent()
      currentPage.trackPageView()
    ),
      offset: '50%'
      onlyOnScroll: true

  loadBackgroundImage: ->
    self = @
    $image = $("<div class=\"background-image\"><img src=\"#{@target.attr('data-background-image')}\" alt=\"Change this alt description\" /></div>")
    @setBgDimensions()
    @target.prepend $image
    $image.fadeIn 'slow'

  setBgDimensions: ->
    $('.background-image > img').css({ 'height': @stage.height, 'width': @stage.width })

  prev: -> @stage.pages[@id - 1]

  next: -> @stage.pages[@id + 1]

  trackPageView: ->
    # console.log "Analytics tracking goes here"
    return false

  setElementVisibility: ->
    @target.find('[data-invisible]').addClass 'invisible'

  showContent: ->
    if @stage.initialized
      @target.find('.invisible').each (index, element) ->
        setTimeout ->
          $(element).removeClass 'invisible'
          $(element).addClass 'visible'
        , 250 * index

  hideContent: ->
    @target.find('.invisible').each (index, element) ->
      setTimeout ->
        $(element).removeClass 'visible'
        $(element).addClass 'invisible'
      , 250 * index

