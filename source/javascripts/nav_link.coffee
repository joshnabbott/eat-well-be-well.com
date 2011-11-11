window.NavLink = class NavLink
  constructor: (@page, @target) ->
    @initialize()

  initialize: ->
    self = @

    @setSectionHref()
    @setSectionName()

    @target.bind 'click', (e) ->
      e.preventDefault()
      $('body').scrollTo(self.page.target, 500)

  makeCurrent: ->
    @setLocation()
    @setTitle()
    @target.addClass 'current'
    false

  makeNotCurrent: ->
    @target.removeClass 'current'
    false

  setLocation: ->
    document.location.hash = ['/', @sectionHref].join('')
    false

  setTitle: ->
    document.title = "Eat Well, Be Well - #{@sectionName}"

  setSectionHref: ->
    @sectionHref = @target.attr('href').replace(/#/g, '')

  setSectionName: ->
    sectionName = @sectionHref ||= @setSectionHref()
    @sectionName = sectionName.humanize()
