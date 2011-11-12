window.Page = class Page
  constructor: (@id, @target, link, @stage) ->
    @link = new NavLink(@, link)
    @initialize()

  initialize: ->
    self = @

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
      onlyOnScrol: true

  loadBackgroundImage: ->
    self = @
    $image = $("<div class=\"background-image\"><img src=\"#{@target.attr('data-background-image')}\" alt=\"Change this alt description\" /></div>")
    @target.prepend $image
    $image.fadeIn 'slow'

  prev: -> @stage.pages[@id - 1]

  next: -> @stage.pages[@id + 1]

  trackPageView: -> console.log "Analytics tracking goes here"

  showContent: ->
    if window.stage.initialized
      @target.find('p').each (index, element) ->
        setTimeout ->
          $(element).addClass 'visible'
        , 250 * index

  hideContent: ->
    @target.find('p').each (index, element) ->
      setTimeout ->
        $(element).removeClass 'visible'
      , 250 * index

