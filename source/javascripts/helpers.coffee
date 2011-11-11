String::humanize = ->
  nonHumanWord = @

  # Create an array by splitting at any illegal characters
  humanWord = nonHumanWord.split /[^a-zA-Z]/

  # Check for empty elements in the array
  humanWord = humanWord.filter (element) ->
    element != ''

  # Uppercase the first letter of each word
  humanWord = humanWord.map (word) ->
    return word.replace /([a-zA-Z])/, ($1) ->
      $1.toUpperCase()

  # Join the words with a space between them
  humanWord = humanWord.join ' '

  humanWord

