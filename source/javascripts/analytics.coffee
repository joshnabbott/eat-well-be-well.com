window.Analytics = class Analytics
  constructor: (@queue) -> # @queue should be the analytics object.

  track: (action, args...) ->
    args.unshift action
    @queue.push args

  trackPageView: ->
    @track '_trackPageView'

  trackEvent: (category, action, label, value) ->
    @track '_trackEvent', category, action, label, value

