window.Analytics = class Analytics
  constructor: (@queue) -> # @queue should be the analytics object.

  track: (action, args...) ->
    args.unshift action
    @queue.push args

  trackPageView: ->
    console.log "Tracking page view."
    @track '_trackPageView'

  trackEvent: (category, action, label, value) ->
    console.log "Tracking '#{category}: #{action}'"
    @track '_trackEvent', category, action, label, value

