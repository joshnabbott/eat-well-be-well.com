String::humanize = ->
  nonHumanWord = @

  nonHumanWord = nonHumanWord.replace /\W\w/g, (match) ->
    ' ' + match[1].toUpperCase()

  humanWord = nonHumanWord.replace /([a-z])/, ($1) ->
    $1.toUpperCase()

  humanWord

